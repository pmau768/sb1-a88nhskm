"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Hook to automatically generate and manage canonical URLs
 * Handles various URL formats, parameters, and edge cases
 */
export function useCanonical() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const generateCanonicalURL = (): string => {
      // Get base URL, defaulting to production URL if not in browser
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : 'https://treksnout.com';

      // Start with clean pathname
      let canonicalUrl = `${baseUrl}${pathname}`;

      // Handle pagination parameters if they exist
      const page = searchParams.get('page');
      if (page && page !== '1') {
        canonicalUrl += `?page=${page}`;
      }

      // Handle language versions
      const lang = searchParams.get('lang');
      if (lang && !canonicalUrl.includes('?')) {
        canonicalUrl += `?lang=${lang}`;
      } else if (lang) {
        canonicalUrl += `&lang=${lang}`;
      }

      return canonicalUrl;
    };

    const setCanonical = () => {
      try {
        // Check for manually set canonical
        const existingCanonical = document.querySelector("link[rel='canonical'][data-manual]");
        if (existingCanonical) {
          console.log('Manual canonical found, skipping auto-generation');
          return;
        }

        const canonicalUrl = generateCanonicalURL();
        
        // Update or create canonical tag
        let canonicalTag = document.querySelector("link[rel='canonical']");
        if (!canonicalTag) {
          canonicalTag = document.createElement('link');
          canonicalTag.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalTag);
        }

        canonicalTag.setAttribute('href', canonicalUrl);
        console.log('Canonical URL set:', canonicalUrl);

      } catch (error) {
        console.error('Error setting canonical URL:', error);
      }
    };

    // Set canonical on mount and URL changes
    setCanonical();

    // Cleanup on unmount
    return () => {
      const canonicalTag = document.querySelector("link[rel='canonical']:not([data-manual])");
      if (canonicalTag) {
        canonicalTag.remove();
      }
    };
  }, [pathname, searchParams]);
}