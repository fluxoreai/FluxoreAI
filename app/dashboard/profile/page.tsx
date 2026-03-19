'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Clock, 
  CreditCard, 
  IdCard,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { authApi } from '@/lib/api/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await authApi.getUserProfile();
        if (resp?.data) {
          setUser(resp.data);
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-yellow-400"></div>
      </div>
    );
  }

  const profileSections: { title: string; icon: any; items: { label: string; value: any; icon: any; color?: string }[] }[] = [
    {
      title: 'Identity',
      icon: IdCard,
      items: [
        { label: 'Full Name', value: `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Not set', icon: User },
        { label: 'Username', value: user?.username || 'Not set', icon: User },
        { label: 'Email Address', value: user?.email, icon: Mail },
        { label: 'User ID', value: `#${user?.id || '---'}`, icon: Shield },
      ]
    },
    {
      title: 'Security & Status',
      icon: Shield,
      items: [
        { label: 'Account Status', value: 'Active', icon: CheckCircle2, color: 'text-green-400' },
        { 
          label: 'Joined', 
          value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '---', 
          icon: Calendar 
        },
        { 
          label: 'Email Verified', 
          value: user?.email_verified_at ? 'Verified' : 'Pending', 
          icon: Shield,
          color: user?.email_verified_at ? 'text-green-400' : 'text-yellow-400'
        },
      ]
    },
    {
      title: 'Subscription',
      icon: CreditCard,
      items: [
        { label: 'Current Plan', value: (user?.current_plan || 'Free').toUpperCase(), icon: CreditCard, color: 'text-yellow-400 font-bold' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header / Hero */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-yellow-400/20 to-transparent rounded-4xl blur opacity-25"></div>
        <div className="relative bg-zinc-900/30 border border-zinc-800 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-zinc-800 bg-black">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-zinc-800 text-yellow-400 text-3xl font-black uppercase">
              {(user?.first_name || user?.email || 'U').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
              {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.username || 'User Profile'}
            </h1>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
              {user?.current_plan || 'Standard'} Intelligence Node
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-mono uppercase tracking-wider">
                System_Admin
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
                Ver_2.4.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {profileSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 space-y-6 ${idx === 2 ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <section.icon className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">{section.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {section.items.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold truncate ${item.color || 'text-zinc-200'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex justify-center pt-8">
        <button className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
          Request Data Export // GDPR_REQ
        </button>
      </div>
    </div>
  );
}
