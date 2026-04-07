import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("API route received:", body)

    const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
    console.log("Backend URL:", backendBaseUrl)

    if (!backendBaseUrl) {
      return NextResponse.json(
        { reply: "AI backend is not configured. Please set NEXT_PUBLIC_API_URL or API_URL." },
        { status: 500 },
      )
    }

    const response = await fetch(`${backendBaseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    console.log("Backend response status:", response.status)

    const data = await response.json()
    console.log("Backend response data:", data)

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("/api/chat error:", error)
    return NextResponse.json(
      { reply: "Sorry, the assistant is temporarily unavailable. Please try again later." },
      { status: 500 },
    )
  }
}
