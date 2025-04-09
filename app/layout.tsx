import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Montserrat, Bitter } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import { CanonicalClient } from "@/components/canonical-client"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <title>Trek Snout | Rehoming Dogs with Heart</title>
        <meta name="description" content="Responsible dog rehoming made simple and compassionate." />
        <meta name="theme-color" content="#0A1921" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://treksnout.com/" />
        <meta property="og:title" content="Trek Snout | Rehoming Dogs with Heart" />
        <meta property="og:description" content="Responsible dog rehoming made simple and compassionate." />
        <meta property="og:image" content="https://treksnout.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Trek Snout" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://treksnout.com/" />
        <meta property="twitter:title" content="Trek Snout | Rehoming Dogs with Heart" />
        <meta property="twitter:description" content="Responsible dog rehoming made simple and compassionate." />
        <meta property="twitter:image" content="https://treksnout.com/images/twitter-image.jpg" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script src="/js/viewport-fix.js" async></script>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased selection:bg-accent/30", montserrat.variable, bitter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navigation />
            <CanonicalClient />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}