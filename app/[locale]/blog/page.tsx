import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getLocalizedUrl, getLanguageAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/config"
import { getAllPostsMeta, paginate } from "@/lib/blog"
import { BlogListingClient } from "./blog-listing-client"

const PAGE_SIZE = 6

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params
  const { page: pageParam } = await searchParams
  const t = await getTranslations({ locale, namespace: "blog" })

  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1)
  const canonical = page > 1 ? `${getLocalizedUrl(locale as Locale, "blog")}?page=${page}` : getLocalizedUrl(locale as Locale, "blog")

  return {
    title: `${t("hero.title")} ${t("hero.titleHighlight")}`,
    description: t("hero.subtitle"),
    alternates: {
      canonical,
      languages: getLanguageAlternates("blog"),
    },
    openGraph: {
      title: `${t("hero.title")} ${t("hero.titleHighlight")}`,
      description: t("hero.subtitle"),
      type: "website",
      url: canonical,
    },
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { page: pageParam } = await searchParams
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1)

  const posts = getAllPostsMeta(locale as Locale)
  const latestPosts = posts.slice(0, 3)
  const { items: allPosts, currentPage, totalPages } = paginate(posts, requestedPage, PAGE_SIZE)

  return (
    <BlogListingClient
      locale={locale as Locale}
      latestPosts={latestPosts}
      allPosts={allPosts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
