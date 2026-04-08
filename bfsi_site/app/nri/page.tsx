"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Globe,
    Wallet,
    TrendingUp,
    Send,
    Home,
    ArrowRight,
    CheckCircle2,
    DollarSign,
    Plane,
    Shield
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const nriAccounts = [
    {
        icon: Wallet,
        title: "NRE Account",
        description: "Non-Resident External Account for repatriable funds",
        features: ["Tax-free interest", "Fully repatriable", "Joint account with resident"],
        highlight: "Most Popular"
    },
    {
        icon: Home,
        title: "NRO Account",
        description: "Non-Resident Ordinary Account for Indian income",
        features: ["Manage Indian income", "Partial repatriation", "Higher interest rates"],
        highlight: "For Indian Income"
    },
    {
        icon: TrendingUp,
        title: "FCNR Account",
        description: "Foreign Currency Non-Resident Account",
        features: ["No currency risk", "Tax-free interest", "Multiple currencies"],
        highlight: "Foreign Currency"
    },
]

const services = [
    {
        icon: Send,
        title: "Money Transfer",
        description: "Fast and secure international remittances with competitive forex rates",
    },
    {
        icon: TrendingUp,
        title: "Investment Options",
        description: "Invest in Indian markets with mutual funds, stocks, and bonds",
    },
    {
        icon: Home,
        title: "Home Loans",
        description: "Special home loan schemes for NRIs with attractive interest rates",
    },
    {
        icon: Shield,
        title: "Insurance",
        description: "Life and health insurance plans designed for NRIs",
    },
]

export default function NRIPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: accountsRef, isVisible: accountsVisible } = useScrollAnimation()
    const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation()

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
                                <Globe className="mr-1 h-3 w-3" />
                                NRI Services & Transfers
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Banking for Indians Worldwide
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Comprehensive NRI banking services with seamless money transfers, investment options, and dedicated support.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">Open NRI Account<ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/support">Talk to NRI Expert</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">NRI Account Types</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Choose the right account for your needs</p>
                        </div>
                        <div
                            ref={accountsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${accountsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {nriAccounts.map((account, index) => (
                                <Card key={account.title} className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardHeader>
                                        <div className="absolute top-4 right-4"><Badge>{account.highlight}</Badge></div>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                                            <account.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{account.title}</CardTitle>
                                        <CardDescription>{account.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 mb-6">
                                            {account.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full" asChild><Link href="/register">Open Account</Link></Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">NRI Services</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Complete banking solutions for NRIs</p>
                        </div>
                        <div
                            ref={servicesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {services.map((service, index) => (
                                <Card key={service.title} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                            <service.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">{service.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Plane className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">Dedicated NRI Support</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            24/7 customer support with dedicated NRI relationship managers.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/register">Get Started<ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
