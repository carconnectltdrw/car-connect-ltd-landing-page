import { FAQS } from "../../components/faq-data"

export async function POST(req: Request) {
  const { message } = await req.json()
  const text = message.toLowerCase()

  for (const f of FAQS) {
    if (f.q.some(k => text.includes(k))) {
      return Response.json({ found:true, answer:f.a })
    }
  }

  return Response.json({ found:false })
}
