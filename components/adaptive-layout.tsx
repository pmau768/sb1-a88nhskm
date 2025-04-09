"use client";

import { useEffect, useState } from "react";
import { isMobile, isIOS, getOrientation } from "@/lib/browser-utils";

interface AdaptiveLayoutProps {
  children: React.ReactNode;
  mobileChildren?: React.ReactNode;
  tabletChildren?: React.ReactNode;
  desktopChildren?: React.ReactNode;
}

export function AdaptiveLayout({
  children,
  mobileChildren,
  tabletChildren,
  desktopChildren,
}: AdaptiveLayoutProps) {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(getOrientation());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      setOrientation(getOrientation());
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  if (!mounted) {
    // Return null or fallback during SSR
    return <>{children}</>;
  }

  // Decide which children to render based on device type
  if (deviceType === 'mobile' && mobileChildren) {
    return (
      <div className="adaptive-layout adaptive-mobile" data-orientation={orientation}>
        {mobileChildren}
      </div>
    );
  }
  
  if (deviceType === 'tablet' && tabletChildren) {
    return (
      <div className="adaptive-layout adaptive-tablet" data-orientation={orientation}>
        {tabletChildren}
      </div>
    );
  }
  
  if (deviceType === 'desktop' && desktopChildren) {
    return (
      <div className="adaptive-layout adaptive-desktop">
        {desktopChildren}
      </div>
    );
  }
  
  // Default fallback to main children
  return (
    <div className="adaptive-layout" data-device={deviceType} data-orientation={orientation}>
      {children}
    </div>
  );
}