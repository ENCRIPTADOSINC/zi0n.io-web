import { BASE_URL, getLocalizedUrl } from "@/lib/seo"
import type { Locale } from "@/i18n/config"

const ogLocaleMap: Record<Locale, string> = {
  ru: "ru_RU",
  es: "es_ES",
  en: "en_US",
  fr: "fr_FR",
  it: "it_IT",
  "pt-BR": "pt_BR",
  zh: "zh_CN",
  hi: "hi_IN",
  de: "de_DE",
  nl: "nl_NL",
}

export function getOgLocale(locale: Locale) {
  return ogLocaleMap[locale] ?? "en_US"
}

const ORG_NAME = "Zi0n"
const ORG_ALT_NAME = "Zi0n Cripto"
const ORG_LOGO_URL = `${BASE_URL}/logos/logo-azul.svg`

export function getOrganizationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: ORG_NAME,
    alternateName: ORG_ALT_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO_URL,
    },
    description,
  }
}

export function getSoftwareApplicationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#software`,
    name: ORG_NAME,
    alternateName: ORG_ALT_NAME,
    url: getLocalizedUrl(locale, ""),
    description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Android",
    publisher: { "@id": `${BASE_URL}/#organization` },
  }
}

export function getFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
