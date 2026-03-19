'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertCircle, Maximize2 } from 'lucide-react';

const frictionPoints = [
  { segment: 'Optimization_V2', friction: 82, status: 'HIGH' },
  { segment: 'Neutral_Sync', friction: 14, status: 'LOW' },
  { segment: 'Cache_Fluid_Edge', friction: 45, status: 'MID' },
  { segment: 'Intent_Predictor', friction: 68, status: 'MID' },
  { segment: 'Enterprise_Auth', friction: 5, status: 'LOW' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tighter uppercase italic">Neutral Heatmaps</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Identifying friction across core vectors</p>
        </div>
        <div className="flex space-x-4">
          <button className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase transition-colors">Export_Metrics</button>
          <button className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Heatmap Main Area */}
        <div className="lg:col-span-3 bg-black border border-zinc-900 rounded-[3rem] p-8 min-h-[500px] relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[24px_24px] opacity-10" />
           
           <div className="relative z-10 grid grid-cols-5 h-full gap-2">
              {[...Array(25)].map((_, i) => {
                const intensity = Math.random();
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="aspect-square rounded-2xl transition-all duration-500 cursor-help border border-zinc-900/50"
                    style={{ 
                      backgroundColor: intensity > 0.8 ? 'rgba(250, 204, 21, 0.4)' : 
                                      intensity > 0.5 ? 'rgba(250, 204, 21, 0.2)' : 
                                      'rgba(24, 24, 27, 0.5)',
                      boxShadow: intensity > 0.8 ? '0 0 20px rgba(250, 204, 21, 0.1)' : 'none'
                    }}
                    whileHover={{ scale: 1.05, border: '1px solid #facc15' }}
                  />
                )
              })}
           </div>

           <div className="absolute bottom-10 right-10 flex items-center space-x-3 bg-black/80 backdrop-blur-md border border-zinc-900 p-3 rounded-2xl">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Friction Level:</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-zinc-800 rounded-px" />
                <div className="w-2 h-2 bg-yellow-400/20 rounded-px" />
                <div className="w-2 h-2 bg-yellow-400 rounded-px" />
              </div>
           </div>
        </div>

        {/* Breakdown Sidebar */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 grow">
            <h3 className="text-sm font-bold uppercase mb-6 flex items-center space-x-2">
               <TrendingUp className="w-4 h-4 text-yellow-400" />
               <span>Impact Analysis</span>
            </h3>
            <div className="space-y-6">
               {frictionPoints.map(point => (
                 <div key={point.segment} className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      <span>{point.segment}</span>
                      <span className={point.friction > 70 ? 'text-red-400' : 'text-zinc-300'}>{point.friction}%</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${point.friction}%` }}
                        className={`h-full ${point.friction > 70 ? 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.3)]' : 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]'}`} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-yellow-400 p-6 rounded-3xl group cursor-pointer hover:bg-yellow-300 transition-colors">
            <AlertCircle className="w-6 h-6 text-black mb-4 group-hover:rotate-12 transition-transform" />
            <h4 className="text-black font-black text-lg tracking-tighter uppercase leading-none">Optimize All</h4>
            <p className="text-black/60 text-xs mt-2 font-medium">Clear all friction points automatically in one neural sync.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
