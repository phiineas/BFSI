"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Wallet,
  Home,
  Car,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle2,
  Star
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  trackViewProductList,
  trackViewProductDetail,
  trackStartApplication,
  getUserSegment
} from "@/lib/analytics-events"

const categories = [
  { id: "all", name: "All Products" },
  { id: "accounts", name: "Accounts" },
  { id: "loans", name: "Loans" },
  { id: "insurance", name: "Insurance" },
]

const products = [
  {
    id: "savings-account",
    title: "Premium Savings Account",
    description: "High-interest savings with zero balance requirements and instant access to your funds.",
    icon: Wallet,
    category: "accounts",
    href: "/products/savings-account",
    highlight: "7.5% p.a.",
    rating: 4.8,
    reviews: 2840,
    popular: true,
    features: ["Zero minimum balance", "Free debit card", "Unlimited transfers", "24/7 customer support"],
    benefits: ["Earn daily interest", "No hidden charges", "Instant fund access"],
  },
  {
    id: "salary-account",
    title: "Salary Account",
    description: "Exclusive benefits for salaried professionals with premium perks and rewards.",
    icon: Wallet,
    category: "accounts",
    href: "/products/salary-account",
    highlight: "6.5% p.a.",
    rating: 4.7,
    reviews: 1520,
    popular: false,
    features: ["Salary advance", "Premium debit card", "Lounge access", "Insurance cover"],
    benefits: ["Pre-approved loans", "Exclusive offers", "Priority banking"],
  },
  {
    id: "personal-loan",
    title: "Personal Loan",
    description: "Quick personal loans with competitive rates and instant approval for your needs.",
    icon: Car,
    category: "loans",
    href: "/products/personal-loan",
    highlight: "10.5% p.a.",
    rating: 4.6,
    reviews: 3200,
    popular: true,
    features: ["Instant approval", "Minimal documentation", "Flexible tenure", "No collateral"],
    benefits: ["Up to $50,000", "EMI from $500/mo", "Quick disbursement"],
  },
  {
    id: "home-loan",
    title: "Home Loan",
    description: "Make your dream home a reality with affordable rates and expert guidance.",
    icon: Home,
    category: "loans",
    href: "/products/home-loan",
    highlight: "8.5% p.a.",
    rating: 4.9,
    reviews: 4100,
    popular: true,
    features: ["Low interest rates", "Up to 30 years tenure", "Balance transfer", "Top-up facility"],
    benefits: ["Up to $500,000", "Tax benefits", "Doorstep service"],
  },
  {
    id: "car-loan",
    title: "Car Loan",
    description: "Drive your dream car with easy financing options and quick processing.",
    icon: Car,
    category: "loans",
    href: "/products/car-loan",
    highlight: "9.5% p.a.",
    rating: 4.5,
    reviews: 1890,
    popular: false,
    features: ["100% on-road funding", "Quick approval", "Flexible EMI", "No foreclosure charges"],
    benefits: ["New & used cars", "Up to 7 years tenure", "Doorstep pickup"],
  },
  {
    id: "life-insurance",
    title: "Term Life Insurance",
    description: "Protect your family's future with comprehensive life coverage at affordable premiums.",
    icon: Shield,
    category: "insurance",
    href: "/products/life-insurance",
    highlight: "From $10/mo",
    rating: 4.8,
    reviews: 2100,
    popular: true,
    features: ["High sum assured", "Critical illness cover", "Accidental death benefit", "Tax benefits"],
    benefits: ["Up to $1M cover", "99% claim settlement", "Flexible premium"],
  },
  {
    id: "health-insurance",
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family with cashless treatment.",
    icon: Shield,
    category: "insurance",
    href: "/products/health-insurance",
    highlight: "From $25/mo",
    rating: 4.7,
    reviews: 1750,
    popular: false,
    features: ["Cashless treatment", "Pre & post hospitalization", "Day care procedures", "No room rent limit"],
    benefits: ["10,000+ hospitals", "Annual health checkup", "No claim bonus"],
  },
  {
    id: "investment-plan",
    title: "Investment Plans",
    description: "Grow your wealth with market-linked returns and guaranteed income options.",
    icon: TrendingUp,
    category: "insurance",
    href: "/products/investment-plan",
    highlight: "Up to 12% returns",
    rating: 4.6,
    reviews: 980,
    popular: false,
    features: ["Market-linked returns", "Guaranteed income", "Wealth creation", "Tax savings"],
    benefits: ["Flexible investment", "Partial withdrawal", "Maturity benefits"],
  },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory)

  // Track view_product_list on page load and category changes
  useEffect(() => {
    trackViewProductList({
      product_category: activeCategory as any,
      product_count: filteredProducts.length,
      filter_applied: activeCategory,
      user_segment: getUserSegment(),
    })
  }, [activeCategory, filteredProducts.length])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    // Tracking is handled by useEffect above
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header forceScrolled />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
                Trusted by 10M+ customers
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Choose the Right Product for You
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Explore our range of financial products designed to help you save, borrow, and protect what matters most.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-lg grid-cols-4">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Help Section */}
            <div className="mt-20 rounded-2xl bg-muted/50 p-8 sm:p-12">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">Need help choosing?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our financial experts are available 24/7 to help you find the perfect product for your needs.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <Link href="/support">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ProductCard({ product, index }: { product: typeof products[0], index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const router = useRouter()

  const handleLearnMore = () => {
    // Track view_product_detail
    trackViewProductDetail({
      product_id: product.id,
      product_name: product.title,
      product_category: product.category as any,
      product_interest_rate: product.highlight,
      product_rating: product.rating,
      is_popular: product.popular,
    })
    router.push(product.href)
  }

  const handleApplyNow = () => {
    // Track start_application (CONVERSION)
    trackStartApplication({
      product_id: product.id,
      product_name: product.title,
      product_category: product.category as any,
      application_source: 'product_card',
    })
    router.push(`/apply/${product.id}`)
  }

  return (
    <Card
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      {product.popular && (
        <div className="absolute right-4 top-4">
          <Badge className="bg-primary text-primary-foreground">Popular</Badge>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <product.icon className="h-6 w-6" />
        </div>
        <CardTitle className="mt-4 text-foreground">{product.title}</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{product.highlight}</span>
          <span className="text-sm text-muted-foreground">interest rate</span>
        </div>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Features */}
        <ul className="space-y-2 text-sm">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={handleLearnMore}
            className="flex-1 bg-transparent"
          >
            Learn More
          </Button>
          <Button
            onClick={handleApplyNow}
            className="flex-1"
          >
            Apply Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
