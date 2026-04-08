"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ExternalLink } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const creditCards = [
  {
    id: "sapphire",
    name: "Sapphire",
    badge: "HOT SELLER",
    badgeColor: "bg-primary",
    bgGradient: "from-slate-900 via-slate-800 to-slate-900",
    image: "/images/Gemini_Generated_Image_2ntywm2ntywm2nty.png",
    bestFor: "Premium lifestyle offers",
    description: "Lounge Access | Golf Rounds | BookMyShow Offer",
    features: ["Lounge Access", "Golf Rounds", "BookMyShow Offer"],
    applyLink: "/apply/sapphire",
    detailsLink: "/products/sapphire",
  },
  {
    id: "rubyx",
    name: "Rubyx",
    badge: "EXCLUSIVE",
    badgeColor: "bg-primary",
    bgGradient: "from-red-950 via-red-900 to-red-950",
    image: "/images/card-ruby.png",
    bestFor: "High-end lifestyle perks",
    description: "Welcome Vouchers | Complimentary Golf Rounds | Lounge Access",
    features: ["Welcome Vouchers", "Complimentary Golf Rounds", "Lounge Access"],
    applyLink: "/apply/rubyx",
    detailsLink: "/products/rubyx",
  },
  {
    id: "coral",
    name: "Coral",
    badge: "POPULAR",
    badgeColor: "bg-primary",
    bgGradient: "from-orange-700 via-orange-600 to-orange-700",
    image: "/images/card-coral.png",
    bestFor: "Everyday or on-the-go",
    description: "Lounge Access | BookMyShow Offers | INOX Offers",
    features: ["Lounge Access", "BookMyShow Offers", "INOX Offers"],
    applyLink: "/apply/coral",
    detailsLink: "/products/coral",
  },
]

export function CreditCardsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="bg-background py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Credit Card
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Premium cards designed for your lifestyle with exclusive benefits and rewards
          </p>
        </div>

        {/* Credit Cards Grid */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {creditCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.bgGradient} p-6 shadow-2xl transition-all duration-700 hover:scale-105 hover:shadow-primary/20 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Badge */}
              <div className="absolute left-6 top-6 z-10">
                <span className={`${card.badgeColor} rounded-full px-3 py-1 text-xs font-bold text-white`}>
                  {card.badge}
                </span>
              </div>

              {/* Action Icons */}
              <div className="absolute right-6 top-6 z-10 flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Card Image */}
              <div className="relative mx-auto mt-8 h-64 w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-56 w-96 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={`${card.name} Credit Card`}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="mt-6 space-y-4">
                {/* Card Name */}
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                  <ExternalLink className="h-4 w-4 text-white/70" />
                </div>

                {/* Best For Badge */}
                <div className="inline-block rounded bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  BEST FOR
                </div>

                {/* Description */}
                <p className="text-sm font-medium text-white/90">{card.bestFor}</p>

                {/* Features */}
                <div className="space-y-1 text-sm text-white/80">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/60" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <button className="text-xs text-white/70 underline hover:text-white">more</button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    asChild
                    className="flex-1 bg-white/20 font-bold text-white backdrop-blur-sm hover:bg-white/30"
                  >
                    <Link href={card.applyLink}>APPLY</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-white/30 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={card.detailsLink}>DETAILS</Link>
                  </Button>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50">
                <div className={`h-full w-full bg-gradient-to-br ${card.bgGradient}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
