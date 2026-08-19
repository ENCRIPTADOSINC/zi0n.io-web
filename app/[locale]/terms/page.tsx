import type { Metadata } from "next"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/config"
import TermsPageClient from "./terms-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: getLocalizedUrl(locale as Locale, "terms"),
      languages: getLanguageAlternates("terms"),
    },
  }
}

export default function TermsPage() {
  return <TermsPageClient />
}
