"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { ReactNode } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
  className?: string
  intensity?: "none" | "low" | "medium" | "high"
}

export function BackgroundWrapper({
  children,
  className,
  intensity = "medium"
}: BackgroundWrapperProps) {
  // Map intensity to opacity values for gradient and noise
  const intensityMap = {
    none: { gradient: "opacity-0", noise: "opacity-0" },
    low: { gradient: "opacity-20", noise: "opacity-10" },
    medium: { gradient: "opacity-50", noise: "opacity-20" },
    high: { gradient: "opacity-80", noise: "opacity-30" },
  }
  
  return (
    <div className={cn("relative", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base Background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle Gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-background via-card to-muted",
          intensityMap[intensity].gradient
        )} />
        
        {/* Noise Texture */}
        <div className={cn(
          "absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-5",
          intensityMap[intensity].noise
        )} />
        
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}

export function AnimatedBackgroundWrapper({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ backgroundColor: "hsl(206 47% 8%)" }}
      animate={{ backgroundColor: "hsl(206 47% 8%)" }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}