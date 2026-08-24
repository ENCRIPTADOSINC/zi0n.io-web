import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/seo"

const DISALLOWED_PATHS = ["/api/"]

/**
 * Crawlers used by AI assistants/search engines (ChatGPT, Claude, Perplexity,
 * Gemini, etc.) to discover and cite web content. Listed explicitly (in
 * addition to the "*" wildcard) so their access is unambiguous even for
 * crawlers that special-case their own user-agent token.
 */
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "Diffbot",
  "DuckAssistBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: AI_USER_AGENTS,
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
