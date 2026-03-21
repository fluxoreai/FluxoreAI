'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getAuthToken } from '@/lib/api-client';
import Image from 'next/image';

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    if (getAuthToken()) {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Support', href: '/support' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group z-50">
          <div className="relative w-16 h-16 transform group-hover:scale-110 transition-transform duration-500">
            <Image
              src="/logo/logo.webp"
              alt="FluxoreAI Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 text-sm transition-colors ${isActive ? 'text-yellow-400 font-black' : 'text-zinc-400 font-medium hover:text-white'}`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-6">
          {!isLoggedIn ? (
            <>

              <Link href="/engine">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(250,204,21,0.5)] active:scale-95">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard" target="_blank">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(250,204,21,0.5)] active:scale-95">
                Dashboard
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-black italic transition-colors flex items-center gap-4 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
                    >
                      {item.name}
                      {isActive && <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto mb-12 flex flex-col space-y-4">
              {!isLoggedIn ? (
                <>

                  <Link
                    href="/engine"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold">
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
