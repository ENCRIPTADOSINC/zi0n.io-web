"use client"

import { useTranslations } from "next-intl"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Locale } from "@/i18n/config"
import type { BlogPostMeta } from "@/lib/blog"

type BlogListingClientProps = {
  locale: Locale
  latestPosts: BlogPostMeta[]
  allPosts: BlogPostMeta[]
  currentPage: number
  totalPages: number
}

export function BlogListingClient({ locale, latestPosts, allPosts, currentPage, totalPages }: BlogListingClientProps) {
  const t = useTranslations("blog")
  const isMobile = useIsMobile()
  const isTablet = useIsMobile(1100)

  const [mainPost, ...sidePosts] = latestPosts

  return (
    <main style={styles.main}>
      <Header solid />

      <section style={{ ...styles.hero, ...(isMobile && styles.heroMobile) }}>
        <div style={{ ...styles.heroContainer, ...(isMobile && styles.heroContainerMobile) }}>
          <h1 style={{ ...styles.heroTitle, ...(isMobile && styles.heroTitleMobile) }}>
            {t("hero.title")}
            <br />
            <span style={styles.heroTitleHighlight}>{t("hero.titleHighlight")}</span>
          </h1>
          <p style={styles.heroSubtitle}>{t("hero.subtitle")}</p>
        </div>
      </section>

      <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
        {latestPosts.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>{t("latestPostsTitle")}</h2>
            <div style={{ ...styles.featuredGrid, ...(isTablet && styles.featuredGridStacked) }}>
              {mainPost && (
                <div style={styles.featuredMain}>
                  <BlogCard post={mainPost} locale={locale} variant="featured" priority />
                </div>
              )}
              {sidePosts.length > 0 && (
                <div style={{ ...styles.featuredSide, ...(isTablet && styles.featuredSideStacked) }}>
                  {sidePosts.map((post) => (
                    <BlogCard key={post.slug} post={post} locale={locale} variant="compact" />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>{t("allPostsTitle")}</h2>

          {allPosts.length === 0 ? (
            <p style={styles.emptyState}>{t("emptyState")}</p>
          ) : (
            <>
              <div
                style={{
                  ...styles.grid,
                  ...(isTablet && !isMobile && styles.gridTablet),
                  ...(isMobile && styles.gridMobile),
                }}
              >
                {allPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} locale={locale} variant="grid" />
                ))}
              </div>

              <div style={styles.paginationWrapper}>
                <BlogPagination
                  basePath={`/${locale}/blog`}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  labels={{
                    first: t("pagination.first"),
                    back: t("pagination.back"),
                    next: t("pagination.next"),
                    last: t("pagination.last"),
                  }}
                />
              </div>
            </>
          )}
        </section>
      </div>

      <Footer />
    </main>
  )
}

const styles = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#F4F6FA",
  },
  hero: {
    padding: "160px 24px 48px",
    textAlign: "center",
  },
  heroMobile: {
    padding: "120px 16px 32px",
  },
  heroContainer: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  heroContainerMobile: {
    maxWidth: "100%",
  },
  heroTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#081C59",
    lineHeight: 1.3,
    margin: 0,
  },
  heroTitleMobile: {
    fontSize: "24px",
  },
  heroTitleHighlight: {
    fontWeight: 800,
  },
  heroSubtitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: "#6E6E6E",
    lineHeight: 1.6,
    marginTop: "16px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  containerMobile: {
    padding: "0 16px 48px",
  },
  section: {
    marginBottom: "56px",
  },
  sectionTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#081C59",
    marginBottom: "20px",
  },
  featuredGrid: {
    display: "flex",
    gap: "24px",
    alignItems: "stretch",
  },
  featuredGridStacked: {
    flexDirection: "column",
  },
  featuredMain: {
    flex: 1,
    minWidth: 0,
  },
  featuredSide: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  featuredSideStacked: {
    flexDirection: "column",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  gridTablet: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  gridMobile: {
    gridTemplateColumns: "1fr",
  },
  emptyState: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "15px",
    color: "#6E6E6E",
  },
  paginationWrapper: {
    marginTop: "40px",
  },
} satisfies Record<string, React.CSSProperties>;
