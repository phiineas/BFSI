"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle2,
  Download,
  Mail,
  Phone,
  ArrowRight,
  Copy,
  Clock,
  FileText
} from "lucide-react"

const productNames: Record<string, string> = {
  "savings-account": "Premium Savings Account",
  "salary-account": "Salary Account",
  "personal-loan": "Personal Loan",
  "home-loan": "Home Loan",
  "car-loan": "Car Loan",
  "life-insurance": "Term Life Insurance",
  "health-insurance": "Health Insurance",
  "investment-plan": "Investment Plans",
}

export default function SuccessPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = use(params)
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  const productName = productNames[product] || "Financial Product"
  const applicationId = `SB${Date.now().toString().slice(-8)}`

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            {/* Success Animation */}
            <div className="relative mb-8">
              <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 transition-transform duration-500 ${showConfetti ? "scale-110" : "scale-100"}`}>
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              {showConfetti && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-2 w-2 rounded-full animate-ping"
                      style={{
                        backgroundColor: ["#f97316", "#22c55e", "#3b82f6", "#a855f7"][i % 4],
                        transform: `rotate(${i * 30}deg) translateY(-50px)`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Application Submitted!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for applying for {productName}. Your application has been successfully submitted and is being processed.
            </p>

            {/* Application ID Card */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Application Reference Number</p>
                    <p className="text-2xl font-bold text-foreground tracking-wider">{applicationId}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    className="bg-transparent"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Document Verification</p>
                      <p className="text-sm text-muted-foreground">Our team will verify the documents you submitted.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Application Review</p>
                      <p className="text-sm text-muted-foreground">Your application will be reviewed by our underwriting team.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Final Decision</p>
                      <p className="text-sm text-muted-foreground">You will receive the decision via email and SMS within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Expected processing time: 24-48 hours</span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/products">
                  <FileText className="mr-2 h-4 w-4" />
                  Explore More Products
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 rounded-lg bg-muted/50 p-6">
              <h4 className="font-medium text-foreground mb-4">Need assistance?</h4>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a 
                  href="mailto:support@securebank.com" 
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  support@securebank.com
                </a>
                <a 
                  href="tel:1800-123-4567" 
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  1800-123-4567 (Toll Free)
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
