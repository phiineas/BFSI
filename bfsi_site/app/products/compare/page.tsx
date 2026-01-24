"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    Wallet,
    Home,
    Car,
    Shield,
    TrendingUp,
    Info
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const products = [
    {
        id: "savings-account",
        name: "Premium Savings Account",
        category: "accounts",
        icon: Wallet,
        highlight: "7.5% p.a.",
        price: "Free",
        features: {
            "Interest Rate": "7.5% p.a.",
            "Minimum Balance": "Zero",
            "Monthly Fee": "₹0",
            "Debit Card": "Free",
            "ATM Withdrawals": "Unlimited",
            "Online Transfers": "Unlimited",
            "Overdraft Facility": "Available",
            "Lounge Access": "Not Available",
            "Insurance Cover": "₹1 Lakh",
            "Customer Support": "24/7",
        }
    },
    {
        id: "salary-account",
        name: "Salary Account",
        category: "accounts",
        icon: Wallet,
        highlight: "6.5% p.a.",
        price: "Free",
        features: {
            "Interest Rate": "6.5% p.a.",
            "Minimum Balance": "Zero",
            "Monthly Fee": "₹0",
            "Debit Card": "Premium",
            "ATM Withdrawals": "Unlimited",
            "Online Transfers": "Unlimited",
            "Overdraft Facility": "Available",
            "Lounge Access": "4 times/year",
            "Insurance Cover": "₹5 Lakh",
            "Customer Support": "Priority 24/7",
        }
    },
    {
        id: "personal-loan",
        name: "Personal Loan",
        category: "loans",
        icon: Car,
        highlight: "10.5% p.a.",
        price: "From ₹500/mo",
        features: {
            "Interest Rate": "10.5% p.a.",
            "Loan Amount": "Up to ₹50 Lakh",
            "Tenure": "1-5 years",
            "Processing Fee": "1% + GST",
            "Approval Time": "Instant",
            "Documentation": "Minimal",
            "Prepayment Charges": "Zero",
            "Collateral": "Not Required",
            "Income Requirement": "₹25,000/mo",
            "Credit Score": "650+",
        }
    },
    {
        id: "home-loan",
        name: "Home Loan",
        category: "loans",
        icon: Home,
        highlight: "8.5% p.a.",
        price: "From ₹5,000/mo",
        features: {
            "Interest Rate": "8.5% p.a.",
            "Loan Amount": "Up to ₹5 Crore",
            "Tenure": "Up to 30 years",
            "Processing Fee": "0.5% + GST",
            "Approval Time": "2-3 days",
            "Documentation": "Standard",
            "Prepayment Charges": "Zero after 1 year",
            "Collateral": "Property",
            "Income Requirement": "₹50,000/mo",
            "Credit Score": "700+",
        }
    },
    {
        id: "car-loan",
        name: "Car Loan",
        category: "loans",
        icon: Car,
        highlight: "9.5% p.a.",
        price: "From ₹2,000/mo",
        features: {
            "Interest Rate": "9.5% p.a.",
            "Loan Amount": "Up to ₹1 Crore",
            "Tenure": "1-7 years",
            "Processing Fee": "1% + GST",
            "Approval Time": "1-2 days",
            "Documentation": "Minimal",
            "Prepayment Charges": "Zero",
            "Collateral": "Vehicle",
            "Income Requirement": "₹30,000/mo",
            "Credit Score": "650+",
        }
    },
    {
        id: "life-insurance",
        name: "Term Life Insurance",
        category: "insurance",
        icon: Shield,
        highlight: "From ₹800/mo",
        price: "From ₹800/mo",
        features: {
            "Coverage Amount": "Up to ₹10 Crore",
            "Premium": "From ₹800/mo",
            "Policy Term": "10-40 years",
            "Critical Illness": "Available",
            "Accidental Death": "2x Sum Assured",
            "Tax Benefits": "Under 80C & 10(10D)",
            "Claim Settlement": "99%",
            "Medical Checkup": "Required above ₹1Cr",
            "Riders Available": "Yes",
            "Premium Payment": "Monthly/Yearly",
        }
    },
    {
        id: "health-insurance",
        name: "Health Insurance",
        category: "insurance",
        icon: Shield,
        highlight: "From ₹2,000/mo",
        price: "From ₹2,000/mo",
        features: {
            "Coverage Amount": "₹5-50 Lakh",
            "Premium": "From ₹2,000/mo",
            "Policy Term": "1-3 years",
            "Critical Illness": "Covered",
            "Accidental Death": "Not Covered",
            "Tax Benefits": "Under 80D",
            "Claim Settlement": "98%",
            "Medical Checkup": "Not Required",
            "Riders Available": "Yes",
            "Premium Payment": "Yearly",
        }
    },
]

const categories = [
    { id: "all", name: "All Products" },
    { id: "accounts", name: "Accounts" },
    { id: "loans", name: "Loans" },
    { id: "insurance", name: "Insurance" },
]

export default function CompareProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(p => p.category === selectedCategory)

    const compareProducts = products.filter(p => selectedProducts.includes(p.id))

    const toggleProduct = (productId: string) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId))
        } else {
            if (selectedProducts.length < 3) {
                setSelectedProducts([...selectedProducts, productId])

                // GA4 Event Tracking
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'product_compare_add', {
                        product_id: productId,
                        product_name: products.find(p => p.id === productId)?.name
                    })
                }
            }
        }
    }

    const allFeatureKeys = compareProducts.length > 0
        ? Array.from(new Set(compareProducts.flatMap(p => Object.keys(p.features))))
        : []

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
                                <TrendingUp className="mr-1 h-3 w-3" />
                                Compare & Choose
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Compare Our Products
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Select up to 3 products to compare features side-by-side and make an informed decision.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Product Selection */}
                <section className="py-12 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Category Filter */}
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-foreground">Filter by:</label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Badge variant="outline">
                                {selectedProducts.length} of 3 selected
                            </Badge>
                        </div>

                        {/* Product Cards */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => {
                                const isSelected = selectedProducts.includes(product.id)
                                const isDisabled = !isSelected && selectedProducts.length >= 3

                                return (
                                    <Card
                                        key={product.id}
                                        className={`relative cursor-pointer transition-all duration-300 ${isSelected
                                            ? "border-primary shadow-lg ring-2 ring-primary"
                                            : isDisabled
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:shadow-md hover:-translate-y-1"
                                            }`}
                                        onClick={() => !isDisabled && toggleProduct(product.id)}
                                    >
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                                    <product.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <Checkbox
                                                    checked={isSelected}
                                                    disabled={isDisabled}
                                                    onCheckedChange={() => !isDisabled && toggleProduct(product.id)}
                                                />
                                            </div>
                                            <CardTitle className="mt-4">{product.name}</CardTitle>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-primary">{product.highlight}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Starting from <span className="font-semibold text-foreground">{product.price}</span>
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                {compareProducts.length > 0 && (
                    <section className="bg-muted/30 py-12 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground">Feature Comparison</h2>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedProducts([])}
                                >
                                    Clear Selection
                                </Button>
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="p-4 text-left font-semibold text-foreground">Feature</th>
                                            {compareProducts.map(product => (
                                                <th key={product.id} className="p-4 text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                                            <product.icon className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <span className="font-semibold text-foreground">{product.name}</span>
                                                        <Badge>{product.highlight}</Badge>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allFeatureKeys.map((featureKey, index) => (
                                            <tr
                                                key={featureKey}
                                                className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-background'}`}
                                            >
                                                <td className="p-4 font-medium text-foreground">{featureKey}</td>
                                                {compareProducts.map(product => {
                                                    const value = (product.features as Record<string, string | undefined>)[featureKey]
                                                    const isAvailable = value && !value.toLowerCase().includes("not available")

                                                    return (
                                                        <td key={product.id} className="p-4 text-center">
                                                            {value ? (
                                                                <div className="flex items-center justify-center gap-2">
                                                                    {value.toLowerCase().includes("not available") ? (
                                                                        <>
                                                                            <XCircle className="h-4 w-4 text-destructive" />
                                                                            <span className="text-muted-foreground">{value}</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                                            <span className="text-foreground">{value}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="text-muted-foreground">-</span>
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))}
                                        <tr className="bg-muted">
                                            <td className="p-4 font-semibold">Action</td>
                                            {compareProducts.map(product => (
                                                <td key={product.id} className="p-4">
                                                    <Button asChild className="w-full">
                                                        <Link href={`/apply/${product.id}`}>
                                                            Apply Now
                                                            <ArrowRight className="ml-2 h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="lg:hidden space-y-6">
                                {compareProducts.map(product => (
                                    <Card key={product.id}>
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                                    <product.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <CardTitle>{product.name}</CardTitle>
                                                    <Badge className="mt-1">{product.highlight}</Badge>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {Object.entries(product.features).map(([key, value]) => (
                                                <div key={key} className="flex justify-between border-b border-border pb-2">
                                                    <span className="text-sm font-medium text-muted-foreground">{key}</span>
                                                    <span className="text-sm font-semibold text-foreground">{value}</span>
                                                </div>
                                            ))}
                                            <Button asChild className="w-full mt-4">
                                                <Link href={`/apply/${product.id}`}>
                                                    Apply Now
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {compareProducts.length === 0 && (
                    <section className="bg-muted/30 py-12 sm:py-20">
                        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                            <Info className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h3 className="mt-4 text-xl font-semibold text-foreground">
                                No Products Selected
                            </h3>
                            <p className="mt-2 text-muted-foreground">
                                Select up to 3 products from above to compare their features side-by-side.
                            </p>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    )
}
