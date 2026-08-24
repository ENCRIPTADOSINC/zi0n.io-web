import Image from "next/image"
import { ShieldCheck } from "lucide-react"

type BlogCoverProps = {
  src?: string
  alt: string
  priority?: boolean
  variant?: "card" | "banner" | "compact"
}

export function BlogCover({ src, alt, priority, variant = "card" }: BlogCoverProps) {
  const wrapperStyle = {
    ...styles.wrapper,
    ...(variant === "banner" && styles.wrapperBanner),
    ...(variant === "compact" && styles.wrapperCompact),
  }

  if (src) {
    const sizes = variant === "banner" ? "100vw" : "(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 33vw"
    const quality = variant === "banner" ? 90 : 75

    return (
      <div style={wrapperStyle}>
        <Image src={src} alt={alt} fill sizes={sizes} quality={quality} style={styles.image} priority={priority} />
        <div style={styles.overlay} />
      </div>
    )
  }

  return (
    <div style={wrapperStyle} role="img" aria-label={alt}>
      <div style={styles.placeholder}>
        <div style={styles.circleLarge} />
        <div style={styles.circleSmall} />
        <ShieldCheck style={styles.icon} strokeWidth={1.5} />
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: "16px",
    backgroundColor: "#071C59",
  },
  wrapperBanner: {
    aspectRatio: "auto",
    height: "clamp(280px, 40vw, 480px)",
    borderRadius: 0,
  },
  wrapperCompact: {
    aspectRatio: "auto",
    height: "100%",
  },
  image: {
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(4, 14, 46, 0.75) 0%, rgba(7, 28, 89, 0.4) 30%, rgba(7, 28, 89, 0) 65%)",
    pointerEvents: "none",
  },
  placeholder: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #071C59 0%, #003FFF 55%, #3AA6FF 100%)",
    overflow: "hidden",
  },
  circleLarge: {
    position: "absolute",
    top: "-30%",
    left: "-15%",
    width: "70%",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  circleSmall: {
    position: "absolute",
    bottom: "-25%",
    right: "-10%",
    width: "55%",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    backgroundColor: "rgba(175, 219, 255, 0.25)",
  },
  icon: {
    position: "relative",
    width: "20%",
    height: "auto",
    minWidth: "32px",
    color: "rgba(255, 255, 255, 0.85)",
  },
} satisfies Record<string, React.CSSProperties>;
