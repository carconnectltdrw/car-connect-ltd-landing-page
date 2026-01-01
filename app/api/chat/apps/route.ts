import { NextResponse } from "next/server"

export async function GET() {
  const { prisma } = await import("@/lib/prisma")
  const apps = await prisma.app.findMany()
  return NextResponse.json(apps)
}

export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma")
  const data = await req.json()

  const app = await prisma.app.create({
    data,
  })

  return NextResponse.json(app)
}
