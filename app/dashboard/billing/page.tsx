'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, Check, AlertCircle, Loader2 } from 'lucide-react';
import { authApi } from '@/lib/api/auth';
import { paymentsApi } from '@/lib/api/payments';
import Link from 'next/link';
import { PricingPlan } from '@/app/(public)/pricing/page';

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user basic data (ideally this has subscription info)
        const userResp = await authApi.getUserProfile();
        if (mounted && userResp?.data) {
          setProfile(userResp.data);
        }
        
        // Fetch plans to map against user's plan _id/slug
        const planResp = await paymentsApi.getSubscriptionPlans();
        if (mounted && planResp?.data) {
          setPlans(planResp.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            monthlyPrice: parseFloat(p.price_monthly),
            features: p.features || []
          })));
        }
      } catch (e) {
        console.error("Failed to load billing data", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchData();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  // Derive current plan based on profile.plan_id or default to None
  const currentPlan = profile?.plan_id 
    ? plans.find(p => p.id === profile.plan_id) 
    : null;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Billing & Plans</h1>
        <p className="text-zinc-500">Manage your neural sync allocation and billing methods.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Plan Widget */}
        <div className="col-span-1 md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-[80px] group-hover:bg-yellow-400/10 transition-colors" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">Current_Subscription</h2>
            
            {currentPlan ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-3xl font-black text-white">{currentPlan.name}</h3>
                      <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-zinc-500 text-sm">Next billing date: 28 days remaining</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${currentPlan.monthlyPrice}<span className="text-sm text-zinc-500">/mo</span></div>
                  </div>
                </div>

                <div className="h-px bg-zinc-800 w-full" />

                <div className="grid grid-cols-2 gap-4">
                  {currentPlan.features.slice(0,4).map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Link href="/pricing" target="_blank">
                    <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-colors">
                      Change Plan
                    </button>
                  </Link>
                  <button className="bg-transparent border border-zinc-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-zinc-900 transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                  <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">No Active Protocol</p>
                  <p className="text-zinc-500 text-sm mb-4">You are currently using the free tier with limited capacity.</p>
                  <Link href="/pricing" target="_blank">
                    <button className="bg-yellow-400 text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                      Explore Plans
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Method Widget */}
        <div className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between group h-full">
          <div>
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">Payment_Method</h2>
            
            <div className="bg-black border border-zinc-800 rounded-xl p-4 flex items-center gap-4 mb-4 group-hover:border-zinc-700 transition-colors">
              <div className="w-10 h-6 bg-zinc-200 rounded flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">•••• 4242</p>
                <p className="text-xs text-zinc-500">Expires 12/28</p>
              </div>
            </div>
            
            <button className="text-sm text-yellow-400 hover:text-yellow-300 font-medium w-full text-left py-2 hover:bg-yellow-400/5 px-3 -mx-3 rounded-lg transition-colors">
              + Add new payment method
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" /> Billing History
            </h3>
            <div className="space-y-3">
              {[
                { date: 'Dec 12, 2025', amount: '$49.00', status: 'Paid' },
                { date: 'Nov 12, 2025', amount: '$49.00', status: 'Paid' },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 font-mono text-xs">{inv.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white">{inv.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
