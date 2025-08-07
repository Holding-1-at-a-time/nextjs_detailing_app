import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ConvexProvider } from "@/components/convex-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoDetail Pro - Professional Auto Detailing Services",
  description: "Get personalized auto detailing quotes with our comprehensive vehicle assessment system. Professional exterior and interior detailing services.",
  keywords: "auto detailing, car wash, paint correction, ceramic coating, interior cleaning",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexProvider>
          {children}
          <Toaster position="top-right" />
        </ConvexProvider>
      </body>
    </html>
  )
}
