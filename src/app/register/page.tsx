"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/auth-context';

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [isLoading, router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all details.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      const success = await register(normalizedEmail, password);
      if (!success) {
        setError('Registration failed. This email may already be registered, or Supabase may require email confirmation.');
        return;
      }
      router.replace('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[420px] glass rounded-3xl p-8 shadow-2xl relative border border-blush-200/40"
      >
        {/* Brand Header */}
        <div className="text-center mb-6 select-none">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-blush-200 mx-auto flex items-center justify-center shadow-lg shadow-blush-300/40 mb-3"
          >
            <Heart className="w-6 h-6 text-elegant fill-elegant/10" />
          </motion.div>
          
          <h1 className="text-2xl font-bold tracking-wide text-elegant leading-none">Ayunikah</h1>
          <p className="text-xs text-rosegold-400 font-semibold tracking-wider uppercase mt-1">Join Ecosystem</p>
          <p className="text-xs text-elegant/60 mt-3">Create your shared workspace and continue straight to the dashboard.</p>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-elegant/10 bg-white/65 p-3 text-xs text-elegant/65">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-rosegold-400" />
          <p>No Supabase setup is required for local testing. Your account is saved in this browser.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/30 text-xs text-rose-500 font-semibold text-center">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block mb-1.5 px-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bride.groom@example.com"
                required
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-elegant focus:outline-none transition-colors shadow-sm"
              />
              <Mail className="w-4 h-4 text-elegant/40 absolute left-4 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block mb-1.5 px-1">Create Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-elegant focus:outline-none transition-colors shadow-sm"
              />
              <Lock className="w-4 h-4 text-elegant/40 absolute left-4 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block mb-1.5 px-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-2xl py-3 pl-11 pr-4 text-xs text-elegant focus:outline-none transition-colors shadow-sm"
              />
              <Lock className="w-4 h-4 text-elegant/40 absolute left-4 top-3.5" />
            </div>
          </div>

          <div className="flex items-start gap-2.5 px-1 text-xs select-none">
            <input 
              type="checkbox" 
              required 
              defaultChecked
              className="rounded border-blush-200 text-rosegold-400 focus:ring-0 mt-0.5 w-4 h-4" 
            />
            <span className="text-elegant/70 leading-normal font-medium text-[11px]">
              By signing up, we agree to align our wedding planning gracefully and nurture active communication.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rosegold-400 hover:bg-rosegold-500 disabled:opacity-60 disabled:hover:bg-rosegold-400 text-white rounded-2xl py-3.5 text-xs font-bold transition-all shadow-md shadow-rosegold-200/30 flex items-center justify-center gap-2 glowing-btn"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Initialize Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-6 text-center text-xs text-elegant/60">
          Already registered?{" "}
          <Link href="/login" className="text-rosegold-400 font-bold hover:underline">
            Login here
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
