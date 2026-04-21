import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "IndexRocket.ai — Get Your Pages Indexed by Google in Minutes",
  description: "Submit any URL to Google Indexing API instantly. Track indexing status in real-time. Bulk index entire sitemaps. Used by 3,000+ SEO professionals.",
  keywords: "google indexing api, fast indexing, instant index, SEO tool, index checker",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={inter.className}>{children}</body></html>)
}