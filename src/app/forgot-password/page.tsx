"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[420px] glass rounded-3xl p-8 shadow-2xl relative border border-blush-200/40"
      >
        {/* Header */}
        <div className="text-center mb-8 select-none">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-blush-200 mx-auto flex items-center justify-center shadow-lg shadow-blush-300/40 mb-3"
          >
            <Heart className="w-6 h-6 text-elegant fill-elegant/10" />
          </motion.div>
          
          <h1 className="text-2xl font-bold tracking-wide text-elegant leading-none">Ayunikah</h1>
          <p className="text-xs text-rosegold-400 font-semibold tracking-wider uppercase mt-1">Recover Credentials</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-500 mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-elegant">Check Your Inbox!</h2>
            <p className="text-xs text-elegant/70 leading-relaxed">
              We have dispatched recovery instructions to your email **{email}**. Please check your spam folder if it doesn't arrive within 2 minutes.
            </p>
            <Link
              href="/login"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl py-3 text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-xs text-elegant/70 leading-relaxed text-center mb-2">
              No worries! Enter your registered account email, and we will send you a secure link to reset your password.
            </p>

            <div>
              <label className="text-[10px] uppercase font-bold text-elegant/70 tracking-wider block mb-2 px-1">Registered Email</label>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl py-3.5 text-xs font-bold transition-all shadow-md shadow-rosegold-200/30 flex items-center justify-center gap-2 glowing-btn"
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <span>Email Recovery Link</span>
              )}
            </button>

            <Link
              href="/login"
              className="w-full text-center text-xs text-elegant/60 hover:text-elegant flex items-center justify-center gap-1.5 pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login Screen</span>
            </Link>
          </form>
        )}
      </motion.div>
    </main>
  );
}
