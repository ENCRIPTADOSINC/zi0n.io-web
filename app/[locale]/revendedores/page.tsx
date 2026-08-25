import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import RevendedoresClient from "./revendedores-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "revendedores" })

  return {
    title: t("metaTitle"),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function RevendedoresPage() {
  return <RevendedoresClient />
}
