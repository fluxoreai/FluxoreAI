'use client';

import React, { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { mailApi } from '@/lib/api/mail';
import { mapsApi } from '@/lib/api/maps';

export const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | '', text: string}>({type: '', text: ''});
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchMap = async () => {
      try {
        const response = await mapsApi.getPin({ 
          address: "Palo Alto, California", // Address matching the UI text
          zoom: 13
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      setStatus({ type: 'error', text: 'ReCAPTCHA not ready. Please try again later.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const captchaToken = await executeRecaptcha('contact_form');
      await mailApi.submitContactForm({ name, email, message, captchaToken });
      setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Get in touch.</h2>
          <p className="text-zinc-500 max-w-sm">Ready to scale your intelligence? Let's talk about how FLUX can help.</p>
        </div>

        <form className="space-y-6 max-w-md" onSubmit={handleSubmit}>
          {status.text && (
            <div className={`text-xs font-mono p-3 rounded-lg ${status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
              {status.text}
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
              placeholder="Elon Musk"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700"
              placeholder="elon@spacex.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-700 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_-5px_rgba(250,204,21,0.3)] disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-yellow-400/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full h-[400px] lg:h-full min-h-[400px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center">
          {mapUrl ? (
            <iframe
              src={mapUrl}
              className="absolute inset-0 w-full h-full grayscale invert opacity-60 pointer-events-none"
              title="Headquarters Location"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="h-full w-full" style={{ 
                 backgroundImage: `radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)`,
                 backgroundSize: '24px 24px'
               }}></div>
            </div>
          )}
          <div className="relative flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
            </div>
            <div className="text-center">
              <p className="text-white font-mono text-xs uppercase tracking-widest">Headquarters</p>
              <p className="text-zinc-500 text-sm">Palo Alto, California</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
