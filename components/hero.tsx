import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AboutModal } from "./about-modal"

export function Hero() {
  return (
    <section className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row items-center overflow-hidden bg-white pt-48 lg:pt-26">
      {" "}
      {/* increased top padding to avoid navbar overlap */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full order-2 lg:order-1">
        <div className="absolute inset-0 bg-slate-100  lg:rounded-r-[10rem] overflow-hidden">
          <Image
            src="/background.png" // used the requested background illustration
            alt="Transportation and Mobility Illustration"
            fill
            className="object-cover p-2 lg:p-2  "
            priority
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-0 order-1 lg:order-2 space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-8xl font-extrabold text-slate-900 leading-[0.9] uppercase tracking-tighter pt-8">
            {" "}
            {/* increased text size and added padding */}
            CAR <br />
            <span className="text-brand-green">CONNECT</span>
          </h1>
          <div className="w-20 h-2 bg-brand-green rounded-full" />
          <p className="text-xl lg:text-2xl font-medium text-slate-600 max-w-xl">
            Smart Mobility & Secure Delivery Solutions for the modern world.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
            Leading the digital transformation of mobility and logistics in Rwanda. Simple. Secure. Smart.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 pt-4">
          <AboutModal
            trigger={
              <Button
                size="lg"
                className="bg-slate-900 text-white px-12 h-14 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Learn More
              </Button>
            }
          />
      
        </div>
      </div>
    </section>
  )
}
