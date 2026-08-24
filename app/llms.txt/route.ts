import { locales, defaultLocale, type Locale } from "@/i18n/config"
import { BASE_URL, getLocalizedUrl } from "@/lib/seo"
import { getStaticPagePaths } from "@/lib/site-routes"
import { getAllPostsMeta } from "@/lib/blog"

export const dynamic = "force-static"

/** Locale used to render the reference links below (all 10 locales carry full translations). */
const REFERENCE_LOCALE: Locale = "es"

const PAGE_LABELS: Record<string, string> = {
  "": "Home",
  blog: "Blog",
  legal: "Legal Notice",
  terms: "Terms and Conditions",
  cookies: "Cookie Policy",
}

function labelForPath(path: string): string {
  return PAGE_LABELS[path] ?? path.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function singleLine(text: string): string {
  return text.replace(/\s*\r?\n\s*/g, " ").trim()
}

export async function GET() {
  const posts = getAllPostsMeta(REFERENCE_LOCALE)
  const pagePaths = getStaticPagePaths()

  const lines: string[] = [
    "# Zi0n",
    "",
    "> Zi0n is an advanced mobile security platform for Android: an encrypted, MDM-controlled device profile with a curated, verified app catalog, built for people who manage cryptocurrency wallets and need protection against SIM swapping, malware, forensic extraction and physical coercion.",
    "",
    `Content is published in ${locales.length} languages: ${locales.join(", ")} (default: ${defaultLocale}, no URL prefix). The links below use the "${REFERENCE_LOCALE}" locale as a reference — swap the "/${REFERENCE_LOCALE}/" segment for any other locale code to read the same page in that language.`,
    "",
    "## Pages",
  ]

  for (const path of pagePaths) {
    lines.push(`- [${labelForPath(path)}](${getLocalizedUrl(REFERENCE_LOCALE, path)})`)
  }

  lines.push("", "## Blog")
  for (const post of posts) {
    lines.push(
      `- [${singleLine(post.title)}](${getLocalizedUrl(REFERENCE_LOCALE, `blog/${post.slug}`)}): ${singleLine(post.description)}`,
    )
  }

  lines.push("", "## Full URL index", `- ${BASE_URL}/sitemap.xml`)

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
