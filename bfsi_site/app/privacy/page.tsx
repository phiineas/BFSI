"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function PrivacyPage() {
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
                                <Shield className="mr-1 h-3 w-3" />
                                Privacy
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Privacy Policy
                            </h1>
                            <p className="mt-4 text-muted-foreground">Last updated: January 24, 2026</p>
                        </div>
                    </div>
                </section>

                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <h2>1. Introduction</h2>
                            <p>
                                SecureBank ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you use our services.
                            </p>

                            <h2>2. Information We Collect</h2>
                            <h3>Personal Information</h3>
                            <p>We collect personal information that you provide to us, including:</p>
                            <ul>
                                <li>Name, email address, phone number, and postal address</li>
                                <li>Date of birth and government-issued identification numbers</li>
                                <li>Financial information such as bank account details and credit history</li>
                                <li>Employment information and income details</li>
                            </ul>

                            <h3>Automatically Collected Information</h3>
                            <p>When you use our services, we automatically collect:</p>
                            <ul>
                                <li>Device information (IP address, browser type, operating system)</li>
                                <li>Usage data (pages visited, time spent, features used)</li>
                                <li>Location data (with your permission)</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our banking services</li>
                                <li>Process transactions and send related information</li>
                                <li>Verify your identity and prevent fraud</li>
                                <li>Comply with legal obligations and regulatory requirements</li>
                                <li>Send you marketing communications (with your consent)</li>
                                <li>Analyze usage patterns and improve user experience</li>
                            </ul>

                            <h2>4. Information Sharing and Disclosure</h2>
                            <p>We may share your information with:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf</li>
                                <li><strong>Regulatory Authorities:</strong> Government agencies and regulatory bodies as required by law</li>
                                <li><strong>Business Partners:</strong> With your consent, for joint marketing initiatives</li>
                                <li><strong>Legal Requirements:</strong> When required to comply with legal processes or protect our rights</li>
                            </ul>

                            <h2>5. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your information, including:
                            </p>
                            <ul>
                                <li>256-bit SSL encryption for data transmission</li>
                                <li>Multi-factor authentication</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Employee training on data protection</li>
                                <li>Secure data centers with physical and digital safeguards</li>
                            </ul>

                            <h2>6. Your Rights and Choices</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access and review your personal information</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent for data processing</li>
                                <li>Lodge a complaint with data protection authorities</li>
                            </ul>

                            <h2>7. Data Retention</h2>
                            <p>
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
                                unless a longer retention period is required by law.
                            </p>

                            <h2>8. Cookies and Tracking Technologies</h2>
                            <p>
                                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your
                                browser settings, but disabling cookies may limit certain features.
                            </p>

                            <h2>9. Children's Privacy</h2>
                            <p>
                                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information
                                from children.
                            </p>

                            <h2>10. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and processed in countries other than your country of residence. We ensure
                                appropriate safeguards are in place for such transfers.
                            </p>

                            <h2>11. Changes to This Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new
                                Privacy Policy on this page and updating the "Last updated" date.
                            </p>

                            <h2>12. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <ul>
                                <li>Email: privacy@securebank.com</li>
                                <li>Phone: 1800-XXX-XXXX</li>
                                <li>Address: Data Protection Officer, SecureBank Tower, Mumbai - 400051</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
