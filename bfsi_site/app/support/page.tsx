"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Phone,
    Mail,
    MessageCircle,
    Clock,
    MapPin,
    Send,
    CheckCircle2,
    HelpCircle,
    Shield,
    CreditCard,
    Home as HomeIcon,
    FileText
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const supportChannels = [
    {
        icon: Phone,
        title: "Phone Support",
        description: "Talk to our experts",
        contact: "1800-123-4567",
        availability: "24/7 Available",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Get detailed assistance",
        contact: "support@securebank.com",
        availability: "Response in 24 hours",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Instant messaging support",
        contact: "Start Chat",
        availability: "9 AM - 9 PM",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950/30"
    },
    {
        icon: MapPin,
        title: "Branch Locator",
        description: "Visit us in person",
        contact: "Find Nearest Branch",
        availability: "500+ Branches",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-950/30"
    }
]

const quickLinks = [
    { icon: HelpCircle, title: "General Queries", href: "/faq#general" },
    { icon: CreditCard, title: "Account Issues", href: "/faq#accounts" },
    { icon: Shield, title: "Security & Privacy", href: "/faq#security" },
    { icon: HomeIcon, title: "Loan Queries", href: "/faq#loans" },
    { icon: FileText, title: "Documentation", href: "/faq#documents" },
]

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
    const { ref: channelsRef, isVisible: channelsVisible } = useScrollAnimation()
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // GA4 Event Tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'contact_form_submit', {
                category: formData.category,
                method: 'web_form'
            })
        }

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", phone: "", category: "", message: "" })
            setIsSubmitted(false)
        }, 3000)
    }

    const handleChannelClick = (channel: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'support_channel_click', {
                channel_type: channel
            })
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
                    <div
                        ref={headerRef as React.RefObject<HTMLDivElement>}
                        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <Badge variant="secondary" className="mb-4">
                                <Clock className="mr-1 h-3 w-3" />
                                24/7 Support Available
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                How Can We Help You?
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Our dedicated support team is here to assist you with any questions or concerns. Choose your preferred way to reach us.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Support Channels */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div
                            ref={channelsRef as React.RefObject<HTMLDivElement>}
                            className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${channelsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                        >
                            {supportChannels.map((channel, index) => (
                                <Card
                                    key={channel.title}
                                    className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    onClick={() => handleChannelClick(channel.title)}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${channel.bgColor} transition-transform group-hover:scale-110`}>
                                            <channel.icon className={`h-6 w-6 ${channel.color}`} />
                                        </div>
                                        <CardTitle className="mt-4">{channel.title}</CardTitle>
                                        <CardDescription>{channel.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-semibold text-foreground">{channel.contact}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{channel.availability}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form & Quick Links */}
                <section className="bg-muted/30 py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Contact Form */}
                            <div
                                ref={formRef as React.RefObject<HTMLDivElement>}
                                className={`lg:col-span-2 transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                    }`}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Send Us a Message</CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {isSubmitted ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
                                                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                                </div>
                                                <h3 className="mt-4 text-xl font-semibold text-foreground">Message Sent!</h3>
                                                <p className="mt-2 text-muted-foreground">
                                                    We've received your message and will respond shortly.
                                                </p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid gap-6 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Full Name *</Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="John Doe"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email Address *</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid gap-6 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number</Label>
                                                        <Input
                                                            id="phone"
                                                            type="tel"
                                                            placeholder="+1 (555) 000-0000"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="category">Category *</Label>
                                                        <Select
                                                            value={formData.category}
                                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                                            required
                                                        >
                                                            <SelectTrigger id="category">
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                                <SelectItem value="account">Account Support</SelectItem>
                                                                <SelectItem value="loan">Loan Application</SelectItem>
                                                                <SelectItem value="insurance">Insurance Query</SelectItem>
                                                                <SelectItem value="technical">Technical Issue</SelectItem>
                                                                <SelectItem value="complaint">Complaint</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message *</Label>
                                                    <Textarea
                                                        id="message"
                                                        placeholder="Please describe your query in detail..."
                                                        rows={6}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        required
                                                    />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    className="w-full"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>Processing...</>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send className="ml-2 h-4 w-4" />
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Help</CardTitle>
                                        <CardDescription>
                                            Find answers to common questions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {quickLinks.map((link) => (
                                            <Link
                                                key={link.title}
                                                href={link.href}
                                                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <link.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-medium text-foreground">{link.title}</span>
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Office Hours</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Monday - Friday</span>
                                            <span className="font-medium">9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Saturday</span>
                                            <span className="font-medium">10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Sunday</span>
                                            <span className="font-medium">Closed</span>
                                        </div>
                                        <div className="mt-4 rounded-lg bg-primary/10 p-3">
                                            <p className="text-xs text-primary">
                                                <strong>Emergency Support:</strong> Available 24/7 via phone
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
