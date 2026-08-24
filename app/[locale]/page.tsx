import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import { getOgLocale, getSoftwareApplicationJsonLd, getFaqJsonLd } from "@/lib/structured-data"
import type { Locale } from "@/i18n/config"
import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero-section"
import { CryptoDilemma } from "@/components/sections/crypto-dilemma"
import { OperaCripto } from "@/components/sections/opera-cripto"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FeaturesGrid } from "@/components/sections/features-grid"
import { AppsConfig } from "@/components/sections/apps-config"
import { CTASection } from "@/components/sections/cta-section"
import { FAQSection } from "@/components/sections/faq-section"
import { DistributionSection } from "@/components/sections/distribution-section"
import { Footer } from "@/components/sections/footer"

type Props = {
  params: Promise<{ locale: string }>
}

const faqQuestionKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })
  const canonical = getLocalizedUrl(locale as Locale, "")
  const title = "Zi0n - Advanced Mobile Security"
  const description = t("description")

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(""),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "Zi0n",
      locale: getOgLocale(locale as Locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function LandingPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })
  const faqT = await getTranslations({ locale, namespace: "faq" })

  const softwareJsonLd = getSoftwareApplicationJsonLd(locale as Locale, t("description"))
  const faqJsonLd = getFaqJsonLd(
    faqQuestionKeys.map((key) => ({
      question: faqT(`questions.${key}.question`),
      answer: faqT(`questions.${key}.answer`),
    })),
  )

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F4F6FA" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <HeroSection />
      <CryptoDilemma />
      <OperaCripto />
      <HowItWorks />
      <FeaturesGrid />
      <AppsConfig />
      <CTASection />
      <FAQSection />
      <DistributionSection />
      <Footer />
    </main>
  );
}
