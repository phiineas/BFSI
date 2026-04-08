"use client"

import React from "react"

import { use, useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Shield,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  ArrowRight
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

export default function VerifyPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = use(params)
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const productName = productNames[product] || "Financial Product"

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char
    })
    setOtp(newOtp)
  }

  const handleResend = async () => {
    setIsResending(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsResending(false)
    setResendTimer(30)
    setOtp(["", "", "", "", "", ""])
    setError("")
  }

  const handleVerify = async () => {
    const otpString = otp.join("")
    
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP")
      return
    }

    setIsVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // For demo, accept any OTP
    router.push(`/apply/${product}/success`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <div className="mx-auto max-w-md px-4 sm:px-6">
            <Card className="w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-foreground">Verify Your Phone</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We&apos;ve sent a 6-digit verification code to your registered phone number ending in ****1234
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* OTP Input */}
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className={`h-14 w-12 text-center text-xl font-semibold ${
                          error ? "border-destructive" : ""
                        }`}
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-center text-sm text-destructive">{error}</p>
                  )}
                </div>

                {/* Verify Button */}
                <Button 
                  onClick={handleVerify} 
                  disabled={isVerifying}
                  className="w-full"
                  size="lg"
                >
                  {isVerifying ? (
                    <>
                      <span className="animate-spin mr-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Resend */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend code in <span className="font-semibold text-foreground">{resendTimer}s</span>
                    </p>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={handleResend}
                      disabled={isResending}
                      className="text-primary"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend OTP
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Info */}
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    For demo purposes, enter any 6 digits to proceed.
                  </p>
                </div>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Your verification is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>

            {/* Application Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Applying for <span className="font-medium text-foreground">{productName}</span>
              </p>
              <Link 
                href={`/apply/${product}`}
                className="text-sm text-primary hover:underline"
              >
                Edit application
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
