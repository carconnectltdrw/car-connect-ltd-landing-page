import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "../components/store/ReduxProvider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "CarConnect Ltd ",
  description: "Carconnect Ltd - Revolutionizing Transportation and Mobility Solutions",
  generator: "CarConnect",
  icons: {
    icon: [
      {
        url: "../../public/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "../../public/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "../../public/logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
