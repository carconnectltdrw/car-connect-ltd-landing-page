import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const leaders = [
  {
    name: "Promesse IRAKOZE",
    position: "Chief Executive Officer CEO",
    image: "/promesse.jpeg",
    bio: "Am  talented software engineer with extensive experience in full-stack development. am specializes in modern web technologies and I have led in multiple successful projects in the fintech and transportation sectors. As CEO, am combining my technical expertise with strategic vision to drive innovation at CarConnect Ltd.",
    role: "Software Engineer",
    expertise: ["Full-Stack Development", "React", "Node.js", "System Architecture"]
  },
  {
    name: "John Mugiraneza",
    position: "Chairman of the Board",
    image: "/john.jpeg",
    bio: "Am Senior Software Engineer with over a decade of experience in software development and team leadership. am expertise spans across multiple programming languages and frameworks, with a particular focus on scalable systems and cloud architecture. As Chairman, am providing strategic guidance while continuing to contribute technically to key projects.",
    role: "Senior Software Engineer",
    expertise: ["System Architecture", "Cloud Computing", "Team Leadership", "Python", "JavaScript"]
  },
]

export function Leadership() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <section id="leaders" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Our Team</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {leaders.map((leader, i) => (
            <Dialog key={i} open={openModal === leader.name} onOpenChange={(open) => setOpenModal(open ? leader.name : null)}>
              <DialogTrigger asChild>
                <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col items-center text-center space-y-6 group hover:scale-[1.02] transition-all duration-500 cursor-pointer hover:shadow-2xl">
                  <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-slate-50 relative shadow-xl group-hover:border-brand-green/20 transition-all duration-500 group-hover:shadow-2xl">
                    <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-brand-green transition-colors duration-300">{leader.name}</h3>
                    <p className="text-brand-green font-bold uppercase tracking-wider text-xs md:text-sm">{leader.position}</p>
                    <p className="text-slate-600 font-medium text-sm mt-2">{leader.role}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-sm md:max-w-md mx-4 bg-white border-2 border-brand-green/20 shadow-2xl" showCloseButton={true}>
                <div className="space-y-4 p-4 md:p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-brand-green/20 relative shadow-lg mx-auto mb-4">
                      <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
                    </div>
                    <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2">{leader.name}</h4>
                    <p className="text-brand-green font-semibold text-sm mb-1">{leader.position}</p>
                    <p className="text-slate-600 font-medium text-sm">{leader.role}</p>
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm leading-relaxed text-center">{leader.bio}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm mb-3 text-center">Technical Expertise:</h5>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {leader.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-brand-green/10 text-brand-green px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-brand-green/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
