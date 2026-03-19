'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface BlogCardProps {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  date: string;
  featured?: boolean;
  image: string;
}

export const BlogCard = ({ slug, title, category, readTime, description, date, featured, image }: BlogCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={`/blog/${slug}`} className={`${featured ? 'md:col-span-2' : ''}`}>
      <div
        onMouseMove={handleMouseMove}
        className="group relative flex flex-col justify-between h-full rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900/80 overflow-hidden"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl transition duration-300 opacity-0 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(250, 204, 21, 0.15),
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-20 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {featured && (
                <span className="px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-tighter rounded">
                  Featured
                </span>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span className="inline-block px-3 py-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest">
                  {category}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold font-sans text-white tracking-tighter leading-tight group-hover:text-yellow-400 transition-colors">
              {title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 font-sans">
              {description}
            </p>
          </div>
        </div>

        <div className="relative z-20 pt-8 mt-auto flex items-center justify-between border-t border-zinc-900">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{date}</span>
          <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-yellow-400 transition-all shadow-sm">
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};
