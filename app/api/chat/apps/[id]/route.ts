import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: any }) {
  const { prisma } = await import("@/lib/prisma")
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams?.id)
    if (Number.isNaN(id)) {
      console.error('Invalid app id:', resolvedParams?.id)
      return NextResponse.json({ error: 'Invalid app id' }, { status: 400 })
    }

    console.log('Deleting app with id:', id)

    const deletedApp = await prisma.app.delete({
      where: { id }
    })

    console.log('App deleted successfully:', deletedApp)
    return NextResponse.json({ success: true, deleted: deletedApp })
  } catch (error: any) {
    console.error('Error deleting app:', error)
    const message = error?.message ?? 'Failed to delete app'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}