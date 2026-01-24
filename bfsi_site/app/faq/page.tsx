"use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, HelpCircle, CreditCard, Shield, Home as HomeIcon, FileText, Phone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqCategories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: HelpCircle },
    { id: "accounts", name: "Accounts", icon: CreditCard },
    { id: "loans", name: "Loans", icon: HomeIcon },
    { id: "insurance", name: "Insurance", icon: Shield },
    { id: "security", name: "Security", icon: Shield },
    { id: "documents", name: "Documents", icon: FileText },
]

const faqs = [
    {
        category: "general",
        question: "What is SecureBank?",
        answer: "SecureBank is a modern digital banking platform that offers a comprehensive range of financial services including savings accounts, loans, insurance, and investment products. We combine cutting-edge technology with personalized customer service to provide you with the best banking experience."
    },
    {
        category: "general",
        question: "How do I open an account with SecureBank?",
        answer: "Opening an account is simple! Click on 'Register' in the top menu, fill out the application form with your details, verify your identity using OTP, and submit the required documents. Your account will be activated within 24 hours."
    },
    {
        category: "general",
        question: "Is my money safe with SecureBank?",
        answer: "Absolutely! All deposits are insured up to $250,000 by the FDIC. We use bank-level encryption, multi-factor authentication, and advanced fraud detection systems to protect your money and personal information."
    },
    {
        category: "general",
        question: "What are your customer support hours?",
        answer: "Our phone support is available 24/7. Email support typically responds within 24 hours. Live chat is available Monday-Friday 9 AM - 9 PM. You can also visit any of our 500+ branches during business hours."
    },
    {
        category: "accounts",
        question: "What types of accounts do you offer?",
        answer: "We offer Premium Savings Accounts with 7.5% p.a. interest, Salary Accounts with exclusive benefits, Current Accounts for businesses, and Fixed Deposit accounts. All accounts come with zero minimum balance requirements and free debit cards."
    },
    {
        category: "accounts",
        question: "How do I check my account balance?",
        answer: "You can check your balance through our mobile app, online banking portal, ATMs, by calling our customer service, or via SMS by texting 'BAL' to our banking number. All methods are available 24/7."
    },
    {
        category: "accounts",
        question: "Are there any monthly fees?",
        answer: "No! Our savings and salary accounts have zero monthly maintenance fees, no minimum balance requirements, and no hidden charges. You only pay for optional services like international wire transfers or expedited card replacement."
    },
    {
        category: "accounts",
        question: "How long does it take to transfer money?",
        answer: "Internal transfers between SecureBank accounts are instant. Transfers to other banks via IMPS are completed within minutes. NEFT transfers take 2-4 hours, and RTGS transfers are completed within 30 minutes during banking hours."
    },
    {
        category: "accounts",
        question: "Can I have multiple accounts?",
        answer: "Yes! You can open multiple savings accounts, fixed deposits, and current accounts under the same customer profile. This makes it easy to manage different financial goals and separate personal and business finances."
    },
    {
        category: "loans",
        question: "What loan products do you offer?",
        answer: "We offer Personal Loans (10.5% p.a.), Home Loans (8.5% p.a.), Car Loans (9.5% p.a.), Education Loans, and Business Loans. All loans feature competitive interest rates, flexible tenure options, and minimal documentation."
    },
    {
        category: "loans",
        question: "What is the maximum loan amount I can get?",
        answer: "Personal loans up to $50,000, Home loans up to $500,000, Car loans up to $100,000, and Education loans up to $150,000. The exact amount depends on your income, credit score, and repayment capacity."
    },
    {
        category: "loans",
        question: "How quickly can I get loan approval?",
        answer: "Personal loans can be approved instantly online if you meet our criteria. Home and car loans typically take 2-3 business days. Once approved, funds are disbursed within 24-48 hours directly to your account."
    },
    {
        category: "loans",
        question: "What documents are required for a loan?",
        answer: "Basic requirements include: valid ID proof (Aadhaar/PAN), address proof, last 3 months' salary slips, 6 months' bank statements, and employment proof. Home loans additionally require property documents. Upload everything digitally through our portal."
    },
    {
        category: "loans",
        question: "Can I prepay my loan without penalties?",
        answer: "Yes! All our personal loans have zero prepayment charges. You can make partial or full prepayments anytime through our app or website. Home and car loans have no prepayment charges after the first year."
    },
    {
        category: "loans",
        question: "What is the minimum credit score required?",
        answer: "We recommend a credit score of 650+ for personal loans and 700+ for home loans. However, we evaluate applications holistically, considering income stability, existing obligations, and employment history."
    },
    {
        category: "insurance",
        question: "What insurance products are available?",
        answer: "We offer Term Life Insurance (from $10/mo), Health Insurance (from $25/mo), Investment Plans with insurance coverage, Critical Illness Insurance, and Accidental Death Benefit plans. All plans can be customized to your needs."
    },
    {
        category: "insurance",
        question: "How do I file an insurance claim?",
        answer: "File claims online through your dashboard, via our mobile app, or by calling our claims helpline. Upload required documents, and our team will process your claim within 7-10 business days. We have a 99% claim settlement ratio."
    },
    {
        category: "insurance",
        question: "Is there a waiting period for health insurance?",
        answer: "Pre-existing conditions have a 2-4 year waiting period depending on the condition. New illnesses are covered after 30 days. Accidents are covered immediately from day one. Maternity benefits have a 9-month waiting period."
    },
    {
        category: "insurance",
        question: "Can I increase my insurance coverage later?",
        answer: "Yes! You can increase your sum assured on policy anniversaries or during special life events (marriage, childbirth, home purchase). Additional medical underwriting may be required for significant increases."
    },
    {
        category: "security",
        question: "How do you protect my personal information?",
        answer: "We use 256-bit SSL encryption, multi-factor authentication, biometric login options, and regular security audits. Your data is stored in secure, encrypted databases. We never share your information without consent."
    },
    {
        category: "security",
        question: "What should I do if I suspect fraud?",
        answer: "Immediately call our 24/7 fraud hotline at 1800-123-4567, block your cards through the app, change your passwords, and report the incident. We'll freeze suspicious transactions and investigate within 24 hours."
    },
    {
        category: "security",
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your registered email or phone number, verify your identity with OTP, and create a new password. For additional security, you may need to answer security questions."
    },
    {
        category: "security",
        question: "Do you offer two-factor authentication?",
        answer: "Yes! We strongly recommend enabling 2FA. Options include SMS OTP, email OTP, authenticator apps (Google Authenticator, Authy), and biometric authentication (fingerprint, face ID) on mobile devices."
    },
    {
        category: "documents",
        question: "What documents do I need to open an account?",
        answer: "You need: 1) Government-issued photo ID (Aadhaar, Passport, Driver's License), 2) Address proof (utility bill, rental agreement), 3) PAN card for tax purposes, and 4) Recent passport-size photograph. All can be uploaded digitally."
    },
    {
        category: "documents",
        question: "How do I upload documents?",
        answer: "Log into your account, go to 'Documents' section, click 'Upload', select the document type, take a photo or upload from your device, and submit. We accept JPG, PNG, and PDF formats up to 5MB per file."
    },
    {
        category: "documents",
        question: "How long are documents stored?",
        answer: "We securely store your documents for the duration of your relationship with us plus 7 years as per regulatory requirements. You can download your documents anytime from your account dashboard."
    },
    {
        category: "documents",
        question: "Can I get my account statements?",
        answer: "Yes! Download statements for any period from your online banking dashboard. Statements are available in PDF format. You can also request physical statements to be mailed to your registered address."
    },
]

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

    // Track FAQ interactions
    const handleFAQClick = (question: string, category: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'faq_interaction', {
                question: question,
                category: category
            })
        }
    }

    // Filter FAQs based on search and category
    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = searchQuery === "" ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = activeCategory === "all" || faq.category === activeCategory

        return matchesSearch && matchesCategory
    })

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
                                <HelpCircle className="mr-1 h-3 w-3" />
                                Frequently Asked Questions
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                How Can We Help You?
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Find answers to common questions about our products and services.
                            </p>

                            {/* Search Bar */}
                            <div className="relative mt-8">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for answers..."
                                    className="h-14 pl-12 text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                            {/* Category Tabs */}
                            <div className="mb-8 overflow-x-auto">
                                <TabsList className="inline-flex h-auto w-full min-w-max justify-start gap-2 bg-transparent p-0">
                                    {faqCategories.map((category) => (
                                        <TabsTrigger
                                            key={category.id}
                                            value={category.id}
                                            className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                        >
                                            <category.icon className="h-4 w-4" />
                                            {category.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {/* FAQ Accordion */}
                            <TabsContent value={activeCategory} className="mt-0">
                                {filteredFAQs.length > 0 ? (
                                    <Accordion type="single" collapsible className="space-y-4">
                                        {filteredFAQs.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${index}`}
                                                className="rounded-lg border border-border bg-card px-6 data-[state=open]:shadow-md"
                                            >
                                                <AccordionTrigger
                                                    className="text-left hover:no-underline"
                                                    onClick={() => handleFAQClick(faq.question, faq.category)}
                                                >
                                                    <span className="font-semibold text-foreground pr-4">
                                                        {faq.question}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <div className="py-12 text-center">
                                        <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <h3 className="mt-4 text-lg font-semibold text-foreground">No results found</h3>
                                        <p className="mt-2 text-muted-foreground">
                                            Try adjusting your search or browse different categories.
                                        </p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>

                        {/* Still Need Help Section */}
                        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center sm:p-12">
                            <Phone className="mx-auto h-12 w-12 text-primary" />
                            <h2 className="mt-4 text-2xl font-bold text-foreground">
                                Still Need Help?
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Our support team is available 24/7 to assist you with any questions.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/support">Contact Support</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="tel:1800-123-4567">Call 1800-123-4567</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
