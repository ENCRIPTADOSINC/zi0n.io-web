import Link from "next/link"

type BlogPaginationProps = {
  basePath: string
  currentPage: number
  totalPages: number
  labels: {
    first: string
    back: string
    next: string
    last: string
  }
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result: (number | "ellipsis")[] = []
  let previous = 0
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push("ellipsis")
    result.push(page)
    previous = page
  }
  return result
}

export function BlogPagination({ basePath, currentPage, totalPages, labels }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pageNumbers = getPageNumbers(currentPage, totalPages)
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <nav aria-label="Pagination" style={styles.nav}>
      <PaginationLink href={pageHref(basePath, 1)} disabled={isFirst}>
        « {labels.first}
      </PaginationLink>
      <PaginationLink href={pageHref(basePath, currentPage - 1)} disabled={isFirst}>
        ‹ {labels.back}
      </PaginationLink>

      {pageNumbers.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} style={styles.ellipsis}>
            …
          </span>
        ) : (
          <PaginationLink key={page} href={pageHref(basePath, page)} active={page === currentPage}>
            {page}
          </PaginationLink>
        ),
      )}

      <PaginationLink href={pageHref(basePath, currentPage + 1)} disabled={isLast}>
        {labels.next} ›
      </PaginationLink>
      <PaginationLink href={pageHref(basePath, totalPages)} disabled={isLast}>
        {labels.last} »
      </PaginationLink>
    </nav>
  )
}

function PaginationLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}) {
  if (disabled) {
    return (
      <span style={{ ...styles.item, ...styles.itemDisabled }} aria-disabled="true">
        {children}
      </span>
    )
  }

  return (
    <Link href={href} style={{ ...styles.item, ...(active && styles.itemActive) }} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  )
}

const styles = {
  nav: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "36px",
    height: "36px",
    padding: "0 10px",
    borderRadius: "8px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "#081C59",
    textDecoration: "none",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EDF5",
  },
  itemActive: {
    backgroundColor: "#081C59",
    color: "#FFFFFF",
    border: "1px solid #081C59",
  },
  itemDisabled: {
    color: "#C6C6C6",
    cursor: "not-allowed",
  },
  ellipsis: {
    minWidth: "24px",
    textAlign: "center",
    color: "#6E6E6E",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },
} satisfies Record<string, React.CSSProperties>;
