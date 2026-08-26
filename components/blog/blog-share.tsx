"use client"

import { useState } from "react"
import { Link2, Check } from "lucide-react"

type BlogShareProps = {
  url: string
  title: string
}

export function BlogShare({ url }: BlogShareProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access unavailable, no-op.
    }
  }

  return (
    <div style={styles.row}>
      <button type="button" onClick={handleCopy} aria-label="Copy link" style={styles.button}>
        {copied ? <Check size={16} strokeWidth={2} /> : <Link2 size={16} strokeWidth={2} />}
      </button>
    </div>
  )
}

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#E9EDF5",
    color: "#081C59",
    border: "none",
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;
