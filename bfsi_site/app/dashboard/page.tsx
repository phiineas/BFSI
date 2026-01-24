"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Wallet,
    TrendingUp,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Send,
    Plus,
    BarChart3,
    Clock
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const accounts = [
    { name: "Savings Account", number: "****4521", balance: "$45,280.50", type: "savings" },
    { name: "Checking Account", number: "****7832", balance: "$12,450.00", type: "checking" },
]

const recentTransactions = [
    { id: 1, description: "Salary Credit", amount: "+$5,000.00", date: "Jan 24, 2026", type: "credit" },
    { id: 2, description: "Amazon Purchase", amount: "-$124.99", date: "Jan 23, 2026", type: "debit" },
    { id: 3, description: "Electricity Bill", amount: "-$85.50", date: "Jan 22, 2026", type: "debit" },
    { id: 4, description: "Interest Credited", amount: "+$45.20", date: "Jan 20, 2026", type: "credit" },
]

const quickActions = [
    { icon: Send, label: "Transfer Money", href: "/dashboard/transfer" },
    { icon: Plus, label: "Add Money", href: "/dashboard/add-money" },
    { icon: CreditCard, label: "Pay Bills", href: "/dashboard/bills" },
    { icon: BarChart3, label: "View Reports", href: "/dashboard/reports" },
]

export default function DashboardPage() {
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header forceScrolled />
            <main className="flex-1 pt-16">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-8 sm:py-12">
                    <div
                        ref={heroRef as React.RefObject<HTMLDivElement>}
                        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
                                <p className="mt-2 text-muted-foreground">Here's your financial overview</p>
                            </div>
                            <Badge variant="secondary" className="hidden sm:flex">
                                <Clock className="mr-1 h-3 w-3" />
                                Last login: Today, 10:30 AM
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="py-8 sm:py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Accounts Overview */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Your Accounts</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {accounts.map((account) => (
                                    <Card key={account.number} className="transition-all duration-300 hover:shadow-lg">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <Wallet className="h-5 w-5 text-primary" />
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <CardTitle className="mt-4">{account.name}</CardTitle>
                                            <CardDescription>{account.number}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-bold text-foreground">{account.balance}</div>
                                            <Button variant="link" className="mt-4 p-0 h-auto" asChild>
                                                <Link href="/dashboard/accounts">View Details →</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Card className="border-dashed transition-all duration-300 hover:shadow-lg hover:border-primary">
                                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                                            <Plus className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="mt-4 font-medium text-foreground">Open New Account</p>
                                        <Button variant="link" className="mt-2" asChild>
                                            <Link href="/products">Explore Products</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Recent Transactions */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Recent Transactions</CardTitle>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href="/dashboard/transactions">View All</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentTransactions.map((transaction) => (
                                                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${transaction.type === "credit" ? "bg-green-500/10" : "bg-red-500/10"
                                                            }`}>
                                                            {transaction.type === "credit" ? (
                                                                <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                            ) : (
                                                                <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-foreground">{transaction.description}</p>
                                                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`font-semibold ${transaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-foreground"
                                                        }`}>
                                                        {transaction.amount}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                        <CardDescription>Frequently used services</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            {quickActions.map((action) => (
                                                <Link
                                                    key={action.label}
                                                    href={action.href}
                                                    className="flex flex-col items-center gap-3 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary/5"
                                                >
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                        <action.icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <span className="text-sm font-medium text-center text-foreground">{action.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-primary" />
                                            Spending Insights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-muted-foreground">This Month</span>
                                                    <span className="text-sm font-semibold text-foreground">$2,450</span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: "65%" }} />
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href="/dashboard/analytics">View Analytics</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
