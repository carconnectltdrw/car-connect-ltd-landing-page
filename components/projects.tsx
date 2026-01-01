"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/projects`)
      .then((res) => res.json())
      .then(setProjects)
  }, [])

  useEffect(() => {
    if (index >= projects.length && projects.length > 0) {
      setIndex(0)
    }
  }, [projects, index])

  const next = () => {
    if (projects.length > 0) {
      setIndex((prev) => (prev + 1) % projects.length)
    }
  }
  const prev = () => {
    if (projects.length > 0) {
      setIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }
  }

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Upcoming Projects</h2>

        {projects.length > 0 ? (
          <div className="relative max-w-lg mx-auto h-[450px] perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full h-full"
              >
                <div
                  className={`w-full h-full rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white`}
                  style={{
                    backgroundImage: projects[index].poster ? `url(${projects[index].poster})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-black/40 rounded-[3rem]" />
                  
                  {projects[index].video && playing && (
                    <video
                      src={projects[index].video}
                      className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
                      controls
                      autoPlay
                      onEnded={() => setPlaying(false)}
                    />
                  )}
                  
                  <div className="space-y-2 relative z-10">
                    <span className="text-xs font-black uppercase tracking-widest text-white/80">
                      {projects[index].status}
                    </span>
                    <h3 className="text-4xl font-black leading-tight">{projects[index].title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <div 
                      className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-brand-green transition-all cursor-pointer"
                      onClick={() => {
                        if (projects[index].video) {
                          setPlaying(true)
                        }
                      }}
                    >
                      <Play size={24} className="fill-current ml-1" />
                    </div>
                    <span className="text-lg font-bold">
                      {projects[index].video ? "Play Video"   : ""}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 -left-20 hidden md:block">
              <Button variant="ghost" size="icon" onClick={prev} className="rounded-full w-12 h-12 bg-slate-50 shadow-md">
                <ChevronLeft size={24} />
              </Button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-20 hidden md:block">
              <Button variant="ghost" size="icon" onClick={next} className="rounded-full w-12 h-12 bg-slate-50 shadow-md">
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <Button variant="outline" size="sm" onClick={prev}>
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={next}>
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
