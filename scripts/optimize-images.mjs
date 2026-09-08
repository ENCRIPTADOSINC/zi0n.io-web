// One-shot, near-lossless image optimizer for public/ assets.
//
// Usage:
//   node scripts/optimize-images.mjs            # optimize in place
//   node scripts/optimize-images.mjs --dry-run  # report only, write nothing
//
// What it does, per raster image (.png/.jpg/.jpeg/.webp) under public/:
//   1. Downscales anything wider than MAX_WIDTH[dir] (retina-safe caps).
//   2. Re-encodes in the SAME format at near-lossless settings (webp/jpeg q80,
//      png with palette quantization). Extensions never change, so every
//      existing src="" reference keeps working — nothing to update.
//   3. Keeps the result only if it is meaningfully smaller than the original.
// SVGs and the favicon are left untouched.
//
// Re-running is safe and idempotent: already-optimized files barely change and
// are skipped by the "meaningfully smaller" guard.

import { readdir, stat, readFile, writeFile } from "node:fs/promises"
import { join, extname, relative, sep } from "node:path"
import sharp from "sharp"

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/(\w:)/, "$1")
const PUBLIC_DIR = join(ROOT, "public")
const DRY_RUN = process.argv.includes("--dry-run")

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"])
const QUALITY = 80 // WebP quality — 78-82 is the near-lossless sweet spot
const MIN_SAVING = 0.2 // only rewrite when we shave ≥20% — keeps re-runs idempotent

// Max stored width per area (already accounts for 2x retina at the real
// rendered size). Keeping sources at these caps also caps every /_next/image
// derivative, since Next never upscales past the source width.
const MAX_WIDTH = [
  { match: /[/\\]image[/\\]blog[/\\]/, width: 1200 }, // post banners: max ~480px tall, behind a gradient
  { match: /[/\\]image[/\\]home[/\\]hero[/\\]/, width: 1600 },
  { match: /[/\\]image[/\\]distribuidores[/\\]/, width: 1400 },
  { match: /.*/, width: 1600 },
]

function capFor(path) {
  return MAX_WIDTH.find((rule) => rule.match.test(path)).width
}

// QR / scan codes: only ever rendered small (~200px), so a tight width cap is
// the win. They must stay crisp, so keep quality high rather than going lossy-low.
const SCANCODE = { match: /qr-|[/\\]qr[/\\]/i, width: 512, quality: 88 }

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

let totalBefore = 0
let totalAfter = 0
let rewritten = 0

for await (const file of walk(PUBLIC_DIR)) {
  const ext = extname(file).toLowerCase()
  if (!RASTER.has(ext)) continue

  const rel = relative(ROOT, file).split(sep).join("/")
  const before = (await stat(file)).size
  const input = await readFile(file)

  const scancode = SCANCODE.match.test(file)
  let pipeline = sharp(input, { failOn: "none" })
  const meta = await pipeline.metadata()
  const cap = scancode ? SCANCODE.width : capFor(file)
  if (meta.width && meta.width > cap) pipeline = pipeline.resize({ width: cap, withoutEnlargement: true })

  if (scancode) {
    pipeline = pipeline.webp({ quality: SCANCODE.quality, effort: 6 })
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: QUALITY, effort: 6, smartSubsample: true })
  } else if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
  }
  const output = await pipeline.toBuffer()

  const saving = 1 - output.length / before
  totalBefore += before

  if (saving >= MIN_SAVING) {
    totalAfter += output.length
    rewritten++
    const note = meta.width && meta.width > cap ? ` (resized ${meta.width}→${cap}w)` : ""
    console.log(
      `${DRY_RUN ? "would optimize" : "optimized"}  ${rel}  ${(before / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB  (-${(saving * 100).toFixed(0)}%)${note}`,
    )
    if (!DRY_RUN) await writeFile(file, output)
  } else {
    totalAfter += before
  }
}

console.log(
  `\n${rewritten} file(s) ${DRY_RUN ? "would be " : ""}optimized — ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
)
