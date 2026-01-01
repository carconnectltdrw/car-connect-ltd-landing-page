import Image from "next/image"

const leaders = [
  {
    name: "Promesse IRAKOZE",
    position: "Managing Director",
    image: "/promesse.jpg",
  },
  {
    name: "John Mugiraneza",
    position: "Chief Executive Officer",
    image: "/john.jpg",
  },
]

export function Leadership() {
  return (
    <section id="leaders" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col items-center text-center space-y-6 group hover:scale-[1.02] transition-transform duration-500"
            >
              <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-slate-50 relative shadow-xl group-hover:border-brand-green/20 transition-all">
                <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">{leader.name}</h3>
                <p className="text-brand-green font-bold uppercase tracking-wider text-sm">{leader.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
