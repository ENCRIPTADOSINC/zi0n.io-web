"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const ICONS_FOLDER = "/image/icon-zi0n";

const appFiles: { name: string; file: string }[] = [
  { name: "CoinGecko", file: "CoinGecko.svg" },
  { name: "CoinMarketCap", file: "CoinMarketCap.svg" },
  { name: "Rabby Wallet", file: "Rabby Wallet.svg" },
  { name: "Uniswap", file: "Uniswap.svg" },
  { name: "TrustWallet", file: "Trust Wallet.svg" },
  { name: "Monero", file: "Monero.svg" },
  { name: "Exodus", file: "Exodus.svg" },
  { name: "MetaMask", file: "MetaMask.svg" },
  { name: "TronLink", file: "TronLink.svg" },
  { name: "Phantom", file: "Phantom.svg" },
  { name: "DuckDuckGo", file: "DuckDuckGo.svg" },
  { name: "Calculadora", file: "Calculadora2.svg" },
  { name: "Xe", file: "XE.svg" },
  { name: "DeepL", file: "DeepL.svg" },
  { name: "Proton Mail", file: "Proton Mail.svg" },
  { name: "Proton Drive", file: "Proton Drive.svg" },
  { name: "Proton Autentificador", file: "Proton Authenticator.svg" },
  { name: "Authy", file: "Authy.svg" },
  { name: "Signal", file: "Signal.svg" },
  { name: "Molly", file: "Molly.svg" },
  { name: "Threema", file: "Threema.svg" },
  { name: "Silent Phone", file: "Silent Phone.svg" },
  { name: "Telegram", file: "Telegram.svg" },
  { name: "Whatsapp", file: "Whatswapp.svg" },
  { name: "Mega", file: "Mega.svg" },
  { name: "Slynumber", file: "Slynumber.svg" },
  { name: "xPal", file: "xPal.svg" },
  { name: "WA Business", file: "WA Business.svg" },
  { name: "Facebook", file: "Facebook.svg" },
  { name: "Messenger", file: "Messenger.svg" },
  { name: "Snapchat", file: "Snapchat.svg" },
  { name: "YouTube", file: "YouTube.svg" },
  { name: "Tiktok", file: "TikTok.svg" },
  { name: "Amazon", file: "Amazon.svg" },
  { name: "Airbnb", file: "Airbnb.svg" },
  { name: "Bitrefill", file: "Bitrefill.svg" },
  { name: "Uber Eats", file: "Uber Eats.svg" },
  { name: "What3Words", file: "what3words.svg" },
  { name: "UBoxPro", file: "UBoxPro.svg" },
  { name: "PAJ Portal", file: "PAJ Portal.svg" },
  { name: "PlanetGPS", file: "PlanetGPS.svg" },
  { name: "Armadillo Chat", file: "Armadillo Chat.svg" },
  { name: "Zangi private messenger", file: "Zangi.svg" },
  { name: "Gboard", file: "Gboard.svg" },
  { name: "Threema Work", file: "Threema Work.svg" },
  { name: "SimpleX", file: "SimpleX.svg" },
  { name: "Briar", file: "Briar.svg" },
]

const apps = appFiles.map(({ name, file }) => ({
  name,
  src: `${ICONS_FOLDER}/${encodeURIComponent(file)}`,
}))

export function AppsConfig() {
  const t = useTranslations("appsConfig");
  const isMobile = useIsMobile();

  return (
    <section id="apps" style={styles.section}>
      <div
        style={{
          ...styles.container,
          ...(isMobile && { padding: "48px 16px" }),
        }}
      >
        {/* Section Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              ...styles.title,
              ...(isMobile && { fontSize: "24px" }),
            }}
          >
            {t("title")}
          </h2>
          <p style={styles.subtitle}>{t("subtitle")}</p>
        </motion.div>

        {/* Apps Grid */}
        <motion.div
          style={{
            ...styles.grid,
            ...(isMobile && {
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              maxWidth: "100%",
            }),
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {apps.map((app) => (
            <div key={app.name} style={styles.appItem}>
              <Image
                src={app.src}
                alt={app.name}
                width={64}
                height={64}
                style={styles.appIcon}
              />
              <span style={styles.appName}>{app.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#F4F6FA",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "80px 12px",
    overflow: "hidden",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontFamily: "'Mona-Sans', sans-serif",
    fontSize: "40px",
    fontWeight: 600,
    color: "#081C59",
    marginBottom: "12px",
  },
  subtitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    color: "#626262",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: "40px",
    maxWidth: "1050px",
    margin: "0 auto",
  },
  appItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  appIcon: {
    borderRadius: "16px",
    objectFit: "contain",
  },
  appName: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#626262",
    textAlign: "center",
  },
} satisfies Record<string, React.CSSProperties>;
