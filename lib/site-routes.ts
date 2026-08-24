import fs from "node:fs"
import path from "node:path"

const LOCALE_APP_DIR = path.join(process.cwd(), "app", "[locale]")

/** A folder name wrapped in brackets is a dynamic route segment (e.g. "[slug]"). */
function isDynamicSegment(name: string): boolean {
  return name.startsWith("[") && name.endsWith("]")
}

/**
 * Walks app/[locale] and returns the path (relative to the locale root) of
 * every static route that renders a page.tsx, e.g. ["", "blog", "cookies"].
 * Dynamic segments (like blog/[slug]) are skipped since their entries come
 * from content data instead (see getAllPostSlugs in lib/blog.ts). Adding a
 * new static page under app/[locale]/** automatically appears in the
 * sitemap with no manual list to maintain.
 */
export function getStaticPagePaths(): string[] {
  const paths: string[] = []

  function walk(dir: string, relativeSegments: string[]) {
    if (fs.existsSync(path.join(dir, "page.tsx"))) {
      paths.push(relativeSegments.join("/"))
    }

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || isDynamicSegment(entry.name)) continue
      walk(path.join(dir, entry.name), [...relativeSegments, entry.name])
    }
  }

  walk(LOCALE_APP_DIR, [])

  return paths
}
