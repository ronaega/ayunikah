"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all details.');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Sparkles & Hearts */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-blush-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-lavender-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[420px] glass rounded-3xl p-8 shadow-2xl relative border border-blush-200/40"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 select-none">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-blush-200 mx-auto flex items-center justify-center shadow-lg shadow-blush-300/40 mb-3"
          >
            <Heart className="w-6 h-6 text-elegant fill-elegant/10" />
          </motion.div>
          
          <h1 className="text-2xl font-bold tracking-wide text-elegant leading-none">Ayunikah</h1>
          <p className="text-xs text-rosegold-400 font-semibold tracking-wider uppercase mt-1">Wedding Prep Suite</p>
          <p className="text-xs text-elegant/60 mt-3">Welcome back! Sign in to prepare your future.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/30 text-xs text-rose-500 font-semibold text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block mb-2 px-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lidya.ayunikah@gmail.com"
                required
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-elegant focus:outline-none transition-colors shadow-sm"
              />
              <Mail className="w-4 h-4 text-elegant/40 absolute left-4 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-rosegold-400 font-bold hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-2xl py-3 pl-11 pr-11 text-xs text-elegant focus:outline-none transition-colors shadow-sm"
              />
              <Lock className="w-4 h-4 text-elegant/40 absolute left-4 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-elegant/40 hover:text-elegant"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-xs select-none">
            <label className="flex items-center gap-2 cursor-pointer text-elegant/70 font-medium">
              <input 
                type="checkbox" 
                defaultChecked 
                className="rounded border-blush-200 text-rosegold-400 focus:ring-0 w-4 h-4" 
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl py-3.5 text-xs font-bold transition-all shadow-md shadow-rosegold-200/30 flex items-center justify-center gap-2 glowing-btn"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Login Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Tips */}
        <div className="mt-6 p-3 rounded-2xl bg-cream-50/50 border border-blush-200/20 text-[10px] text-elegant/70">
          <p className="font-semibold text-rosegold-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Demo Account
          </p>
          You can use any email and password combination to login and instantly access the pre-configured marriage dashboard!
        </div>

        {/* Register Redirect */}
        <div className="mt-8 text-center text-xs text-elegant/60">
          New couple?{" "}
          <Link href="/register" className="text-rosegold-400 font-bold hover:underline">
            Register your platform
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
