"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Shield,
    Users,
    Award,
    TrendingUp,
    Globe,
    Heart,
    Target,
    Zap,
    CheckCircle2,
    Building2,
    Sparkles
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const stats = [
    { value: "10M+", label: "Active Customers", icon: Users },
    { value: "500+", label: "Branch Locations", icon: Building2 },
    { value: "99.9%", label: "Uptime Guarantee", icon: Zap },
    { value: "$50B+", label: "Assets Under Management", icon: TrendingUp },
]

const values = [
    {
        icon: Shield,
        title: "Security First",
        description: "Bank-grade encryption and multi-layer security protocols protect your financial data 24/7.",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: Users,
        title: "Customer Centric",
        description: "Your financial success is our priority. We provide personalized solutions tailored to your needs.",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
        icon: Sparkles,
        title: "Innovation Driven",
        description: "Cutting-edge technology meets traditional banking to deliver seamless digital experiences.",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
        icon: Heart,
        title: "Trust & Transparency",
        description: "No hidden fees, clear terms, and honest communication in every interaction.",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30"
    },
]

const milestones = [
    {
        year: "2010",
        title: "Founded",
        description: "SecureBank was established with a vision to revolutionize digital banking."
    },
    {
        year: "2013",
        title: "1M Customers",
        description: "Reached our first million customers, expanding to 100+ branches nationwide."
    },
    {
        year: "2016",
        title: "Mobile App Launch",
        description: "Launched award-winning mobile banking app with biometric authentication."
    },
    {
        year: "2019",
        title: "5M Customers",
        description: "Crossed 5 million customers and introduced AI-powered financial advisory."
    },
    {
        year: "2022",
        title: "Global Expansion",
        description: "Expanded operations to 15 countries with 24/7 multilingual support."
    },
    {
        year: "2024",
        title: "10M+ Customers",
        description: "Serving over 10 million customers with $50B+ in assets under management."
    },
]

const awards = [
    {
        icon: Award,
        title: "Best Digital Bank 2024",
        organization: "Global Finance Awards"
    },
    {
        icon: Award,
        title: "Customer Service Excellence",
        organization: "Banking Industry Awards"
    },
    {
        icon: Award,
        title: "Most Innovative Fintech",
        organization: "Tech Innovation Summit"
    },
    {
        icon: Award,
        title: "Top Security Standards",
        organization: "Cybersecurity Excellence Awards"
    },
]

const features = [
    "FDIC Insured up to $250,000",
    "256-bit SSL Encryption",
    "24/7 Customer Support",
    "Zero Hidden Fees",
    "Instant Account Opening",
    "Multi-currency Support",
    "Advanced Fraud Protection",
    "Paperless Banking",
]

export default function AboutPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
    const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation()
    const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation()

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
                                <Building2 className="mr-1 h-3 w-3" />
                                Established 2010
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Banking Built for the Future
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                We're on a mission to make financial services accessible, transparent, and secure for everyone.
                                With cutting-edge technology and a customer-first approach, we're redefining what banking can be.
                            </p>
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

                {/* Mission Section */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                                </div>
                                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                    To empower individuals and businesses with innovative financial solutions that are secure,
                                    accessible, and tailored to their unique needs. We believe everyone deserves access to
                                    world-class banking services, regardless of their location or financial background.
                                </p>
                                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                    Through technology and human expertise, we're building a financial ecosystem that puts
                                    customers first, eliminates complexity, and creates lasting value for communities worldwide.
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                                </div>
                                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                    To become the world's most trusted and innovative digital banking platform, setting new
                                    standards for customer experience, security, and financial inclusion. We envision a future
                                    where banking is seamless, intelligent, and works for everyone.
                                </p>
                                <div className="mt-6 grid gap-3">
                                    {features.slice(0, 4).map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                The principles that guide everything we do
                            </p>
                        </div>
                        <div
                            ref={valuesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {values.map((value, index) => (
                                <Card
                                    key={value.title}
                                    className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="pt-6">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.bgColor} transition-transform group-hover:scale-110`}>
                                            <value.icon className={`h-6 w-6 ${value.color}`} />
                                        </div>
                                        <h3 className="mt-4 text-xl font-semibold text-foreground">{value.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Key milestones in our growth story
                            </p>
                        </div>
                        <div
                            ref={timelineRef as React.RefObject<HTMLDivElement>}
                            className={`space-y-8 transition-all duration-700 ${timelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {milestones.map((milestone, index) => (
                                <div
                                    key={milestone.year}
                                    className="relative flex gap-6 pl-8 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border last:before:hidden"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute left-0 top-2 -translate-x-1/2">
                                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <Badge variant="secondary" className="mb-2">{milestone.year}</Badge>
                                        <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                                        <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Awards Section */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Awards & Recognition</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Honored for excellence in banking and customer service
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {awards.map((award, index) => (
                                <Card
                                    key={award.title}
                                    className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                                            <award.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="mt-4 font-semibold text-foreground">{award.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{award.organization}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-foreground">
                            Join 10 Million+ Happy Customers
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Experience the future of banking with SecureBank. Open your account in minutes.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" asChild>
                                <Link href="/register">Open an Account</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/products">Explore Products</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
