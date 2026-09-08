import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  // Don't emit the hreflang `Link:` HTTP header. Every page already declares its
  // language alternates as <link rel="alternate" hreflang> in <head> via
  // generateMetadata; having both is a duplicate hreflang implementation.
  alternateLinks: false,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|sitemap-index|.*\\..*).*)']
}
