'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart3, Settings, Home, MoreVertical, ChevronRight } from 'lucide-react'

const chartData = [
  { time: '00:00', health: 95 },
  { time: '04:00', health: 92 },
  { time: '08:00', health: 98 },
  { time: '12:00', health: 88 },
  { time: '16:00', health: 94 },
  { time: '20:00', health: 91 },
  { time: '23:59', health: 97 },
]

const logEntries = [
  { timestamp: '14:32:58', type: 'success', message: 'Workflow optimized successfully' },
  { timestamp: '14:31:22', type: 'process', message: 'Running predictive analysis...' },
  { timestamp: '14:30:45', type: 'process', message: 'Analyzing bottlenecks across 128 tasks' },
  { timestamp: '14:29:10', type: 'success', message: 'Resource allocation improved by 34%' },
  { timestamp: '14:28:33', type: 'process', message: 'Delegating tasks to 8 agents' },
]

export default function DashboardPreview() {
  return (
    <div className="relative w-full h-auto rounded-2xl overflow-hidden backdrop-blur-3xl bg-zinc-900/40 border border-zinc-800/50 p-1 shadow-2xl">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative bg-zinc-950/80 rounded-xl overflow-hidden">
        <div className="flex h-96">
          {/* Sidebar */}
          <div className="w-56 bg-zinc-900/50 border-r border-zinc-800/50 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-yellow/20 flex items-center justify-center">
                <BarChart3 size={16} className="text-yellow" />
              </div>
              <span className="text-sm font-semibold text-white">Analytics</span>
            </div>

            <nav className="space-y-2 flex-1">
              <div className="px-3 py-2 rounded-lg bg-yellow/10 border border-yellow/20 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2">
                  <Home size={16} className="text-yellow" />
                  <span className="text-sm text-white">Overview</span>
                </div>
                <ChevronRight size={14} className="text-yellow/50 group-hover:text-yellow transition-colors" />
              </div>

              <div className="px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800/50 flex items-center gap-2 cursor-pointer transition-colors">
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </div>
            </nav>

            <div className="text-xs text-zinc-500 text-center">
              Last updated<br />2 min ago
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Workflow Health</h2>
                <p className="text-xs text-zinc-400 mt-1">Last 24 hours</p>
              </div>
              <button className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors">
                <MoreVertical size={18} className="text-zinc-400" />
              </button>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(113, 113, 122, 0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgb(161, 140, 10)"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis 
                    stroke="rgb(161, 140, 10)"
                    style={{ fontSize: '11px' }}
                    domain={[80, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(24, 24, 27, 0.95)',
                      border: '1px solid rgba(113, 113, 122, 0.5)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    }}
                    labelStyle={{ color: '#facc15' }}
                    formatter={(value) => [value, 'Health %']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="health" 
                    stroke="#facc15" 
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Log Window */}
      <div className="relative bg-zinc-950/80 rounded-xl mt-1 overflow-hidden border border-zinc-800/50">
        <div className="bg-zinc-900/50 border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow/60" />
            <span className="text-xs font-mono text-yellow">Current AI Optimization</span>
          </div>
          <button className="p-1 hover:bg-zinc-800/50 rounded transition-colors">
            <MoreVertical size={14} className="text-zinc-600" />
          </button>
        </div>

        <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1.5 bg-gradient-to-b from-zinc-950/50 to-zinc-950/30">
          {logEntries.map((entry, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-zinc-700 flex-shrink-0">{entry.timestamp}</span>
              {entry.type === 'success' && (
                <>
                  <span className="text-yellow flex-shrink-0">[SUCCESS]</span>
                  <span className="text-yellow">{entry.message}</span>
                </>
              )}
              {entry.type === 'process' && (
                <>
                  <span className="text-yellow/60 flex-shrink-0">[PROCESS]</span>
                  <span className="text-yellow/70">{entry.message}</span>
                </>
              )}
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <span className="text-zinc-700">14:27:51</span>
            <span className="text-yellow/40 flex-shrink-0 animate-pulse">[RUNNING]</span>
            <span className="text-yellow/40">Optimizing resource allocation...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
