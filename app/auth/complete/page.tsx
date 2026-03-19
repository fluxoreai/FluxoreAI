'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAuthToken } from '@/lib/api-client';

function CompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Set the token in local storage
      setAuthToken(token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // Redirect to login with error
      router.push('/login?error=InvalidSocialToken');
    }
  }, [router, searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="relative w-12 h-12 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight uppercase italic mt-4">Identity Syncing</h2>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">Establishing Secure Neural Handshake...</p>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Initializing...</p>
      </div>
    }>
      <CompleteContent />
    </Suspense>
  );
}
