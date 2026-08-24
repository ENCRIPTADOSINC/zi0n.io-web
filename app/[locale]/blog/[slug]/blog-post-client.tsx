"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Calendar } from "lucide-react"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { BlogCover } from "@/components/blog/blog-cover"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogShare } from "@/components/blog/blog-share"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Locale } from "@/i18n/config"
import type { BlogPost, BlogPostMeta } from "@/lib/blog"

type BlogPostClientProps = {
  post: BlogPost
  locale: Locale
  relatedPosts: BlogPostMeta[]
  canonicalUrl: string
}

export function BlogPostClient({ post, locale, relatedPosts, canonicalUrl }: BlogPostClientProps) {
  const t = useTranslations("blog")
  const isMobile = useIsMobile()

  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(post.date))

  return (
    <main style={styles.main}>
      <Header solid />

      <BlogCover src={post.coverImage} alt={post.title} variant="banner" priority />

      <article style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
        <Link href={`/${locale}/blog`} style={styles.backLink}>
          ← {t("backToBlog")}
        </Link>

        <div style={styles.metaRow}>
          <span style={styles.metaDate}>
            <Calendar size={16} strokeWidth={2} />
            {formattedDate}
          </span>
          <span style={styles.metaDivider}>·</span>
          <span style={styles.metaReading}>{t("readingTime", { minutes: post.readingMinutes })}</span>
          <div style={styles.shareWrapper}>
            <BlogShare url={canonicalUrl} title={post.title} />
          </div>
        </div>

        <h1 style={{ ...styles.title, ...(isMobile && styles.titleMobile) }}>{post.title}</h1>

        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      {relatedPosts.length > 0 && (
        <section style={{ ...styles.relatedSection, ...(isMobile && styles.relatedSectionMobile) }}>
          <h2 style={styles.relatedTitle}>{t("relatedPostsTitle")}</h2>
          <div style={{ ...styles.relatedGrid, ...(isMobile && styles.relatedGridMobile) }}>
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} locale={locale} variant="grid" />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#F4F6FA",
  },
  container: {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "40px 24px 64px",
  },
  containerMobile: {
    padding: "24px 16px 48px",
  },
  backLink: {
    display: "inline-block",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "#003FFF",
    textDecoration: "none",
    marginBottom: "24px",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "16px",
  },
  metaDate: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    color: "#6E6E6E",
  },
  metaDivider: {
    color: "#C6C6C6",
  },
  metaReading: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    color: "#6E6E6E",
  },
  shareWrapper: {
    marginLeft: "auto",
  },
  title: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "30px",
    fontWeight: 700,
    color: "#081C59",
    lineHeight: 1.3,
    marginBottom: "24px",
  },
  titleMobile: {
    fontSize: "24px",
  },
  relatedSection: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  relatedSectionMobile: {
    padding: "0 16px 48px",
  },
  relatedTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#081C59",
    marginBottom: "20px",
  },
  relatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  relatedGridMobile: {
    gridTemplateColumns: "1fr",
  },
} satisfies Record<string, React.CSSProperties>;
