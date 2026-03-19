'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api/auth';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Typically the provider might send `token`, `access_token`, or it might be in the URL hash
      const token = searchParams.get('token') || searchParams.get('access_token');
      const provider = searchParams.get('provider'); // 'google' | 'github'

      if (token && provider) {
        try {
          if (provider === 'google') {
            await authApi.googleLogin(token);
          } else if (provider === 'github') {
            await authApi.githubLogin(token);
          }
          router.push('/dashboard');
        } catch (error) {
          console.error('Social login failed', error);
          router.push('/login?error=SocialLoginFailed');
        }
      } else {
        router.push('/login?error=InvalidSocialToken');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-yellow-400 mx-auto"></div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Verifying Identity Sync...</p>
      </div>
    </div>
  );
}

export default function SocialCallbackPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-black"><p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Sync...</p></div>}>
      <CallbackContent />
    </Suspense>
  );
}
