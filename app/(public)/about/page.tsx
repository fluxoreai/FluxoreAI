'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Cpu,
  Zap,
  Layers,
  Users,
  Eye
} from 'lucide-react';
import Image from 'next/image';

const team = [
  {
    name: "Marcus Thorne",
    role: "Founding Architect",
    image: "/Images/team.webp"
  },
  {
    name: "Dr. Elena Vance",
    role: "Head of Neural Design",
    image: "/Images/team_2.webp"
  },
  {
    name: "Silas Kael",
    role: "Edge System Engineer",
    image: "/Images/team_3.webp"
  }
];

const values = [
  {
    title: "Absolute Zero Latency",
    description: "Every microsecond of human intent is translated into machine action without delay.",
    image: "/Images/about_icon_1.webp"
  },
  {
    title: "Neural Integrity",
    description: "Our systems are built on high-fidelity cognitive models, preserving the essence of decision-making.",
    image: "/Images/about_icon_2.webp"
  },
  {
    title: "Recursive Growth",
    description: "Continuous self-optimization flows through every layer of the FLUX architecture.",
    image: "/Images/about_icon_3.webp"
  }
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">

        {/* Hero / Vision Section */}
        <section className="max-w-4xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-yellow-400/60">Founded 2024</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8]">
              The Evolution<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500">Of Workflows.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-zinc-400 text-lg leading-relaxed">
                Most workflow tools were built to be static, good at storing tasks but unable to keep up with the pace of modern teamwork.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                As workflows grow more complex, inefficiencies and hidden bottlenecks often slow progress. Teams spend valuable time manually managing processes instead of focusing on meaningful work and strategic decisions.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                FluxOps V2.1.0 changes this approach by making workflow intelligence fluid. It continuously observes how work moves across teams, identifies inefficiencies, and recommends smarter task execution, turning operations into a dynamic, self-learning system that adapts before problems arise.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Vision Statement (High Contrast Card) */}
        <section>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative bg-zinc-950 border border-zinc-900 p-16 md:p-32 rounded-[4rem] text-center overflow-hidden group shadow-[inset_0_0_100px_rgba(250,204,21,0.03)]"
          >
            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 space-y-8">
              <Eye className="w-8 h-8 text-yellow-500 mx-auto animate-pulse" />
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9] text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500 max-w-4xl mx-auto">
                We Are Building A Future Where Complexity Feels Instantaneous.
              </h2>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter uppercase italic">The Collective</h2>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest leading-none">Architecting the Synchronized World</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group space-y-6"
              >
                <div className="relative aspect-square overflow-hidden rounded-4xl bg-zinc-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover filter grayscale hover:filter-none transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:shadow-[inset_0_0_40px_rgba(250,204,21,0.2)]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors drop-shadow-[0_0_15px_rgba(250,204,21,0)] group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">{member.name}</h3>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="space-y-16 py-12 border-t border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase">{value.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
