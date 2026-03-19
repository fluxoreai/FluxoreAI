'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, Network, ShieldCheck, Activity } from 'lucide-react';

export default function InfrastructurePage() {
  return (
    <div className="max-w-6xl space-y-12 mx-auto pb-24">
      <div className="space-y-2 border-b border-zinc-900 pb-8">
        <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Infrastructure</h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Bare-Metal Sync & Server Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Server Status List */}
        <div className="lg:col-span-2 space-y-6">
          {[
            { id: 'FLUX-NODE-01', region: 'US-EAST', load: '42%', uptime: '99.98%', status: 'Operational' },
            { id: 'FLUX-NODE-02', region: 'EU-WEST', load: '68%', uptime: '99.99%', status: 'High Load' },
            { id: 'FLUX-NODE-03', region: 'AP-SOUTH', load: '12%', uptime: '100.00%', status: 'Operational' },
          ].map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-700 transition-all group"
            >
              <div className="flex items-center space-x-6">
                <div className="p-3 bg-zinc-950 rounded-xl group-hover:bg-yellow-400/10 transition-colors">
                  <Server className="w-5 h-5 text-zinc-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">{node.id}</h3>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{node.region}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Load</p>
                  <p className="text-xs font-bold text-white">{node.load}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Uptime</p>
                  <p className="text-xs font-bold text-white">{node.uptime}</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                   <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Status</p>
                   <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                     node.status === 'Operational' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                   }`}>
                     {node.status}
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Sidebar */}
        <div className="space-y-6">
           <div className="bg-black border border-zinc-900 rounded-[3rem] p-8 space-y-8 relative overflow-hidden text-center group">
              <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 space-y-12">
                 <div className="space-y-4">
                    <ShieldCheck className="w-8 h-8 text-yellow-400 mx-auto" />
                    <h3 className="font-black text-2xl tracking-tighter uppercase leading-none italic">Neural Guard</h3>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Integrity Level</p>
                    <p className="text-4xl font-black text-white italic">AA+</p>
                 </div>
                 <button className="w-full py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest hover:border-yellow-400 transition-colors">
                    Security_Audit
                 </button>
              </div>
           </div>

           <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2">
                 <Activity className="w-4 h-4 text-zinc-600" />
                 <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Global Health Index</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[92%]" />
              </div>
              <p className="text-right text-[10px] font-mono text-yellow-400 tracking-widest">92.4% OPTIMIZED</p>
           </div>
        </div>
      </div>
    </div>
  );
}
