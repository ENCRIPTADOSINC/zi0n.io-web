import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { locales, type Locale } from "@/i18n/config"
import { getLocalizedUrl, getLanguageAlternates, BASE_URL } from "@/lib/seo"
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { BlogPostClient } from "./blog-post-client"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale as Locale)

  if (!post) {
    return {}
  }

  const canonical = getLocalizedUrl(locale as Locale, `blog/${slug}`)
  const coverUrl = post.coverImage ? new URL(post.coverImage, BASE_URL).toString() : undefined

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(`blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonical,
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: post.author ? [post.author] : undefined,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale as Locale)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, locale as Locale, 3)
  const canonical = getLocalizedUrl(locale as Locale, `blog/${slug}`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: post.author ? { "@type": "Organization", name: post.author } : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    ...(post.coverImage ? { image: [new URL(post.coverImage, BASE_URL).toString()] } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient post={post} locale={locale as Locale} relatedPosts={relatedPosts} canonicalUrl={canonical} />
    </>
  )
}
