import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Zi0n - Advanced Mobile Security for Android"

const LOGO_SVG = `<svg width="269" height="59" viewBox="0 0 269 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.21592 16.4488L0 25.8177L35.3455 25.734L42.5614 16.3651L7.21592 16.4488Z" fill="url(#paint0_linear_59_282)"/>
<path d="M75.5478 0.135513L19.8005 0L12.5983 9.44592L58.0908 9.42855L45.6087 25.7692L55.7948 25.8066L75.5478 0.135513Z" fill="url(#paint1_linear_59_282)"/>
<path d="M40.2113 32.7746L32.9954 42.1435L68.3408 42.0599L75.5567 32.691L40.2113 32.7746Z" fill="url(#paint2_linear_59_282)"/>
<path d="M19.7665 32.7029L0.013472 58.374L55.6921 58.394L62.963 49.0636L17.4705 49.081L29.9526 32.7403L19.7665 32.7029Z" fill="url(#paint3_linear_59_282)"/>
<path d="M98.5857 18.0243H122.549L98.5857 40.4813V47.4473H133.881V40.4813H109.917L133.881 18.0243V11.0585H98.5857V18.0243Z" fill="white"/>
<path d="M158.727 11.0589H149.474V47.4477H158.727V11.0589Z" fill="white"/>
<path d="M205.926 29.4613C205.926 37.6747 202.755 41.0537 195.062 41.0537C192.956 41.0537 191.194 40.8014 189.727 40.2869L205.488 24.5249C205.778 25.833 205.926 27.3275 205.926 29.0453V29.4613ZM183.99 29.0453C183.99 20.8319 187.213 17.4529 195.062 17.4529C197.365 17.4529 199.255 17.7631 200.784 18.4079L184.585 34.6076C184.184 33.1619 183.99 31.4569 183.99 29.4613V29.0453ZM195.062 10.3831C181.339 10.3831 174.686 16.3093 174.686 28.8374V29.6692C174.686 42.1973 181.339 48.1235 195.062 48.1235C208.577 48.1235 215.179 42.1973 215.179 29.6692V28.8374C215.179 16.3093 208.577 10.3831 195.062 10.3831Z" fill="white"/>
<path d="M249.849 10.3829C236.438 10.3829 230.72 15.1135 230.72 25.9781V47.4474H240.024V26.29C240.024 20.1559 242.883 17.4527 249.849 17.4527C256.554 17.4527 259.413 20.1559 259.413 26.29V47.4474H268.718V25.9781C268.718 15.1135 263 10.3829 249.849 10.3829Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_59_282" x1="11.5396" y1="-32.0019" x2="109.247" y2="234.162" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.48" stop-color="#7A9FD6"/>
<stop offset="1" stop-color="#7A9FD6"/>
</linearGradient>
<linearGradient id="paint1_linear_59_282" x1="-23.5177" y1="29.1971" x2="226.67" y2="29.1971" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.48" stop-color="#7A9FD6"/>
<stop offset="1" stop-color="#7A9FD6"/>
</linearGradient>
<linearGradient id="paint2_linear_59_282" x1="-14.2132" y1="-92.0023" x2="83.4948" y2="174.162" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.48" stop-color="#7A9FD6"/>
<stop offset="1" stop-color="#7A9FD6"/>
</linearGradient>
<linearGradient id="paint3_linear_59_282" x1="-1.63046" y1="-1.94621" x2="67.0871" y2="113.537" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.48" stop-color="#7A9FD6"/>
<stop offset="1" stop-color="#7A9FD6"/>
</linearGradient>
</defs>
</svg>`

const LOGO_DATA_URI = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString("base64")}`

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#081C59",
          backgroundImage: "linear-gradient(135deg, #081C59 0%, #0B2A78 60%, #071C59 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_DATA_URI} width={380} height={83} alt="Zi0n" />
        <div
          style={{
            display: "flex",
            width: 140,
            height: 5,
            borderRadius: 3,
            backgroundColor: "#5EEC7D",
            marginTop: 36,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: -0.5,
          }}
        >
          Advanced Mobile Security for Android
        </div>
      </div>
    ),
    { ...size },
  )
}
