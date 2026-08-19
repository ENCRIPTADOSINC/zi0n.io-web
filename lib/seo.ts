import { locales, defaultLocale, type Locale } from "@/i18n/config"

export const BASE_URL = "https://zi0n.io"

export function getLocalizedUrl(locale: Locale, path = "") {
  const suffix = path ? `/${path}` : ""
  return locale === defaultLocale ? `${BASE_URL}${suffix || "/"}` : `${BASE_URL}/${locale}${suffix}`
}

export function getLanguageAlternates(path = "") {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(locale, path)
  }
  languages["x-default"] = getLocalizedUrl(defaultLocale, path)
  return languages
}
