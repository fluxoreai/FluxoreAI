'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Settings2, Shield, Eye, Flame } from 'lucide-react';

export default function AutomationsPage() {
  return (
    <div className="max-w-4xl space-y-12 mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Automations</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Configure Reactive Intelligence Rules</p>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-xl text-xs font-bold hover:bg-zinc-200 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Automation</span>
        </button>
      </div>

      <div className="space-y-6">
        {[
          { title: "Latency Guard", trigger: "Latency > 20ms", action: "Deploy Edge Cache", status: "Active", icon: Zap },
          { title: "Project Sync", trigger: "New Commit", action: "Neural Logic Update", status: "Active", icon: Settings2 },
          { title: "Security Handshake", trigger: "Unauthorized Access", action: "Lock Segment_7", status: "Paused", icon: Shield },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-zinc-900/30 border border-zinc-900 p-6 rounded-2xl hover:border-yellow-400/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-zinc-950 rounded-xl group-hover:bg-yellow-400/10 transition-colors">
                  <item.icon className={`w-5 h-5 ${item.status === 'Active' ? 'text-yellow-400' : 'text-zinc-600'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">IF {item.trigger} → THEN {item.action}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-[10px] font-mono px-2 py-1 rounded border ${
                  item.status === 'Active' ? 'text-green-400 border-green-400/20' : 'text-zinc-600 border-zinc-800'
                }`}>
                  {item.status.toUpperCase()}
                </span>
                <div className="w-8 h-4 bg-zinc-800 rounded-full flex items-center px-0.5 group-hover:bg-zinc-700 transition-colors">
                   <div className={`w-3 h-3 rounded-full transition-all ${item.status === 'Active' ? 'translate-x-4 bg-yellow-400' : 'bg-zinc-600'}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Intelligence Aggression */}
      <section className="bg-yellow-400/5 border border-yellow-400/10 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Flame className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold">Intelligence Aggression</h3>
            </div>
          </div>
          <p className="text-sm text-zinc-400 max-w-xl">
            Allow Flux AI to create rules automatically based on historical friction patterns. Current confidence threshold: 75%.
          </p>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                className="h-full bg-linear-to-r from-yellow-500 to-orange-500 shadow-[0_0_15px_rgba(250,204,21,0.3)]" 
              />
          </div>
      </section>
    </div>
  );
}
