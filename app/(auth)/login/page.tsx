'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Mail, 
  Lock, 
  ArrowRight, 
  Chrome, 
  Cpu, 
  ShieldCheck, 
  Zap,
  Terminal,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { authApi } from '@/lib/api/auth';
import { API_URL } from '@/lib/api-client';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { getErrorMessage } from '@/lib/utils';

const logMessages = [
  'Node #402 Authenticated...',
  'Session encryption active...',
  'Syncing neural weights...',
  'Gateway handshake verified...',
  'Initializing cognitive layer...',
  'Fluid cache status: STABLE',
  'Quantum resistance: ACTIVE',
  'Latency optimized: 4.2ms',
  'Handshake protocol v4.0.1...',
  'Secure tunnel established...',
];

const chartData = [
  { val: 40 }, { val: 65 }, { val: 45 }, { val: 90 }, 
  { val: 55 }, { val: 80 }, { val: 40 }, { val: 70 },
  { val: 50 }, { val: 85 }, { val: 60 }, { val: 95 }
];

export default function LoginPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), logMessages[logIndex]]);
      setLogIndex(i => (i + 1) % logMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [logIndex]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not ready');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const turnstile_token = await executeRecaptcha('login');
      await authApi.login({ email, password_hash: password, turnstile_token });
      router.push('/dashboard');
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    window.location.href = `${API_URL}/auth/${provider}/redirect`;
  };

  return (
    <main className="min-h-screen flex bg-black overflow-hidden selection:bg-yellow-400 selection:text-black relative">
      
      {/* Back to Home Navigation */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-500 hover:text-yellow-400 transition-colors group px-4 py-2"
      >
        <motion.div
          whileHover={{ x: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
        <span className="font-mono text-xs uppercase tracking-[0.3em]">Back to Home</span>
      </Link>
      
      {/* 60% Left Side: Brand Experience */}
      <section className="hidden lg:flex lg:w-[60%] relative flex-col justify-between p-24 border-r border-zinc-900 bg-black">
        
        {/* Background Animation Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
        
        {/* Vertical Logo */}
        <div className="relative z-10 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-48 h-48 mb-4"
          >
            <Image
              src="/logo/logo.webp"
              alt="FluxoreAI Logo"
              fill
              className="object-contain"
            />
          </motion.div>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-zinc-600">Cognitive_Operation_OS</p>
        </div>

        {/* Pulse Chart + Logs Container */}
        <div className="relative z-10 space-y-12">
          
          <div className="w-full h-32 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#facc15" 
                  strokeWidth={2} 
                  fill="url(#glow)" 
                  isAnimationActive 
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#facc15]" />
                Neural_Pulse: Active
              </span>
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Efficiency: 99%</span>
            </div>
          </div>

          {/* Scrolling Terminal Logs */}
          <div className="h-24 font-mono text-[10px] uppercase tracking-widest space-y-2 overflow-hidden bg-zinc-950/50 p-4 rounded-xl border border-zinc-900">
            {logs.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-zinc-600 flex items-center gap-3"
              >
                <span className="text-zinc-800 italic">[{new Date().toLocaleTimeString('en-GB')}]</span>
                <span className="text-zinc-400">{msg}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 text-yellow-500">
              <Terminal className="w-3 h-3" />
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </section>

      {/* 40% Right Side: Login Form */}
      <section className="flex-1 lg:w-[40%] flex items-center justify-center p-6 bg-zinc-950/20">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-12"
        >
          {/* Form Header */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Welcome Back</h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Sign in to your account</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-4xl p-8 md:p-12 space-y-10 shadow-2xl relative overflow-hidden group">
            {/* Form Inputs */}
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && <div className="text-red-500 text-xs font-mono mb-4 text-center">{error}</div>}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      required
                      className="w-full bg-transparent border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Password</label>
                    <button type="button" className="text-[9px] font-mono text-zinc-500 hover:text-yellow-400 transition-colors uppercase">Forgot Password?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800 text-sm"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-yellow-400 text-black py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Separator */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-zinc-900 flex-1" />
              <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
              <div className="h-px bg-zinc-900 flex-1" />
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-3 bg-zinc-900/50 border border-zinc-800 py-3 rounded-xl hover:bg-zinc-800 transition-all group"
              >
                <Chrome className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">Google</span>
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-3 bg-zinc-900/50 border border-zinc-800 py-3 rounded-xl hover:bg-zinc-800 transition-all group"
              >
                <Github className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">GitHub</span>
              </button>
            </div>
          </div>

          {/* Form Footer */}
          <div className="text-center space-y-6">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">
              Don&apos;t have an account? <Link href="/signup" className="text-yellow-400 hover:underline">Register Now</Link>
            </p>
            
            <div className="flex items-center justify-center gap-8 opacity-20">
              <ShieldCheck className="w-4 h-4" />
              <Cpu className="w-4 h-4" />
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
