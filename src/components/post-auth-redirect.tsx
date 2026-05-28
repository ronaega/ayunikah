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

    const target = localStorage.getItem(POST_AUTH_REDIRECT_KEY);
    if (target !== '/dashboard') return;

    localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
    if (pathname !== '/dashboard') {
      router.replace('/dashboard');
    }
  }, [isLoading, pathname, router, user]);

  return null;
}
