'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  GitMerge, 
  BarChart3, 
  Zap, 
  Settings, 
  ChevronRight,
  User,
  Bell,
  Search,
  Server,
  CreditCard
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthGuard from '@/components/auth-guard';
import { authApi } from '@/lib/api/auth';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Workflows', icon: GitMerge, href: '/dashboard/workflows' },
  { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { name: 'Automations', icon: Zap, href: '/dashboard/automations' },
  { name: 'Infrastructure', icon: Server, href: '/dashboard/infrastructure' },
  { name: 'Billing & Plans', icon: CreditCard, href: '/dashboard/billing' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userProfile, setUserProfile] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const resp = await authApi.getUserProfile();
        if (mounted && resp?.data) {
          setUserProfile(resp.data);
        }
      } catch (e) {
        console.error('Failed to load user profile in dashboard', e);
      }
    };
    fetchUser();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-zinc-800 flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center group">
            <div className="relative w-8 h-8 transform group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/logo/logo.webp"
                alt="FluxoreAI Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <nav className="grow p-4 space-y-2 pt-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-yellow-400 text-black font-semibold' 
                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800">
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">System Capacity</p>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 w-[72%]" />
            </div>
            <p className="text-right text-[10px] text-yellow-400 mt-1 font-mono">72%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="grow flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-zinc-500 text-sm space-x-2">
              <span>Platform</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium capitalize">
                {pathname.split('/').pop() || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 focus-within:border-yellow-400/50 transition-colors">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 ml-2 placeholder:text-zinc-600"
              />
            </div>
            
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border-2 border-black" />
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-zinc-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">
                  {userProfile?.name || userProfile?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-[10px] font-mono text-zinc-500">{userProfile?.email || 'Loading...'}</p>
              </div>
              <Avatar className="h-8 w-8 border border-zinc-800">
                <AvatarImage src="" />
                <AvatarFallback className="bg-zinc-800 text-yellow-400 text-xs font-bold uppercase">
                  {(userProfile?.name || userProfile?.email || 'U').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="grow overflow-y-auto p-8 custom-scrollbar">
          <AuthGuard>
            {children}
          </AuthGuard>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
}
