'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export const SystemHealthWidget = () => {
  // Mock data for the area chart
  const points = [
    { x: 0, y: 70 },
    { x: 50, y: 40 },
    { x: 100, y: 60 },
    { x: 150, y: 30 },
    { x: 200, y: 50 },
    { x: 250, y: 20 },
    { x: 300, y: 45 },
    { x: 350, y: 15 },
    { x: 400, y: 30 }
  ];

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaData = `${pathData} L 400 100 L 0 100 Z`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black border border-zinc-800 rounded-3xl p-6 aspect-square flex flex-col space-y-6 overflow-hidden relative group"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-yellow-400/10 rounded-lg">
            <Brain className="w-4 h-4 text-yellow-400" />
          </div>
          <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-wider">
            NEURAL ENGINE: <span className="text-white">ACTIVE</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Main Content: Glowing Chart */}
      <div className="grow relative flex flex-col justify-center">
        <div className="relative w-full h-[120px]">
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Area Fill */}
            <path 
              d={areaData} 
              fill="url(#yellowGradient)" 
              className="opacity-20"
            />
            
            {/* Main Line with Glow */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="#facc15" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
            />

            <defs>
              <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Scanning Bar */}
          <motion.div 
            animate={{ 
              top: ["0%", "100%", "0%"] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute left-0 right-0 h-px bg-yellow-400/50 backdrop-blur-sm z-10 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2 bg-yellow-400/20 blur-md rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Efficiency</p>
          <p className="text-sm font-bold text-yellow-400">98.4%</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Threads</p>
          <p className="text-sm font-bold text-zinc-400">1,024</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Latency</p>
          <p className="text-sm font-bold text-zinc-400">12ms</p>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-800 rounded-tl-xl transition-colors group-hover:border-yellow-400/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-800 rounded-tr-xl transition-colors group-hover:border-yellow-400/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-800 rounded-bl-xl transition-colors group-hover:border-yellow-400/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-800 rounded-br-xl transition-colors group-hover:border-yellow-400/50" />
    </motion.div>
  );
};
