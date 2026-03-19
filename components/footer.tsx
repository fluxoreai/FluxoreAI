import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedinIn, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-12 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Column 1 - Brand (Full width on very small screens) */}
          <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/logo/logo.webp"
                  alt="FluxoreAI Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-[200px]">
              Optimize, automate, and accelerate team operations with intelligent workflow insights.
            </p>
          </div>

          {/* Column 2 - Engine */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-widest">Engine</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: 'Engine', href: '/engine' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'About', href: '/about' },
                { name: 'Support', href: '/support' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-500 hover:text-yellow-400 transition-colors text-xs md:text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources (Hidden on mobile to reduce clutter) */}
          <div className="hidden md:block col-span-1">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Documentation', href: '#' },
                { name: 'API Reference', href: '#' },
                { name: 'Join Discord', href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-500 hover:text-yellow-400 transition-colors text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-widest text-right md:text-left">Connect</h4>
            <div className="flex justify-end md:justify-start space-x-3 md:space-x-4 mb-6 md:mb-8">
              {[
                {
                  name: 'X',
                  icon: FaXTwitter,
                  href: 'https://x.com/fluxoreai'
                }, {
                  name: 'LinkedIn',
                  icon: FaLinkedinIn,
                  href: 'https://www.linkedin.com/company/fluxoreai/'
                }, {
                  name: 'Facebook',
                  icon: FaFacebook,
                  href: 'https://www.facebook.com/fluxoreai'
                }, {
                  name: 'YouTube',
                  icon: FaYoutube,
                  href: 'https://www.youtube.com/@FluxoreAI'
                }].map((i, index) => (
                  <div key={index} className="group flex items-center justify-center hover:border-yellow-400  transition-all cursor-pointer">
                    <div className="flex flex-col space-y-2 items-center justify-center" >
                      <i.icon className="w-7 h-7 md:w-7 md:h-7 text-zinc-700 group-hover:text-yellow-400" />
                      {/* link name in small letters at the bottom withh hover color change in group */}
                      <span className="text-zinc-500 group-hover:text-yellow-400 transition-colors text-xs md:text-xs font-mono">{i.name}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="hidden md:inline-flex bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 items-center space-x-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300">Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-zinc-600 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="text-center md:text-left order-2 md:order-1">© 2026 FLUX INTELLIGENCE AG</div>
          <div className="flex space-x-6 md:space-x-8 order-1 md:order-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
