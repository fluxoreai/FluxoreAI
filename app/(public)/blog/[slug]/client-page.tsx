'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { blogPosts } from '@/lib/blog-data';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-8 px-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Signal Lost.</h1>
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">ERROR_NODE_NOT_FOUND // The requested transmission does not exist.</p>
        <Link href="/blog">
          <button className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full uppercase tracking-tighter hover:bg-yellow-300 transition-all">
            Return to Feed
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-24 selection:bg-yellow-400 selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* Sticky Sidebar */}
        <aside className="lg:w-1/4 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32 space-y-12"
          >
            <Link href="/blog" className="group flex items-center space-x-3 text-zinc-500 hover:text-white transition-colors">
              <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-yellow-400 transition-all">
                <ArrowLeft className="w-4 h-4 group-hover:text-black transition-colors" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest">Back to Feed</span>
            </Link>

            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block">Metric / Category</span>
                <div className="flex items-center space-x-2">
                  <Tag className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm font-bold text-zinc-300">{post.category}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block">Cycle / Date</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm font-bold text-zinc-300">{post.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block">Sync / Time</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  <span className="text-sm font-bold text-zinc-300">{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-900">
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-3xl space-y-4">
                <p className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase tracking-wider">
                  Signal source: FLUX_INTELLIGENCE_AG<br />
                  Encryption: AES-256-GCM<br />
                  Integrity: VALIDATED
                </p>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Content Section */}
        <section className="lg:w-3/4 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600 leading-[0.9] py-2">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </motion.div>

          {/* Immersive Post Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-video w-full bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden relative group"
          >
             <Image 
               src={post.image} 
               alt={post.title} 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-1000" 
             />
             <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
             <div className="absolute bottom-10 left-10 p-4 border border-zinc-800 bg-black/50 backdrop-blur-md rounded-2xl flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Live_Node_Feed // Visual_Output_01</span>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-zinc prose-invert max-w-none 
              prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-headings:font-black
              prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:text-yellow-400 prose-h2:mt-12
              prose-p:text-lg prose-p:text-zinc-400 prose-p:leading-relaxed
              prose-li:text-lg prose-li:text-zinc-400
              prose-blockquote:border-l-yellow-400 prose-blockquote:bg-zinc-900/30 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            "
          >
            {/* Split content by double newline to render "paragraphs" simply since we aren't using a MDX parser for this demo */}
            {post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return <h2 key={i}>{block.replace('## ', '')}</h2>;
              }
              if (block.startsWith('### ')) {
                return <h3 key={i} className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-8 mb-4">{block.replace('### ', '')}</h3>;
              }
              if (block.startsWith('> ')) {
                return <blockquote key={i}>{block.replace('> ', '')}</blockquote>;
              }
              if (block.startsWith('1. ') || block.startsWith('- ')) {
                return (
                  <ul key={i} className="space-y-4 my-6">
                    {block.split('\n').map((item, j) => (
                      <li key={j} className="flex items-start space-x-4">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                        <span>{item.replace(/^\d+\.\s+/, '').replace(/^-\s+/, '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </motion.div>

          {/* Share / Footer */}
          <div className="pt-24 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Share Signal</span>
              <div className="flex space-x-3">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:border-yellow-400 hover:bg-zinc-900 transition-all cursor-pointer">
                      <div className="w-3 h-3 bg-zinc-700" />
                   </div>
                ))}
              </div>
            </div>
            
            <Link href="/blog">
              <button className="px-10 py-4 bg-zinc-900 hover:bg-yellow-400 text-zinc-400 hover:text-black font-bold rounded-full transition-all active:scale-95 uppercase tracking-tighter">
                Browse More Insights
              </button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
