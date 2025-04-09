"use client";

import { useState, useEffect } from 'react';
import { Share2, X } from 'lucide-react';
import { 
  SocialShareButtons 
} from '@/components/social-share-buttons';
import { Button } from "@/components/ui/button";
import { 
  AnimatePresence,
  motion 
} from 'framer-motion';

interface ShareFabProps {
  title?: string;
  url?: string;
  description?: string;
  position?: 'bottom-right' | 'bottom-left';
  offset?: { x: number; y: number };
}

export function ShareFab({ 
  title, 
  url, 
  description, 
  position = 'bottom-right',
  offset = { x: 20, y: 20 },
}: ShareFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show FAB after scrolling down 300px
      if (scrollY > 300) {
        setHasScrolled(true);
        if (!isVisible) {
          setTimeout(() => setIsVisible(true), 500);
        }
      } else {
        setIsVisible(false);
        setHasScrolled(false);
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);
  
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
  };
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${positionClasses[position]} z-40 md:hidden`}
            style={{ 
              bottom: offset.y,
              right: position === 'bottom-right' ? offset.x : 'auto', 
              left: position === 'bottom-left' ? offset.x : 'auto'
            }}
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${positionClasses[position]} bottom-36 z-40 bg-card/95 backdrop-blur p-4 rounded-lg shadow-lg border md:hidden`}
            style={{
              bottom: offset.y + 60,
              right: position === 'bottom-right' ? offset.x : 'auto',
              left: position === 'bottom-left' ? offset.x : 'auto',
              width: 'calc(100vw - 40px)',
              maxWidth: '400px'
            }}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-medium">Share this page</h3>
              <SocialShareButtons 
                title={title} 
                url={url} 
                description={description}
                showCount
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}