"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { supportsBackdropFilter } from "@/lib/browser-utils"
import Link from "next/link"

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Set viewport height (fixing iOS 100vh issue)
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", setVh)
    
    // Initial setup
    setVh()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", setVh)
    }
  }, [])

  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className="relative full-screen -mt-14 snap-section">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full bg-gradient-to-br from-background via-card to-muted"
        />
        <div className="absolute inset-0 w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.1)_100%)]" />
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center full-screen px-4 sm:px-6 py-16 md:py-24 text-center text-white mobile-safe-top mobile-safe-bottom">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={paragraphVariants}
          className="w-full max-w-[1200px] mx-auto text-base sm:text-lg uppercase tracking-wider mb-4 sm:mb-6 text-white/90 font-medium"
        >
          Protect What Matters Most
        </motion.p>

        <motion.h1 
          initial="hidden"
          animate="visible" 
          variants={contentVariants}
          className="w-full font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 max-w-[1200px] mx-auto [text-wrap:balance] leading-[1.15] tracking-tight"
        >
          Your Pets Are Family, Not an Option
        </motion.h1>

        <motion.p 
          initial="hidden"
          animate="visible"
          variants={paragraphVariants}
          className="w-full text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-[1200px] mx-auto leading-relaxed text-white/90"
        >
          When disaster strikes, every family member counts - including those with paws.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="w-full max-w-[1200px] mx-auto mb-8 md:mb-12 text-white/80"
        >
          <p className="font-medium mb-2 sm:mb-4">We believe in:</p>
          <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>• Zero compromises on pet safety</li>
            <li>• Complete peace of mind</li>
            <li>• Guaranteed family unity</li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-6 sm:gap-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none justify-center">
            <Button
              asChild
              size="xl"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 h-auto font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <Link href="/about">Learn More</Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline" 
              className="rounded-full text-white border-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 h-auto font-semibold transition-all duration-200 hover:scale-[1.02]"
            >
              <Link href="/dogs">Find Your New Companion</Link>
            </Button>
          </div>
          
          <div className="w-full text-xs sm:text-sm md:text-base text-white/70 max-w-[1200px] mx-auto">
            <p className="mb-1 sm:mb-2">Because protecting your entire family shouldn't be an afterthought.</p>
            <p>Join our mission to ensure no pet is left behind.</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white hover:bg-white/10 animate-bounce"
            onClick={() => {
              window.scrollTo({
                top: viewportHeight,
                behavior: 'smooth',
              })
            }}
          >
            <ChevronDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}