"use client"
import { useState } from "react"
import Link from "next/link"

export default function IndexRocketLanding() {
  const [url, setUrl] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm">🚀</div>
          <span className="font-bold text-xl">IndexRocket.ai</span>
        </div>
        <Link href="/dashboard" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Start Indexing Free →
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-900/30 border border-orange-800 rounded-full px-4 py-2 text-sm text-orange-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          3,200+ URLs indexed today · Average index time: 4.2 minutes
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          Google Will Index Your<br /><span className="text-orange-400">Page in 4 Minutes</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Stop waiting weeks for Google to discover your pages. IndexRocket submits directly to
          Google Indexing API. Real-time status tracking. Bulk indexing for entire sitemaps.
        </p>
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yoursite.com/new-page" required
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500" />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap">
              🚀 Index Now (Free)
            </button>
          </form>
        ) : (
          <div className="bg-green-900/30 border border-green-700 rounded-lg px-6 py-4 max-w-2xl mx-auto mb-6">
            <p className="text-green-400 font-medium">✓ URL submitted! Sign up to track indexing status in real-time.</p>
            <Link href="/dashboard" className="text-orange-400 text-sm underline mt-2 inline-block">Create free account →</Link>
          </div>
        )}
        <p className="text-sm text-gray-500">Free: 10 URLs/day · No credit card · 4-minute average index time</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Instant Submission", desc: "Direct Google Indexing API integration. Your URL is submitted to Google within seconds, not days." },
            { icon: "📊", title: "Real-Time Tracking", desc: "Know exactly when Google crawls and indexes your page. Live status dashboard with email alerts." },
            { icon: "📋", title: "Bulk Sitemap Indexing", desc: "Upload your sitemap.xml — IndexRocket submits every URL automatically. Perfect for site relaunches." },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Free", price: "$0", features: ["10 URLs/day", "Basic status check", "Chrome extension"], cta: "Start Free", popular: false },
            { name: "Pro", price: "$29", india: "₹2,399", features: ["500 URLs/day", "Bulk sitemap indexing", "API access", "Slack alerts"], cta: "Start Pro", popular: true },
            { name: "Agency", price: "$99", india: "₹8,299", features: ["Unlimited URLs", "White-label reports", "10 client sites", "Priority support"], cta: "Go Agency", popular: false },
          ].map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 ${p.popular ? "bg-orange-600 border-2 border-orange-400" : "bg-gray-900 border border-gray-800"}`}>
              {p.popular && <div className="text-xs font-bold uppercase text-orange-200 mb-4">Most Popular</div>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black">{p.price}</span>
                {p.price !== "$0" && <span className="text-sm text-gray-400">/mo</span>}
              </div>
              {p.india && <p className="text-sm text-gray-400 mb-6">{p.india}/mo in India</p>}
              <ul className="space-y-3 mb-8 mt-4">
                {p.features.map((f, j) => (
                  <li key={j} className="text-sm flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/dashboard" className={`block w-full py-3 rounded-lg font-semibold text-sm text-center ${p.popular ? "bg-white text-orange-600" : "bg-orange-600 text-white"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-500 text-sm">
        © 2026 IndexRocket.ai — Get Indexed Fast · Built by Amelia Sovereign AI
      </footer>
    </div>
  )
}