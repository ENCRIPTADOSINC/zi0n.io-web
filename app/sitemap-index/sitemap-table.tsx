"use client"

import { useMemo, useState } from "react"
import type { SitemapEntry } from "@/lib/sitemap-entries"

type Props = {
  entries: SitemapEntry[]
}

export function SitemapTable({ entries }: Props) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return entries
    const needle = query.trim().toLowerCase()
    return entries.filter((entry) => entry.url.toLowerCase().includes(needle))
  }, [entries, query])

  return (
    <>
      <div style={styles.meta}>
        <span>
          <strong style={styles.metaStrong}>{filtered.length}</strong> / {entries.length} URLs
        </span>
        <input
          type="search"
          placeholder="Filtrar por URL…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>URL</th>
              <th style={styles.th}>Idiomas</th>
              <th style={styles.th}>Prioridad</th>
              <th style={styles.th}>Frecuencia</th>
              <th style={styles.th}>Última actualización</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr key={entry.url}>
                <td style={styles.td}>
                  <a href={entry.url} style={styles.link}>
                    {entry.url}
                  </a>
                </td>
                <td style={{ ...styles.td, ...styles.num }}>{Object.keys(entry.languages).length}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>{entry.priority}</span>
                </td>
                <td style={{ ...styles.td, ...styles.num }}>{entry.changeFrequency}</td>
                <td style={{ ...styles.td, ...styles.num }}>
                  {entry.lastModified.toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const styles = {
  meta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
    fontSize: "13px",
    color: "#6E7891",
    flexWrap: "wrap",
  },
  metaStrong: {
    color: "#081C59",
  },
  search: {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "13px",
    minWidth: "240px",
    outline: "none",
    color: "#081C59",
    fontFamily: "inherit",
  },
  tableWrap: {
    background: "#FFFFFF",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(8,28,89,0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#6E7891",
    padding: "12px 16px",
    borderBottom: "1px solid #E0E4EC",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 16px",
    borderBottom: "1px solid #E0E4EC",
    fontSize: "13px",
    verticalAlign: "top",
  },
  num: {
    color: "#6E7891",
    whiteSpace: "nowrap",
  },
  link: {
    color: "#081C59",
    textDecoration: "none",
    wordBreak: "break-all",
  },
  badge: {
    display: "inline-block",
    background: "rgba(94,236,125,0.18)",
    color: "#0E7A34",
    borderRadius: "999px",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: 600,
  },
} satisfies Record<string, React.CSSProperties>
