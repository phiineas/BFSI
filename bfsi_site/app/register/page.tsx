"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, User, Phone, Loader2, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

type RegistrationStep = "form" | "otp" | "success"

export default function RegisterPage() {
    const router = useRouter()
    const { registerWithEmail, verifyOTP, isLoading, user } = useAuth()
    const [step, setStep] = useState<RegistrationStep>("form")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [otpError, setOtpError] = useState("")
    const [otpTimer, setOtpTimer] = useState(0)
    const [canResendOTP, setCanResendOTP] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })

    useEffect(() => {
        if (user) router.push("/products")
    }, [user, router])

    useEffect(() => {
        const password = formData.password
        let strength = 0
        if (password.length >= 8) strength++
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
        if (password.match(/[0-9]/)) strength++
        if (password.match(/[^a-zA-Z0-9]/)) strength++
        setPasswordStrength(strength)
    }, [formData.password])

    useEffect(() => {
        if (otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
        if (otpTimer === 0 && step === "otp") setCanResendOTP(true)
    }, [otpTimer, step])

    const getPasswordStrengthColor = () => {
        const colors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"]
        return colors[passwordStrength]
    }

    const getPasswordStrengthText = () => {
        const texts = ["", "Weak", "Fair", "Good", "Strong"]
        return texts[passwordStrength]
    }

    const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        setError("")
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
                throw new Error("Please fill in all required fields")
            }
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match")
            }
            if (!formData.agreeToTerms) {
                throw new Error("You must agree to the Terms")
            }
            await registerWithEmail(formData.email, formData.password, formData.fullName, formData.phone)
            setStep("otp")
            setOtpTimer(30)
            setCanResendOTP(false)
            toast.success("OTP sent to your email!")
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Registration failed"
            setError(msg)
            toast.error(msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOTPChange = (index: number, value: string) => {
        if (value.length > 1) return
        const newOTP = [...otp]
        newOTP[index] = value
        setOtp(newOTP)
        setOtpError("")
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
            nextInput?.focus()
        }
    }

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setOtpError("")
        setIsSubmitting(true)
        try {
            const otpCode = otp.join("")
            if (otpCode.length !== 6) throw new Error("Please enter all 6 digits")
            await verifyOTP(formData.email, otpCode)
            setStep("success")
            toast.success("Account created!")
            setTimeout(() => router.push("/products"), 2000)
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Verification failed"
            setOtpError(msg)
            toast.error(msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendOTP = async () => {
        setCanResendOTP(false)
        setOtpTimer(30)
        setOtp(["", "", "", "", "", ""])
        try {
            await registerWithEmail(formData.email, formData.password, formData.fullName, formData.phone)
            toast.success("OTP resent!")
        } catch (err) {
            toast.error("Failed to resend OTP")
        }
    }

    if (step === "success") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="w-full max-w-md space-y-8 text-center">
                    <CheckCircle2 className="h-20 w-20 text-green-500 animate-bounce mx-auto" />
                    <h2 className="text-3xl font-bold text-foreground">Account Created!</h2>
                    <p className="text-muted-foreground">Redirecting to products...</p>
                </div>
            </div>
        )
    }

    if (step === "otp") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-6">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-foreground">Verify Email</h2>
                        <p className="mt-2 text-muted-foreground">Code sent to {formData.email}</p>
                    </div>
                    {otpError && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{otpError}</div>}
                    <form onSubmit={handleOTPSubmit} className="space-y-6">
                        <div className="flex justify-center gap-3">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOTPChange(i, e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-12 h-12 text-center text-2xl font-bold border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                />
                            ))}
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary py-6">
                            {isSubmitting ? <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Verifying...
                            </> : "Verify Code"}
                        </Button>
                        {otpTimer > 0 ? (
                            <p className="text-center text-sm text-muted-foreground">Resend OTP in {otpTimer}s</p>
                        ) : (
                            <Button type="button" onClick={handleResendOTP} variant="outline" className="w-full">
                                Resend OTP
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden p-12">
                <Link href="/" className="flex items-center gap-3 mb-16">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-primary">
                        <Shield className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">SecureBank</span>
                </Link>
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold text-white leading-tight">
                        Join SecureBank<br /><span className="text-primary">Start Banking Smarter</span>
                    </h1>
                    <p className="text-lg text-white/70 max-w-md">
                        Create your account and experience modern banking with industry-leading security.
                    </p>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background lg:w-1/2">
                <div className="w-full max-w-md space-y-6">
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <Shield className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">SecureBank</span>
                    </div>
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
                        <p className="mt-2 text-muted-foreground">Join secure banking</p>
                    </div>
                    {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {[
                            { name: "fullName", label: "Full Name", icon: User },
                            { name: "email", label: "Email", type: "email", icon: Mail },
                            { name: "phone", label: "Phone", type: "tel", icon: Phone },
                        ].map(({ name, label, type, icon: Icon }) => (
                            <div key={name} className="space-y-2">
                                <label className="text-sm font-medium">{label}</label>
                                <div className="relative">
                                    <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <input
                                        name={name}
                                        type={type || "text"}
                                        required
                                        disabled={isSubmitting}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleFormChange}
                                        className="w-full pl-10 pr-3 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
                                        placeholder={label}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isSubmitting}
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    className="w-full pl-10 pr-10 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
                                    placeholder="••••••••"
                                />
                                <button type="button" disabled={isSubmitting} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div key={level} className={`h-1 flex-1 rounded-full ${level <= passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"}`} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    disabled={isSubmitting}
                                    value={formData.confirmPassword}
                                    onChange={handleFormChange}
                                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 outline-none disabled:opacity-50 ${
                                        formData.confirmPassword ? (passwordsMatch ? "border-green-500" : "border-red-500") : "border-input"
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button type="button" disabled={isSubmitting} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3">
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <input
                                name="agreeToTerms"
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleFormChange}
                                disabled={isSubmitting}
                                className="mt-1 w-4 h-4"
                            />
                            <label className="text-sm text-foreground">
                                I agree to <Link href="/terms" className="text-primary hover:text-primary/80">Terms</Link> and <Link href="/privacy" className="text-primary hover:text-primary/80">Privacy</Link>
                            </label>
                        </div>
                        <Button type="submit" disabled={isSubmitting || isLoading} className="w-full bg-primary py-6">
                            {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating...</> : <>Create Account<ArrowRight className="ml-2 h-5 w-5" /></>}
                        </Button>
                        <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/login")}>
                            Log In Instead
                        </Button>
                    </form>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Protected by 256-bit SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
