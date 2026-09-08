import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { BASE_URL, getLocalizedUrl } from "@/lib/seo"
import { getOgLocale } from "@/lib/structured-data"
import type { Locale } from "@/i18n/config"
import DistribuidoresClient from "./distribuidores-client"

const PREVIEW_IMAGE = `${BASE_URL}/image/distribuidores/Zi0n.webp`

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "distribuidores" })
  const title = t("metaTitle")
  const description = t("metaDescription")

  // Página noindex/nofollow y fuera del sitemap: NO debe emitir anotaciones
  // hreflang (`alternates.languages`). Todas las URLs de un conjunto hreflang
  // deben ser indexables; incluir aquí enlaces de retorno noindex hace que
  // Google ignore la relación hreflang de todo el conjunto.
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: getLocalizedUrl(locale as Locale, "distribuidores"),
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

export default function DistribuidoresPage() {
  return <DistribuidoresClient />
}
