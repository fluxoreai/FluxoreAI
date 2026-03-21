'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Chrome,
  ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { API_URL } from '@/lib/api-client';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function SignupPage() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Simple password strength calculation (0-100)
  const calculateStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 6) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = calculateStrength(password);
  
  const hashPassword = async (pass: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pass);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not ready');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const turnstile_token = await executeRecaptcha('signup');
      const password_hash = await hashPassword(password);
      
      await authApi.register({ 
        username,
        email, 
        password_hash, 
        password_hash_confirmation: password_hash,
        turnstile_token 
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    window.location.href = `${API_URL}/auth/${provider}/redirect`;
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden selection:bg-yellow-400 selection:text-black">
      
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
      
      {/* Mesh Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        
        {/* Layered Card Effect - Offset Back Card */}
        <div className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] translate-x-3 translate-y-3 pointer-events-none" />
        
        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl"
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <div className="relative w-16 h-16 mx-auto mb-2">
              <Image
                src="/logo/logo.webp"
                alt="FluxoreAI Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Create Account</h1>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Join the Flux community</p>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl hover:bg-zinc-800 transition-all group"
            >
              <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">Google</span>
            </button>
            <button 
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl hover:bg-zinc-800 transition-all group"
            >
              <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">GitHub</span>
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-zinc-900 flex-1" />
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Or register with email</span>
            <div className="h-px bg-zinc-900 flex-1" />
          </div>

          {/* Signup Form */}
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Your username"
                    className="w-full bg-transparent border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@email.com"
                    className="w-full bg-transparent border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800 text-sm"
                  />
                </div>
                {/* Password Strength Meter */}
                <div className="mt-2 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${strength}%` }}
                    className="h-full bg-yellow-400 shadow-[0_0_10px_#facc15]"
                  />
                </div>
                <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest ml-1">Password Strength: {strength}%</p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-yellow-300 transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(250,204,21,0.1)] disabled:opacity-50"
            >
              <span>{loading ? 'Creating account...' : 'Sign Up'}</span>
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
            Already have an account? <br />
            <Link href="/login" className="text-yellow-400 hover:underline">Login Now</Link>
          </p>

        </motion.div>
      </div>
    </main>
  );
}
