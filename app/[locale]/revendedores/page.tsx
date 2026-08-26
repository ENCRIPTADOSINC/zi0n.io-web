import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { BASE_URL, getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import { getOgLocale } from "@/lib/structured-data"
import type { Locale } from "@/i18n/config"
import RevendedoresClient from "./revendedores-client"

const PREVIEW_IMAGE = `${BASE_URL}/image/revendedores/Zi0n.webp`

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "revendedores" })
  const title = t("metaTitle")
  const description = t("metaDescription")
  const canonical = getLocalizedUrl(locale as Locale, "revendedores")

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates("revendedores"),
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Zi0n",
      locale: getOgLocale(locale as Locale),
      images: [{ url: PREVIEW_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [PREVIEW_IMAGE],
    },
  }
}

export default function RevendedoresPage() {
  return <RevendedoresClient />
}
