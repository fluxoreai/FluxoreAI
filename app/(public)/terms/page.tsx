'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Scale } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: "01. Acceptance of Terms",
      content: "By accessing the FluxoreAI Engine or utilizing our autonomous infrastructure services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "02. Use License",
      content: "Permission is granted to temporarily access the FluxoreAI platform for enterprise operational purposes. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose beyond the scope of your agreement; attempt to decompile or reverse engineer any software contained on the FluxoreAI Engine."
    },
    {
      title: "03. Service Availability",
      content: "While we strive for 'Absolute Zero Latency' and 99.99% uptime, FluxoreAI does not warrant that the service will be uninterrupted or error-free. System maintenance, neural synchronization updates, and edge node re-balancing may occasionally impact performance."
    },
    {
      title: "04. Disclaimer",
      content: "The materials on FluxoreAI's website are provided on an 'as is' basis. FluxoreAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property."
    },
    {
      title: "05. Limitations",
      content: "In no event shall FluxoreAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the FluxoreAI Engine."
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-24 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40">
              <Scale className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Legal_Protocol_v1.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              Terms of<br />Service
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-4">Last Updated: March 12, 2026</p>
          </motion.div>
        </section>

        {/* Content Grid */}
        <div className="space-y-12 border-t border-zinc-900 pt-12">
          {sections.map((section, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4 group"
            >
              <h2 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                {section.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed font-light">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Contact Footer */}
        <section className="pt-12 border-t border-zinc-900">
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-white uppercase">Questions regarding terms?</h3>
              <p className="text-zinc-500 text-sm">Contact our legal department for technical clarifications.</p>
            </div>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-yellow-400 transition-all uppercase text-xs tracking-widest">
              help@fluxoreai.com
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
