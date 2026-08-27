"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Wallet, User, CreditCard, ShieldCheck, MessageCircle } from "lucide-react"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { useIsMobile } from "@/hooks/use-mobile"

const SIGNAL_LINK =
  "https://signal.me/#eu/_JeN5666yaf6J-AIkjGeS9I9zEfMPpg00aKdyPcGMpdewfsYoAVGOa-vNb1m1Z_e"

const programKeys = ["program1", "program2"] as const
const rowKeys = ["m3", "m6", "m12"] as const
const conditionKeys = ["c1", "c2", "c3", "c4"] as const
const creditStepIcons = { deposit: Wallet, receive: User, manage: CreditCard } as const
const creditStepKeys = ["deposit", "receive", "manage"] as const
const creditStepNumbers = { deposit: 1, receive: 3, manage: 4 } as const

export default function DistribuidoresClient() {
  const t = useTranslations("distribuidores")
  const isMobile = useIsMobile()
  const isCompact = useIsMobile(1100)

  return (
    <main style={styles.page}>
      <Header solid />

      {/* Hero */}
      <section style={{ ...styles.heroSection, ...(isMobile && styles.heroSectionMobile) }}>
        <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
          <div style={{ ...styles.hero, ...(isCompact && styles.heroCompact) }}>
            <div style={styles.heroText}>
              <h1 style={{ ...styles.heroTitle, ...(isMobile && styles.heroTitleMobile) }}>
                {t("hero.title")}
              </h1>
              <p style={{ ...styles.heroSubtitle, ...(isMobile && styles.heroSubtitleMobile) }}>
                {t("hero.subtitle")}
              </p>
            </div>
            <div style={{ ...styles.heroImageWrapper, ...(isCompact && styles.heroImageWrapperCompact) }}>
              <Image
                src="/image/distribuidores/imagen-hero.webp"
                alt={t("hero.title")}
                width={893}
                height={595}
                style={styles.heroImage}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programas / Pricing */}
      <section style={styles.section}>
        <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
          <h2 style={{ ...styles.title, ...(isMobile && styles.titleMobile) }}>{t("pricing.title")}</h2>

          <div style={{ ...styles.programsGrid, ...(isMobile && styles.programsGridMobile) }}>
            {programKeys.map((key) => {
              const recommended = key === "program2"
              return (
                <div
                  key={key}
                  style={{
                    ...styles.programCard,
                    ...(recommended && styles.programCardRecommended),
                  }}
                >
                  {recommended && <span style={styles.recommendedBadge}>{t("pricing.recommendedBadge")}</span>}
                  <h3 style={styles.programName}>{t(`pricing.programs.${key}.name`)}</h3>
                  <p style={styles.programLabel}>{t("pricing.depositLabel")}</p>
                  <p style={styles.programDeposit}>{t(`pricing.programs.${key}.deposit`)}</p>
                  <div style={styles.programIconWrapper}>
                    <Wallet size={22} color="#3074FF" />
                  </div>
                  <p style={styles.programLabel}>{t("pricing.discountLabel")}</p>
                  <p style={styles.programDiscount}>{t(`pricing.programs.${key}.discount`)}</p>
                </div>
              )
            })}
          </div>

          <div style={styles.tableWrapper}>
            <table style={{ ...styles.table, ...(isMobile && styles.tableMobile) }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, ...(isMobile && styles.thMobile) }}>
                    {isMobile ? t("pricing.table.planShort") : t("pricing.table.plan")}
                  </th>
                  <th style={{ ...styles.th, ...(isMobile && styles.thMobile), textAlign: "center" }}>
                    {isMobile ? t("pricing.table.r30Short") : t("pricing.table.r30")}
                  </th>
                  <th
                    style={{
                      ...styles.th,
                      ...(isMobile && styles.thMobile),
                      textAlign: "center",
                      color: "#22C55E",
                    }}
                  >
                    {isMobile ? t("pricing.table.r40Short") : t("pricing.table.r40")}
                  </th>
                  <th style={{ ...styles.th, ...(isMobile && styles.thMobile), textAlign: "right" }}>
                    {isMobile ? t("pricing.table.finalShort") : t("pricing.table.final")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowKeys.map((key) => (
                  <tr key={key} style={styles.tr}>
                    <td style={{ ...styles.td, ...(isMobile && styles.tdMobile), ...styles.tdPlan }}>
                      {t(`pricing.table.rows.${key}.plan`)}
                    </td>
                    <td style={{ ...styles.td, ...(isMobile && styles.tdMobile), textAlign: "center" }}>
                      {t(`pricing.table.rows.${key}.r30`)}
                    </td>
                    <td
                      style={{
                        ...styles.td,
                        ...(isMobile && styles.tdMobile),
                        textAlign: "center",
                        color: "#22C55E",
                        fontWeight: 600,
                      }}
                    >
                      {t(`pricing.table.rows.${key}.r40`)}
                    </td>
                    <td style={{ ...styles.td, ...(isMobile && styles.tdMobile), textAlign: "right" }}>
                      {t(`pricing.table.rows.${key}.final`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Credito para distribuidores */}
      <section style={styles.section}>
        <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
          <h2 style={{ ...styles.title, ...(isMobile && styles.titleMobile) }}>{t("credit.title")}</h2>
        </div>

        <div style={{ ...styles.creditCard, ...(isMobile && styles.creditCardMobile) }}>
          <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
            <div
              style={{
                ...styles.creditGrid,
                ...(isCompact && styles.creditGridTablet),
                ...(isMobile && styles.creditGridMobile),
              }}
            >
              <CreditStep t={t} stepKey="deposit" />

              <div style={styles.balanceCard}>
                <span style={styles.stepBadge}>2</span>
                <p style={styles.balanceLabel}>{t("credit.balanceLabel")}</p>
                <p style={styles.balanceAmount}>{t("credit.balanceAmount")}</p>
                <span style={styles.balanceTag}>{t("credit.balanceTag")}</span>
              </div>

              <CreditStep t={t} stepKey="receive" />
              <CreditStep t={t} stepKey="manage" />
            </div>
          </div>
        </div>
      </section>

      {/* Condiciones */}
      <section style={styles.section}>
        <div style={{ ...styles.container, ...styles.conditionsContainer, ...(isMobile && styles.containerMobile) }}>
          <h2 style={{ ...styles.title, ...(isMobile && styles.titleMobile) }}>{t("conditions.title")}</h2>

          <div style={styles.conditionsList}>
            {conditionKeys.map((key, index) => (
              <div
                key={key}
                style={{
                  ...styles.conditionRow,
                  ...(index === conditionKeys.length - 1 && styles.conditionRowLast),
                }}
              >
                <span style={styles.conditionNumber}>{String(index + 1).padStart(2, "0")}</span>
                <p style={styles.conditionText}>{t(`conditions.items.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...styles.section, paddingTop: 0 }}>
        <div style={{ ...styles.container, ...(isMobile && styles.containerMobile) }}>
          <div style={{ ...styles.ctaCard, ...(isMobile && styles.ctaCardCompact) }}>
            <div style={styles.ctaText}>
              <div style={{ ...styles.ctaHeading, ...(isMobile && styles.ctaHeadingMobile) }}>
                <div style={styles.ctaIconWrapper}>
                  <ShieldCheck size={18} color="#5EEC7D" />
                </div>
                <h2 style={styles.ctaTitle}>{t("cta.title")}</h2>
              </div>
              <p style={styles.ctaSubtitle}>
                {t("cta.subtitleLine1")}
                <br />
                {t("cta.subtitleLine2")}
              </p>
            </div>

            <div style={{ ...styles.ctaAction, ...(isMobile && styles.ctaActionCompact) }}>
              <div style={styles.qrWrapper}>
                <Image
                  src="/image/distribuidores/qr-zion.webp"
                  alt={t("cta.button")}
                  width={200}
                  height={200}
                  style={styles.qrImage}
                  priority
                />
              </div>
              <a href={SIGNAL_LINK} target="_blank" rel="noopener noreferrer" style={styles.signalButton}>
                <MessageCircle size={18} />
                {t("cta.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

type TFunction = ReturnType<typeof useTranslations>

function CreditStep({ t, stepKey }: { t: TFunction; stepKey: (typeof creditStepKeys)[number] }) {
  const Icon = creditStepIcons[stepKey]
  return (
    <div style={styles.creditStep}>
      <span style={styles.stepBadge}>{creditStepNumbers[stepKey]}</span>
      <div style={styles.creditIconWrapper}>
        <Icon size={22} color="#3074FF" />
      </div>
      <h3 style={styles.creditStepTitle}>{t(`credit.steps.${stepKey}.title`)}</h3>
      <p style={styles.creditStepDescription}>{t(`credit.steps.${stepKey}.description`)}</p>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F4F6FA",
  },
  section: {
    padding: "48px 0",
  },
  heroSection: {
    backgroundColor: "#071D5A",
    paddingTop: "128px",
    paddingBottom: "32px",
    borderRadius: "0 0 32px 32px",
    overflow: "hidden",
  },
  heroSectionMobile: {
    paddingTop: "104px",
    paddingBottom: "32px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
  },
  containerMobile: {
    padding: "0 16px",
  },
  title: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#071C59",
    textAlign: "center",
    marginBottom: "32px",
  },
  titleMobile: {
    fontSize: "24px",
  },

  // Hero
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },
  heroCompact: {
    flexDirection: "column",
    textAlign: "center",
  },
  heroText: {
    flex: 1,
    maxWidth: "420px",
  },
  heroTitle: {
    fontFamily: "Inter, sans-serif",
    fontSize: "46px",
    fontWeight: 800,
    color: "#FFFFFF",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    marginBottom: "16px",
  },
  heroTitleMobile: {
    fontSize: "30px",
  },
  heroSubtitle: {
    fontFamily: "Inter, sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    color: "#A6B8D0",
    lineHeight: 1.5,
    letterSpacing: "0",
  },
  heroSubtitleMobile: {
    fontSize: "15px",
  },
  heroImageWrapper: {
    flex: "0 0 600px",
  },
  heroImageWrapperCompact: {
    flex: "none",
    width: "100%",
    maxWidth: "400px",
    marginTop: "24px",
  },
  heroImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    mixBlendMode: "lighten",
  },

  // Programs / pricing
  programsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "40px",
  },
  programsGridMobile: {
    gridTemplateColumns: "1fr",
  },
  programCard: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
    borderRadius: "16px",
    padding: "32px",
    textAlign: "center",
  },
  programCardRecommended: {
    border: "2px solid #22C55E",
  },
  recommendedBadge: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#22C55E",
    color: "#071C59",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    padding: "4px 14px",
    borderRadius: "9999px",
  },
  programName: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: "16px",
  },
  programLabel: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: "#6E6E6E",
    marginBottom: "4px",
  },
  programDeposit: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    color: "#071C59",
    marginBottom: "20px",
  },
  programIconWrapper: {
    width: "44px",
    height: "44px",
    borderRadius: "9999px",
    backgroundColor: "#E6EFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  programDiscount: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#22C55E",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EDF5",
    borderRadius: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "560px",
  },
  tableMobile: {
    minWidth: "0",
    tableLayout: "fixed",
  },
  th: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "#071C59",
    textAlign: "left",
    padding: "16px 24px",
    borderBottom: "1px solid #E9EDF5",
    whiteSpace: "nowrap",
  },
  thMobile: {
    fontSize: "11px",
    padding: "10px 6px",
  },
  tr: {
    borderBottom: "1px solid #E9EDF5",
  },
  td: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "#6E6E6E",
    padding: "16px 24px",
  },
  tdMobile: {
    fontSize: "12px",
    padding: "10px 6px",
  },
  tdPlan: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    color: "#071C59",
  },

  // Credito para distribuidores
  creditCard: {
    backgroundColor: "#E9EDF5",
    padding: "40px 0",
    marginTop: "32px",
  },
  creditCardMobile: {
    padding: "32px 0",
  },
  creditGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "24px",
    alignItems: "stretch",
  },
  creditGridTablet: {
    gridTemplateColumns: "1fr 1fr",
  },
  creditGridMobile: {
    gridTemplateColumns: "1fr",
  },
  creditStep: {
    position: "relative",
    textAlign: "center",
    paddingTop: "8px",
  },
  creditIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "9999px",
    backgroundColor: "#E6EFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  creditStepTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "#071C59",
    marginBottom: "8px",
  },
  creditStepDescription: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "13px",
    fontWeight: 400,
    color: "#6E6E6E",
    lineHeight: 1.5,
  },
  stepBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    borderRadius: "9999px",
    backgroundColor: "#22C55E",
    color: "#FFFFFF",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: "12px",
  },
  balanceCard: {
    backgroundColor: "#071C59",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  balanceLabel: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "6px",
  },
  balanceAmount: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: "12px",
  },
  balanceTag: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: "#071C59",
    backgroundColor: "#22C55E",
    padding: "4px 12px",
    borderRadius: "9999px",
  },

  // Condiciones
  conditionsContainer: {
    maxWidth: "800px",
  },
  conditionsList: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EDF5",
    borderRadius: "12px",
    overflow: "hidden",
  },
  conditionRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "18px 20px",
    borderBottom: "1px solid #E9EDF5",
  },
  conditionRowLast: {
    borderBottom: "none",
  },
  conditionNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    flexShrink: 0,
    borderRadius: "9999px",
    backgroundColor: "#22C55E",
    color: "#FFFFFF",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "11px",
    fontWeight: 700,
  },
  conditionText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: "#071C59",
    lineHeight: 1.5,
  },

  // CTA
  ctaCard: {
    backgroundColor: "#071C59",
    borderRadius: "24px",
    padding: "40px 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "32px",
  },
  ctaCardCompact: {
    flexDirection: "column",
    padding: "32px 24px",
    textAlign: "center",
  },
  ctaText: {
    flex: 1,
    maxWidth: "440px",
  },
  ctaHeading: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
    justifyContent: "flex-start",
  },
  ctaHeadingMobile: {
    flexDirection: "column",
    gap: "12px",
  },
  ctaIconWrapper: {
    width: "36px",
    height: "36px",
    flexShrink: 0,
    borderRadius: "9999px",
    border: "1.5px solid #5EEC7D",
    backgroundColor: "#0D2872",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#FFFFFF",
  },
  ctaSubtitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 1.6,
  },
  ctaAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  ctaActionCompact: {
    marginTop: "8px",
  },
  qrWrapper: {
    lineHeight: 0,
  },
  qrImage: {
    display: "block",
    width: "160px",
    height: "160px",
    borderRadius: "8px",
  },
  signalButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#3B45FC",
    color: "#FFFFFF",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    padding: "12px 24px",
    borderRadius: "9999px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    width: "100%",
  },
} satisfies Record<string, React.CSSProperties>
