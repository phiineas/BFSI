"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    TrendingUp,
    Shield,
    PieChart,
    Wallet,
    ArrowRight,
    CheckCircle2,
    Award,
    Target,
    BarChart3
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const investmentOptions = [
    {
        icon: TrendingUp,
        title: "Mutual Funds",
        description: "Diversified investment portfolios managed by experts",
        returns: "10-15% p.a.",
        risk: "Moderate",
        features: ["SIP starting ₹500", "Tax benefits under 80C", "Professional management"],
    },
    {
        icon: BarChart3,
        title: "Stocks & Equity",
        description: "Direct equity investments with research support",
        returns: "12-18% p.a.",
        risk: "High",
        features: ["Real-time trading", "Research reports", "Low brokerage"],
    },
    {
        icon: PieChart,
        title: "Fixed Income",
        description: "Stable returns with government and corporate bonds",
        returns: "7-9% p.a.",
        risk: "Low",
        features: ["Guaranteed returns", "Capital protection", "Regular income"],
    },
]

const insurancePlans = [
    {
        icon: Shield,
        title: "Term Life Insurance",
        description: "Comprehensive life coverage for your family",
        premium: "From ₹800/mo",
        coverage: "Up to ₹10 Cr",
        features: ["99% claim settlement", "Tax benefits", "Critical illness cover"],
    },
    {
        icon: Shield,
        title: "Health Insurance",
        description: "Cashless treatment at 10,000+ hospitals",
        premium: "From ₹2,000/mo",
        coverage: "₹5-50 Lakh",
        features: ["Cashless treatment", "No claim bonus", "Pre & post hospitalization"],
    },
    {
        icon: Wallet,
        title: "Investment Plans",
        description: "Wealth creation with insurance protection",
        premium: "From ₹5,000/mo",
        coverage: "Market-linked",
        features: ["Wealth creation", "Tax savings", "Maturity benefits"],
    },
]

export default function InvestingPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: investRef, isVisible: investVisible } = useScrollAnimation()
    const { ref: insuranceRef, isVisible: insuranceVisible } = useScrollAnimation()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
                    <div
                        ref={heroRef as React.RefObject<HTMLDivElement>}
                        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <Badge variant="secondary" className="mb-4">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                Wealth & Insurance
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Invest Today, Secure Tomorrow
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Build wealth and protect your future with our comprehensive investment and insurance solutions.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">Start Investing<ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/support">Talk to Advisor</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Investment Options</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Grow your wealth with smart investments</p>
                        </div>
                        <div
                            ref={investRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${investVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {investmentOptions.map((option, index) => (
                                <Card key={option.title} className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                                            <option.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{option.title}</CardTitle>
                                        <CardDescription>{option.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Expected Returns</span>
                                                <span className="font-semibold text-primary">{option.returns}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Risk Level</span>
                                                <Badge variant="outline">{option.risk}</Badge>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {option.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" asChild><Link href="/register">Start Investing</Link></Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Insurance Plans</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Protect what matters most</p>
                        </div>
                        <div
                            ref={insuranceRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${insuranceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {insurancePlans.map((plan, index) => (
                                <Card key={plan.title} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <plan.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{plan.title}</CardTitle>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-primary">{plan.premium}</span>
                                        </div>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Coverage</span>
                                                <span className="font-semibold text-foreground">{plan.coverage}</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" asChild><Link href="/apply/insurance">Get Quote</Link></Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Target className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">Start Your Investment Journey</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Get personalized investment advice from our certified financial planners.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/support">Book Free Consultation<ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
