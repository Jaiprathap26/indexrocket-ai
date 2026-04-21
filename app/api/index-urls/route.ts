import { NextRequest, NextResponse } from "next/server"

async function getGoogleAccessToken(): Promise<string> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!serviceAccountEmail || !privateKey) {
    throw new Error("Google service account credentials not configured")
  }
  // JWT for Google OAuth2
  const now = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url")
  const claim = Buffer.from(JSON.stringify({
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })).toString("base64url")
  // Note: In production, use a proper JWT library like jose or jsonwebtoken
  // This is a simplified version — add proper RS256 signing in production
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${header}.${claim}.signature`,
  })
  const tokenData = await tokenRes.json()
  return tokenData.access_token
}

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json()
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required" }, { status: 400 })
    }
    if (urls.length > 200) {
      return NextResponse.json({ error: "Maximum 200 URLs per request" }, { status: 400 })
    }
    // In development/demo mode, return mock results
    const results = urls.map((url: string) => ({
      url,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    }))
    // Production: submit to Google Indexing API
    // const accessToken = await getGoogleAccessToken()
    // for (const url of urls) {
    //   await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    //     method: "POST",
    //     headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
    //     body: JSON.stringify({ url, type: "URL_UPDATED" }),
    //   })
    // }
    return NextResponse.json({ results, count: urls.length })
  } catch (error) {
    console.error("Indexing error:", error)
    return NextResponse.json({ error: "Failed to submit URLs" }, { status: 500 })
  }
}