"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Gift,
    CreditCard,
    Plane,
    ShoppingBag,
    Utensils,
    Fuel,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Star,
    Tag,
    TrendingUp
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const featuredOffers = [
    {
        icon: CreditCard,
        title: "5% Cashback on All Spends",
        description: "Get unlimited 5% cashback on all credit card transactions",
        validity: "Valid till Mar 31, 2026",
        category: "cards",
        highlight: "Hot Deal",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950/30"
    },
    {
        icon: Plane,
        title: "Free Airport Lounge Access",
        description: "Unlimited domestic and international lounge access",
        validity: "Lifetime benefit",
        category: "travel",
        highlight: "Premium",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: ShoppingBag,
        title: "20% Off on Shopping",
        description: "Extra 20% discount on partner e-commerce platforms",
        validity: "Valid till Feb 28, 2026",
        category: "shopping",
        highlight: "Limited Time",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
]

const categoryOffers = {
    cards: [
        { title: "Zero Annual Fee", description: "Lifetime free credit card with premium benefits", icon: CreditCard },
        { title: "Reward Points", description: "Earn 10X reward points on every transaction", icon: Star },
        { title: "Welcome Bonus", description: "Get ₹5,000 welcome bonus on first transaction", icon: Gift },
    ],
    travel: [
        { title: "Flight Discounts", description: "Up to ₹10,000 off on flight bookings", icon: Plane },
        { title: "Hotel Offers", description: "Flat 25% off on hotel bookings worldwide", icon: Sparkles },
        { title: "Travel Insurance", description: "Complimentary travel insurance worth ₹1 Lakh", icon: CheckCircle2 },
    ],
    shopping: [
        { title: "E-commerce Deals", description: "Extra cashback on Amazon, Flipkart, and more", icon: ShoppingBag },
        { title: "Dining Offers", description: "Buy 1 Get 1 free at 5,000+ restaurants", icon: Utensils },
        { title: "Fuel Surcharge", description: "1% fuel surcharge waiver at all petrol pumps", icon: Fuel },
    ],
}

export default function OffersPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: offersRef, isVisible: offersVisible } = useScrollAnimation()

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
                                <Gift className="mr-1 h-3 w-3" />
                                Offers & Rewards
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Exclusive Offers Just for You
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Unlock amazing deals, cashback, and rewards on your favorite brands and services.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/register">Claim Offers<ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/products">View Products</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Featured Offers</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Don't miss out on these hot deals</p>
                        </div>
                        <div
                            ref={offersRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${offersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {featuredOffers.map((offer, index) => (
                                <Card key={offer.title} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <div className="absolute top-4 right-4"><Badge className="bg-primary">{offer.highlight}</Badge></div>
                                    <CardHeader>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${offer.bgColor} transition-transform group-hover:scale-110`}>
                                            <offer.icon className={`h-6 w-6 ${offer.color}`} />
                                        </div>
                                        <CardTitle className="mt-4">{offer.title}</CardTitle>
                                        <CardDescription>{offer.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                            <Tag className="h-4 w-4" />
                                            {offer.validity}
                                        </div>
                                        <Button className="w-full" asChild><Link href="/register">Claim Offer</Link></Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-foreground">Offers by Category</h2>
                            <p className="mt-4 text-lg text-muted-foreground">Browse offers that match your interests</p>
                        </div>
                        <Tabs defaultValue="cards" className="w-full">
                            <div className="flex justify-center mb-12">
                                <TabsList className="grid w-full max-w-md grid-cols-3">
                                    <TabsTrigger value="cards">Cards</TabsTrigger>
                                    <TabsTrigger value="travel">Travel</TabsTrigger>
                                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                                </TabsList>
                            </div>
                            {Object.entries(categoryOffers).map(([category, offers]) => (
                                <TabsContent key={category} value={category}>
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {offers.map((offer, index) => (
                                            <Card key={offer.title} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <CardHeader>
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                                        <offer.icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <CardTitle className="mt-4">{offer.title}</CardTitle>
                                                    <CardDescription>{offer.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Button variant="outline" className="w-full" asChild><Link href="/register">Learn More</Link></Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                        <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
                        <h2 className="text-3xl font-bold text-foreground">Start Saving Today</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Join SecureBank and unlock exclusive offers worth thousands every month.
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
