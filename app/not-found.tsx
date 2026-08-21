import Link from "next/link"

export default function NotFound() {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#071C59] to-[#0a2a7a] px-4 text-center">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <p className="text-lg text-white/70">Page not found</p>
          <Link href="/" className="text-[#5EEC7D] hover:underline">
            Back to home
          </Link>
        </div>
      </body>
    </html>
  )
}
