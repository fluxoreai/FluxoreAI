'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check } from 'lucide-react';

const COOKIE_NAME = 'fluxore_consent';
const STORAGE_KEY = 'fluxore_consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent is already given
    const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith(`${COOKIE_NAME}=`));
    const hasStorage = localStorage.getItem(STORAGE_KEY);

    if (!hasCookie && !hasStorage) {
      // Delay visibility for better UX - wait for initial load and animations
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie for 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=accepted; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Set localStorage as requested
    localStorage.setItem(STORAGE_KEY, 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-100"
        >
          <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-6 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Animated Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-yellow-400/10 transition-colors duration-500" />

            <div className="relative flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                <Shield className="w-6 h-6 text-yellow-400" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Privacy Protocol</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                    We use neural sync technology to coordinate state. Choose your data synchronization preference.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-white text-black hover:bg-yellow-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
                  >
                    <Check className="w-3 h-3 group-hover:scale-110 transition-transform" strokeWidth={3} /> Accept
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 bg-zinc-900/50 text-zinc-400 hover:text-white border border-white/5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <X className="w-3 h-3" strokeWidth={3} /> Decline
                  </button>
                </div>
              </div>
            </div>
            
            {/* Minimal Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none -z-10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
