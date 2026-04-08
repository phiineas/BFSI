"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Smartphone,
    Globe,
    Shield,
    Zap,
    QrCode,
    Bell,
    BarChart3,
    Lock,
    ArrowRight,
    CheckCircle2,
    Download,
    Fingerprint,
    CreditCard
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const mobileFeatures = [
    {
        icon: Fingerprint,
        title: "Biometric Login",
        description: "Secure login with fingerprint and face recognition",
    },
    {
        icon: QrCode,
        title: "UPI Payments",
        description: "Instant UPI payments with QR code scanning",
    },
    {
        icon: Bell,
        title: "Real-time Alerts",
        description: "Get instant notifications for all transactions",
    },
    {
        icon: BarChart3,
        title: "Expense Tracking",
        description: "AI-powered insights into your spending patterns",
    },
]

const webFeatures = [
    {
        icon: CreditCard,
        title: "Fund Transfers",
        description: "NEFT, RTGS, IMPS, and international transfers",
    },
    {
        icon: BarChart3,
        title: "Account Management",
        description: "View statements, download reports, and manage accounts",
    },
    {
        icon: Shield,
        title: "Bill Payments",
        description: "Pay utility bills, credit cards, and set auto-pay",
    },
    {
        icon: Zap,
        title: "Investment Portal",
        description: "Trade stocks, mutual funds, and manage portfolio",
    },
]

const securityFeatures = [
    "256-bit SSL encryption",
    "Two-factor authentication",
    "Biometric verification",
    "Session timeout protection",
    "Device binding",
    "Transaction limits",
    "Fraud detection AI",
    "Secure OTP delivery",
]

export default function OnlineBankingPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: mobileRef, isVisible: mobileVisible } = useScrollAnimation()
    const { ref: webRef, isVisible: webVisible } = useScrollAnimation()

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
                                <Smartphone className="mr-1 h-3 w-3" />
                                Banking Made Easy
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Bank Anytime, Anywhere
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Experience seamless digital banking with our award-winning mobile app and web platform.
                                Secure, fast, and available 24/7.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="#download">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download App
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/login">
                                        <Globe className="mr-2 h-4 w-4" />
                                        Web Banking
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Mobile Banking Features</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Complete banking in your pocket</p>
                        </div>
                        <div
                            ref={mobileRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${mobileVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {mobileFeatures.map((feature, index) => (
                                <Card key={feature.title} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                            <feature.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Internet Banking Features</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Powerful web platform for all your banking needs</p>
                        </div>
                        <div
                            ref={webRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${webVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {webFeatures.map((feature, index) => (
                                <Card key={feature.title} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                            <feature.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Lock className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Bank-Grade Security</h2>
                                </div>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Your security is our top priority. We use military-grade encryption and multi-layer
                                    security protocols to protect your data.
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" asChild><Link href="/register">Get Started</Link></Button>
                                    <Button size="lg" variant="outline" asChild><Link href="/about">Learn More</Link></Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {securityFeatures.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="download" className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">Download Our Mobile App</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Available on iOS and Android. Rated 4.8/5 by 1M+ users.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" asChild>
                                <Link href="#">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for iOS
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="#">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download for Android
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
