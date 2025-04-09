"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  className?: string;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  margin = '0px',
  className = '',
  once = true,
}: RevealOnScrollProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: margin,
  });
  
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 40, opacity: 0 };
      case 'down':
        return { y: -40, opacity: 0 };
      case 'left':
        return { x: 40, opacity: 0 };
      case 'right':
        return { x: -40, opacity: 0 };
      default:
        return { y: 40, opacity: 0 };
    }
  };
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={inView ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Special variant for mobile with better performance
export function RevealOnScrollMobile({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref} 
      className={`${className} transition-opacity duration-500 ease-in-out ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}