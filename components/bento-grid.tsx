'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Terminal, Cpu } from 'lucide-react';
import Image from 'next/image';

const items = [
  {
    title: "Neural Synergy",
    description: "Multimodal AI processing at the edge. Our neural mesh adapts to your specific workload patterns in real-time.",
    className: "md:col-span-2 md:row-span-2 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon.webp",
    content: (
      <div className="mt-6 flex flex-col lg:flex-row gap-6 h-full">
        <div className="flex-1 space-y-4">
          <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Processing_Load</span>
            </div>
            <div className="flex gap-1 h-12 items-end">
              {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                  className="flex-1 bg-yellow-400/20 rounded-t-sm"
                />
              ))}
            </div>
          </div>
          <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active_Nodes</span>
            </div>
            <p className="text-3xl font-black text-white italic tracking-tighter">1,240 <span className="text-xs text-yellow-400/50 uppercase ml-2 tracking-widest">Online</span></p>
          </div>
        </div>

        {/* Right side content for Large Box */}
        <div className="hidden lg:flex flex-1 bg-black/40 rounded-2xl border border-white/5 p-4 relative overflow-hidden flex-col justify-between">
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Neural_Map_v4</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-yellow-400 animate-ping" />
                <div className="w-1 h-1 rounded-full bg-yellow-400" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-800/50 rounded-lg border border-white/5 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-yellow-400/40 rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 pt-4 border-t border-white/5">
            <p className="text-[9px] font-mono text-zinc-600 leading-tight uppercase tracking-tighter">
              {'> Latency: 4.2ms'}<br />
              {'> Packet_Loss: 0.0001%'}<br />
              {'> Security: Quantum_Safe'}
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Real-time Ops",
    description: "Sub-5ms latency across global nodes.",
    className: "md:col-span-1 md:row-span-1 bg-yellow-400/5 border-yellow-400/20",
    icon: "/Images/engineered_for_speed_icon_2.webp",
    content: (
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-ping" />
          <span className="text-[10px] font-mono text-yellow-400/80">LIVE_PING: 3.2ms</span>
        </div>
      </div>
    )
  },
  {
    title: "Vault Security",
    description: "Military-grade encryption.",
    className: "md:col-span-1 md:row-span-1 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon_3.webp",
    content: (
      <div className="mt-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            className="h-1 w-4 rounded-full bg-zinc-700"
          />
        ))}
      </div>
    )
  },
  {
    title: "Infinite Scale",
    description: "Auto-scaling infrastructure that dynamically allocates resources.",
    className: "md:col-span-1 md:row-span-2 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon_4.webp",
    content: (
      <div className="mt-8 space-y-4 h-full flex flex-col">
        <div className="flex-1 relative overflow-hidden rounded-xl border border-white/5 bg-black/40 min-h-[100px]">
          <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            <motion.path
              d="M 0 100 Q 25 80 50 90 T 100 40 T 150 60 T 200 20 T 250 50 T 300 10"
              fill="transparent"
              stroke="#facc15"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent z-20" />
        </div>
        <div className="flex justify-between items-end pb-2">
          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest leading-none">Resource_Allocation</p>
          <span className="text-yellow-400 font-bold text-xs">+240%</span>
        </div>
      </div>
    )
  },
  {
    title: "Data Stream",
    description: "Synchronize your entire stack with high-velocity pipelines.",
    className: "md:col-span-2 md:row-span-1 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon_5.webp",
    content: (
      <div className="mt-4 flex items-center gap-6">
        <div className="flex-1 h-px bg-linear-to-r from-yellow-400/50 via-yellow-400/20 to-transparent relative">
          <motion.div
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1 w-2 h-2 rounded-full bg-yellow-400 blur-[2px]"
          />
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
          <Terminal className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-mono text-zinc-400 tracking-tighter">flux_stream --active</span>
        </div>
      </div>
    )
  },
  {
    title: "Smart Insights",
    description: "Predictive analytics for decisions.",
    className: "md:col-span-1 md:row-span-1 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon_6.webp",
  },
  {
    title: "Edge Compute",
    description: "Processing logic closer to users.",
    className: "md:col-span-1 md:row-span-1 bg-zinc-950/50",
    icon: "/Images/engineered_for_speed_icon_7.webp",
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 max-w-7xl mx-auto auto-rows-[minmax(200px,auto)] md:auto-rows-[200px]">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`relative group overflow-hidden rounded-[2.5rem] border border-zinc-900 p-6 md:p-8 flex flex-col justify-between transition-all hover:border-zinc-800 hover:bg-zinc-900/30 ${item.className}`}
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="relative w-14 h-14 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 group-hover:border-yellow-400/20 transition-colors">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase hidden sm:block">
                ID_{Math.floor(Math.random() * 90000) + 10000}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-xs md:text-sm max-w-[240px] leading-relaxed">{item.description}</p>
              </div>

              <div className="flex-1 flex flex-col justify-end">
                {item.content}
              </div>
            </div>
          </div>

          {/* Subtle bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-yellow-400/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
      ))}
    </div>
  );
}
