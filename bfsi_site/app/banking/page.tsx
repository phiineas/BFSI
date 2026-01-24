"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Wallet,
    CreditCard,
    Smartphone,
    Shield,
    Zap,
    Globe,
    ArrowRight,
    CheckCircle2,
    Lock,
    Clock,
    TrendingUp,
    Users
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const accountTypes = [
    {
        icon: Wallet,
        title: "Savings Account",
        description: "High-interest savings with zero balance requirements",
        rate: "7.5% p.a.",
        features: ["Zero minimum balance", "Free debit card", "Unlimited transfers"],
        href: "/products/savings-account"
    },
    {
        icon: Users,
        title: "Salary Account",
        description: "Exclusive benefits for salaried professionals",
        rate: "6.5% p.a.",
        features: ["Salary advance", "Premium card", "Lounge access"],
        href: "/products/salary-account"
    },
    {
        icon: TrendingUp,
        title: "Fixed Deposit",
        description: "Guaranteed returns with flexible tenure options",
        rate: "8.5% p.a.",
        features: ["Flexible tenure", "Loan against FD", "Auto-renewal"],
        href: "/products/fixed-deposit"
    },
]

const digitalFeatures = [
    {
        icon: Smartphone,
        title: "Mobile Banking",
        description: "Complete banking on your smartphone with biometric security",
    },
    {
        icon: Globe,
        title: "Internet Banking",
        description: "Access your accounts anytime, anywhere with our web platform",
    },
    {
        icon: CreditCard,
        title: "Digital Payments",
        description: "UPI, NEFT, RTGS, and international transfers at your fingertips",
    },
    {
        icon: Lock,
        title: "Bank-Grade Security",
        description: "256-bit encryption and multi-factor authentication",
    },
]

const benefits = [
    "24/7 customer support",
    "Free ATM withdrawals nationwide",
    "Instant account opening",
    "Paperless banking",
    "Real-time notifications",
    "Automatic bill payments",
    "Personalized financial insights",
    "Branch network across India",
]

export default function BankingPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: accountsRef, isVisible: accountsVisible } = useScrollAnimation()
    const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation()

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
                                <Wallet className="mr-1 h-3 w-3" />
                                Accounts & Services
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Banking Made Simple & Secure
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Experience modern banking with high-interest accounts, digital convenience,
                                and unmatched security. Open your account in minutes.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">
                                        Open Account Now
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/products">Explore Products</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Account Types */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Choose Your Account</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Find the perfect account for your financial needs
                            </p>
                        </div>
                        <div
                            ref={accountsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${accountsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {accountTypes.map((account, index) => (
                                <Card
                                    key={account.title}
                                    className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                                            <account.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{account.title}</CardTitle>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-primary">{account.rate}</span>
                                        </div>
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
                                        <div className="flex gap-3">
                                            <Button variant="outline" className="flex-1" asChild>
                                                <Link href={account.href}>Learn More</Link>
                                            </Button>
                                            <Button className="flex-1" asChild>
                                                <Link href="/register">Open Now</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Digital Features */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Digital Banking Features</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Bank anytime, anywhere with our advanced digital platform
                            </p>
                        </div>
                        <div
                            ref={featuresRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {digitalFeatures.map((feature, index) => (
                                <Card
                                    key={feature.title}
                                    className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
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

                {/* Benefits Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Why Choose SecureBank?</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    Join 10 million+ customers who trust us for secure, convenient, and rewarding banking.
                                </p>
                                <div className="mt-8 flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/about">Learn More</Link>
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
                            Open Your Account in 5 Minutes
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            100% digital process. No paperwork. Instant approval.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/register">
                                Start Now
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
