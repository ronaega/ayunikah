"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  coupleId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        const sessionUser = data.session?.user;

        if (isMounted) {
          setUser(sessionUser?.email ? {
            id: sessionUser.id,
            email: sessionUser.email,
            coupleId: sessionUser.id,
          } : null);
          setIsLoading(false);
        }

        return;
      }

      const storedUser = localStorage.getItem('ayunikah_session');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const demoUser = {
          id: "demo-user-123",
          email: "lidya.ayunikah@gmail.com",
          coupleId: "demo-couple-123"
        };
        localStorage.setItem('ayunikah_session', JSON.stringify(demoUser));
        setUser(demoUser);
      }
      setIsLoading(false);
    };

    loadSession();

    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        const sessionUser = session?.user;
        setUser(sessionUser?.email ? {
          id: sessionUser.id,
          email: sessionUser.email,
          coupleId: sessionUser.id,
        } : null);
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

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);

      if (error || !data.user?.email) return false;

      setUser({
        id: data.user.id,
        email: data.user.email,
        coupleId: data.user.id,
      });
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    const session = { id: "demo-user-123", email, coupleId: "demo-couple-123" };
    localStorage.setItem('ayunikah_session', JSON.stringify(session));
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      setIsLoading(false);

      if (error || !data.user?.email) return false;

      setUser({
        id: data.user.id,
        email: data.user.email,
        coupleId: data.user.id,
      });
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const session = { id: "demo-user-123", email, coupleId: "demo-couple-123" };
    localStorage.setItem('ayunikah_session', JSON.stringify(session));
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }

    localStorage.removeItem('ayunikah_session');
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
