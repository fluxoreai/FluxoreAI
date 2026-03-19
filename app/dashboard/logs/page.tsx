'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldCheck, Zap, AlertTriangle, Cpu } from 'lucide-react';

const mockLogs = [
  { timestamp: '10:42:01.244', level: 'INFO', context: 'neural_engine', message: 'Syncing cognitive model v4.2.1-stable...' },
  { timestamp: '10:42:01.890', level: 'SUCCESS', context: 'security', message: 'Handshake verified. Node US-EAST-1 established.' },
  { timestamp: '10:42:02.112', level: 'WARN', context: 'latency', message: 'Friction detected in segment: workflow_optim_v2.' },
  { timestamp: '10:42:02.500', level: 'INFO', context: 'predictive_model', message: 'Anticipating intent for User_ID: 8829...' },
  { timestamp: '10:42:03.012', level: 'SUCCESS', context: 'optimizer', message: 'Auto-schedule latency reduced by 14.2ms.' },
  { timestamp: '10:42:03.441', level: 'INFO', context: 'storage', message: 'Moving static assets to fluid cache layer...' },
];

export default function AILogsPage() {
  const [logs, setLogs] = useState(mockLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        timestamp: new Date().toLocaleTimeString('en-GB') + '.' + Math.floor(Math.random() * 999),
        level: Math.random() > 0.8 ? 'WARN' : Math.random() > 0.5 ? 'SUCCESS' : 'INFO',
        context: ['neural_core', 'gateway', 'optimizer', 'neural_engine'][Math.floor(Math.random() * 4)],
        message: [
          'Optimizing neural throughput...',
          'Calibrating intent weights...',
          'Fluid stream stabilized.',
          'Cleaning redundant logic paths...',
          'Syncing metadata to edge nodes...'
        ][Math.floor(Math.random() * 5)]
      };
      setLogs(prev => [...prev.slice(-19), newLog]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TerminalIcon className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold tracking-tight uppercase">Raw Intelligence Stream</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase transition-colors">Clear Local</button>
          <button className="bg-zinc-900 border border-zinc-800 px-3 py-1 text-[10px] font-mono text-white rounded-md hover:border-yellow-400 transition-colors">EXPORT_JSON</button>
        </div>
      </div>

      <div className="grow bg-black border border-zinc-800 rounded-3xl overflow-hidden flex flex-col font-mono text-xs relative group shadow-[0_0_50px_rgba(0,0,0,1)]">
        {/* Terminal Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[10px] text-zinc-600 tracking-widest uppercase">FLUX_SHELL_V4.0</span>
        </div>

        {/* Terminal Body */}
        <div className="grow overflow-y-auto p-6 space-y-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={log.timestamp}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start space-x-4 group"
              >
                <span className="text-zinc-600 whitespace-nowrap">[{log.timestamp}]</span>
                <span className={`font-bold whitespace-nowrap min-w-[70px] ${
                  log.level === 'SUCCESS' ? 'text-green-500' : 
                  log.level === 'WARN' ? 'text-yellow-500' : 'text-zinc-400'
                }`}>
                  {log.level}
                </span>
                <span className="text-yellow-400/80 whitespace-nowrap">[{log.context}]</span>
                <span className="text-zinc-300 transition-colors group-hover:text-white">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex items-center space-x-3 pt-4">
            <span className="text-yellow-400 animate-pulse">_</span>
          </div>
        </div>

        {/* Scan effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, label: 'Integrity', val: 'SECURE' },
          { icon: Zap, label: 'Throughput', val: '1.2 GB/s' },
          { icon: Cpu, label: 'Load', val: '42%' }
        ].map(item => (
          <div key={item.label} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <item.icon className="w-4 h-4 text-zinc-600" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.label}</span>
            </div>
            <span className="text-xs font-bold text-white font-mono">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
