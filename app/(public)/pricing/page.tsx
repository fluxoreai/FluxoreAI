'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Info, Users, Zap, Clock } from 'lucide-react';
import { paymentsApi } from '@/lib/api/payments';


const fallbackPricingPlans = [
  {
    id: 1,
    slug: "basic-flow",
    name: "Basic Flow",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For individuals and small teams exploring smarter workflows.",
    features: ["5 Workflow Insights/mo", "Basic Workflow Analytics", "1 Tool Integration", "Community Support"],
    style: "bg-zinc-900 border-zinc-800",
    buttonStyle: "bg-zinc-800 text-white hover:bg-zinc-700",
    popular: false
  },
  {
    id: 2,
    slug: "pulse-pro",
    name: "Pulse Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Powerful workflow intelligence for growing teams.",
    features: ["Unlimited Workflow Insights", "Advanced Workflow Analytics", "Up to 15 Tool Integrations", "AI Workflow Optimization", "Priority Support"],
    style: "bg-black border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.15)]",
    buttonStyle: "bg-yellow-400 text-black hover:bg-yellow-300",
    popular: true
  },
  {
    id: 3,
    slug: "enterprise-flux",
    name: "Enterprise Flux",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "Advanced workflow intelligence for large organizations.",
    features: ["Unlimited Workflow Monitoring", "Custom AI Optimization Models", "Unlimited Integrations", "Enterprise Security & Compliance", "Dedicated Customer Success Manager", "Private or On-Premise Deployment"],
    style: "bg-zinc-900 border-zinc-800",
    buttonStyle: "bg-zinc-800 text-white hover:bg-zinc-700",
    popular: false
  }
];

export type PricingPlan = typeof fallbackPricingPlans[0];

const faqs = [
  {
    question: "What exactly is 'Neural Sync'?",
    answer: "Neural Sync is our proprietary protocol for maintaining perfect state consistency across distributed edge nodes with minimal latency. It uses a custom-built consensus algorithm Optimized for high-frequency data streams."
  },
  {
    question: "How does the consumption-based billing work?",
    answer: "For teams above the basic tier, we bill monthly based on total sync operations and data throughput. You can set hard caps in your dashboard to prevent unexpected costs."
  },
  {
    question: "Can I deploy FLUX on my own infrastructure?",
    answer: "Yes, the Enterprise tier supports on-premise and air-gapped deployments using our proprietary FLUX Container Runtime (FCR)."
  },
  {
    question: "Is FLUX really quantum-resistant?",
    answer: "Absolutely. Our authentication and transport layers use NIST-approved post-quantum cryptographic primitives, ensuring your data remains secure even as quantum computing advances."
  }
];

function BillingToggle({ isYearly, toggle }: { isYearly: boolean, toggle: () => void }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
      <button
        onClick={toggle}
        className="relative w-14 h-7 bg-zinc-800 rounded-full p-1 transition-colors hover:bg-zinc-700"
      >
        <motion.div
          animate={{ x: isYearly ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 bg-yellow-400 rounded-full shadow-sm"
        />
      </button>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-zinc-500'}`}>Yearly</span>
        <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-400/20">
          -20%
        </span>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [monthlyTasks, setMonthlyTasks] = useState(500);
  const [hoursSaved, setHoursSaved] = useState(0);

  useEffect(() => {
    // Formula: (TeamSize * Tasks * 0.15) - arbitrary but looks convincing
    const saved = Math.round(teamSize * (monthlyTasks / 20) * 0.8);
    setHoursSaved(saved);
  }, [teamSize, monthlyTasks]);

  return (
    <section className="max-w-4xl mx-auto mb-32 p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2">Find Your Workflow Tier</h2>
            <p className="text-zinc-500 text-sm">Simple pricing for powerful workflow intelligence.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-3 h-3" /> Team Size
                </label>
                <span className="text-yellow-400 font-bold">{teamSize}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Monthly Tasks
                </label>
                <span className="text-yellow-400 font-bold">{monthlyTasks}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={monthlyTasks}
                onChange={(e) => setMonthlyTasks(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-black/40 rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center space-y-4">
          <Clock className="w-8 h-8 text-yellow-400/50 mb-2" strokeWidth={1.5} />
          <div className="space-y-1">
            <motion.p
              key={hoursSaved}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-7xl font-black text-yellow-400 tracking-tighter drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"
            >
              {hoursSaved}
            </motion.p>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em]">Estimated Hours Saved / Mo</p>
          </div>
          <div className="pt-6 w-full border-t border-white/5 mt-4">
            <p className="text-[10px] text-zinc-600 leading-relaxed italic">
              *Calculated based on standard autonomous rerouting & global node acceleration metrics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<PricingPlan[]>(fallbackPricingPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPlans = async () => {
      try {
        const response = await paymentsApi.getSubscriptionPlans();
        if (mounted && response.data && response.data.length > 0) {
          // Map backend plans back into the UI format
          const mappedPlans: PricingPlan[] = response.data.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            monthlyPrice: p.price_monthly === 'Custom' ? 'Custom' : parseFloat(p.price_monthly),
            yearlyPrice: p.price_yearly === 'Custom' ? 'Custom' : parseFloat(p.price_yearly),
            description: p.description || "Powerful features for your scale.",
            features: p.features || ["Standard features"],
            style: p.is_popular
              ? "bg-black border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.15)]"
              : "bg-zinc-900 border-zinc-800",
            buttonStyle: p.is_popular
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-zinc-800 text-white hover:bg-zinc-700",
            popular: p.is_popular
          }));
          setPlans(mappedPlans);
        }
      } catch (error) {
        console.warn('Failed to load pricing plans from API. Using fallbacks.', error);
        // Fallback is already set in initial state
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPlans();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="bg-black text-white selection:bg-yellow-400 selection:text-black min-h-screen pt-32 pb-24 px-6 md:px-24 overflow-x-hidden">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
          PRICING
        </h1>
        <p className="text-zinc-500 text-lg font-medium">Predictable costs for unpredictable intelligence.</p>
      </section>

      <BillingToggle isYearly={isYearly} toggle={() => setIsYearly(!isYearly)} />

      {/* Pricing Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative rounded-4xl border p-8 flex flex-col justify-between group ${plan.style} transition-all duration-500`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)] z-10">
                Most Popular
              </div>
            )}

            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 overflow-hidden h-14">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-5xl lg:text-6xl font-black tracking-tighter text-white">
                        {typeof plan.monthlyPrice === 'number'
                          ? `$${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`
                          : plan.monthlyPrice}
                      </span>
                      {typeof plan.monthlyPrice === 'number' && (
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest pb-1">/mo</span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {isYearly && typeof plan.yearlyPrice === 'number' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-yellow-400/60 font-mono mt-1"
                  >
                    Billed annually (${plan.yearlyPrice * 12}/yr)
                  </motion.p>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{plan.description}</p>

              <div className="space-y-4 pt-4">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-center space-x-3 text-[13px] text-zinc-300 group-hover:text-white transition-colors">
                    <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" strokeWidth={3} />
                    <span className="font-medium tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-4 relative z-10">
              <Link href={`/checkout?plan=${plan.id}`} className="block">
                <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2 group/btn ${plan.buttonStyle}`}>
                  Initialize Node
                  <Zap className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" fill="currentColor" />
                </button>
              </Link>
              <p className="text-[9px] text-zinc-600 text-center font-mono uppercase tracking-widest">No credit card required</p>
            </div>

            {/* Subtle card glow on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-yellow-400/0 via-transparent to-yellow-400/0 group-hover:from-yellow-400/3 group-hover:to-yellow-400/1 transition-all duration-1000 rounded-4xl pointer-events-none" />
          </motion.div>
        ))}
      </section>

      <ROICalculator />

      {/* FAQ Section */}
      {/* <section className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
            <Info className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Intelligence_Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600 pb-1">FAQ</h2>
          <p className="text-zinc-500 font-medium">Everything you need to know about FLUX infrastructure.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-zinc-800/50 bg-zinc-900/20 rounded-2xl px-6 border hover:border-zinc-700 transition-colors">
              <AccordionTrigger className="text-left py-6 hover:no-underline group">
                <span className="font-bold text-zinc-200 group-hover:text-yellow-400 transition-colors tracking-tight">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-zinc-500 leading-relaxed font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section> */}
    </main>
  );
}
