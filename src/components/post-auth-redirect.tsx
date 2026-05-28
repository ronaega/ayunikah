"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';

const POST_AUTH_REDIRECT_KEY = 'ayunikah_post_auth_redirect';

export function PostAuthRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !user || typeof window === 'undefined') return;

    const rawRedirect = localStorage.getItem(POST_AUTH_REDIRECT_KEY);
    if (!rawRedirect) return;

    let redirect: { target?: string; createdAt?: number } | null = null;
    try {
      redirect = JSON.parse(rawRedirect);
    } catch {
      localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
      return;
    }

    if (!redirect) return;

    const isFresh = typeof redirect.createdAt === 'number' && Date.now() - redirect.createdAt < 15000;
    if (redirect.target !== '/dashboard' || !isFresh) {
      localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
      return;
    }

    localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
    if (pathname !== '/dashboard') {
      router.replace('/dashboard');
    }
  }, [isLoading, pathname, router, user]);

  return null;
}
