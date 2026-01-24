"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Building2,
    Briefcase,
    TrendingUp,
    CreditCard,
    Shield,
    Users,
    Wallet,
    Globe,
    ArrowRight,
    CheckCircle2,
    Zap,
    DollarSign,
    BarChart3,
    Lock
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const businessAccounts = [
    {
        icon: Briefcase,
        title: "Business Current Account",
        description: "Zero balance account with unlimited transactions and dedicated relationship manager.",
        features: ["Free cash deposits", "Unlimited NEFT/RTGS", "Overdraft facility", "Business debit card"],
        highlight: "Most Popular",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: Building2,
        title: "Corporate Account",
        description: "Tailored solutions for large enterprises with multi-user access and advanced features.",
        features: ["Multi-user access", "API integration", "Bulk payments", "Dedicated support"],
        highlight: "Enterprise",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
        icon: TrendingUp,
        title: "Startup Account",
        description: "Special benefits for startups including free banking and investor connect programs.",
        features: ["Zero fees for 2 years", "Investor network", "Credit line", "Business tools"],
        highlight: "For Startups",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30"
    },
]

const businessLoans = [
    {
        icon: DollarSign,
        title: "Working Capital Loan",
        rate: "From 9.5% p.a.",
        amount: "Up to ₹5 Crore",
        features: ["Quick approval", "Flexible tenure", "Minimal documentation"]
    },
    {
        icon: Building2,
        title: "Business Term Loan",
        rate: "From 10.5% p.a.",
        amount: "Up to ₹10 Crore",
        features: ["Long tenure", "Competitive rates", "No collateral up to ₹50L"]
    },
    {
        icon: Wallet,
        title: "Equipment Financing",
        rate: "From 11% p.a.",
        amount: "Up to ₹2 Crore",
        features: ["100% financing", "Quick disbursement", "Tax benefits"]
    },
]

const merchantServices = [
    {
        icon: CreditCard,
        title: "Payment Gateway",
        description: "Accept online payments with industry-leading success rates and instant settlements.",
    },
    {
        icon: Zap,
        title: "POS Solutions",
        description: "Modern point-of-sale systems with contactless payments and real-time reporting.",
    },
    {
        icon: Globe,
        title: "International Payments",
        description: "Send and receive international payments with competitive forex rates.",
    },
    {
        icon: BarChart3,
        title: "Business Analytics",
        description: "Real-time insights into your business performance with advanced analytics.",
    },
]

const benefits = [
    "Dedicated relationship manager",
    "Priority customer support 24/7",
    "Free business advisory services",
    "Customized credit solutions",
    "Multi-currency accounts",
    "Trade finance solutions",
    "Cash management services",
    "Payroll processing",
]

export default function BusinessPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: accountsRef, isVisible: accountsVisible } = useScrollAnimation()
    const { ref: loansRef, isVisible: loansVisible } = useScrollAnimation()
    const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation()

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
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <Badge variant="secondary" className="mb-4">
                                    <Building2 className="mr-1 h-3 w-3" />
                                    Business Banking
                                </Badge>
                                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                    Banking Solutions Built for Business
                                </h1>
                                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                    Empower your business with comprehensive banking solutions designed for growth.
                                    From startups to enterprises, we provide the financial tools you need to succeed.
                                </p>
                                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                    <Button size="lg" asChild>
                                        <Link href="/register">
                                            Open Business Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/support">Talk to Expert</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <Users className="mx-auto h-8 w-8 text-primary mb-2" />
                                        <p className="text-3xl font-bold text-foreground">500K+</p>
                                        <p className="text-sm text-muted-foreground">Business Customers</p>
                                    </CardContent>
                                </Card>
                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <TrendingUp className="mx-auto h-8 w-8 text-primary mb-2" />
                                        <p className="text-3xl font-bold text-foreground">₹50B+</p>
                                        <p className="text-sm text-muted-foreground">Loans Disbursed</p>
                                    </CardContent>
                                </Card>
                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <Shield className="mx-auto h-8 w-8 text-primary mb-2" />
                                        <p className="text-3xl font-bold text-foreground">99.9%</p>
                                        <p className="text-sm text-muted-foreground">Uptime</p>
                                    </CardContent>
                                </Card>
                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <Zap className="mx-auto h-8 w-8 text-primary mb-2" />
                                        <p className="text-3xl font-bold text-foreground">24/7</p>
                                        <p className="text-sm text-muted-foreground">Support</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Accounts */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Business Accounts</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Choose the right account for your business needs
                            </p>
                        </div>
                        <div
                            ref={accountsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${accountsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {businessAccounts.map((account, index) => (
                                <Card
                                    key={account.title}
                                    className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute top-4 right-4">
                                        <Badge>{account.highlight}</Badge>
                                    </div>
                                    <CardHeader>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${account.bgColor} transition-transform group-hover:scale-110`}>
                                            <account.icon className={`h-6 w-6 ${account.color}`} />
                                        </div>
                                        <CardTitle className="mt-4">{account.title}</CardTitle>
                                        <CardDescription>{account.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {account.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="w-full mt-6" asChild>
                                            <Link href="/register">Open Account</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Loans */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Business Loans</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Flexible financing solutions to fuel your growth
                            </p>
                        </div>
                        <div
                            ref={loansRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${loansVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {businessLoans.map((loan, index) => (
                                <Card
                                    key={loan.title}
                                    className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <loan.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="mt-4">{loan.title}</CardTitle>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-primary">{loan.rate}</span>
                                        </div>
                                        <CardDescription>Loan amount: {loan.amount}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 mb-6">
                                            {loan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="/apply/business-loan">Apply Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Merchant Services */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Merchant Services</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Accept payments and manage your business efficiently
                            </p>
                        </div>
                        <div
                            ref={servicesRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {merchantServices.map((service, index) => (
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
                                <h2 className="text-3xl font-bold text-foreground">Why Choose SecureBank for Business?</h2>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    We understand the unique challenges businesses face. Our comprehensive suite of services
                                    is designed to help you succeed at every stage of your journey.
                                </p>
                                <div className="mt-8 flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/contact">Contact Sales</Link>
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
                            Ready to Take Your Business to the Next Level?
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Join 500,000+ businesses that trust SecureBank for their banking needs.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" asChild>
                                <Link href="/register">
                                    Open Business Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/support">Schedule a Consultation</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
