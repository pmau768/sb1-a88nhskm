"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, User, Phone, Instagram, Facebook, Twitter, Home, Dog, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string; icon?: React.ReactNode }>;
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
        >
          <div className="fixed inset-0 z-50 flex flex-col mobile-safe-top mobile-safe-bottom">
            <div className="flex items-center justify-between p-4 border-b">
              <p className="font-bold text-lg">Menu</p>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
              className="flex-1 overflow-auto py-6 px-6"
            >
              <nav className="flex flex-col space-y-1">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center text-xl font-medium py-4 px-2 border-b border-border/50 mobile-nav-item"
                      onClick={onClose}
                    >
                      <span className="mr-3">{link.icon || <Dog className="h-5 w-5" />}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <QuickLink 
                    href="/dogs" 
                    label="Find a Dog" 
                    icon={<Home className="h-5 w-5" />}
                    onClick={onClose}
                  />
                  <QuickLink 
                    href="/lost-dogs/report" 
                    label="Report Lost Dog" 
                    icon={<AlertTriangle className="h-5 w-5" />}
                    onClick={onClose}
                  />
                  <QuickLink 
                    href="/about" 
                    label="About Us" 
                    icon={<User className="h-5 w-5" />}
                    onClick={onClose}
                  />
                  <QuickLink 
                    href="/contact" 
                    label="Contact" 
                    icon={<Phone className="h-5 w-5" />}
                    onClick={onClose}
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <SocialLink href="https://instagram.com" icon={<Instagram className="h-5 w-5" />} />
                  <SocialLink href="https://facebook.com" icon={<Facebook className="h-5 w-5" />} />
                  <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
                </div>
              </div>
            </motion.div>
            
            <div className="p-6 border-t">
              <Button asChild className="w-full rounded-full" size="lg">
                <Link href="/dogs" onClick={onClose}>
                  Find a Dog
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface QuickLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function QuickLink({ href, label, icon, onClick }: QuickLinkProps) {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-muted/70 rounded-lg text-center"
      onClick={onClick}
    >
      <div className="mb-2 text-primary">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-10 w-10 rounded-full bg-muted/70 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {icon}
    </a>
  );
}