import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const apps = await prisma.app.findMany()
  return NextResponse.json(apps)
}

export async function POST(req: Request) {
  const data = await req.json()

  const app = await prisma.app.create({
    data,
  })

  return NextResponse.json(app)
}
