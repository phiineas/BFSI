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
    PieChart,
    Shield,
    Award,
    Target,
    Users,
    BarChart3,
    Briefcase,
    ArrowRight,
    CheckCircle2,
    LineChart,
    DollarSign,
    Globe
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const investmentStrategies = [
    {
        icon: TrendingUp,
        title: "Growth Portfolio",
        description: "Aggressive growth strategy focused on high-potential equity investments.",
        returns: "12-15% p.a.",
        risk: "High",
        minInvestment: "₹10 Lakh",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
        icon: PieChart,
        title: "Balanced Portfolio",
        description: "Diversified mix of equity and debt for steady growth with moderate risk.",
        returns: "9-12% p.a.",
        risk: "Moderate",
        minInvestment: "₹5 Lakh",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: Shield,
        title: "Conservative Portfolio",
        description: "Low-risk investments focused on capital preservation and steady income.",
        returns: "7-9% p.a.",
        risk: "Low",
        minInvestment: "₹2 Lakh",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
]

const services = [
    {
        icon: Briefcase,
        title: "Portfolio Management",
        description: "Customized portfolio management services tailored to your financial goals and risk appetite.",
    },
    {
        icon: BarChart3,
        title: "Wealth Planning",
        description: "Comprehensive wealth planning including retirement, estate, and tax planning strategies.",
    },
    {
        icon: Globe,
        title: "Global Investments",
        description: "Access to international markets and diversified global investment opportunities.",
    },
    {
        icon: Award,
        title: "Alternative Investments",
        description: "Exclusive access to private equity, hedge funds, and structured products.",
    },
]

const stats = [
    { value: "₹500B+", label: "Assets Under Management", icon: DollarSign },
    { value: "50K+", label: "Satisfied Clients", icon: Users },
    { value: "15%", label: "Average Annual Returns", icon: TrendingUp },
    { value: "25+", label: "Years of Excellence", icon: Award },
]

const benefits = [
    "Dedicated wealth advisor",
    "Quarterly portfolio reviews",
    "Tax-efficient strategies",
    "Estate planning support",
    "Access to exclusive deals",
    "Real-time portfolio tracking",
    "Research and insights",
    "24/7 concierge service",
]

export default function AssetManagementPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: strategiesRef, isVisible: strategiesVisible } = useScrollAnimation()
    const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation()
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()

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
                                <TrendingUp className="mr-1 h-3 w-3" />
                                Asset Management
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Grow Your Wealth with Expert Guidance
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Professional asset management services designed to help you achieve your financial goals.
                                Our expert advisors create personalized investment strategies backed by deep market insights.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">
                                        Start Investing
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/support">Speak with an Advisor</Link>
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
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <stat.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <p className="mt-4 text-3xl font-bold text-foreground">{stat.value}</p>
                                        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Investment Strategies */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Investment Strategies</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Choose a strategy that aligns with your financial goals and risk tolerance
                            </p>
                        </div>
                        <div
                            ref={strategiesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${strategiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {investmentStrategies.map((strategy, index) => (
                                <Card
                                    key={strategy.title}
                                    className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${strategy.bgColor} transition-transform group-hover:scale-110`}>
                                            <strategy.icon className={`h-6 w-6 ${strategy.color}`} />
                                        </div>
                                        <CardTitle className="mt-4">{strategy.title}</CardTitle>
                                        <CardDescription>{strategy.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Expected Returns</span>
                                                <span className="text-sm font-semibold text-primary">{strategy.returns}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Risk Level</span>
                                                <Badge variant="outline">{strategy.risk}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-muted-foreground">Min. Investment</span>
                                                <span className="text-sm font-semibold text-foreground">{strategy.minInvestment}</span>
                                            </div>
                                        </div>
                                        <Button className="w-full" asChild>
                                            <Link href="/register">Get Started</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Our Services</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Comprehensive wealth management solutions for every need
                            </p>
                        </div>
                        <div
                            ref={servicesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {services.map((service, index) => (
                                <Card
                                    key={service.title}
                                    className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
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

                {/* Benefits Section */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Why Choose Our Asset Management?</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    With over 25 years of experience and ₹500B+ in assets under management, we provide
                                    institutional-grade investment solutions with personalized service.
                                </p>
                                <div className="mt-8 flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/register">Open Account</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/support">Book Consultation</Link>
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
                        <h2 className="text-3xl font-bold text-foreground">
                            Ready to Grow Your Wealth?
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Let our expert advisors create a personalized investment strategy for you.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" asChild>
                                <Link href="/register">
                                    Start Investing Today
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/support">Schedule a Meeting</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
