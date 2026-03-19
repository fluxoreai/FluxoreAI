'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
//Need 3 more testimonials

const testimonials = [
  {
    id: 1,
    name: "Alex Romario",
    role: "CTO at NexusPrime",
    content: "FluxOps V2.1.0 has completely transformed how we manage our projects. The intelligent workflow automation and optimization are unmatched.",
    image: "/Images/testimonials.webp"
  },
  {
    id: 3,
    name: "Emma Carter",
    role: "CTO at Synexa",
    content: "FluxOps transformed our workflows, eliminating bottlenecks and improving efficiency across all team projects quickly.",
    image: "/Images/testimonials_3.webp"
  },
  {
    id: 2,
    name: "Liam Patel",
    role: "Product Manager at NovaCore",
    content: "Our team saves hours every week thanks to FluxOps’ intelligent insights and automated workflow recommendations.",
    image: "/Images/testimonials_2.webp"
  },
  {
    id: 4,
    name: "Sophia Nguyen",
    role: "COO at TechVantage",
    content: "Integrating FluxOps has accelerated our decision-making and streamlined processes across multiple departments effectively.",
    image: "/Images/testimonials_4.webp"
  }
];

export const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="space-y-4 text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">Loved by Innovators.</h2>
          <p className="text-zinc-500 max-w-md">Join hundreds of teams who have upgraded their workflows with FluxOps V2.1.0.</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={prev} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors text-white group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-colors text-white group">
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[400px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_-12px_rgba(250,204,21,0.1)] transition-shadow duration-500 hover:shadow-[0_0_60px_-10px_rgba(250,204,21,0.2)] relative overflow-hidden">
              {/* Background accent image */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none grayscale">
                <Image
                  src={testimonials[activeIndex].image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col h-full justify-between relative z-10">
                <blockquote className="text-xl md:text-3xl font-medium text-white leading-tight italic">
                  "{testimonials[activeIndex].content}"
                </blockquote>
                <div className="flex items-center space-x-4 pt-8">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-400/50">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonials[activeIndex].name}</div>
                    <div className="text-zinc-500 text-sm font-mono uppercase tracking-widest">{testimonials[activeIndex].role}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
