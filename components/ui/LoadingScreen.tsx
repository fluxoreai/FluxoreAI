'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'Verifying Neural Identity...',
  'Syncing Global Workflow Nodes...',
  'Establishing Encrypted Tunnel...'
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 1000); // Cycle every 1s as per plan
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Immersive Pulsing Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute w-[800px] h-[800px] bg-yellow-400 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative flex flex-col items-center">
        
        {/* Progress Ring and Logo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background Ring */}
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              className="text-zinc-900"
            />
            {/* Animated Loading Ring */}
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              strokeDasharray="377" // 2 * PI * 60
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut" 
              }}
              className="text-yellow-400"
              strokeLinecap="round"
            />
          </svg>

          {/* Minimalist Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <span className="text-2xl font-black tracking-tighter italic text-white">FLUX</span>
          </motion.div>
        </div>

        {/* Status Text with cycling phrases */}
        <div className="mt-12 h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phrases[index]}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 whitespace-nowrap"
            >
              {phrases[index]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>

      {/* Aesthetic Detail: Technical IDs */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-1">
        <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Sys_Status: Handshaking</span>
        <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Protocol: Neural_v4.0.2</span>
      </div>
    </div>
  );
}
