"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DownloadModal } from "./download-modal"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 h-28 flex items-center", // increased height to 28
        isScrolled
          ? "bg-[#30a648]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-white/90 backdrop-blur-md border-b border-black/5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
     
          <Image
   src="/logo.png"
  alt="CarConnect Ltd"
  width={110}
  height={30}
  priority
/>

        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: "Home", id: "/" },
          
            { name: "About", id: "about" },
              { name: "Services", id: "features" },
            { name: "Contact Us", id: "contact" }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.id) {
                  const element = document.getElementById(item.id)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className={cn(
                "text-[13px] font-bold transition-all uppercase tracking-[0.15em]",
                isScrolled ? "text-white hover:text-white/70" : "text-slate-800 hover:text-brand-green",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <DownloadModal
              trigger={
                <Button
                  className={cn(
                    "rounded-full px-8 h-11 transition-all font-bold text-xs uppercase tracking-widest",
                    isScrolled
                      ? "bg-white text-[#30a648] hover:bg-white/90"
                      : "bg-[#30a648] text-white hover:bg-[#30a648]/90",
                  )}
                >
                  Download App
                </Button>
              }
            />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-white" : "text-slate-900")}>
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#30a648]/95 backdrop-blur-xl border-none p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full pt-20 px-8 space-y-8">
                  {[
                    { name: "Home", id: "/" },
                    
                    { name: "About", id: "about" },
                    { name: "Services", id: "features" },
                    { name: "Contact Us", id: "contact" }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (item.id) {
                          const element = document.getElementById(item.id)
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" })
                          }
                        } else {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        // Close the sheet
                        const closeButton = document.querySelector('[data-radix-collection-item]') as HTMLElement
                        closeButton?.click()
                      }}
                      className="text-white text-2xl font-bold uppercase tracking-widest hover:text-white/70 transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="pt-8">
                    <DownloadModal
                      trigger={
                        <Button className="w-full bg-white text-[#30a648] rounded-full h-14 font-bold uppercase tracking-widest">
                          Download App
                        </Button>
                      }
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
