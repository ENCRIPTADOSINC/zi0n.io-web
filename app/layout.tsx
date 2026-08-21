import type React from "react"
import type { Metadata, Viewport } from "next"
import { BASE_URL } from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Zi0n - Seguridad Móvil Avanzada",
  description:
    "Transforma tu Android en un dispositivo encriptado, seguro, controlado y protegido con Zi0n. Gestión de apps verificadas y seguridad avanzada.",
  generator: "v0.app",
  keywords: ["seguridad móvil", "encriptación", "Android", "MDM", "privacidad", "Zi0n"],
  authors: [{ name: "Zi0n" }],
  openGraph: {
    title: "Zi0n - Seguridad Móvil Avanzada",
    description: "Transforma tu Android en un dispositivo encriptado, seguro, controlado y protegido.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: "#071C59",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
