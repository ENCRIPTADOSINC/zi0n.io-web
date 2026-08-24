import Link from "next/link"
import type { Locale } from "@/i18n/config"
import type { BlogPostMeta } from "@/lib/blog"
import { BlogCover } from "./blog-cover"

type BlogCardProps = {
  post: BlogPostMeta
  locale: Locale
  variant?: "featured" | "compact" | "grid"
  priority?: boolean
}

export function BlogCard({ post, locale, variant = "grid", priority }: BlogCardProps) {
  const href = `/${locale}/blog/${post.slug}`
  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"

  return (
    <Link href={href} style={{ ...styles.card, ...(isCompact && styles.cardCompact) }}>
      <div style={{ ...styles.coverWrapper, ...(isCompact && styles.coverWrapperCompact) }}>
        <BlogCover src={post.coverImage} alt={post.title} priority={priority} variant={isCompact ? "compact" : "card"} />
      </div>
      <div style={{ ...styles.body, ...(isCompact && styles.bodyCompact) }}>
        <h3 style={{ ...styles.title, ...(isCompact && styles.titleCompact), ...(isFeatured && styles.titleFeatured) }}>
          {post.title}
        </h3>
        <p style={{ ...styles.description, ...(isCompact && styles.descriptionCompact) }}>{post.description}</p>
      </div>
    </Link>
  )
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(7, 28, 89, 0.08)",
    height: "100%",
  },
  cardCompact: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: "16px",
  },
  coverWrapper: {
    padding: "12px 12px 0",
  },
  coverWrapperCompact: {
    padding: "12px",
    width: "45%",
    flexShrink: 0,
  },
  body: {
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  bodyCompact: {
    justifyContent: "center",
  },
  title: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "17px",
    fontWeight: 700,
    color: "#081C59",
    lineHeight: 1.35,
    margin: 0,
  },
  titleCompact: {
    fontSize: "15px",
  },
  titleFeatured: {
    fontSize: "22px",
  },
  description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "#6E6E6E",
    lineHeight: 1.5,
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  descriptionCompact: {
    WebkitLineClamp: 2,
  },
} satisfies Record<string, React.CSSProperties>;
