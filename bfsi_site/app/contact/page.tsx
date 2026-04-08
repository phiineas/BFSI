"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageSquare,
    Send,
    CheckCircle2,
    Building2,
    Globe
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const contactMethods = [
    {
        icon: Phone,
        title: "Call Us",
        description: "24/7 customer support",
        contact: "1800-XXX-XXXX",
        subtext: "Toll-free within India"
    },
    {
        icon: Mail,
        title: "Email Us",
        description: "Get response within 24 hours",
        contact: "support@securebank.com",
        subtext: "For general inquiries"
    },
    {
        icon: MessageSquare,
        title: "Live Chat",
        description: "Instant support available",
        contact: "Start Chat",
        subtext: "Average response: 2 minutes"
    },
    {
        icon: MapPin,
        title: "Visit Branch",
        description: "500+ branches nationwide",
        contact: "Find Nearest Branch",
        subtext: "Mon-Sat: 10 AM - 6 PM"
    },
]

const offices = [
    {
        city: "Mumbai",
        address: "SecureBank Tower, Bandra Kurla Complex, Mumbai - 400051",
        phone: "+91 22 XXXX XXXX",
        email: "mumbai@securebank.com"
    },
    {
        city: "Delhi",
        address: "Connaught Place, New Delhi - 110001",
        phone: "+91 11 XXXX XXXX",
        email: "delhi@securebank.com"
    },
    {
        city: "Bangalore",
        address: "MG Road, Bangalore - 560001",
        phone: "+91 80 XXXX XXXX",
        email: "bangalore@securebank.com"
    },
]

export default function ContactPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
    const { ref: methodsRef, isVisible: methodsVisible } = useScrollAnimation()
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation()

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
                                <MessageSquare className="mr-1 h-3 w-3" />
                                Get in Touch
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                We're Here to Help
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                                Have questions? Our team is available 24/7 to assist you with all your banking needs.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div
                            ref={methodsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${methodsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {contactMethods.map((method, index) => (
                                <Card key={method.title} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <CardContent className="pt-6">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                            <method.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">{method.title}</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                                        <p className="mt-3 font-semibold text-primary">{method.contact}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{method.subtext}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <div
                                ref={formRef as React.RefObject<HTMLDivElement>}
                                className={`transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
                                <p className="mt-4 text-muted-foreground">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                                <form className="mt-8 space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="How can we help?" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} />
                                    </div>
                                    <Button size="lg" className="w-full">
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </Button>
                                </form>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Our Offices</h2>
                                <p className="mt-4 text-muted-foreground">
                                    Visit us at any of our major branch locations.
                                </p>
                                <div className="mt-8 space-y-6">
                                    {offices.map((office) => (
                                        <Card key={office.city}>
                                            <CardHeader>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                        <Building2 className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <CardTitle>{office.city}</CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="flex items-start gap-2 text-sm">
                                                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                                    <span className="text-muted-foreground">{office.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">{office.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">{office.email}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Card className="overflow-hidden">
                            <div className="aspect-video w-full bg-muted flex items-center justify-center">
                                <MapPin className="h-16 w-16 text-muted-foreground" />
                                <p className="ml-4 text-muted-foreground">Branch Locator Map</p>
                            </div>
                        </Card>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
