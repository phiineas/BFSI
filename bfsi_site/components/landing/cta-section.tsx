"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="bg-muted/30 py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 sm:px-16 sm:py-20 transition-all duration-1000 ${
            isVisible 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-10">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/50 blur-3xl" />
          </div>

          <div 
            className={`mx-auto max-w-2xl text-center transition-all duration-700 delay-300 ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="mt-4 text-lg text-background/80">
              Join over 2 million customers who trust SecureBank with their finances. 
              Open an account in minutes and experience banking reimagined.
            </p>
            <div 
              className={`mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-500 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/products">
                  Open an Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-background/20 text-background hover:bg-background/10 hover:text-background bg-transparent"
              >
                <Link href="/support">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
