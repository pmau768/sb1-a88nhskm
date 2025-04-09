"use client"

import { ReactNode, useEffect, useState, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface FloatingActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  visibility?: 'always' | 'scroll-up' | 'scroll-down'
  offset?: { x: number; y: number }
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  onClick?: () => void
}

export function FloatingActionButton({
  icon,
  position = 'bottom-right',
  visibility = 'always',
  offset = { x: 20, y: 20 },
  size = 'default',
  variant = 'default',
  className,
  onClick,
  ...props
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(visibility === 'always')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (visibility === 'always') {
        setIsVisible(true)
        return
      }
      
      if (visibility === 'scroll-up') {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      } else if (visibility === 'scroll-down') {
        setIsVisible(currentScrollY > lastScrollY && currentScrollY > 100)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibility, lastScrollY])
  
  const positionClasses = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  }
  
  const sizeClasses = {
    'sm': 'h-10 w-10',
    'default': 'h-12 w-12',
    'lg': 'h-14 w-14',
  }
  
  return (
    <Button
      variant={variant}
      size="icon"
      className={cn(
        'fixed rounded-full shadow-lg z-40 transition-all duration-300 transform',
        positionClasses[position],
        sizeClasses[size],
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
      style={{
        bottom: position.startsWith('bottom') ? offset.y : 'auto',
        top: position.startsWith('top') ? offset.y : 'auto',
        right: position.endsWith('right') ? offset.x : 'auto',
        left: position.endsWith('left') ? offset.x : 'auto',
      }}
      onClick={onClick}
      {...props}
    >
      {icon}
    </Button>
  )
}