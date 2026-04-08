"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Home,
    Car,
    Briefcase,
    CreditCard,
    Calculator,
    ArrowRight,
    CheckCircle2,
    TrendingDown,
    Clock,
    Shield
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const loanProducts = [
    {
        icon: Home,
        title: "Home Loan",
        description: "Make your dream home a reality with our lowest interest rates",
        rate: "From 8.5% p.a.",
        amount: "Up to ₹5 Crore",
        tenure: "Up to 30 years",
        features: ["Zero prepayment charges", "Tax benefits", "Doorstep service"],
        href: "/products/home-loan",
        popular: true
    },
    {
        icon: Briefcase,
        title: "Personal Loan",
        description: "Quick personal loans for all your needs",
        rate: "From 10.5% p.a.",
        amount: "Up to ₹50 Lakh",
        tenure: "1-5 years",
        features: ["Instant approval", "Minimal documentation", "No collateral"],
        href: "/products/personal-loan",
        popular: true
    },
    {
        icon: Car,
        title: "Car Loan",
        description: "Drive your dream car with easy financing",
        rate: "From 9.5% p.a.",
        amount: "Up to ₹1 Crore",
        tenure: "1-7 years",
        features: ["100% on-road funding", "Quick approval", "Flexible EMI"],
        href: "/products/car-loan",
        popular: false
    },
]

const creditCards = [
    {
        title: "Platinum Credit Card",
        description: "Premium rewards and exclusive benefits",
        features: ["5% cashback on all spends", "Airport lounge access", "No annual fee"],
        highlight: "Best for Rewards"
    },
    {
        title: "Travel Credit Card",
        description: "Designed for frequent travelers",
        features: ["10X reward points on travel", "Complimentary travel insurance", "Forex markup waiver"],
        highlight: "Best for Travel"
    },
    {
        title: "Cashback Credit Card",
        description: "Maximum cashback on everyday spends",
        features: ["Unlimited cashback", "No minimum spend", "Instant approval"],
        highlight: "Best for Cashback"
    },
]

const benefits = [
    "Competitive interest rates",
    "Quick approval process",
    "Flexible repayment options",
    "Minimal documentation",
    "No hidden charges",
    "Balance transfer facility",
    "Top-up loan available",
    "Dedicated loan advisor",
]

export default function BorrowingPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: loansRef, isVisible: loansVisible } = useScrollAnimation()
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
                    <div
                        ref={heroRef as React.RefObject<HTMLDivElement>}
                        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <Badge variant="secondary" className="mb-4">
                                <TrendingDown className="mr-1 h-3 w-3" />
                                Cards & Loans
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Borrow Smart, Live Better
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Get instant access to credit with our competitive loan rates and premium credit cards.
                                Flexible terms, quick approvals, and transparent pricing.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/products">
                                        Explore Loans
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="#calculator">
                                        <Calculator className="mr-2 h-4 w-4" />
                                        EMI Calculator
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Loan Products */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Loan Products</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Choose from our range of competitive loan products
                            </p>
                        </div>
                        <div
                            ref={loansRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${loansVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {loanProducts.map((loan, index) => (
                                <Card
                                    key={loan.title}
                                    className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {loan.popular && (
                                        <div className="absolute top-4 right-4">
                                            <Badge>Popular</Badge>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                                            <loan.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{loan.title}</CardTitle>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-primary">{loan.rate}</span>
                                        </div>
                                        <CardDescription>{loan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Loan Amount</span>
                                                <span className="font-semibold text-foreground">{loan.amount}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Tenure</span>
                                                <span className="font-semibold text-foreground">{loan.tenure}</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {loan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-3">
                                            <Button variant="outline" className="flex-1" asChild>
                                                <Link href={loan.href}>Details</Link>
                                            </Button>
                                            <Button className="flex-1" asChild>
                                                <Link href={`/apply/${loan.title.toLowerCase().replace(/ /g, '-')}`}>Apply</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Credit Cards */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Credit Cards</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Premium credit cards with exclusive rewards and benefits
                            </p>
                        </div>
                        <div
                            ref={cardsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {creditCards.map((card, index) => (
                                <Card
                                    key={card.title}
                                    className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                                            <CreditCard className="h-6 w-6 text-primary" />
                                        </div>
                                        <Badge variant="outline" className="w-fit">{card.highlight}</Badge>
                                        <CardTitle className="mt-2">{card.title}</CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 mb-6">
                                            {card.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" asChild>
                                            <Link href="/apply/credit-card">Apply Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Why Borrow from SecureBank?</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    We offer the most competitive rates with transparent terms and quick approvals.
                                </p>
                                <div className="mt-8 flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/products">View All Products</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/support">Talk to Expert</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Clock className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">
                            Get Instant Loan Approval
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Apply online and get approval in minutes. Funds disbursed within 24 hours.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/products">
                                Apply for Loan
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
