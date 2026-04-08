"use client"

import React from "react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useEffect, useState } from "react"

const stats = [
  { value: 2, suffix: "M+", label: "Active Customers" },
  { value: 5, prefix: "$", suffix: "B+", label: "Assets Under Management" },
  { value: 99.9, suffix: "%", label: "System Uptime" },
  { value: 4.9, suffix: "/5", label: "Customer Satisfaction" },
]

function AnimatedNumber({ value, prefix = "", suffix = "", isVisible }: { 
  value: number
  prefix?: string
  suffix?: string
  isVisible: boolean 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  const formattedValue = value % 1 === 0 
    ? Math.floor(displayValue).toString()
    : displayValue.toFixed(1)

  return (
    <span>
      {prefix}{formattedValue}{suffix}
    </span>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-primary py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-primary-foreground sm:text-5xl">
                <AnimatedNumber 
                  value={stat.value} 
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="mt-2 text-sm font-medium text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
