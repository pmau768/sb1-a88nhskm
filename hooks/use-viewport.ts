"use client";

import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { isMobile, isIOS, getOrientation, getViewportHeight } from "@/lib/browser-utils";

interface Viewport {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  orientation: 'portrait' | 'landscape';
  isLandscape: boolean;
  isPortrait: boolean;
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    orientation: 'portrait',
    isLandscape: false,
    isPortrait: true,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = getOrientation();
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isIOS: isIOS(),
        orientation,
        isLandscape: orientation === 'landscape',
        isPortrait: orientation === 'portrait'
      });
    }, 250);

    // Set initial viewport
    handleResize();

    // Update on resize and orientation change
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return viewport;
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollY(window.scrollY);
    }, 50);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return scrollY;
}