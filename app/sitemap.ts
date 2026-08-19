import type { MetadataRoute } from "next"
import { locales } from "@/i18n/config"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"

const PATHS = ["", "cookies", "legal", "terms"]

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: new Date(),
      alternates: { languages: getLanguageAlternates(path) },
    })),
  )
}
