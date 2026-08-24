import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import readingTime from "reading-time"
import { locales, defaultLocale, type Locale } from "@/i18n/config"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

/** Order in which a missing translation falls back to another locale's file. */
const CONTENT_FALLBACK_LOCALES: Locale[] = ["en", "es", defaultLocale, ...locales]

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  updatedDate?: string
  author?: string
  category?: string
  tags?: string[]
  coverImage?: string
  draft?: boolean
}

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
  locale: Locale
  /** True when the requested locale had no translation and this is a fallback. */
  isFallbackLocale: boolean
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
  readingMinutes: number
}

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function resolveLocaleFile(slug: string, locale: Locale): { filePath: string; usedLocale: Locale } | null {
  const postDir = path.join(BLOG_DIR, slug)
  if (!fs.existsSync(postDir)) return null

  const candidates: Locale[] = [locale, ...CONTENT_FALLBACK_LOCALES.filter((l) => l !== locale)]

  for (const candidate of candidates) {
    const filePath = path.join(postDir, `${candidate}.md`)
    if (fs.existsSync(filePath)) {
      return { filePath, usedLocale: candidate }
    }
  }

  return null
}

function markdownToHtml(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .processSync(markdown)

  return String(file)
}

export function getAllPostSlugs(): string[] {
  return getSlugs()
}

export function getPostMeta(slug: string, locale: Locale): BlogPostMeta | null {
  const resolved = resolveLocaleFile(slug, locale)
  if (!resolved) return null

  const raw = fs.readFileSync(resolved.filePath, "utf8")
  const { data } = matter(raw)
  const frontmatter = data as BlogFrontmatter

  if (frontmatter.draft) return null

  return {
    ...frontmatter,
    slug,
    locale: resolved.usedLocale,
    isFallbackLocale: resolved.usedLocale !== locale,
  }
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const resolved = resolveLocaleFile(slug, locale)
  if (!resolved) return null

  const raw = fs.readFileSync(resolved.filePath, "utf8")
  const { data, content } = matter(raw)
  const frontmatter = data as BlogFrontmatter

  if (frontmatter.draft) return null

  return {
    ...frontmatter,
    slug,
    locale: resolved.usedLocale,
    isFallbackLocale: resolved.usedLocale !== locale,
    contentHtml: markdownToHtml(content),
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  }
}

export function getAllPostsMeta(locale: Locale): BlogPostMeta[] {
  return getSlugs()
    .map((slug) => getPostMeta(slug, locale))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(slug: string, locale: Locale, limit = 3): BlogPostMeta[] {
  return getAllPostsMeta(locale)
    .filter((post) => post.slug !== slug)
    .slice(0, limit)
}

export function paginate<T>(items: T[], page: number, pageSize: number): { items: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    currentPage,
  }
}
