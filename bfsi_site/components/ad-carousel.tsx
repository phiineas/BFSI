"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AdCarouselProps {
    autoPlayInterval?: number
}

export default function AdCarousel({ autoPlayInterval = 5000 }: AdCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const ads = [
        {
            id: 1,
            image: "/ads/credit_card_promo_1769244172385.png",
            alt: "Get 5% Cashback on all purchases",
        },
        {
            id: 2,
            image: "/ads/savings_account_promo_1769244187773.png",
            alt: "4.5% APY High-Yield Savings Account",
        },
        {
            id: 3,
            image: "/ads/mobile_banking_promo_1769244203889.png",
            alt: "Bank Anywhere - Download our mobile app",
        },
        {
            id: 4,
            image: "/ads/loan_offer_promo_1769244219219.png",
            alt: "Low Interest Loans - Starting at 3.9% APR",
        },
        {
            id: 5,
            image: "/ads/investment_promo_1769244236629.png",
            alt: "Grow Your Wealth - Expert Investment Guidance",
        },
    ]

    // Auto-play functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ads.length)
        }, autoPlayInterval)

        return () => clearInterval(timer)
    }, [autoPlayInterval, ads.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length)
    }

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % ads.length)
    }

    return (
        <div className="relative w-full h-full group">
            {/* Carousel Images */}
            <div className="relative w-full h-full overflow-hidden rounded-xl">
                {ads.map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={ad.image}
                            alt={ad.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {ads.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
