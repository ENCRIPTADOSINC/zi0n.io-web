import { locales } from "@/i18n/config"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import { getAllPostSlugs, getPostMeta } from "@/lib/blog"
import { getStaticPagePaths } from "@/lib/site-routes"

export type SitemapEntry = {
  url: string
  lastModified: Date
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
  languages: Record<string, string>
}

/** Explicit tuning per static route; anything not listed falls back to the defaults below. */
const ROUTE_TUNING: Record<string, { changeFrequency: SitemapEntry["changeFrequency"]; priority: number }> = {
  "": { changeFrequency: "weekly", priority: 1 },
  blog: { changeFrequency: "daily", priority: 0.8 },
  legal: { changeFrequency: "yearly", priority: 0.3 },
  terms: { changeFrequency: "yearly", priority: 0.3 },
  cookies: { changeFrequency: "yearly", priority: 0.3 },
}
const DEFAULT_ROUTE_TUNING = { changeFrequency: "monthly" as const, priority: 0.5 }

/** Static routes that exist but must stay out of the sitemap (e.g. noindex pages). */
const EXCLUDED_ROUTES = new Set(["distribuidores"])

const buildTime = new Date()

export function getSitemapEntries(): SitemapEntry[] {
  const staticEntries = locales.flatMap((locale) =>
    getStaticPagePaths()
      .filter((path) => !EXCLUDED_ROUTES.has(path))
      .map((path) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: buildTime,
      ...(ROUTE_TUNING[path] ?? DEFAULT_ROUTE_TUNING),
      languages: getLanguageAlternates(path),
    })),
  )

  const postEntries = getAllPostSlugs().flatMap((slug) =>
    locales
      .map((locale) => {
        const post = getPostMeta(slug, locale)
        if (!post) return null
        const path = `blog/${slug}`
        return {
          url: getLocalizedUrl(locale, path),
          lastModified: new Date(post.updatedDate ?? post.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
          languages: getLanguageAlternates(path),
        }
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  )

  return [...staticEntries, ...postEntries]
}
