"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BookOpen,
    TrendingUp,
    Shield,
    Wallet,
    ArrowRight,
    Calendar,
    User,
    Search,
    Tag
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const featuredArticles = [
    {
        title: "10 Smart Ways to Save Money in 2026",
        excerpt: "Discover practical strategies to boost your savings and achieve your financial goals faster.",
        category: "Savings",
        author: "Sarah Johnson",
        date: "Jan 20, 2026",
        readTime: "5 min read",
        image: "/blog/savings.jpg"
    },
    {
        title: "Understanding Credit Scores: A Complete Guide",
        excerpt: "Learn how credit scores work and how to improve yours for better loan rates.",
        category: "Credit",
        author: "Michael Chen",
        date: "Jan 18, 2026",
        readTime: "8 min read",
        image: "/blog/credit.jpg"
    },
    {
        title: "Investment Strategies for Beginners",
        excerpt: "Start your investment journey with these beginner-friendly strategies and tips.",
        category: "Investing",
        author: "Priya Sharma",
        date: "Jan 15, 2026",
        readTime: "6 min read",
        image: "/blog/investing.jpg"
    },
]

const recentArticles = [
    {
        title: "How to Choose the Right Home Loan",
        category: "Loans",
        date: "Jan 12, 2026",
        readTime: "7 min read"
    },
    {
        title: "Digital Banking Security Tips",
        category: "Security",
        date: "Jan 10, 2026",
        readTime: "4 min read"
    },
    {
        title: "Tax-Saving Investment Options",
        category: "Tax",
        date: "Jan 8, 2026",
        readTime: "6 min read"
    },
    {
        title: "Building an Emergency Fund",
        category: "Savings",
        date: "Jan 5, 2026",
        readTime: "5 min read"
    },
]

const categories = [
    { name: "All", icon: BookOpen },
    { name: "Savings", icon: Wallet },
    { name: "Investing", icon: TrendingUp },
    { name: "Security", icon: Shield },
]

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation()

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
                                <BookOpen className="mr-1 h-3 w-3" />
                                Financial Insights
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Learn & Grow with SecureBank
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Expert financial advice, tips, and insights to help you make smarter money decisions.
                            </p>
                            <div className="mt-8 max-w-md mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search articles..." className="pl-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Articles</h2>
                        </div>
                        <div
                            ref={featuredRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {featuredArticles.map((article, index) => (
                                <Card key={article.title} className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <div className="aspect-video w-full bg-muted flex items-center justify-center">
                                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="secondary">{article.category}</Badge>
                                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                                        <CardDescription>{article.excerpt}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                {article.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {article.date}
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="#">Read More<ArrowRight className="ml-2 h-4 w-4" /></Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Browse by Category</h2>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category.name}
                                        variant={activeCategory === category.name ? "default" : "outline"}
                                        onClick={() => setActiveCategory(category.name)}
                                    >
                                        <category.icon className="mr-2 h-4 w-4" />
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {recentArticles.map((article) => (
                                <Card key={article.title} className="transition-all duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline">{article.category}</Badge>
                                            <span className="text-xs text-muted-foreground">{article.readTime}</span>
                                        </div>
                                        <CardTitle className="text-lg">{article.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {article.date}
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Subscribe to our newsletter for the latest financial tips and insights.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center max-w-md mx-auto">
                            <Input placeholder="Enter your email" type="email" />
                            <Button size="lg">Subscribe</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
