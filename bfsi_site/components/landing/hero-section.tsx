"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Landmark, Umbrella } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const slides = [
  {
    src: "/images/skyline0.jpg",
    alt: "Blue sky with clouds",
    title: "Banking Made",
    highlight: "Simple & Secure",
    description: "Experience modern banking with competitive rates, instant approvals, and 24/7 support.",
    icon: Landmark,
    stat: { value: "2M+", label: "Happy Customers" },
  },
  {
    src: "/images/skyline2.jpeg",
    alt: "NYC skyline daytime",
    title: "Grow Your",
    highlight: "Wealth Today",
    description: "High-yield savings accounts and smart investment options to build your future.",
    icon: TrendingUp,
    stat: { value: "8.5%", label: "Max Returns" },
  },
  {
    src: "/images/skyline3.png",
    alt: "City skyline at dusk",
    title: "Loans That",
    highlight: "Work For You",
    description: "Flexible financing solutions with competitive rates and quick approvals.",
    icon: Umbrella,
    stat: { value: "24hrs", label: "Approval Time" },
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const scrollableHeight = container.offsetHeight - window.innerHeight

      // Calculate how far we've scrolled into the container
      const scrollProgress = Math.max(0, -rect.top)
      const progressRatio = Math.min(1, scrollProgress / scrollableHeight)

      // Determine which slide to show based on scroll progress
      const slideIndex = Math.min(
        slides.length - 1,
        Math.floor(progressRatio * slides.length)
      )

      setCurrentSlide(slideIndex)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const currentData = slides[currentSlide]
  const IconComponent = currentData.icon

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide
                ? "scale(1)"
                : index < currentSlide
                  ? "scale(1.05)"
                  : "scale(1.05)",
              zIndex: index === currentSlide ? 1 : 0,
            }}
          >
            <Image
              src={slide.src || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full">
          <div className="mx-auto flex h-full max-w-7xl items-center px-4 pt-16 sm:px-6 lg:px-8">
            <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text Content */}
              <div className="flex flex-col items-start">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  Trusted by 2M+ customers
                </div>

                {/* Heading with transition */}
                <div className="relative mt-6 min-h-[120px] w-full sm:min-h-[160px] lg:min-h-[180px]">
                  {slides.map((slide, index) => (
                    <h1
                      key={slide.title}
                      className="absolute inset-0 text-balance text-4xl font-bold tracking-tight text-white transition-all duration-700 sm:text-5xl lg:text-6xl"
                      style={{
                        opacity: index === currentSlide ? 1 : 0,
                        transform: index === currentSlide
                          ? "translateY(0)"
                          : index < currentSlide
                            ? "translateY(-40px)"
                            : "translateY(40px)",
                      }}
                    >
                      {slide.title}
                      <span className="block text-primary sm:inline"> {slide.highlight}</span>
                    </h1>
                  ))}
                </div>

                {/* Description with transition */}
                <div className="relative min-h-[60px] w-full max-w-lg">
                  {slides.map((slide, index) => (
                    <p
                      key={slide.description}
                      className="absolute inset-0 text-pretty text-lg leading-relaxed text-white/90 transition-all duration-700"
                      style={{
                        opacity: index === currentSlide ? 1 : 0,
                        transform: index === currentSlide
                          ? "translateY(0)"
                          : index < currentSlide
                            ? "translateY(-20px)"
                            : "translateY(20px)",
                      }}
                    >
                      {slide.description}
                    </p>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/products">
                      Explore Products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex items-center gap-8 border-t border-white/20 pt-8">
                  <div>
                    <div className="text-2xl font-bold text-white">4.9/5</div>
                    <div className="text-sm text-white/70">Rating</div>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-white/70">Uptime</div>
                  </div>
                  <div className="hidden h-10 w-px bg-white/20 sm:block" />
                  <div className="hidden sm:block">
                    <div className="text-2xl font-bold text-white">256-bit</div>
                    <div className="text-sm text-white/70">Encryption</div>
                  </div>
                </div>
              </div>

              {/* Visual Card - changes with slide */}
              <div className="relative hidden lg:block">
                <div className="relative mx-auto w-full max-w-md">
                  <div className="relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                    {/* Card header with dynamic icon */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 transition-all duration-500">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-white/70">Available Balance</div>
                        <div className="text-2xl font-bold text-white">$24,500.00</div>
                      </div>
                    </div>

                    {/* Dynamic stat based on slide */}
                    <div className="mt-6 rounded-lg bg-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">{currentData.stat.label}</span>
                        <span className="text-xl font-bold text-primary">{currentData.stat.value}</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-white/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                            <TrendingUp className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Savings Goal</div>
                            <div className="text-xs text-white/60">Emergency Fund</div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-primary">+12.5%</div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Insurance</div>
                            <div className="text-xs text-white/60">Life Coverage Active</div>
                          </div>
                        </div>
                        <div className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                          Protected
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 -top-4 z-0 h-full w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                  <div className="absolute -right-8 -top-8 -z-10 h-full w-full rounded-2xl border border-white/5 bg-white/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Slide Progress Dots - vertical on the right */}
          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? "scale-125 bg-primary"
                    : currentSlide > index
                      ? "bg-white/60"
                      : "bg-white/30"
                  }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="text-sm text-white/60">Scroll to explore</span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
              <div
                className="h-2 w-1.5 animate-bounce rounded-full bg-white/80"
                style={{ animationDuration: "1.5s" }}
              />
            </div>
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-8 right-8 hidden text-white/70 lg:block">
            <span className="text-2xl font-bold text-white">{String(currentSlide + 1).padStart(2, "0")}</span>
            <span className="mx-2">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
