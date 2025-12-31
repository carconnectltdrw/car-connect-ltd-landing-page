"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function AboutModal({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Learn More</Button>}</DialogTrigger>
      <DialogContent className="max-w-xl bg-white border-slate-100 shadow-2xl rounded-3xl p-8">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-slate-900">About CarConnect Ltd</DialogTitle>
          <DialogDescription className="text-slate-600 leading-relaxed">
            CarConnect Ltd is Kigali's premier technology-first mobility company. We bridge technology and logistics to
            solve urban transportation challenges in Rwanda.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-brand-green text-sm mb-1">Our Mission</h4>
              <p className="text-xs text-slate-600">
                To create a safe, efficient digital infrastructure for mobility across Rwanda.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-brand-blue text-sm mb-1">Our Vision</h4>
              <p className="text-xs text-slate-600">
                Becoming the most trusted partner for vehicle owners and delivery services.
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our expert team in Kigali builds platforms that prioritize security, end-to-end transparency, and
            user-centric design for everyday logistics.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
