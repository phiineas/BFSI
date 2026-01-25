"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, Search, Globe } from "lucide-react"

const topNavigation = [
  { name: "Personal", href: "/" },
  { name: "Business", href: "/business" },
  { name: "Asset Management", href: "/asset-management" },
  { name: "Private Bank", href: "/private-bank" },
]

const mainNavigation = [
  {
    name: "Banking",
    href: "/products?category=accounts",
    subcategories: ["Accounts & services"],
  },
  {
    name: "Borrowing",
    href: "/products?category=loans",
    subcategories: ["Cards & loans"],
  },
  {
    name: "Investing",
    href: "/products?category=insurance",
    subcategories: ["Wealth & Insurance"],
  },
  {
    name: "NRI",
    href: "/nri",
    subcategories: ["NRI services & Transfers"],
  },
  {
    name: "Offers",
    href: "/offers",
    subcategories: ["Offers & Rewards"],
  },
  {
    name: "Online Banking",
    href: "/online-banking",
    subcategories: ["Banking made easy"],
  },
]

export function Header({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full bg-black">
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Top Left Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {topNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-white/80 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden items-center gap-1 text-xs text-white/80 hover:text-white md:flex">
              <Globe className="h-3.5 w-3.5" />
              English
            </button>
            <button className="hidden text-xs text-white/80 hover:text-white md:block">
              <Search className="h-4 w-4" />
            </button>
            <Link href="/register" className="hidden text-xs text-white/80 hover:text-white md:block">
              Register
            </Link>
            <Link
              href="/login"
              className="rounded bg-primary px-3 py-1 text-xs font-semibold text-white hover:bg-primary/90"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-black">SecureBank</span>
            </Link>
          </div>

          {/* Desktop Main Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {mainNavigation.map((item) => (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  className="flex flex-col items-center text-black transition-colors hover:text-primary"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-gray-600">{item.subcategories[0]}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {mounted ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 hover:text-black">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-black text-white">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-white">SecureBank</span>
                  </div>

                  {/* Mobile Top Navigation */}
                  <div className="border-b border-white/10 pb-4">
                    <div className="text-xs font-semibold text-white/60 mb-2">SECTIONS</div>
                    <nav className="flex flex-col gap-2">
                      {topNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Main Navigation */}
                  <nav className="flex flex-col gap-2">
                    <div className="text-xs font-semibold text-white/60 mb-2">SERVICES</div>
                    {mainNavigation.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col rounded-md px-3 py-2 hover:bg-white/10"
                        >
                          <span className="text-sm font-medium text-white">{item.name}</span>
                          <span className="text-xs text-white/60">{item.subcategories[0]}</span>
                        </Link>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                    <Button variant="outline" asChild className="w-full border-white/30 bg-transparent text-white hover:bg-white/10">
                      <Link href="/register">Register</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/login">Log In</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 hover:text-black lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
