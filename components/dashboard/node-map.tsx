'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Share2, Maximize2, Plus, Minus, MousePointer2 } from 'lucide-react';

interface Node {
  id: string;
  type: 'trigger' | 'ai' | 'output';
  label: string;
  x: number;
  y: number;
}

interface Connection {
  fromId: string;
  toId: string;
}

const initialNodes: Node[] = [
  { id: '1', type: 'trigger', label: 'New Project', x: 100, y: 200 },
  { id: '2', type: 'ai', label: 'Resource Allocation', x: 400, y: 150 },
  { id: '3', type: 'output', label: 'Slack Update', x: 700, y: 200 },
];

const initialConnections: Connection[] = [
  { fromId: '1', toId: '2' },
  { fromId: '2', toId: '3' },
];

export const WorkflowNodeMap = () => {
  const [nodes] = useState<Node[]>(initialNodes);
  const [connections] = useState<Connection[]>(initialConnections);
  const [zoom, setZoom] = useState(1);

  // Helper to find node by ID
  const findNode = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-[3rem] border border-zinc-900 group">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" 
        style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full">
          {connections.map((conn, idx) => {
            const from = findNode(conn.fromId);
            const to = findNode(conn.toId);
            if (!from || !to) return null;

            // Orthographic path (right-angled)
            // Start from right of fromNode, end at left of toNode
            const startX = (from.x + 180) * zoom;
            const startY = (from.y + 40) * zoom;
            const endX = to.x * zoom;
            const endY = (to.y + 40) * zoom;
            
            const midX = (startX + endX) / 2;
            
            const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
            
            const isAIOutput = from.type === 'ai';

            return (
              <g key={idx}>
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={isAIOutput ? '#facc15' : '#3f3f46'}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.5 }}
                />
                {isAIOutput && (
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="4"
                    strokeOpacity="0.2"
                    className="blur-sm"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: parseInt(node.id) * 0.2 }}
              className={`absolute w-[180px] h-[80px] p-4 flex flex-col justify-center rounded-xl bg-black pointer-events-auto cursor-grab active:cursor-grabbing border ${
                node.type === 'trigger' ? 'border-white' :
                node.type === 'ai' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.15)]' :
                'border-zinc-800'
              }`}
              style={{ left: node.x, top: node.y }}
            >
              {node.type === 'ai' && (
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-yellow-400 rounded-xl"
                />
              )}
              
              <div className="relative z-10 flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg ${
                  node.type === 'trigger' ? 'bg-zinc-800' :
                  node.type === 'ai' ? 'bg-yellow-400/10' :
                  'bg-zinc-900'
                }`}>
                  {node.type === 'trigger' && <Plus className="w-4 h-4 text-white" />}
                  {node.type === 'ai' && <Brain className="w-4 h-4 text-yellow-500" />}
                  {node.type === 'output' && <Share2 className="w-4 h-4 text-zinc-500" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">
                    {node.type === 'trigger' ? 'Event Trigger' : 
                     node.type === 'ai' ? 'Neural Processing' : 'Direct Output'}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                    {node.label}
                  </h3>
                </div>
              </div>

              {node.id === '2' && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-6 right-6 flex items-center bg-black/80 backdrop-blur-xl border border-zinc-900 rounded-2xl p-2 gap-2 shadow-2xl">
        <button 
          onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-400 hover:text-white"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono font-bold text-zinc-500 w-12 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button 
          onClick={() => setZoom(z => Math.min(2, z + 0.1))}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-400 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="w-px h-8 bg-zinc-900" />
        <button 
          onClick={() => setZoom(1)}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-colors text-zinc-400 hover:text-white flex items-center space-x-2"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:inline">Fit</span>
        </button>
      </div>

      {/* Top Left Title */}
      <div className="absolute top-6 left-6 p-4 bg-black/40 backdrop-blur-md border border-zinc-900 rounded-2xl">
        <div className="flex items-center space-x-3">
          <Share2 className="w-4 h-4 text-yellow-400" />
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-tighter">System Topology</h2>
            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Active_Map_V3.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
