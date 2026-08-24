"use client"

import { useState } from "react"
import { Facebook, Linkedin, Link2, Check } from "lucide-react"

type BlogShareProps = {
  url: string
  title: string
}

export function BlogShare({ url, title }: BlogShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: WhatsAppIcon,
    },
  ]

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
      {links.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={styles.button}>
          <Icon size={16} strokeWidth={2} />
        </a>
      ))}
      <button type="button" onClick={handleCopy} aria-label="Copy link" style={styles.button}>
        {copied ? <Check size={16} strokeWidth={2} /> : <Link2 size={16} strokeWidth={2} />}
      </button>
    </div>
  )
}

function XIcon({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.66 1.47 5.24L2 22l4.98-1.55a9.9 9.9 0 0 0 5.06 1.38h.004c5.46 0 9.91-4.45 9.91-9.91C21.96 6.46 17.5 2 12.04 2zm0 18.13h-.003a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.97.99-3.03-.2-.31a8.16 8.16 0 0 1-1.26-4.36c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.69 8.2-8.21 8.2z" />
    </svg>
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
