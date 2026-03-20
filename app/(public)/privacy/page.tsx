'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      title: "01. Data Transmission",
      content: "FluxoreAI prioritizes the integrity of your neural data. We collect information necessary to synchronize your engine instances and optimize edge node performance. All data in transit is protected by post-quantum cryptographic primitives."
    },
    {
      title: "02. Information Usage",
      content: "Information collected is used solely to: provide, operate, and maintain our infrastructure; improve and personalize your engine's predictive models; understand and analyze fleet-wide telemetry; and develop new autonomous features."
    },
    {
      title: "03. Neural Privacy",
      content: "We do not sell, trade, or otherwise transfer your identifiable neural weights to outside parties. This does not include trusted third parties who assist us in operating our platform, so long as those parties agree to keep this information confidential."
    },
    {
      title: "04. Security Protocols",
      content: "We implement a variety of security measures to maintain the safety of your personal and enterprise data. Our 'Vault Security' feature ensures that even in the event of a cluster-wide anomaly, your core data segments remain isolated and encrypted."
    },
    {
      title: "05. Cookies and Tracking",
      content: "FluxoreAI uses essential session tokens to manage your authentication state and local edge preferences. We do not use third-party tracking cookies for advertising purposes."
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
              <Lock className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Privacy_Shield_v2.4</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              Privacy<br />Policy
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

        {/* Privacy Note */}
        <section className="pt-12 border-t border-zinc-900">
          <div className="bg-yellow-400/5 border border-yellow-400/20 p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white uppercase">Your Data, Your Sovereignty.</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              At FluxoreAI, we believe that enterprise intelligence should not come at the cost of privacy. Our architecture is designed to give you full control over your data streams and model weights at all times.
            </p>
          </div>
        </section>

        {/* Contact info section */}
        <section className="pt-12 border-t border-zinc-900 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed font-light">
              If you have any questions about this Privacy Policy, your personal data, or our security protocols, please reach out to our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email_Endpoint</h3>
              <p className="text-white font-medium">help@fluxoreai.com</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Voice_Channel</h3>
              <p className="text-white font-medium">+1 323-672-2885</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Physical_Node</h3>
              <p className="text-white font-medium">2829 Newell St #5, Los Angeles, CA 90039</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
