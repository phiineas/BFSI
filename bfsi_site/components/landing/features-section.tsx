"use client"

import React from "react"

import { Shield, Clock, Smartphone, HeadphonesIcon, Lock, TrendingUp } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "256-bit encryption and multi-factor authentication protect your data and transactions at all times.",
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Get loan approvals in minutes, not days. Our automated systems work 24/7 to serve you faster.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage your finances on the go with our award-winning mobile app available on iOS and Android.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is always available to help you with any questions or concerns.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description: "Your financial data stays yours. We never sell your information to third parties.",
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "AI-powered analytics help you understand spending patterns and optimize your savings.",
  },
]

export function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section className="bg-card py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            headerVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose SecureBank?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We combine cutting-edge technology with traditional banking values to deliver an exceptional experience.
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl border border-border bg-background p-8 transition-all duration-700 hover:border-primary/20 hover:shadow-md ${
                gridVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
