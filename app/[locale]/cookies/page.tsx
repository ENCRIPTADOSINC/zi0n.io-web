import type { Metadata } from "next"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/config"
import CookiesPageClient from "./cookies-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: getLocalizedUrl(locale as Locale, "cookies"),
      languages: getLanguageAlternates("cookies"),
    },
  }
}

export default function CookiesPage() {
  return <CookiesPageClient />
}
