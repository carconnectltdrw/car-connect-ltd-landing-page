import { NextResponse } from "next/server"

// GET — list all projects
export async function GET() {
  const { prisma } = await import("@/lib/prisma")
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(projects)
}

// POST — create project
export async function POST(req: Request) {
  const { prisma } = await import("@/lib/prisma")
  const body = await req.json()

  const project = await prisma.Project.create({
    data: {
      title: body.title,
      status: body.type,
      poster: body.mediaUrl,
      video: body.videoUrl
    },
  })

  return NextResponse.json(project)
}
