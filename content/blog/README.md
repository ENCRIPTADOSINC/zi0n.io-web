# Blog content

Each post is a folder under `content/blog/<slug>/`, with one Markdown file per locale:

```
content/blog/
  mi-articulo/
    es.md
    en.md
    fr.md   (optional — add locales as translations become available)
```

`<slug>` becomes the URL: `/[locale]/blog/<slug>`.

## Frontmatter

```md
---
title: "Post title"
description: "One or two sentences used as the card excerpt and SEO description."
date: "2026-07-17"
updatedDate: "2026-08-01"   # optional, defaults to date
author: "Equipo Zi0n"        # optional
category: "Comunicación Empresarial"  # optional, not yet rendered but reserved
tags: ["mensajería", "privacidad"]     # optional, not yet rendered but reserved
coverImage: "/image/blog/mi-articulo/cover.jpg"  # optional — omit to use the brand gradient placeholder
draft: false                 # true hides the post from listings, sitemap and direct access
---

Body content in Markdown (headings, paragraphs, lists, links, bold, blockquotes...).
```

## Missing translations

If a locale's `.md` file doesn't exist yet, the site falls back to `en.md`, then `es.md`, then any other locale that does exist — the page still renders (with the site's UI chrome in the visitor's language), it just shows the fallback language's copy until a real translation is added.

## Cover images

Drop images under `public/image/blog/<slug>/` and reference them with an absolute path (`/image/blog/<slug>/cover.jpg`) in `coverImage`. Without one, cards and the post banner show the brand gradient placeholder automatically.

## Generating a full, all-locale post

For a production-grade post covering all 10 site locales with a unique cover image and automated validation, see the `blog-generator` skill at [`skills/blog-generator/SKILL.md`](../../skills/blog-generator/SKILL.md) and `scripts/validate-blog-entry.mjs`.
