import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ReduxProvider } from "../components/store/ReduxProvider"
import { LanguageProvider } from "../contexts/LanguageContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "CarConnnect",
  description:
    "MuvCar by Carconnect Ltd is a smart platform for car rental and car sharing in Rwanda. Rent cars in Kigali or list your own vehicle easily with CarconnectLtd.",
  keywords: [
    "MuvCar",
    "Carconnect Ltd",
    "CarconnectLtd",
    "car rental Rwanda",
    "rent car Kigali",
    "car sharing Rwanda",
    "list your car Rwanda",
  ],
  metadataBase: new URL("https://getcarconnect.com"),
  openGraph: {
    title: "MuvCar by Carconnect Ltd | Rent & List Cars in Rwanda",
    description:
      "Carconnect Ltd presents MuvCar — the easiest way to rent cars or list your own in Kigali and across Rwanda. Fast, simple, and reliable.",
    url: "https://getcarconnect.com",
    type: "website",
  },
  generator: "CarConnect",
  icons: {
    icon: "/logo.png",
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
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
