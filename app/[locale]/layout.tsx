import type React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Analytics } from "@vercel/analytics/next"
import { locales, type Locale } from '@/i18n/config'
import { getLocalizedUrl } from "@/lib/seo"
import { getOgLocale, getOrganizationJsonLd } from "@/lib/structured-data"
import "../globals.css"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const url = getLocalizedUrl(locale as Locale, "")

  return {
    title: "Zi0n - Advanced Mobile Security",
    description:
      "Transform your Android into an encrypted, secure, controlled and protected device with Zi0n.",
    generator: "v0.app",
    keywords: ["mobile security", "encryption", "Android", "MDM", "privacy", "Zi0n"],
    authors: [{ name: "Zi0n" }],
    openGraph: {
      title: "Zi0n - Advanced Mobile Security",
      description: "Transform your Android into an encrypted, secure, controlled and protected device.",
      type: "website",
      url,
      siteName: "Zi0n",
      locale: getOgLocale(locale as Locale),
    },
    twitter: {
      card: "summary_large_image",
      title: "Zi0n - Advanced Mobile Security",
      description: "Transform your Android into an encrypted, secure, controlled and protected device.",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#071C59",
  width: "device-width",
  initialScale: 1,
}

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js 14+ puede pasar params como Promise
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const footerT = await getTranslations({ locale, namespace: "footer" });
  const organizationJsonLd = getOrganizationJsonLd(footerT("description"));

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/mona-sans"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
