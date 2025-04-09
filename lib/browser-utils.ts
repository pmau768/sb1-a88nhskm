/**
 * Browser detection and compatibility utilities
 */

export const getBrowser = (): string => {
  if (typeof window === 'undefined') return 'server';

  const ua = navigator.userAgent;
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
  if (ua.includes('Edg')) return 'edge';
  
  return 'unknown';
};

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  return getBrowser() === 'safari';
};

export const isWebkit = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'WebkitAppearance' in document.documentElement.style;
};

// Feature detection helpers
export const supportsBackdropFilter = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'backdropFilter' in document.documentElement.style ||
    'WebkitBackdropFilter' in document.documentElement.style
  );
};

// Check if device is touch-enabled
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Check if device is iOS
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

// Polyfill helpers
export const applyBackdropFilterFallback = (element: HTMLElement): void => {
  if (!supportsBackdropFilter()) {
    element.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
};

// Get screen orientation
export const getOrientation = (): 'portrait' | 'landscape' => {
  if (typeof window === 'undefined') return 'portrait';
  
  if (window.matchMedia('(orientation: portrait)').matches) {
    return 'portrait';
  }
  return 'landscape';
};

// Check if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // More reliable check using both width and user agent
  const isMobileWidth = window.innerWidth < 768;
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return isMobileWidth || isMobileUserAgent;
};

// Get real viewport height (addressing iOS Safari issues)
export const getViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // Use visual viewport API if available (better for mobile browsers)
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  return window.innerHeight;
};

// Detect if device has notch (for safe area insets)
export const hasNotch = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // iOS detection
  const iOS = isIOS();
  
  // Check for environment variables support
  const supportsEnv = CSS.supports('padding-bottom: env(safe-area-inset-bottom)');
  
  // Check device aspect ratio (common for notched devices)
  const isModernRatio = window.screen && 
    (window.screen.height / window.screen.width > 2 || 
     window.screen.width / window.screen.height > 2);
  
  return (iOS && isModernRatio) || supportsEnv;
};

// Better low-memory detection
export const isLowMemoryDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check navigator.deviceMemory if available
  if ('deviceMemory' in navigator) {
    return (navigator as any).deviceMemory < 4;
  }
  
  // Fallback to heuristics: older/low-end devices often have poor performance
  const isOldIOS = isIOS() && /OS ([4-9]|1[0-1])_/.test(navigator.userAgent);
  const isOldAndroid = /Android ([2-6])/.test(navigator.userAgent);
  
  return isOldIOS || isOldAndroid;
};

// Check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};