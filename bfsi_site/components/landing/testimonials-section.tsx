"use client"

import React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Business Owner",
    content: "SecureBank made getting a business loan incredibly simple. The entire process took less than 48 hours, and the rates were very competitive.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    content: "I've been using their savings account for over 2 years now. The interest rates are excellent, and the mobile app is super intuitive.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Healthcare Professional",
    content: "Their insurance plans provided exactly the coverage my family needed. The claims process was hassle-free and quick.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 })

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
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers have to say about their experience with SecureBank.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className={`border-border bg-background transition-all duration-700 hover:shadow-md ${
                gridVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
