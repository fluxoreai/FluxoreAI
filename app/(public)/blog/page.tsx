'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog-card';

import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header content unchanged but ensuring pure black bg */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
              FLUX<br />
              <span className="text-yellow-400">INSIGHTS.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.5em] mt-6">Knowledge Transmission // v4.0</p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={post.featured ? 'md:col-span-2' : ''}
            >
              <BlogCard {...post} />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-8">
          <button className="px-10 py-4 bg-transparent border border-zinc-700 text-zinc-400 font-bold rounded-full transition-all hover:border-yellow-400 hover:text-yellow-400 active:scale-95">
            Load More Signals
          </button>
        </div>

        {/* Newsletter / CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-24 border-t border-zinc-900"
        >
          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Stay in the Sync.</h2>
              <p className="text-zinc-500 text-lg">Subscribe to get technical bulletins and architectural updates directly to your terminal.</p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto pt-4">
                <input 
                  type="email" 
                  placeholder="name@enterprise.com" 
                  className="w-full bg-black border border-zinc-800 rounded-full px-6 py-4 text-sm focus:border-yellow-400/50 outline-none transition-all"
                />
                <button className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full transition-all active:scale-95 whitespace-nowrap shadow-[0_0_20px_-5px_rgba(250,204,21,0.3)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
