"use client"

import React from "react"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  FileText,
  Calculator,
  Users,
  BadgeCheck,
  Percent,
  Calendar,
  Banknote,
  HelpCircle
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const productsData: Record<string, {
  title: string
  tagline: string
  description: string
  category: string
  interestRate: string
  processingFee: string
  tenure: string
  minAmount: string
  maxAmount: string
  rating: number
  reviews: number
  features: { title: string; description: string }[]
  eligibility: { label: string; value: string }[]
  documents: string[]
  benefits: string[]
  faqs: { question: string; answer: string }[]
}> = {
  "savings-account": {
    title: "Premium Savings Account",
    tagline: "Earn more on every rupee you save",
    description: "Our Premium Savings Account offers one of the highest interest rates in the industry with zero balance requirements. Enjoy instant access to your funds, free unlimited transactions, and a complimentary premium debit card.",
    category: "Accounts",
    interestRate: "7.5% p.a.",
    processingFee: "Zero",
    tenure: "N/A",
    minAmount: "$0",
    maxAmount: "Unlimited",
    rating: 4.8,
    reviews: 2840,
    features: [
      { title: "Zero Balance Account", description: "No minimum balance requirement ever. Bank freely without worrying about charges." },
      { title: "High Interest Rate", description: "Earn up to 7.5% per annum on your savings, calculated daily and credited monthly." },
      { title: "Free Debit Card", description: "Complimentary premium debit card with up to $500,000 ATM withdrawal limit." },
      { title: "Unlimited Transfers", description: "Free unlimited NEFT/RTGS/IMPS transfers to any bank account." },
      { title: "24/7 Support", description: "Round the clock customer support via chat, call, and email." },
      { title: "Mobile Banking", description: "Full-featured mobile app for seamless banking on the go." },
    ],
    eligibility: [
      { label: "Age", value: "18 - 70 years" },
      { label: "Citizenship", value: "US Resident / Citizen" },
      { label: "ID Proof", value: "Valid government ID" },
      { label: "Address Proof", value: "Utility bill / Bank statement" },
    ],
    documents: [
      "Government-issued photo ID (Passport, Driver's License)",
      "Proof of address (Utility bill, Bank statement)",
      "Recent passport-size photograph",
      "Social Security Number",
    ],
    benefits: [
      "Industry-leading interest rate of 7.5% p.a.",
      "Zero charges on digital transactions",
      "Instant money transfers 24/7",
      "Exclusive merchant discounts",
      "Free insurance coverage up to $100,000",
      "Priority customer service",
    ],
    faqs: [
      { question: "What is the minimum balance required?", answer: "There is no minimum balance requirement for our Premium Savings Account. You can maintain any balance including zero." },
      { question: "How is interest calculated?", answer: "Interest is calculated on the daily closing balance and credited to your account monthly." },
      { question: "Can I open an account online?", answer: "Yes, you can open an account completely online with video KYC in just 10 minutes." },
      { question: "What are the ATM withdrawal limits?", answer: "You can withdraw up to $1,000 per transaction and $5,000 per day from any ATM." },
    ],
  },
  "personal-loan": {
    title: "Personal Loan",
    tagline: "Quick funds for all your needs",
    description: "Get instant approval on personal loans with minimal documentation. Whether it's a wedding, vacation, medical emergency, or home renovation, our personal loan comes with competitive interest rates and flexible repayment options.",
    category: "Loans",
    interestRate: "10.5% - 18% p.a.",
    processingFee: "Up to 2%",
    tenure: "12 - 60 months",
    minAmount: "$1,000",
    maxAmount: "$50,000",
    rating: 4.6,
    reviews: 3200,
    features: [
      { title: "Instant Approval", description: "Get loan approval in as little as 2 minutes with our AI-powered underwriting." },
      { title: "Minimal Documentation", description: "Just 2 documents needed - ID proof and income proof. That's it!" },
      { title: "Flexible Tenure", description: "Choose a repayment period from 12 to 60 months based on your comfort." },
      { title: "No Collateral", description: "Completely unsecured loan. No need to pledge any assets or property." },
      { title: "Quick Disbursement", description: "Amount credited to your account within 24 hours of approval." },
      { title: "Prepayment Option", description: "Close your loan early with minimal prepayment charges after 6 months." },
    ],
    eligibility: [
      { label: "Age", value: "21 - 58 years" },
      { label: "Employment", value: "Salaried / Self-employed" },
      { label: "Min. Income", value: "$25,000 p.a." },
      { label: "Credit Score", value: "650+" },
    ],
    documents: [
      "Government-issued photo ID",
      "Last 3 months salary slips (for salaried)",
      "Last 2 years ITR (for self-employed)",
      "Bank statements for 6 months",
    ],
    benefits: [
      "No hidden charges or surprises",
      "Transparent interest calculation",
      "EMI as low as $100/month",
      "Special rates for existing customers",
      "Free loan insurance cover",
      "Dedicated relationship manager",
    ],
    faqs: [
      { question: "How quickly can I get the loan?", answer: "Once approved, the loan amount is disbursed within 24 hours directly to your bank account." },
      { question: "Can I prepay my loan?", answer: "Yes, you can prepay after 6 EMIs with a nominal prepayment charge of 2-3% on the outstanding principal." },
      { question: "What if I miss an EMI?", answer: "A late payment fee of $25 will be charged. We recommend setting up auto-debit to avoid missing payments." },
      { question: "Can I increase my loan amount later?", answer: "Yes, you can apply for a top-up loan after paying 12 EMIs on time." },
    ],
  },
  "home-loan": {
    title: "Home Loan",
    tagline: "Turn your dream home into reality",
    description: "Our home loan comes with one of the lowest interest rates in the market. Whether you're buying your first home, constructing a new one, or renovating your existing property, we've got you covered with flexible financing options.",
    category: "Loans",
    interestRate: "8.5% - 10% p.a.",
    processingFee: "0.5%",
    tenure: "Up to 30 years",
    minAmount: "$25,000",
    maxAmount: "$500,000",
    rating: 4.9,
    reviews: 4100,
    features: [
      { title: "Lowest Interest Rates", description: "Starting from just 8.5% p.a. - one of the most competitive rates in the industry." },
      { title: "Long Tenure", description: "Repayment period up to 30 years for comfortable monthly installments." },
      { title: "High Loan Amount", description: "Finance up to 90% of the property value with loans up to $500,000." },
      { title: "Balance Transfer", description: "Transfer your existing home loan to us and save on interest." },
      { title: "Top-up Facility", description: "Get additional funds on your existing home loan at attractive rates." },
      { title: "Doorstep Service", description: "Our executives will visit you for documentation and processing." },
    ],
    eligibility: [
      { label: "Age", value: "23 - 65 years" },
      { label: "Employment", value: "Salaried / Self-employed" },
      { label: "Min. Income", value: "$40,000 p.a." },
      { label: "Credit Score", value: "700+" },
    ],
    documents: [
      "Government-issued photo ID and address proof",
      "Income proof (salary slips / ITR)",
      "Property documents",
      "Bank statements for 6 months",
      "Employment/Business proof",
    ],
    benefits: [
      "Tax benefits under Section 24 and 80C",
      "No prepayment charges for floating rate",
      "Free property legal verification",
      "Dedicated home loan advisor",
      "Online tracking of application",
      "Flexible EMI options",
    ],
    faqs: [
      { question: "What is the maximum loan amount I can get?", answer: "You can get up to 90% of the property value or $500,000, whichever is lower, based on your eligibility." },
      { question: "Can I transfer my existing home loan?", answer: "Yes, you can transfer your home loan from another bank and benefit from our lower interest rates." },
      { question: "Are there any prepayment charges?", answer: "No prepayment charges for floating rate home loans. Fixed rate loans may have nominal charges." },
      { question: "How long does the approval process take?", answer: "Typically 5-7 working days from submission of all documents." },
    ],
  },
  "life-insurance": {
    title: "Term Life Insurance",
    tagline: "Protect your loved ones' future",
    description: "Our Term Life Insurance provides financial security to your family in your absence. With high sum assured at affordable premiums, you can ensure your loved ones maintain their lifestyle and achieve their dreams.",
    category: "Insurance",
    interestRate: "N/A",
    processingFee: "Zero",
    tenure: "10 - 40 years",
    minAmount: "$100,000",
    maxAmount: "$1,000,000",
    rating: 4.8,
    reviews: 2100,
    features: [
      { title: "High Sum Assured", description: "Coverage up to $1,000,000 to secure your family's future completely." },
      { title: "Affordable Premiums", description: "Get coverage starting at just $10/month - less than your daily coffee." },
      { title: "Critical Illness Cover", description: "Optional rider covering 34 critical illnesses with lump sum payout." },
      { title: "Accidental Death Benefit", description: "Additional payout in case of death due to accident." },
      { title: "99% Claim Settlement", description: "Industry-leading claim settlement ratio for peace of mind." },
      { title: "Tax Benefits", description: "Premiums eligible for tax deduction under Section 80C." },
    ],
    eligibility: [
      { label: "Age", value: "18 - 65 years" },
      { label: "Health", value: "Medical checkup may be required" },
      { label: "Income", value: "Based on sum assured" },
      { label: "Citizenship", value: "US Resident" },
    ],
    documents: [
      "Government-issued photo ID",
      "Age proof (Birth certificate / Passport)",
      "Income proof for high sum assured",
      "Medical reports (if applicable)",
    ],
    benefits: [
      "Life cover up to 100x annual income",
      "Flexible premium payment options",
      "Option to increase cover at life events",
      "Return of premium variant available",
      "Nominee can be changed anytime",
      "Policy revival within 5 years",
    ],
    faqs: [
      { question: "What happens if I stop paying premiums?", answer: "You have a 30-day grace period. After that, the policy lapses but can be revived within 5 years with some conditions." },
      { question: "Can I increase my coverage later?", answer: "Yes, you can increase coverage at key life events like marriage or childbirth without fresh medical tests." },
      { question: "Is medical examination mandatory?", answer: "For sum assured up to $250,000, no medical exam is needed. Higher amounts may require a basic health checkup." },
      { question: "How long does claim settlement take?", answer: "We process and settle valid claims within 7-10 working days of receiving all documents." },
    ],
  },
}

// Fallback for other product slugs
const defaultProduct = {
  title: "Product",
  tagline: "Quality financial product",
  description: "This product offers excellent features and benefits tailored to your financial needs.",
  category: "General",
  interestRate: "Competitive",
  processingFee: "Minimal",
  tenure: "Flexible",
  minAmount: "$1,000",
  maxAmount: "$100,000",
  rating: 4.5,
  reviews: 1000,
  features: [
    { title: "Feature 1", description: "Excellent feature for your needs." },
    { title: "Feature 2", description: "Another great benefit." },
  ],
  eligibility: [
    { label: "Age", value: "18 - 65 years" },
    { label: "Citizenship", value: "US Resident" },
  ],
  documents: ["Government ID", "Address Proof"],
  benefits: ["Great rates", "Easy application"],
  faqs: [
    { question: "How do I apply?", answer: "Click the Apply Now button to get started." },
  ],
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = productsData[slug] || defaultProduct
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-foreground">Products</Link>
              <span>/</span>
              <span className="text-foreground">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 sm:py-16">
          <div 
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
              {/* Left Content */}
              <div className="flex-1">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Products
                </Link>
                <Badge variant="secondary" className="mb-4">{product.category}</Badge>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-2 text-xl text-primary font-medium">{product.tagline}</p>
                <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
                
                {/* Rating */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href={`/apply/${slug}`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-transparent">
                    <Link href="/support">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Get Help
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right - Quick Info Card */}
              <Card className="w-full lg:w-96 shrink-0">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>Interest Rate</span>
                    </div>
                    <span className="font-semibold text-primary">{product.interestRate}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Banknote className="h-4 w-4" />
                      <span>Processing Fee</span>
                    </div>
                    <span className="font-semibold text-foreground">{product.processingFee}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Tenure</span>
                    </div>
                    <span className="font-semibold text-foreground">{product.tenure}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calculator className="h-4 w-4" />
                      <span>Amount Range</span>
                    </div>
                    <span className="font-semibold text-foreground">{product.minAmount} - {product.maxAmount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Info Tabs */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
              </TabsList>

              {/* Features Tab */}
              <TabsContent value="features" className="mt-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {product.features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                </div>
              </TabsContent>

              {/* Eligibility Tab */}
              <TabsContent value="eligibility" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      Eligibility Criteria
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Check if you meet the requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {product.eligibility.map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-semibold text-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <FileText className="h-5 w-5 text-primary" />
                      Required Documents
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Keep these documents ready for quick processing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Benefits Tab */}
              <TabsContent value="benefits" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                      Key Benefits
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Why choose this product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {product.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <h4 className="font-semibold text-foreground">{faq.question}</h4>
                          <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Ready to get started?</h3>
                <p className="mt-2 text-muted-foreground">Apply now and get a decision within minutes.</p>
              </div>
              <div className="flex gap-4">
                <Button size="lg" variant="outline" asChild className="bg-transparent">
                  <Link href="/support">Talk to Expert</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href={`/apply/${slug}`}>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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

function FeatureCard({ feature, index }: { feature: { title: string; description: string }, index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <Card 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-500 hover:shadow-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <CardHeader className="pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
          <Shield className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  )
}
