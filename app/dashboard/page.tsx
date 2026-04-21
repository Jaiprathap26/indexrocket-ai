"use client"
import { useState } from "react"

type IndexResult = { url: string; status: string; submittedAt: string; indexedAt?: string }

export default function IndexDashboard() {
  const [urls, setUrls] = useState("")
  const [results, setResults] = useState<IndexResult[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"single" | "bulk">("single")

  const handleSubmit = async () => {
    const urlList = urls.split("\n").map(u => u.trim()).filter(Boolean)
    if (!urlList.length) return
    setLoading(true)
    try {
      const res = await fetch("/api/index-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      })
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults(urlList.map(url => ({ url, status: "error", submittedAt: new Date().toISOString() })))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">🚀</div>
        <span className="font-bold text-xl">IndexRocket.ai</span>
        <span className="text-gray-500 ml-2">/ Dashboard</span>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">URL Indexing Dashboard</h1>
        <p className="text-gray-400 mb-8">Submit URLs to Google Indexing API. Average index time: 4.2 minutes.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex gap-4 mb-6">
            {["single", "bulk"].map(m => (
              <button key={m} onClick={() => setMode(m as "single" | "bulk")}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${mode === m ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
                {m === "single" ? "Single URL" : "Bulk / Sitemap"}
              </button>
            ))}
          </div>
          {mode === "single" ? (
            <input value={urls} onChange={(e) => setUrls(e.target.value)}
              placeholder="https://yoursite.com/new-blog-post"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 mb-4" />
          ) : (
            <textarea value={urls} onChange={(e) => setUrls(e.target.value)}
              placeholder={"https://yoursite.com/page-1\nhttps://yoursite.com/page-2\nhttps://yoursite.com/page-3"}
              rows={6} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none mb-4" />
          )}
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-900 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Submitting to Google...</> : "🚀 Submit to Google Indexing API"}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-4">Indexing Results</h2>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className="bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white font-mono truncate max-w-xs">{r.url}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {new Date(r.submittedAt).toLocaleTimeString()}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    r.status === "submitted" ? "bg-blue-900 text-blue-300" :
                    r.status === "indexed" ? "bg-green-900 text-green-300" :
                    "bg-red-900 text-red-300"
                  }`}>
                    {r.status === "submitted" ? "⏳ Submitted" : r.status === "indexed" ? "✅ Indexed" : "❌ Error"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}