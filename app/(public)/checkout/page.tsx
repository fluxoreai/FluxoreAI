'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Zap, Check, Lock, ShieldCheck, Mail, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api/auth';
import { paymentsApi } from '@/lib/api/payments';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { PricingPlan } from '../pricing/page';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Registration form state for guest checkout
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [planDetails, setPlanDetails] = useState<PricingPlan | null>(null);

  // Payment Details
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Billing Address
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateAddress, setStateAddress] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('USA');

  useEffect(() => {
    let mounted = true;

    const initCheckout = async () => {
      try {
        setLoading(true);
        // 1. Fetch Plan Details
        if (planId) {
          const resp = await paymentsApi.getSubscriptionPlans();
          if (resp?.data) {
            const foundPlan = resp.data.find((p: any) => p.id.toString() === planId);
            if (foundPlan) {
              setPlanDetails({
                id: foundPlan.id,
                slug: foundPlan.slug,
                name: foundPlan.name,
                monthlyPrice: parseFloat(foundPlan.price_monthly),
                yearlyPrice: parseFloat(foundPlan.price_yearly),
                description: foundPlan.description,
                features: foundPlan.features || [],
                style: '',
                buttonStyle: '',
                popular: foundPlan.is_popular
              });
            } else {
              setError("Plan not found. Please reselect from the pricing page.");
            }
          }
        } else {
          setError("No plan selected. Please go back to pricing.");
        }

        // 2. Check Auth Status
        try {
          const userResp = await authApi.getUserProfile();
          if (userResp?.data && mounted) {
            setIsAuthenticated(true);
            setUserProfile(userResp.data);
          }
        } catch (e) {
          // Not authenticated
          setIsAuthenticated(false);
        }

      } catch (e) {
        console.error("Initialization error", e);
        if (mounted) setError("Failed to initialize checkout. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initCheckout();
    return () => { mounted = false; };
  }, [planId]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // 1. If not authenticated, register first
      if (!isAuthenticated) {
        if (!executeRecaptcha) {
          throw new Error("ReCAPTCHA not ready");
        }
        const turnstile_token = await executeRecaptcha('checkout_register');

        await authApi.register({
          username,
          email,
          password_hash: password,
          password_hash_confirmation: password,
          turnstile_token
        });

        // Logged in now
        setIsAuthenticated(true);
      }

      // 2. Subscribe to plan
      if (!planDetails) throw new Error("Missing plan details");

      await paymentsApi.subscribe({
        plan_slug: planDetails.slug,
        payment_method: {
          card_number: cardNumber,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          cvv,
          card_holder: cardHolder
        },
        billing_address: {
          street,
          city,
          state: stateAddress,
          zip,
          country
        }
      });

      setSuccess('Subscription activated successfully! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black selection:bg-yellow-400 selection:text-black p-6 md:p-12 relative overflow-x-hidden">
      {/* Mesh Gradient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      <Link
        href="/pricing"
        className="inline-flex mt-10 items-center gap-2 text-zinc-500 hover:text-yellow-400 transition-colors group mb-12"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-xs uppercase tracking-[0.3em]">Back_to_Plans</span>
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Form / Auth Status */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
                Final Protocol
              </h1>
              <p className="text-zinc-500 font-medium">Verify your identity and activate your neural sync allocation.</p>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl font-mono">{error}</div>}
            {success && <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-xl font-mono">{success}</div>}

            <form onSubmit={handleCheckout} className="space-y-8 relative z-10">
              {!isAuthenticated ? (
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                      <User className="w-4 h-4 text-yellow-400" /> Account Creation
                    </h2>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">New_Identity</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Entity Name</label>
                      <input
                        required
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Comms Address (Email)</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="[EMAIL_ADDRESS]"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Access Key (Password)</label>
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-600 font-mono text-center">
                    Already have an account? <Link href="/login" className="text-yellow-400 hover:underline">Log in here</Link>
                  </p>
                </div>
              ) : (
                <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold uppercase tracking-tight">Identity Verified</h2>
                    <p className="text-zinc-500 text-sm font-mono">{userProfile?.email || 'Authenticated User'}</p>
                  </div>
                </div>
              )}

              <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                    <Lock className="w-4 h-4 text-yellow-400" /> Payment Details
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Card Number</label>
                    <input required type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4111 1111 1111 1111" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Expiry (MM/YY)</label>
                      <div className="flex gap-2">
                        <input required type="text" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value.slice(0, 2))} placeholder="MM" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white text-center" />
                        <span className="text-zinc-600 flex items-center">/</span>
                        <input required type="text" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value.slice(0, 2))} placeholder="YY" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white text-center" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">CVV</label>
                      <input required type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Card Holder</label>
                    <input required type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Name on card" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400" /> Billing Address
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Street Address</label>
                    <input required type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="123 Main St" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">City</label>
                      <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">State/Province</label>
                      <input required type="text" value={stateAddress} onChange={(e) => setStateAddress(e.target.value)} placeholder="State" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">ZIP / Postal Code</label>
                      <input required type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="10001" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">Country</label>
                      <input required type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="USA" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !!success || !planDetails}
                className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] transform transition-all hover:bg-yellow-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(250,204,21,0.15)] group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Activate Subscription
                    <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>

              <div className="text-center flex items-center justify-center gap-2 text-zinc-600">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Post-Quantum SSL Secure Transport</span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:pl-16">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-b from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.2em] mb-8">Order_Summary</h3>

                {planDetails ? (
                  <div className="space-y-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{planDetails.name} Plan</h4>
                        <p className="text-zinc-500 text-sm">{planDetails.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">${planDetails.monthlyPrice}</div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">/month</div>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-900 w-full" />

                    <div className="space-y-4">
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Included_Parameters</p>
                      {planDetails.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-zinc-900 w-full" />

                    <div className="flex items-center justify-between text-white font-bold text-lg">
                      <span>Total Due Today</span>
                      <span>${planDetails.monthlyPrice}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-zinc-500 flex flex-col items-center gap-4">
                    <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
                    <span className="text-xs uppercase font-mono tracking-widest">Loading Plan Data...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 text-yellow-400 animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
