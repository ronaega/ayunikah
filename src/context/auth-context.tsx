"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
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
    // Check local storage for active session
    const storedUser = localStorage.getItem('ayunikah_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Auto-login with default credentials for demonstration convenience
      const demoUser = { email: "lidya.ayunikah@gmail.com", coupleId: "demo-couple-123" };
      localStorage.setItem('ayunikah_session', JSON.stringify(demoUser));
      setUser(demoUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simple mock logic
    const session = { email, coupleId: "demo-couple-123" };
    localStorage.setItem('ayunikah_session', JSON.stringify(session));
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const session = { email, coupleId: "demo-couple-123" };
    localStorage.setItem('ayunikah_session', JSON.stringify(session));
    setUser(session);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
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
