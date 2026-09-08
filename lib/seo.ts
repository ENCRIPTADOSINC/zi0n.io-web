import { locales, defaultLocale, type Locale } from "@/i18n/config"

export const BASE_URL = "https://zi0n.io"

export function getLocalizedUrl(locale: Locale, path = "") {
  const suffix = path ? `/${path}` : ""
  return locale === defaultLocale ? `${BASE_URL}${suffix || "/"}` : `${BASE_URL}/${locale}${suffix}`
}

/**
 * Construye el mapa hreflang (los 10 locales + `x-default`) para una ruta.
 *
 * NO llamar desde páginas `noindex`: todas las URLs de un conjunto hreflang
 * deben ser indexables. Si una anotación hreflang apunta a una URL `noindex`,
 * Google descarta la relación hreflang de todo el conjunto.
 */
export function getLanguageAlternates(path = "") {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(locale, path)
  }
  languages["x-default"] = getLocalizedUrl(defaultLocale, path)
  return languages
}
