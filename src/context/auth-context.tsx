"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  coupleId: string;
}

interface LocalAccount extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ACCOUNTS_KEY = 'ayunikah_accounts';
const LOCAL_SESSION_KEY = 'ayunikah_session';
const POST_AUTH_REDIRECT_KEY = 'ayunikah_post_auth_redirect';

const getLocalAccounts = (): LocalAccount[] => {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem(LOCAL_ACCOUNTS_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const saveLocalAccounts = (accounts: LocalAccount[]) => {
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
};

const createLocalId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSupabaseUser = (sessionUser: { id: string; email?: string } | null | undefined) => {
    setUser(sessionUser?.email ? {
      id: sessionUser.id,
      email: sessionUser.email,
      coupleId: sessionUser.id,
    } : null);
  };

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        const sessionUser = data.session?.user;

        if (isMounted) {
          setSupabaseUser(sessionUser);
          setIsLoading(false);
        }

        return;
      }

      const storedUser = localStorage.getItem(LOCAL_SESSION_KEY);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.id === 'demo-user-123') {
            localStorage.removeItem(LOCAL_SESSION_KEY);
          } else {
            setUser(parsedUser);
          }
        } catch {
          localStorage.removeItem(LOCAL_SESSION_KEY);
        }
      }
      setIsLoading(false);
    };

    loadSession();

    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setSupabaseUser(session?.user);
        setIsLoading(false);
      });

      return () => {
        isMounted = false;
        data.subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      setIsLoading(false);

      if (error || !data.session?.user?.email) return false;

      localStorage.setItem(POST_AUTH_REDIRECT_KEY, '/dashboard');
      setSupabaseUser(data.session.user);
      return true;
    }

    const account = getLocalAccounts().find(
      (item) => item.email === normalizedEmail && item.password === password
    );

    if (!account) {
      setIsLoading(false);
      return false;
    }

    const session = { id: account.id, email: account.email, coupleId: account.coupleId };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(POST_AUTH_REDIRECT_KEY, '/dashboard');
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email: normalizedEmail, password });

      if (error || !data.user?.email) {
        setIsLoading(false);
        return false;
      }

      if (data.session?.user?.email) {
        localStorage.setItem(POST_AUTH_REDIRECT_KEY, '/dashboard');
        setSupabaseUser(data.session.user);
        setIsLoading(false);
        return true;
      }

      const signIn = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      setIsLoading(false);

      if (signIn.error || !signIn.data.session?.user?.email) return false;

      localStorage.setItem(POST_AUTH_REDIRECT_KEY, '/dashboard');
      setSupabaseUser(signIn.data.session.user);
      return true;
    }

    const accounts = getLocalAccounts();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      setIsLoading(false);
      return false;
    }

    const id = `local-user-${createLocalId()}`;
    const session = { id, email: normalizedEmail, coupleId: `local-couple-${id}` };
    saveLocalAccounts([...accounts, { ...session, password }]);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(POST_AUTH_REDIRECT_KEY, '/dashboard');
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }

    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
