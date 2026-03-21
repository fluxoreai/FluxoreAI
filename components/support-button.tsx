'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export const SupportButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 3 
      }}
      className="fixed bottom-6 right-6 z-90 md:right-12"
    >
      <Link href="/support#chat">
        <button className="relative group">
          {/* Outer Glow */}
          <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center gap-3 bg-zinc-950/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-yellow-400/30 transition-all active:scale-95 group-hover:translate-y-[-2px]">
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-yellow-400" strokeWidth={2} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
            
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">Service_Node</span>
              <span className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Need Support?</span>
            </div>
          </div>
          
          {/* Scanning Beam Effect */}
          <motion.div
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-8 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
          />
        </button>
      </Link>
    </motion.div>
  );
};
