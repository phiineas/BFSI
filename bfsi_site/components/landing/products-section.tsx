"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Wallet, Home, Car, Shield } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const products = [
  {
    title: "Savings Accounts",
    description: "Grow your money with high-interest savings accounts. Earn up to 7.5% p.a. with zero balance requirements.",
    icon: Wallet,
    href: "/products/savings-accounts",
    highlight: "Up to 7.5% p.a.",
    features: ["Zero balance account", "Instant transfers", "No hidden fees"],
  },
  {
    title: "Personal Loans",
    description: "Quick personal loans with competitive rates. Get approved in minutes with minimal documentation.",
    icon: Car,
    href: "/products/personal-loans",
    highlight: "Starting 10.5% p.a.",
    features: ["Instant approval", "Flexible EMI", "No collateral"],
  },
  {
    title: "Home Loans",
    description: "Make your dream home a reality with our affordable home loan solutions and expert guidance.",
    icon: Home,
    href: "/products/home-loans",
    highlight: "Starting 8.5% p.a.",
    features: ["Low interest rates", "Up to 30 years tenure", "Balance transfer"],
  },
  {
    title: "Insurance Plans",
    description: "Protect what matters most with comprehensive life and health insurance coverage.",
    icon: Shield,
    href: "/products/insurance",
    highlight: "From $10/month",
    features: ["Life insurance", "Health coverage", "Family plans"],
  },
]

export function ProductsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 })

  return (
    <section className="bg-muted/30 py-20 sm:py-28 overflow-hidden">
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
            Financial Products for Every Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From savings to loans and insurance, we have everything you need to manage your finances effectively.
          </p>
        </div>

        {/* Products Grid */}
        <div 
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <Card 
              key={product.title} 
              className={`group relative overflow-hidden transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                gridVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <product.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-foreground">{product.title}</CardTitle>
                <div className="text-sm font-semibold text-primary">{product.highlight}</div>
                <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" asChild className="mt-6 w-full justify-between group-hover:text-primary">
                  <Link href={product.href}>
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            gridVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
