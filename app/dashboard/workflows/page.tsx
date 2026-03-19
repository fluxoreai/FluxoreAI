'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Plus, Zap, Cpu, Globe, Database, GitMerge } from 'lucide-react';
import { WorkflowNodeMap } from '@/components/dashboard/node-map';

export default function WorkflowsPage() {
  return (
    <div className="h-full flex flex-col space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GitMerge className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold tracking-tight uppercase">Workflow Topology</h2>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden md:block">3 Active Flows</p>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 hover:bg-yellow-300 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create New Flow</span>
          </button>
        </div>
      </div>

      <div className="grow min-h-[600px]">
        <WorkflowNodeMap />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Neural Accuracy', val: '99.9%', trend: '+0.1%' },
          { label: 'Auto-Optimizations', val: '14,202', trend: '+1,240' },
          { label: 'Edge Latency', val: '4.2ms', trend: '-0.3ms' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-xl font-bold text-white mt-1">{item.val}</h3>
            </div>
            <span className="text-[10px] font-mono text-green-400">{item.trend}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
