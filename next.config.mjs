import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com",
      "font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com",
      "img-src 'self' data: blob: https://www.google-analytics.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Renderiza los metadatos (title, description, canonical, hreflang) SIEMPRE
  // dentro de <head> en el HTML inicial, en lugar de hacer streaming al <body>
  // para navegadores. En rutas dinámicas (p.ej. /[locale]/blog, que depende de
  // searchParams para la paginación) Next hace streaming de metadatos por
  // defecto y solo los sirve en <head> para los bots de esta lista; crawlers
  // como Screaming Frog —y el HTML sin renderizar que inspecciona Google— los
  // veían fuera del <head>. `generateMetadata` aquí solo lee JSON local, así
  // que el coste de bloquear es insignificante. Ver:
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots
  htmlLimitedBots: /.*/,
  images: {
    // Serve AVIF first (≈20-40% smaller than WebP), WebP fallback.
    formats: ['image/avif', 'image/webp'],
    // Cap at 1200: the widest image anywhere is the full-bleed blog banner
    // (max ~480px tall, behind a gradient) and the hero mockup renders at
    // ≤543px. The 1920/2048/3840 candidates only ever produced upscaled
    // /_next/image variants over 100 KB that no viewport actually requested.
    deviceSizes: [640, 750, 828, 1080, 1200],
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
