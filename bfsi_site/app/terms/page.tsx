"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function TermsPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
                    <div
                        ref={heroRef as React.RefObject<HTMLDivElement>}
                        className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="text-center">
                            <Badge variant="secondary" className="mb-4">
                                <FileText className="mr-1 h-3 w-3" />
                                Legal
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Terms & Conditions
                            </h1>
                            <p className="mt-4 text-muted-foreground">Last updated: January 24, 2026</p>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using SecureBank's services, you accept and agree to be bound by the terms and provision of this agreement.
                                If you do not agree to abide by the above, please do not use this service.
                            </p>

                            <h2>2. Use of Services</h2>
                            <p>
                                You agree to use SecureBank services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
                            </p>
                            <ul>
                                <li>In any way that violates any applicable national or international law or regulation</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                                <li>To impersonate or attempt to impersonate SecureBank, a SecureBank employee, another user, or any other person or entity</li>
                            </ul>

                            <h2>3. Account Registration</h2>
                            <p>
                                To access certain features of our services, you must register for an account. When you register, you agree to:
                            </p>
                            <ul>
                                <li>Provide accurate, current, and complete information</li>
                                <li>Maintain and promptly update your account information</li>
                                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                                <li>Immediately notify us if you discover or suspect any security breaches</li>
                            </ul>

                            <h2>4. Privacy and Data Protection</h2>
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                            </p>

                            <h2>5. Financial Services</h2>
                            <p>
                                All financial products and services offered by SecureBank are subject to approval and compliance with applicable regulations.
                                Interest rates, fees, and charges are subject to change without prior notice.
                            </p>

                            <h2>6. Limitation of Liability</h2>
                            <p>
                                SecureBank shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use
                                or inability to use our services.
                            </p>

                            <h2>7. Intellectual Property</h2>
                            <p>
                                All content, features, and functionality of SecureBank services are owned by SecureBank and are protected by international
                                copyright, trademark, and other intellectual property laws.
                            </p>

                            <h2>8. Termination</h2>
                            <p>
                                We may terminate or suspend your account and access to our services immediately, without prior notice or liability,
                                for any reason, including breach of these Terms.
                            </p>

                            <h2>9. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>

                            <h2>10. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page
                                and updating the "Last updated" date.
                            </p>

                            <h2>11. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <ul>
                                <li>Email: legal@securebank.com</li>
                                <li>Phone: 1800-XXX-XXXX</li>
                                <li>Address: SecureBank Tower, Mumbai - 400051</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
