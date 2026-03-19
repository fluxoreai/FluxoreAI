'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Globe, 
  Zap, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const stats = [
  { label: 'System Health', value: '99.98%', icon: Activity, trend: '+0.02%', color: 'text-green-400' },
  { label: 'Active Nodes', value: '1,284', icon: Globe, trend: '+12', color: 'text-yellow-400' },
  { label: 'Avg Latency', value: '4.2ms', icon: Clock, trend: '-0.3ms', color: 'text-yellow-400' },
  { label: 'Optimization Rate', value: '92.4%', icon: Zap, trend: '+5.1%', color: 'text-yellow-400' },
];

const chartData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 48 },
  { time: '12:00', value: 70 },
  { time: '16:00', value: 65 },
  { time: '20:00', value: 85 },
  { time: '23:59', value: 92 },
];

const activities = [
  { id: 1, type: 'success', event: 'Neural Sync complete', target: 'Segment_7', time: '2m ago', icon: CheckCircle2 },
  { id: 2, type: 'info', event: 'Node deployment', target: 'us-east-1', time: '15m ago', icon: Globe },
  { id: 3, type: 'warning', event: 'Latency spike detected', target: 'eu-west-2', time: '45m ago', icon: AlertCircle },
  { id: 4, type: 'success', event: 'Security handshake', target: 'p-quantum-v4', time: '1h ago', icon: Zap },
];

import { SystemHealthWidget } from '@/components/dashboard/system-health-widget';

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">System Overview</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Real-time intelligence stream</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-yellow-400">
             <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
             <span className="text-[10px] font-mono uppercase">Neural Sync Active</span>
          </div>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors">
            Capture State
          </button>
        </div>
      </div>

      {/* Primary Grid: Health Widget + stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New high-fidelity widget */}
        <SystemHealthWidget />

        {/* Stats and mini chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.slice(0, 4).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                   <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{stat.label}</p>
                   <stat.icon className="w-4 h-4 text-zinc-600 group-hover:text-yellow-400 transition-colors" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <span className="text-[10px] font-mono text-zinc-500">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 h-[250px]">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Network Throughput</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600" />
             </div>
             <div className="h-full w-full pb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#facc15" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#facc15" 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      {/* Secondary Row: Activity Logs */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Recent System Events</h3>
            <span className="text-[10px] font-mono text-zinc-500 uppercase cursor-pointer hover:text-yellow-400 transition-colors">Stream Logs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 group cursor-pointer border-l border-zinc-800 pl-4 py-2 hover:border-yellow-400 transition-colors">
                <div className="grow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{item.event}</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase tracking-tighter">{item.target} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
