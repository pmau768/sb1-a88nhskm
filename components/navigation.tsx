"use client"

import Link from "next/link"
import { Dog, Menu, X, ChevronDown, ChevronUp, Home, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/use-viewport"
import { useLazyLoad } from "@/hooks/use-lazy-load"

const navigationLinks = [
  { href: "/dogs", label: "Adopt", icon: <Search className="h-5 w-5" /> },
  { href: "/rehoming", label: "Rehome", icon: <Home className="h-5 w-5" /> },
  { href: "/lost-dogs", label: "Lost & Found", icon: <Dog className="h-5 w-5" /> },
  { href: "/about", label: "About", icon: <ChevronDown className="h-5 w-5" /> },
  { href: "/contact", label: "Contact", icon: <ChevronUp className="h-5 w-5" /> },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 10
  const isLoaded = useLazyLoad(200) // Small delay for smooth appearance

  useEffect(() => {
    // Close menu on escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    // Close menu on route change
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    // Fix body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    window.addEventListener('keydown', handleEscapeKey)
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 mobile-safe-top sticky-header",
          scrolled 
            ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
            : "bg-transparent border-transparent",
          "py-2 md:py-3"
        )}
      >
        <div className="container flex h-12 md:h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 tap-target">
              <Dog className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg tracking-tight hover:text-primary transition-colors">Trek Snout</span>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            className="md:hidden tap-target"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <nav
            className={cn(
              "hidden md:flex md:items-center md:space-x-8",
              isLoaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-300"
            )}
            aria-label="Main navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative transition-colors hover:text-primary text-sm font-medium py-2 px-3 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="rounded-full ml-4 px-6"
            >
              <Link href="/dogs">Find a Dog</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={navigationLinks}
      />
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40 mobile-safe-bottom">
        <div className="grid grid-cols-4 gap-1">
          {[
            { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
            { href: "/dogs", label: "Adopt", icon: <Search className="h-5 w-5" /> },
            { href: "/lost-dogs", label: "Lost", icon: <Dog className="h-5 w-5" /> },
            { href: "/rehoming", label: "Rehome", icon: <ChevronUp className="h-5 w-5" /> },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-3 text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="mb-1 transition-colors group-hover:text-primary">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}