"use client"

import { useState, useEffect } from 'react'
import { X, Shield, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { updateConsent } from '@/lib/gtm'

export function ConsentBanner() {
    const [showBanner, setShowBanner] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        // Check if user has already made a consent choice
        const consentGiven = localStorage.getItem('consent_given')
        if (!consentGiven) {
            // Show banner after a short delay
            setTimeout(() => setShowBanner(true), 1000)
        } else {
            // Apply saved consent preferences
            const analyticsConsent = localStorage.getItem('analytics_consent') === 'true'
            const adsConsent = localStorage.getItem('ads_consent') === 'true'
            updateConsent(analyticsConsent, adsConsent)
        }
    }, [])

    const handleAcceptAll = () => {
        localStorage.setItem('consent_given', 'true')
        localStorage.setItem('analytics_consent', 'true')
        localStorage.setItem('ads_consent', 'true')
        updateConsent(true, true)
        setShowBanner(false)
    }

    const handleRejectAll = () => {
        localStorage.setItem('consent_given', 'true')
        localStorage.setItem('analytics_consent', 'false')
        localStorage.setItem('ads_consent', 'false')
        updateConsent(false, false)
        setShowBanner(false)
    }

    const handleCustomize = () => {
        setShowDetails(!showDetails)
    }

    const handleSavePreferences = (analytics: boolean, ads: boolean) => {
        localStorage.setItem('consent_given', 'true')
        localStorage.setItem('analytics_consent', analytics.toString())
        localStorage.setItem('ads_consent', ads.toString())
        updateConsent(analytics, ads)
        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none">
            <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur-lg border-2 shadow-2xl pointer-events-auto">
                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Cookie className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Cookie Preferences</h3>
                                <p className="text-sm text-muted-foreground">We value your privacy</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRejectAll}
                            className="shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6">
                        We use cookies and similar technologies to improve your experience, analyze site traffic,
                        and personalize content. You can choose to accept all cookies or customize your preferences.
                    </p>

                    {/* Detailed Options */}
                    {showDetails && (
                        <div className="mb-6 space-y-4 rounded-lg bg-muted/50 p-4">
                            <ConsentOption
                                icon={Shield}
                                title="Analytics Cookies"
                                description="Help us understand how you use our site to improve your experience."
                                defaultChecked={true}
                                onChange={(checked) => {
                                    // Store temporary preference
                                    sessionStorage.setItem('temp_analytics', checked.toString())
                                }}
                            />
                            <ConsentOption
                                icon={Shield}
                                title="Advertising Cookies"
                                description="Used to deliver personalized ads and measure campaign effectiveness."
                                defaultChecked={false}
                                onChange={(checked) => {
                                    // Store temporary preference
                                    sessionStorage.setItem('temp_ads', checked.toString())
                                }}
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {showDetails ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetails(false)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => {
                                        const analytics = sessionStorage.getItem('temp_analytics') !== 'false'
                                        const ads = sessionStorage.getItem('temp_ads') === 'true'
                                        handleSavePreferences(analytics, ads)
                                    }}
                                    className="flex-1"
                                >
                                    Save Preferences
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleCustomize}
                                    className="flex-1"
                                >
                                    Customize
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleRejectAll}
                                    className="flex-1"
                                >
                                    Reject All
                                </Button>
                                <Button
                                    onClick={handleAcceptAll}
                                    className="flex-1"
                                >
                                    Accept All
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <p className="mt-4 text-xs text-muted-foreground text-center">
                        By clicking "Accept All", you consent to our use of cookies. Learn more in our{' '}
                        <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                    </p>
                </div>
            </Card>
        </div>
    )
}

interface ConsentOptionProps {
    icon: React.ElementType
    title: string
    description: string
    defaultChecked: boolean
    onChange: (checked: boolean) => void
}

function ConsentOption({ icon: Icon, title, description, defaultChecked, onChange }: ConsentOptionProps) {
    const [checked, setChecked] = useState(defaultChecked)

    const handleToggle = () => {
        const newValue = !checked
        setChecked(newValue)
        onChange(newValue)
    }

    return (
        <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{title}</h4>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}
