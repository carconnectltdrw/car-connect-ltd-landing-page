"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
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

  const currentProject = projects[index] || {
    title: "Upcoming Project",
    status: "Coming Soon",
    poster: "",
    video: "",
  }

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Upcoming Projects</h2>

        {projects.length > 0 ? (
          <div className="relative w-full max-w-3xl mx-auto aspect-[4/5] md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <div
                  className="w-full h-full rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white bg-slate-900"
                  style={{
                    backgroundImage: currentProject.poster ? `url(${currentProject.poster})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: currentProject.poster ? undefined : "#0f172a",
                  }}
                >

                  {/* Overlay for text readability - only at bottom */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent rounded-b-[2rem] md:rounded-b-[3rem] transition-opacity duration-300 ${
                      playing ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Title and status positioned over the overlay */}
                  <div
                    className={`absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-20 transition-opacity duration-300 ${
                      playing ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="space-y-2 md:space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                        {currentProject.status || "Coming Soon"}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white">
                        {currentProject.title}
                      </h3>
                    </div>
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
