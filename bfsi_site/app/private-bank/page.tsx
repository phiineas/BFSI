"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Crown,
    Plane,
    Shield,
    Star,
    Users,
    Globe,
    Award,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Phone,
    CreditCard,
    TrendingUp,
    Lock
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const exclusiveServices = [
    {
        icon: Users,
        title: "Dedicated Relationship Manager",
        description: "Your personal banking expert available 24/7 to handle all your financial needs.",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: TrendingUp,
        title: "Bespoke Investment Solutions",
        description: "Customized investment portfolios tailored to your wealth goals and risk profile.",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
        icon: Globe,
        title: "Global Banking Access",
        description: "Seamless banking across 150+ countries with preferential forex rates.",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
        icon: Shield,
        title: "Premium Insurance Coverage",
        description: "Comprehensive insurance protection for you and your family up to ₹10 Crore.",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30"
    },
]

const luxuryBenefits = [
    {
        icon: Plane,
        title: "Airport Lounge Access",
        description: "Unlimited access to 1,000+ airport lounges worldwide",
    },
    {
        icon: CreditCard,
        title: "Platinum Credit Card",
        description: "Exclusive metal card with unlimited rewards and no spending limit",
    },
    {
        icon: Star,
        title: "Concierge Service",
        description: "24/7 lifestyle concierge for travel, dining, and entertainment",
    },
    {
        icon: Award,
        title: "Exclusive Events",
        description: "VIP access to sporting events, concerts, and private gatherings",
    },
]

const stats = [
    { value: "₹1Cr+", label: "Minimum Relationship Value" },
    { value: "10K+", label: "Private Banking Clients" },
    { value: "150+", label: "Countries Served" },
    { value: "99.9%", label: "Client Satisfaction" },
]

const features = [
    "Zero fees on all transactions",
    "Priority loan approvals",
    "Preferential interest rates",
    "Complimentary wealth advisory",
    "Estate planning services",
    "Tax optimization strategies",
    "Family office services",
    "Succession planning",
    "Art and collectibles financing",
    "Yacht and aircraft financing",
    "Philanthropic advisory",
    "Multi-generational planning",
]

export default function PrivateBankPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation()
    const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation()
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
                    <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
                    <div
                        ref={heroRef as React.RefObject<HTMLDivElement>}
                        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <Badge variant="secondary" className="mb-4">
                                <Crown className="mr-1 h-3 w-3 fill-primary text-primary" />
                                Private Banking
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Banking Redefined for the Elite
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Experience unparalleled banking with bespoke financial solutions, dedicated relationship
                                managers, and exclusive privileges designed for high-net-worth individuals.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/support">
                                        Request Private Banking
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/support">
                                        <Phone className="mr-2 h-4 w-4" />
                                        Speak with an Advisor
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div
                            ref={statsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {stats.map((stat, index) => (
                                <Card
                                    key={stat.label}
                                    className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="pt-6">
                                        <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Exclusive Services */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Exclusive Services</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Personalized banking solutions tailored to your unique needs
                            </p>
                        </div>
                        <div
                            ref={servicesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {exclusiveServices.map((service, index) => (
                                <Card
                                    key={service.title}
                                    className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bgColor} transition-transform group-hover:scale-110`}>
                                            <service.icon className={`h-6 w-6 ${service.color}`} />
                                        </div>
                                        <CardTitle className="mt-4">{service.title}</CardTitle>
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Luxury Benefits */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Luxury Benefits</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Enjoy premium lifestyle privileges and exclusive experiences
                            </p>
                        </div>
                        <div
                            ref={benefitsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {luxuryBenefits.map((benefit, index) => (
                                <Card
                                    key={benefit.title}
                                    className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                                            <benefit.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Premium Features</h2>
                                </div>
                                <p className="text-lg text-muted-foreground mb-8">
                                    As a Private Banking client, you'll enjoy comprehensive financial services
                                    with white-glove treatment and personalized attention.
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/support">Apply Now</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/support">Learn More</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <Card className="overflow-hidden border-primary/20">
                            <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Lock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Eligibility Criteria</CardTitle>
                                        <CardDescription>Join our exclusive Private Banking community</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-foreground">Minimum Relationship Value</p>
                                            <p className="text-sm text-muted-foreground">Total assets of ₹1 Crore or more across all accounts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-foreground">Annual Income</p>
                                            <p className="text-sm text-muted-foreground">Minimum annual income of ₹50 Lakh or equivalent business turnover</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-foreground">Invitation Only</p>
                                            <p className="text-sm text-muted-foreground">By invitation or application review by our Private Banking team</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Crown className="mx-auto h-16 w-16 text-primary mb-6" />
                        <h2 className="text-3xl font-bold text-foreground">
                            Experience Banking at Its Finest
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Join the elite circle of Private Banking clients and unlock a world of exclusive privileges.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" asChild>
                                <Link href="/support">
                                    Request an Invitation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/support">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call: 1800-XXX-XXXX
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
