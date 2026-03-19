'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, WifiOff } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-yellow-400 selection:text-black">

      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-size-[32px_32px] opacity-40 pointer-events-none" />

      {/* Massive Outlined 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          className="text-[25rem] md:text-[40rem] font-black text-transparent opacity-10 select-none leading-none tracking-tighter"
          style={{
            WebkitTextStroke: '2px #27272a',
            filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.2))'
          }}
        >
          404
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-12">

        {/* Severed Connection Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center">

          {/* SVG Connection Grid */}
          <svg className="w-full h-full text-zinc-900" viewBox="0 0 200 200">
            {/* Grid Lines */}
            <path d="M40 40 L160 160" stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 4" />
            <path d="M160 40 L40 160" stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Severed Lines */}
            <motion.path
              d="M40 100 L85 100"
              stroke="#52525b"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M160 100 L115 100"
              stroke="#52525b"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Severed Ends & Sparks */}
            <g className="spark-group">
              {/* Left Severed Point */}
              <circle cx="85" cy="100" r="1.5" fill="#facc15" />
              <motion.circle
                cx="85" cy="100" r="4"
                fill="#facc15"
                className="opacity-50"
                animate={{ scale: [1, 2, 0], opacity: [0.5, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.1, repeatType: "loop" }}
              />

              {/* Right Severed Point */}
              <circle cx="115" cy="100" r="1.5" fill="#facc15" />
              <motion.circle
                cx="115" cy="100" r="4"
                fill="#facc15"
                className="opacity-50"
                animate={{ scale: [1, 1.8, 0], opacity: [0.5, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 0.12, repeatType: "loop", delay: 0.05 }}
              />
            </g>
          </svg>

          {/* Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <WifiOff className="w-12 h-12 text-zinc-800" strokeWidth={1} />
            </motion.div>
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase italic text-zinc-200">Connection Interrupted</h2>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 max-w-md">
            ERROR_NODE_NOT_FOUND // Connection_Terminated_or_Relocated
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(250, 204, 21, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-yellow-400 text-black px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 group transition-colors hover:bg-yellow-300"
          >
            <span>Reroute to Home</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>

      </div>

      {/* Footer System Info */}
      <div className="absolute bottom-12 flex items-center gap-12 opacity-20 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Sys_Node: ERROR_0x404</span>
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Lat_Metric: INF_TIMEOUT</span>
        </div>
        <div className="h-8 w-px bg-zinc-800" />
        <div className="flex flex-col gap-1 text-right">
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Protocol: Neural_Fallback</span>
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Origin: {new Date().toISOString().split('T')[0]}</span>
        </div>
      </div>

    </main>
  );
}
