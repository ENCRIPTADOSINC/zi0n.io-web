import type { MetadataRoute } from "next"
import { locales } from "@/i18n/config"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import { getAllPostSlugs, getPostMeta } from "@/lib/blog"
import { getStaticPagePaths } from "@/lib/site-routes"

/** Explicit tuning per static route; anything not listed falls back to the defaults below. */
const ROUTE_PRIORITY: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = {
  "": { changeFrequency: "weekly", priority: 1 },
  blog: { changeFrequency: "daily", priority: 0.8 },
  legal: { changeFrequency: "yearly", priority: 0.3 },
  terms: { changeFrequency: "yearly", priority: 0.3 },
  cookies: { changeFrequency: "yearly", priority: 0.3 },
}
const DEFAULT_ROUTE_TUNING = { changeFrequency: "monthly" as const, priority: 0.5 }

const buildTime = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    getStaticPagePaths().map((path) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: buildTime,
      ...(ROUTE_PRIORITY[path] ?? DEFAULT_ROUTE_TUNING),
      alternates: { languages: getLanguageAlternates(path) },
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
          alternates: { languages: getLanguageAlternates(path) },
        }
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  )

  return [...staticEntries, ...postEntries]
}
