import type { MetadataRoute } from "next"
import { locales } from "@/i18n/config"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import { getAllPostSlugs, getPostMeta } from "@/lib/blog"

const PATHS = ["", "cookies", "legal", "terms", "blog"]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: new Date(),
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
          alternates: { languages: getLanguageAlternates(path) },
        }
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  )

  return [...staticEntries, ...postEntries]
}
