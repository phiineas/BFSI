"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Briefcase,
    Users,
    TrendingUp,
    Heart,
    Award,
    Globe,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Target
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const openPositions = [
    {
        title: "Senior Software Engineer",
        department: "Technology",
        location: "Mumbai / Bangalore",
        type: "Full-time",
        experience: "5+ years"
    },
    {
        title: "Product Manager",
        department: "Product",
        location: "Mumbai",
        type: "Full-time",
        experience: "3-5 years"
    },
    {
        title: "Relationship Manager",
        department: "Sales",
        location: "Multiple Locations",
        type: "Full-time",
        experience: "2-4 years"
    },
    {
        title: "Data Analyst",
        department: "Analytics",
        location: "Bangalore",
        type: "Full-time",
        experience: "2-3 years"
    },
    {
        title: "UI/UX Designer",
        department: "Design",
        location: "Mumbai",
        type: "Full-time",
        experience: "3-5 years"
    },
    {
        title: "Cybersecurity Specialist",
        department: "Security",
        location: "Delhi / Mumbai",
        type: "Full-time",
        experience: "4-6 years"
    },
]

const benefits = [
    {
        icon: Heart,
        title: "Health & Wellness",
        description: "Comprehensive health insurance for you and your family, gym memberships, and wellness programs"
    },
    {
        icon: TrendingUp,
        title: "Career Growth",
        description: "Continuous learning opportunities, mentorship programs, and clear career progression paths"
    },
    {
        icon: Globe,
        title: "Work-Life Balance",
        description: "Flexible working hours, remote work options, and generous paid time off"
    },
    {
        icon: Award,
        title: "Competitive Compensation",
        description: "Industry-leading salaries, performance bonuses, and stock options"
    },
]

const values = [
    "Innovation and creativity",
    "Diversity and inclusion",
    "Customer-first mindset",
    "Continuous learning",
    "Work-life balance",
    "Collaborative culture",
    "Social responsibility",
    "Ethical practices",
]

export default function CareersPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation()
    const { ref: positionsRef, isVisible: positionsVisible } = useScrollAnimation()

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
                                <Briefcase className="mr-1 h-3 w-3" />
                                Join Our Team
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Build Your Career with Us
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Join a team of passionate professionals shaping the future of banking. We offer exciting opportunities,
                                competitive benefits, and a culture that values innovation and growth.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="#positions">View Open Positions<ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/about">About SecureBank</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Why Join SecureBank?</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Benefits that make a difference</p>
                        </div>
                        <div
                            ref={benefitsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${benefitsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {benefits.map((benefit, index) => (
                                <Card key={benefit.title} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <benefit.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{benefit.title}</CardTitle>
                                        <CardDescription>{benefit.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Culture</h2>
                                </div>
                                <p className="text-lg text-muted-foreground mb-8">
                                    At SecureBank, we believe in creating an environment where everyone can thrive.
                                    Our culture is built on trust, collaboration, and a shared commitment to excellence.
                                </p>
                                <Button size="lg" asChild>
                                    <Link href="/about">Learn More About Us</Link>
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {values.map((value) => (
                                    <div key={value} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-muted-foreground">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="positions" className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Find your perfect role</p>
                        </div>
                        <div
                            ref={positionsRef as React.RefObject<HTMLDivElement>}
                            className={`space-y-4 transition-all duration-700 ${positionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {openPositions.map((position, index) => (
                                <Card key={position.title} className="transition-all duration-300 hover:shadow-lg" style={{ transitionDelay: `${index * 50}ms` }}>
                                    <CardHeader>
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">{position.department}</Badge>
                                                    <Badge variant="secondary">{position.type}</Badge>
                                                </div>
                                                <CardTitle>{position.title}</CardTitle>
                                                <CardDescription className="mt-2">
                                                    {position.location} • {position.experience}
                                                </CardDescription>
                                            </div>
                                            <Button asChild>
                                                <Link href="/contact">Apply Now</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <Target className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">Ready to Make an Impact?</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Don't see the right role? Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                        <Button size="lg" className="mt-8" asChild>
                            <Link href="/contact">Get in Touch<ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
