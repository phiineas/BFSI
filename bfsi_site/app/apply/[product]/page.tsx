"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  User,
  Briefcase,
  FileText,
  CreditCard,
  Lock
} from "lucide-react"
import { trackFormStepCompleted, trackApplicationSubmitted, generateApplicationId } from "@/lib/analytics-events"

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

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Employment Info", icon: Briefcase },
  { id: 3, title: "Documents", icon: FileText },
  { id: 4, title: "Review & Submit", icon: CreditCard },
]

export default function ApplicationPage({ params }: { params: Promise<{ product: string }> }) {
  const { product } = use(params)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Employment Info
    employmentType: "",
    companyName: "",
    designation: "",
    monthlyIncome: "",
    workExperience: "",

    // Documents
    idType: "",
    idNumber: "",
    hasConsented: false,
  })

  const productName = productNames[product] || "Financial Product"
  const progress = (currentStep / steps.length) * 100

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Track form_step_completed event (CONVERSION)
      trackFormStepCompleted({
        product_id: product,
        product_category: product.includes('loan') ? 'loans' : product.includes('insurance') ? 'insurance' : 'accounts',
        form_step_number: currentStep,
        form_step_name: steps[currentStep - 1].title.toLowerCase().replace(/ /g, '_') as any,
        total_steps: steps.length,
        completion_percentage: (currentStep / steps.length) * 100,
      })

      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Track final form step completed (CONVERSION)
    trackFormStepCompleted({
      product_id: product,
      product_category: product.includes('loan') ? 'loans' : product.includes('insurance') ? 'insurance' : 'accounts',
      form_step_number: currentStep,
      form_step_name: 'review_and_submit',
      total_steps: steps.length,
      completion_percentage: 100,
    })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Track application_submitted event (CONVERSION)
    const applicationId = generateApplicationId()
    trackApplicationSubmitted({
      product_id: product,
      product_name: productName,
      product_category: product.includes('loan') ? 'loans' : product.includes('insurance') ? 'insurance' : 'accounts',
      application_id: applicationId,
      application_amount: parseFloat(formData.monthlyIncome?.split('-')[0] || '0'),
      application_tenure: 12,
      time_to_complete: 300, // 5 minutes average
    })

    router.push(`/apply/${product}/verify`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <Link
              href={`/products/${product}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Product
            </Link>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Apply for {productName}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Complete the application form below. It only takes a few minutes.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />

            {/* Step Indicators */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-2 ${step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                    }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${step.id === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : step.id < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-background"
                    }`}>
                    {step.id < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  {(() => {
                    const StepIcon = steps[currentStep - 1].icon
                    return <StepIcon className="h-5 w-5 text-primary" />
                  })()}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {currentStep === 1 && "Please provide your personal information"}
                  {currentStep === 2 && "Tell us about your employment"}
                  {currentStep === 3 && "Upload your verification documents"}
                  {currentStep === 4 && "Review your application before submitting"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => updateFormData("dob", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => updateFormData("gender", value)}
                          className="flex gap-6 pt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="font-normal">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="font-normal">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="font-normal">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street, Apt 4B"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                            <SelectItem value="PA">Pennsylvania</SelectItem>
                            <SelectItem value="OH">Ohio</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={formData.zipCode}
                          onChange={(e) => updateFormData("zipCode", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Employment Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <RadioGroup
                        value={formData.employmentType}
                        onValueChange={(value) => updateFormData("employmentType", value)}
                        className="grid gap-4 sm:grid-cols-3 pt-2"
                      >
                        <Label
                          htmlFor="salaried"
                          className={`flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${formData.employmentType === "salaried"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                            }`}
                        >
                          <RadioGroupItem value="salaried" id="salaried" className="sr-only" />
                          <span>Salaried</span>
                        </Label>
                        <Label
                          htmlFor="self-employed"
                          className={`flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${formData.employmentType === "self-employed"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                            }`}
                        >
                          <RadioGroupItem value="self-employed" id="self-employed" className="sr-only" />
                          <span>Self Employed</span>
                        </Label>
                        <Label
                          htmlFor="business"
                          className={`flex items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${formData.employmentType === "business"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                            }`}
                        >
                          <RadioGroupItem value="business" id="business" className="sr-only" />
                          <span>Business Owner</span>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company / Business Name</Label>
                        <Input
                          id="companyName"
                          placeholder="Acme Corporation"
                          value={formData.companyName}
                          onChange={(e) => updateFormData("companyName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation / Role</Label>
                        <Input
                          id="designation"
                          placeholder="Software Engineer"
                          value={formData.designation}
                          onChange={(e) => updateFormData("designation", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                        <Select value={formData.monthlyIncome} onValueChange={(value) => updateFormData("monthlyIncome", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select income range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2500">$0 - $2,500</SelectItem>
                            <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                            <SelectItem value="20000+">$20,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workExperience">Work Experience</Label>
                        <Select value={formData.workExperience} onValueChange={(value) => updateFormData("workExperience", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1 - 3 years</SelectItem>
                            <SelectItem value="3-5">3 - 5 years</SelectItem>
                            <SelectItem value="5-10">5 - 10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="idType">ID Document Type</Label>
                      <Select value={formData.idType} onValueChange={(value) => updateFormData("idType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="drivers-license">Driver&apos;s License</SelectItem>
                          <SelectItem value="state-id">State ID</SelectItem>
                          <SelectItem value="ssn">Social Security Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idNumber">Document Number</Label>
                      <Input
                        id="idNumber"
                        placeholder="Enter document number"
                        value={formData.idNumber}
                        onChange={(e) => updateFormData("idNumber", e.target.value)}
                      />
                    </div>

                    {/* Document Upload Area */}
                    <div className="space-y-2">
                      <Label>Upload Document (Optional)</Label>
                      <div className="rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          Drag and drop your document here, or click to browse
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Supports: PDF, JPG, PNG (max 5MB)
                        </p>
                      </div>
                    </div>

                    {/* Security Note */}
                    <div className="rounded-lg bg-primary/5 p-4">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Your data is secure</p>
                          <p className="text-sm text-muted-foreground">
                            All documents are encrypted and stored securely. We never share your information with third parties.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          Personal Details
                        </h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd className="text-foreground">{formData.firstName} {formData.lastName}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd className="text-foreground">{formData.email || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd className="text-foreground">{formData.phone || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">City</dt>
                            <dd className="text-foreground">{formData.city || "-"}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-4">
                        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          Employment Info
                        </h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="text-foreground capitalize">{formData.employmentType || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Company</dt>
                            <dd className="text-foreground">{formData.companyName || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Income</dt>
                            <dd className="text-foreground">${formData.monthlyIncome || "-"}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">Experience</dt>
                            <dd className="text-foreground">{formData.workExperience || "-"} years</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Product Summary */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-medium text-foreground mb-2">Applying for</h4>
                      <p className="text-lg font-semibold text-primary">{productName}</p>
                    </div>

                    {/* Consent */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={formData.hasConsented}
                          onCheckedChange={(checked) => updateFormData("hasConsented", checked as boolean)}
                        />
                        <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          I hereby declare that the information provided is true and correct. I authorize SecureBank to verify my details and conduct necessary credit checks. I have read and agree to the{" "}
                          <Link href="/terms" className="text-primary underline">Terms & Conditions</Link> and{" "}
                          <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button onClick={handleNext}>
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.hasConsented || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>RBI Regulated</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
