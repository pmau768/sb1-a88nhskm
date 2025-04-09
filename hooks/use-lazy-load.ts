"use client";

import { useState, useEffect } from "react";

/**
 * Hook to handle lazy loading of components with a specified delay
 * @param delay Optional delay in milliseconds
 * @returns Boolean indicating if the element should be shown
 */
export function useLazyLoad(delay = 0): boolean {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isLoaded;
}

/**
 * Hook to handle intersection observer based lazy loading
 * @param options Intersection observer options
 * @returns [ref, isVisible] tuple
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options = { threshold: 0.1, rootMargin: '0px' }
): [(node: T | null) => void, boolean] {
  const [ref, setRef] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (ref) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, options);
      
      observer.observe(ref);
      
      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  }, [ref, options]);
  
  return [setRef, isVisible];
}