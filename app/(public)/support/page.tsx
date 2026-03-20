'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Search,
  Activity,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Globe,
  MapPin,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { aiApi } from '@/lib/api/ai';
import { mapsApi } from '@/lib/api/maps';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { mailApi } from '@/lib/api/mail';

/* ──────────────────────────────────────────────────────────────────────────
   1. INFRASTRUCTURE MAP COMPONENT (JET-BLACK CUSTOM SVG)
   ────────────────────────────────────────────────────────────────────────── */
function InfrastructureMap() {
  const [mapUrl, setMapUrl] = useState('about:blank');

  useEffect(() => {
    let mounted = true;
    const fetchMap = async () => {
      try {
        const response = await mapsApi.getPin({
          address: "123 Main Street, New York, NY 10001",
          zoom: 15
        });
        if (mounted && response.data?.embed_url) {
          setMapUrl(response.data.embed_url);
        }
      } catch (err) {
        console.error('Failed to load map pin', err);
      }
    };
    fetchMap();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-black border border-zinc-800 rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(250,204,21,0.15)] transition-all hover:shadow-[0_0_40px_rgba(250,204,21,0.25)]">
      {/* Google Maps iFrame */}
      <iframe
        src={mapUrl}
        className="absolute inset-0 w-full h-full grayscale invert opacity-80"
        title="Infrastructure_Node_Location"
        loading="lazy"
      />

      {/* Overlay Details */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none z-10">
        <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-900 rounded-xl p-4 w-fit flex items-center gap-4">
          <div className="relative">
            <Globe className="w-5 h-5 text-yellow-400" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-mono text-white/90 uppercase tracking-widest">Global Node Network</p>
            <p className="text-[9px] font-mono text-zinc-600 uppercase">Operational Status: 100% // NO_FRICTION</p>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2. CONTACT FORM COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Technical Implementation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not ready');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const turnstile_token = await executeRecaptcha('support_contact');
      await mailApi.submitContactForm({ 
        name, 
        email, 
        message: `Subject: ${subject}\n\n${message}`, 
        turnstile_token 
      });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 relative z-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter uppercase italic text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500">
          Open Support Ticket
        </h2>
        <p className="text-zinc-500 text-sm max-w-sm">Direct line to our systems architecture team. Response SLA: &lt; 2 Hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-500 text-xs font-mono text-center">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-1">Commander Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all placeholder:text-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-1">Comms Endpoint</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="[EMAIL_ADDRESS]"
              className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all placeholder:text-zinc-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-1">Issue Subject</label>
          <select 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400/50 transition-all appearance-none cursor-pointer"
          >
            <option className="bg-zinc-950">Technical Implementation</option>
            <option className="bg-zinc-950">Neural Grid Synchronization</option>
            <option className="bg-zinc-950">Billing & Account</option>
            <option className="bg-zinc-950">Security Vulnerability</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-1">Message Payload</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the technical friction..."
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all placeholder:text-zinc-800 resize-none"
          />
        </div>

        <div className="space-y-4 pt-2">
          <button
            disabled={isSubmitting || isSuccess}
            className="w-full bg-zinc-100 text-black hover:text-yellow-400 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSuccess ? (
              <ShieldCheck className="w-4 h-4" />
            ) : (
              'Send Message'
            )}
            {!isSubmitting && !isSuccess && (
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
          </button>

          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3 text-zinc-700" />
            <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
              Protected by reCAPTCHA v3 // Secure_Channel_Enabled
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. AI SUPPORT COMMAND PALETTE
   ────────────────────────────────────────────────────────────────────────── */
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

function SupportAIChat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [osKey, setOsKey] = useState('CTRL');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM has updated with new messages
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isProcessing]);

  useEffect(() => {
    // Detect OS for shortcut display
    if (typeof window !== 'undefined') {
      const platform = window.navigator?.platform?.toLowerCase() || '';
      if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) {
        setOsKey('CMD');
      }
    }

    // Keyboard shortcut listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const performAiRequest = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setIsProcessing(true);

    try {
      const response = await aiApi.generate({ prompt: text });
      // Support both new nested structure and legacy flat structure
      const aiContent = response.data?.choices?.[0]?.message?.content || response.data?.response;
      
      if (aiContent) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiContent,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: err.message || 'AI generation failed due to network anomaly.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performAiRequest(query);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setQuery('');
  };

  const hasStarted = messages.length > 0;

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col h-[600px] bg-zinc-950/50 border border-zinc-900 rounded-4xl overflow-hidden shadow-2xl relative z-10">

      {/* Header with New Chat Button */}
      <div className="px-8 py-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Neural_Sync // Active_Session</span>
        </div>

        {hasStarted && (
          <button
            onClick={startNewChat}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white transition-all uppercase tracking-widest"
          >
            <span>+</span> New Chat
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative"
      >
        <AnimatePresence initial={false}>
          {!hasStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-yellow-400/5 rounded-full flex items-center justify-center border border-yellow-400/20">
                  <Activity className="w-8 h-8 text-yellow-400" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl -z-10"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white">Get Your Team Up and Running</h3>
                <p className="text-zinc-500 text-sm max-w-sm">We can help with Docker integration, API caps, and security setup.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Docker Config', 'API Docs', 'Security'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => performAiRequest(tag)}
                    className="px-4 py-2 rounded-full border border-zinc-900 bg-zinc-900/50 text-[10px] font-mono text-zinc-500 hover:text-yellow-400 hover:border-yellow-400/30 transition-all uppercase tracking-widest"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-6 py-4 text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-zinc-100 text-black rounded-tr-sm'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-sm'
                    }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-50 font-mono text-[9px] uppercase tracking-widest">
                      {msg.role === 'assistant' ? 'FLUX_AI_NODE' : 'USER_COMMAND'} // {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                          className="w-1 h-1 bg-yellow-400 rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">Neural_Syncing...</span>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="px-8 py-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="relative group">
          <div className="absolute -inset-1 bg-yellow-400/10 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-black border border-zinc-800 focus-within:border-yellow-400/50 rounded-xl px-4 py-2 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownInput}
              placeholder="Enter your command or question..."
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-2 py-2 text-sm text-white placeholder:text-zinc-700 font-medium"
            />
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[9px] text-zinc-600">
                <span className="opacity-50">{osKey}</span>
                <span>K</span>
              </div>
              <button
                onClick={() => performAiRequest(query)}
                disabled={!query.trim() || isProcessing}
                className="p-2 rounded-lg bg-zinc-100 text-black hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export default function SupportPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-12 px-6 md:px-24 selection:bg-yellow-400 selection:text-black overflow-x-hidden relative">

      {/* Background Image with Overlay */}
      <div className="absolute top-0 right-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src="/Images/support_image.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* Header (Minimalist & Authoritative) */}
        <section className="relative py-12">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Command_Center_v2.4</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600 leading-none py-4">
                SERVICE HUB
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end space-y-1">
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">FLUX Protocol Operations</p>
              <p className="text-yellow-400 font-mono text-[10px] uppercase tracking-[0.3em]">Status: Fully_Operational</p>
            </div>
          </div>
        </section>

        {/* Bottom Status Bar */}
        <section className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 border-y border-zinc-900 bg-black w-full max-w-7xl mx-auto font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-widest">
              Average Response Time: 2h
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-50" />
              </div>
              <span className="text-green-500 uppercase tracking-widest font-medium">All Systems Operational</span>
            </div>
          </div>
        </section>

        {/* AI Chat Command Palette */}
        <section>
          <SupportAIChat />
        </section>

        {/* Main Grid: Form + Map */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start pb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <InfrastructureMap />
          </motion.div>
        </section>

      </div>
    </main>
  );
}
