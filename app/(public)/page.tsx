'use client';

import React, { useRef } from 'react';
import BentoGrid from '@/components/bento-grid';
import { TestimonialSlider } from '@/components/testimonial-slider';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0]);

  return (
    <div className="bg-black text-white selection:bg-yellow-400 selection:text-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Background Image with Split Parallax Effect */}
        <div className="absolute inset-0 z-0 flex">
          {/* Left Half */}
          <motion.div
            style={{ y: leftY, opacity: bgOpacity }}
            className="relative w-1/2 h-full overflow-hidden"
          >
            <div className="absolute inset-0 w-[200%] h-full">
              <Image
                src="/Images/hero_background.webp"
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Half */}
          <motion.div
            style={{ y: rightY, opacity: bgOpacity }}
            className="relative w-1/2 h-full overflow-hidden"
          >
            <div className="absolute inset-0 w-[200%] -left-full h-full">
              <Image
                src="/Images/hero_background.webp"
                alt=""
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/10 z-10" />
        </div>

        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-yellow-400 uppercase tracking-widest">
              FluxOps V2.1.0 IS NOW LIVE
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              SMART WORKFLOW<br />
              <span className="text-yellow-400">IN ACTION.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium"
          >
            Observe processes, detect inefficiencies, and accelerate operations with AI-powered workflow intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/engine">
              <button className="w-full sm:w-auto px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-full transition-all hover:shadow-[0_0_30px_-5px_rgba(250,204,21,0.5)] active:scale-95">
                Explore Engine
              </button>
            </Link>

          </motion.div>
        </div>

        {/* Hero Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4">
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Vertical_Sync</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-linear-to-b from-yellow-400 to-transparent"
          />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-24 px-6 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Image src="/Images/engineered_for_speed_icon_7.webp" alt="" fill className="object-contain" />
        </div>
        <div className="max-w-7xl mx-auto mb-16 text-center md:text-left relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Engineered for Performance.</h2>
          <p className="text-zinc-500 mt-4 text-lg">Every workflow is intelligently optimized for modern teams.</p>
        </div>
        <BentoGrid />
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-6 md:py-48 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative md:sticky md:top-32 mb-12 md:mb-0"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
              FROM STATIC<br />
              TO SMART.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              Most workflow tools were built to be static, good at storing tasks but blind to the pace of modern teamwork. They operate at human speed, not at the velocity of real-time collaboration.
            </p>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">
              FLUXOPS V2.1.0 was born from the idea that workflow intelligence must be fluid. It doesn’t wait for a manager to notice a bottleneck or a developer to create automation. Our system shifts from reactive task tracking to proactive workflow optimization, turning your operations into a dynamic, self-learning engine that adapts before inefficiencies occur.
            </p>

            <div className="pt-16 border-t border-zinc-900">
              <div className="space-y-2">
                <p className="font-mono text-sm text-yellow-400 italic tracking-tighter">
                  "The future isn't just automated; it's perfectly synced."
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  — Founder's Note // FLUX AI
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Slider Section */}
      <section className="bg-zinc-950/50 py-24 border-y border-zinc-900">
        <TestimonialSlider />
      </section>

      {/* Vision & Mission Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-zinc-950 border border-zinc-900 p-8 md:p-16 flex flex-col items-center justify-center text-center rounded-[3rem] overflow-hidden group"
          >
            <span className="absolute top-8 left-12 font-mono text-zinc-800 text-sm tracking-widest group-hover:text-yellow-400 transition-colors">01</span>
            <div className="space-y-6 relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-yellow-400/60 pb-4">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-white">
                DEMOCRATIZE<br />
                HIGH-FREQUENCY<br />
                INTELLIGENCE.
              </h2>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-yellow-950/20 border border-yellow-400/10 p-8 md:p-16 flex flex-col items-center justify-center text-center rounded-[3rem] overflow-hidden group shadow-[inset_0_0_80px_-20px_rgba(250,204,21,0.05)]"
          >
            <span className="absolute top-8 left-12 font-mono text-yellow-400/20 text-sm tracking-widest group-hover:text-yellow-400 transition-colors">02</span>
            <div className="space-y-6 relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-yellow-400/60 pb-4">Our Vision</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500">
                A FUTURE WHERE<br />
                COMPLEXITY FEELS<br />
                INSTANTANEOUS.
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight italic">
                FREQUENTLY<br />ASKED<br />QUESTIONS
              </h2>
              <p className="mt-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                Smart Workflow Insights
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'faq-1',
                  q: "How does the AI optimize my specific workflow?",
                  a: "FluxOps V2.1.0 observes your team’s tasks across all connected tools, identifies bottlenecks, and recommends smarter task execution. It can also automate repetitive actions, helping your workflow run faster and more efficiently."
                },
                {
                  id: 'faq-2',
                  q: "Does FluxOps V2.1.0 replace tools like Jira, Linear, or GitHub?",
                  a: "No. FluxOps V2.1.0 works alongside your existing tools, connecting with them to provide a unified view of workflows and intelligent optimization, no need to abandon the tools your team already uses."
                },
                {
                  id: 'faq-3',
                  q: "Is my data encrypted?",
                  a: "Absolutely. All workflow data is encrypted in transit and at rest using industry-standard protocols, ensuring full privacy and security for your organization."
                }, {
                  id: 'faq-4',
                  q: "What is 'Decision Latency,' and why does FluxOps V2.1.0 track it?",
                  a: "Decision Latency measures how long it takes for tasks to move from assignment to completion. FluxOps V2.1.0 tracks this to identify delays and recommend smarter workflow adjustments, helping your team act faster and more effectively."
                }
              ].map((item) => (
                <FAQItem key={item.id} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-black py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-16 md:p-32 text-center relative overflow-hidden group"
          >
            {/* Radial Glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/20 blur-[120px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none italic">
                READY TO STREAMLINE<br />YOUR WORKFLOWS?
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto">
                Join the next generation of intelligent, autonomous teams with FluxOps V2.1.0.
              </p>

              <div className="flex flex-col items-center gap-4">
                <Link href={"/pricing"}>
                  <button className="bg-yellow-400 text-black px-12 py-5 rounded-full text-md sm:text-lg font-black uppercase tracking-widest hover:bg-yellow-300 transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-yellow-400' : 'text-white'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full border border-zinc-800 transition-transform ${isOpen ? 'rotate-180 border-yellow-400/50 text-yellow-400' : 'text-zinc-500'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-zinc-500 leading-relaxed max-w-xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
