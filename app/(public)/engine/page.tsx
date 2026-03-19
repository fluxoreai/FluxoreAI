'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Share2, Workflow, Activity } from 'lucide-react';
import Image from 'next/image';

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

const features = [
  {
    title: 'Autonomous Re-routing',
    description:
      'Powered by NVIDIA Metropolis and DeepStream SDK, our self-healing Jetson-based edge nodes detect network instability and reroute traffic in real-time, maintaining sub-5ms latency.',
    id: 'ar',
    status: { nodes: 402, efficiency: '98.4%', integrity: 'SECURED' },
  },
  {
    title: 'Neural Sync v4',
    description:
      'Using NVIDIA Morpheus for real-time fleet monitoring, our proprietary synchronization engine ensures every node is perfectly aligned, reducing conflict resolution overhead by 85%.',
    id: 'ns4',
    status: { nodes: 124, efficiency: '99.1%', integrity: 'VALIDATED' },
  },
  {
    title: 'Quantum Encryption',
    description:
      'Beyond traditional TLS. FLUX uses post-quantum cryptographic primitives optimized with NVIDIA TensorRT to secure your data stream from future decryption threats.',
    id: 'qe',
    status: { nodes: 88, efficiency: '100%', integrity: 'ENCRYPTED' },
  },
  {
    title: 'Smart Dispatch',
    description:
      'Optimized with NVIDIA RAPIDS and NeMo Framework, intelligent workload distribution is based on power efficiency and predictive proximity modeling.',
    id: 'sd',
    status: { nodes: 256, efficiency: '97.2%', integrity: 'ACTIVE' },
  },
];

/* ────────────────────────────────────────────
   3D WORKFLOW NODE  — Hero Centerpiece
   ──────────────────────────────────────────── */

function WorkflowNode3D({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0, 0.3], [0.8, 1.15]);
  const rotate = useTransform(scrollProgress, [0, 0.3], [0, 45]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.4], [0, 1, 0.8]);

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center mx-auto"
    >
      {/* Orbital rings */}
      <div className="absolute inset-0 border border-yellow-400/20 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-6 sm:inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

      {/* Central card */}
      <div className="relative z-10 p-6 sm:p-10 md:p-12 bg-zinc-950/60 backdrop-blur-3xl rounded-3xl border border-zinc-800 shadow-[0_0_60px_rgba(250,204,21,0.08)] flex items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 bg-yellow-400/2 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
        <Workflow className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-yellow-400" strokeWidth={1} />

        {/* Scanning beam on card */}
        <motion.div
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400/50 to-transparent pointer-events-none"
        />
      </div>

      {/* Floating orbit dots — hidden on very small screens */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-yellow-400 rounded-full blur-[2px] hidden sm:block"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${deg}deg) translate(90px, 0)`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   NEURAL GRID  — Dashboard infill
   ──────────────────────────────────────────── */

function NeuralGrid({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full h-36 bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[18px_18px] opacity-20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-8 gap-3 opacity-50">
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: activeIndex === Math.floor(i / 8) ? [0.5, 1.5, 0.5] : 0.5,
                opacity: activeIndex === Math.floor(i / 8) ? [0.1, 0.9, 0.1] : 0.1,
                backgroundColor: activeIndex === Math.floor(i / 8) ? '#facc15' : '#52525b',
              }}
              transition={{ duration: 2, repeat: Infinity, delay: (i % 8) * 0.1 }}
              className="w-1 h-1 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Decorative SVG path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M 20 80 Q 120 15 250 80 T 520 80"
          stroke="#facc15"
          strokeWidth="0.5"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </svg>

      <div className="absolute bottom-3 left-5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
        <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">
          Neural_Mesh // Segment_{activeIndex}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SYSTEM LOG  — live event feed
   ──────────────────────────────────────────── */

function SystemLog() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const events = [
      'Auth_Handshake_Complete',
      'Neural_Node_402_Syncing',
      'Quantum_Stream_Active',
      'Latent_Latency_Correction',
      'Global_Segment_Optimized',
      'Protocol_v4_Engaged',
      'Encryption_Key_Rotated',
      'Rerouting_Traffic_Segment_9',
      'Integrity_Check_Passed',
      'Node_Cluster_Rebalanced',
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = `> ${events[Math.floor(Math.random() * events.length)]} // ${new Date().toLocaleTimeString('en-GB')}`;
        return [newLog, ...prev.slice(0, 4)];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-5 font-mono text-[10px] text-zinc-500 overflow-hidden h-36 relative shrink-0">
      <div className="absolute top-3 right-5 flex items-center gap-2">
        <Activity className="w-3 h-3 text-yellow-400 animate-pulse" />
        <span className="text-yellow-400 font-bold tracking-tight text-[9px]">UPTIME 99.99%</span>
      </div>

      <div className="space-y-1.5 pt-1">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.p
              key={log + i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`${i === 0 ? 'text-yellow-400/80 font-bold' : 'text-zinc-600'} tracking-tight`}
            >
              {log}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* Accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-yellow-400/30 to-transparent" />
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────── */

export default function EnginePage() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end center'],
  });

  const { scrollYProgress: section1Progress } = useScroll({
    target: section1Ref,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ['start start', 'end end'],
  });

  const smooth1 = useSpring(section1Progress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(smooth1, [0, 1], [15, -15]);
  const rotateY = useTransform(smooth1, [0, 1], [-20, 20]);
  const dashScale = useTransform(smooth1, [0, 0.5, 1], [0.9, 1.05, 0.9]);

  const [activeIndex, setActiveIndex] = useState(0);
  const firstFeature = features[0];
  const remainingFeatures = features.slice(1);

  return (
    <main className="bg-black text-white selection:bg-yellow-400 selection:text-black min-h-screen">
      {/* ───── HERO ───── */}
      <section
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 relative overflow-hidden bg-size-[40px_40px] bg-[radial-gradient(circle_at_center,#111_1px,transparent_1px)]"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.08),transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12">
          <WorkflowNode3D scrollProgress={heroProgress} />

          <div className="space-y-5">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              FluxoreAI
              <br />
              Engine
            </h1>
            <p className="text-zinc-500 font-mono uppercase tracking-[0.4em] text-[10px] sm:text-xs">
              The heartbeat of autonomous infrastructure
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 sm:h-24 bg-linear-to-b from-yellow-400 to-transparent mt-6 opacity-50"
          />
        </div>
      </section>

      {/* ───── SECTION 1 — Feature 1 with 3D Dashboard ───── */}
      <section
        ref={section1Ref}
        className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 border-t border-zinc-900 bg-grid-white/[0.02]"
      >
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
          {/* Left — Feature description */}
          <div className="w-full md:w-1/2 z-20">
            <motion.div
              onViewportEnter={() => setActiveIndex(0)}
              initial={{ opacity: 0.2, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              className="min-h-0 py-16 md:py-0 md:h-screen flex flex-col justify-center space-y-6"
            >
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-px bg-zinc-800 group-hover:bg-yellow-400 transition-colors duration-500" />
                <span className="font-mono text-yellow-500 text-[10px] tracking-[0.3em] uppercase">
                  1.0 // CORE_ENGINE
                </span>
              </div>

              <h3 className="text-[2rem] sm:text-[2.8rem] md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 italic uppercase leading-[1.1] py-2">
                {firstFeature.title}
              </h3>

              <p className="text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed max-w-md font-medium">
                {firstFeature.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {['SCALING', 'AUTO_HEAL', 'ENCRYPT'].map((tab) => (
                  <div
                    key={tab}
                    className="px-3 py-1 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-600 uppercase tracking-widest"
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard (Sticky) */}
          <div className="hidden md:flex sticky top-0 h-screen w-1/2 items-center justify-center perspective-[2000px] z-10">
            {/* Background accent image */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40"
            >
              <div className="relative w-[120%] h-[80%] rounded-3xl overflow-hidden">
                <Image
                  src="/neural-network.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 0vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/80" />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-black/70" />
              </div>
            </motion.div>

            {/* Dashboard card */}
            <motion.div
              style={{ rotateX, rotateY, scale: dashScale }}
              className="relative w-full max-w-2xl bg-zinc-950 rounded-4xl border border-zinc-800/20 p-1 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.9)] ring-1 ring-white/5 overflow-hidden z-10"
            >
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400/4 via-transparent to-transparent pointer-events-none rounded-4xl" />

              <div className="h-full w-full bg-zinc-950 rounded-[2.4rem] p-6 lg:p-10 flex flex-col gap-6 lg:gap-8 relative overflow-hidden">
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping opacity-30" />
                    </div>
                    <span className="font-mono text-[9px] lg:text-[10px] text-zinc-400 uppercase tracking-[0.35em] font-bold">
                      SYSTEM_TELEMETRY // ID_77320
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-5 h-0.5 bg-zinc-800 rounded-full" />
                    <div className="w-5 h-0.5 bg-zinc-900 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 shrink-0">
                  {[
                    { label: 'NODES', val: firstFeature.status.nodes, icon: Share2 },
                    { label: 'EFFICIENCY', val: firstFeature.status.efficiency, icon: Zap },
                    { label: 'INTEGRITY', val: firstFeature.status.integrity, icon: Shield },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/40 rounded-2xl border border-white/5 p-4 lg:p-5 space-y-3 hover:border-yellow-400/20 transition-colors"
                    >
                      <stat.icon className="w-4 h-4 text-zinc-600" strokeWidth={1.5} />
                      <div className="space-y-0.5">
                        <p className="text-[8px] lg:text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-widest">
                          {stat.label}
                        </p>
                        <p className="text-lg lg:text-2xl font-black text-yellow-400 tabular-nums italic">
                          {stat.val}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <NeuralGrid activeIndex={0} />
                <SystemLog />

                {/* Scanning beam */}
                <motion.div
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-20 bg-linear-to-b from-transparent via-yellow-400/5 to-transparent pointer-events-none z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── SECTION 2 — Features 2-4 with Sticky Image ───── */}
      <section
        ref={section2Ref}
        className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 border-t border-zinc-900 bg-grid-white/[0.02]"
      >
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
          {/* Left — Feature descriptions */}
          <div className="w-full md:w-1/2 z-20">
            {remainingFeatures.map((feature, i) => (
              <motion.div
                key={feature.id}
                onViewportEnter={() => setActiveIndex(i + 1)}
                initial={{ opacity: 0.2, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6 }}
                className="min-h-0 py-16 md:py-0 md:h-screen flex flex-col justify-center space-y-6"
              >
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-px bg-zinc-800 group-hover:bg-yellow-400 transition-colors duration-500" />
                  <span className="font-mono text-yellow-500 text-[10px] tracking-[0.3em] uppercase">
                    {i + 2}.0 // CORE_ENGINE
                  </span>
                </div>

                <h3 className="text-[2rem] sm:text-[2.8rem] md:text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 italic uppercase leading-[1.1] py-2">
                  {feature.title}
                </h3>

                <p className="text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed max-w-md font-medium">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {['SCALING', 'AUTO_HEAL', 'ENCRYPT'].map((tab) => (
                    <div
                      key={tab}
                      className="px-3 py-1 border border-zinc-800 rounded-lg text-[10px] font-mono text-zinc-600 uppercase tracking-widest"
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Sticky Image */}
          <div className="hidden md:flex sticky top-0 h-screen w-1/2 items-center justify-center z-10">
            <div className="relative w-full aspect-square max-w-md rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.8)] bg-zinc-950">
              <Image
                src="/neural-network.png"
                alt="Feature Illustration"
                fill
                className="object-cover opacity-80"
                sizes="(min-width: 768px) 50vw, 0vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              {/* Decorative Tech Overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)]" />
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400/5"
              />

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <p className="font-mono text-[10px] text-zinc-400 tracking-[0.4em] uppercase">
                  Data_Visualization // 0{activeIndex + 1}
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 rounded-tl-xl" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 rounded-br-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ───── TECHNICAL INFRASTRUCTURE — Powered by NVIDIA ───── */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-zinc-950/30 border-t border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.03),transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-yellow-400 font-mono text-[10px] uppercase tracking-[0.3em]">Hardware_Acceleration</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
                  Powered by<br />NVIDIA AI
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-lg">
                  FluxoreAI Engine leverages the full NVIDIA stack to deliver unprecedented performance from the cloud to the edge.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Edge Inference', desc: 'Metropolis + DeepStream SDK on Jetson Orin modules.' },
                  { title: 'Model Training', desc: 'RAPIDS & NeMo for high-speed neural weight training.' },
                  { title: 'Fleet Monitoring', desc: 'Morpheus for real-time stream processing and security.' },
                  { title: 'Cloud Deployment', desc: 'Triton Inference Server hosting large-scale models.' },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-yellow-400/20 transition-colors group">
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2 group-hover:text-yellow-400 transition-colors">{item.title}</h4>
                    <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(250,204,21,0.1)]">
              <Image
                src="/neural-network.png"
                alt="NVIDIA Infrastructure"
                fill
                className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group">
                  <div className="w-24 h-24 bg-yellow-400/10 rounded-full flex items-center justify-center border border-yellow-400/20 blur-sm group-hover:blur-none transition-all duration-500" />
                  <Activity className="absolute inset-0 m-auto w-8 h-8 text-yellow-400" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">NVIDIA_Triton_Active</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Opt_TensorRT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── NEURAL BENCHMARKS TABLE ───── */}
      {/* <section className="py-20 md:py-40 px-4 sm:px-6 max-w-7xl mx-auto relative border-t border-zinc-900 overflow-hidden">
        <div className="space-y-16 md:space-y-24">
          <div className="space-y-5 text-center">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 leading-[1.1] py-1">
              Neural Benchmarks
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
              Efficiency comparison against legacy infrastructures.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl md:rounded-[3rem] bg-zinc-950 border border-white/5 shadow-2xl relative group">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

            <table className="w-full text-left border-collapse relative z-10 min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500 font-bold">
                    Vector_Metric
                  </th>
                  <th className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500 font-bold">
                    Traditional_Net
                  </th>
                  <th className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-yellow-500 bg-yellow-400/2 font-bold">
                    FLUX_Neural
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {[
                  ['LATENCY_CMD', '240ms – 1.2s', '< 4.2ms'],
                  ['NODE_SCALING', 'Linear / Physical', 'Exponential / Virtual'],
                  ['SECURITY_LAYER', 'Symmetric / Static', 'Neural / Post-Quantum'],
                  ['CARBON_FOOTPRINT', '1.4kg / Day', '0.002kg / Day'],
                  ['UNIT_COST', '$0.12', '$0.0004'],
                ].map(([vector, manual, flux], i) => (
                  <tr key={i} className="group/row hover:bg-white/2 transition-colors">
                    <td className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 font-bold text-zinc-400 tracking-tight text-sm sm:text-base md:text-lg italic uppercase whitespace-nowrap">
                      {vector}
                    </td>
                    <td className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 text-zinc-600 font-mono text-xs sm:text-sm">
                      {manual}
                    </td>
                    <td className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 text-yellow-400 font-mono font-black text-sm sm:text-lg md:text-xl bg-yellow-400/1 group-hover/row:bg-yellow-400/3 transition-colors">
                      {flux}
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="inline-block h-3.5 w-px bg-yellow-400 ml-1.5 align-middle"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {// Vertical scanning line }
            <motion.div
              animate={{ left: ['-5%', '105%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-yellow-400/20 to-transparent pointer-events-none z-20"
            />
          </div>
        </div>
      </section> */}

      {/* ───── Inline marquee keyframes ───── */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </main>
  );
}
