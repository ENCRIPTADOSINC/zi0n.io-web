import type { Metadata } from "next"
import { getSitemapEntries } from "@/lib/sitemap-entries"
import { SitemapTable } from "./sitemap-table"

export const metadata: Metadata = {
  title: "Sitemap — Zi0n",
  robots: { index: false, follow: true },
}

export default function SitemapIndexPage() {
  const entries = getSitemapEntries()

  return (
    <html lang="es">
      <body style={styles.page}>
        <header style={styles.header}>
          <h1 style={styles.title}>Zi0n — Sitemap</h1>
          <p style={styles.subtitle}>
            Vista legible del sitemap. Generado automáticamente a partir de las páginas del sitio y los
            artículos del blog.
          </p>
        </header>
        <div style={styles.wrap}>
          <SitemapTable entries={entries} />
          <p style={styles.footerNote}>
            Este listado es solo para navegación humana y no se indexa. Los buscadores usan{" "}
            <a href="/sitemap.xml" style={styles.footerLink}>
              /sitemap.xml
            </a>{" "}
            y{" "}
            <a href="/robots.txt" style={styles.footerLink}>
              /robots.txt
            </a>
            .
          </p>
        </div>
      </body>
    </html>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F4F6FA",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #081C59 0%, #0B2A78 100%)",
    color: "#FFFFFF",
    padding: "32px 24px",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "22px",
  },
  subtitle: {
    margin: 0,
    color: "rgba(255,255,255,0.75)",
    fontSize: "14px",
  },
  wrap: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
  },
  footerNote: {
    textAlign: "center",
    color: "#6E7891",
    fontSize: "12px",
    marginTop: "24px",
  },
  footerLink: {
    color: "#081C59",
  },
} satisfies Record<string, React.CSSProperties>
