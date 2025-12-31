"use client"

import type React from "react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ServiceModalProps {
  trigger?: React.ReactNode
  title: string
  description: string
  image: string
  features: string[]
  benefits: string[]
}

export function ServiceModal({ trigger, title, description, image, features, benefits }: ServiceModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-white border-slate-100 shadow-2xl rounded-3xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-slate-900 text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {/* Service Image */}
          <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Description */}
          <DialogDescription className="text-slate-600 leading-relaxed mb-6 text-base">
            {description}
          </DialogDescription>

          {/* Features and Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-brand-green text-lg mb-3">Key Features</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-blue text-lg mb-3">Benefits</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-600 text-center">
              Ready to get started? Download our app or contact our team for enterprise solutions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}