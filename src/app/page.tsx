"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Heart,
  LayoutDashboard,
  Menu,
  Send,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Planning dashboard',
    description: 'Track readiness, priorities, budgets, courses, and invitation progress from one calm workspace.',
  },
  {
    icon: Wallet,
    title: 'Budget clarity',
    description: 'Organize spending by category, paid status, and remaining commitments before costs drift.',
  },
  {
    icon: BookOpen,
    title: 'Marriage preparation',
    description: 'Work through practical lessons across communication, finances, family expectations, and intimacy.',
  },
  {
    icon: Send,
    title: 'Digital invitations',
    description: 'Prepare responsive wedding invitations with RSVP tracking and shareable guest links.',
  },
  {
    icon: Bot,
    title: 'AI planning assistant',
    description: 'Ask for next steps, budget suggestions, reminders, and relationship preparation prompts.',
  },
  {
    icon: CalendarCheck,
    title: 'Milestone rhythm',
    description: 'Keep important dates, decisions, and remaining preparation work visible for both partners.',
  },
];

const aboutStats = [
  ['64%', 'average readiness view'],
  ['6', 'core planning modules'],
  ['1', 'shared couple workspace'],
];

const faqs = [
  {
    q: 'Can we use Ayunikah without Supabase?',
    a: 'Yes. Without Supabase environment variables, registration and login use local browser storage so the app can be tested immediately.',
  },
  {
    q: 'What happens when Supabase is connected?',
    a: 'Authentication switches to Supabase automatically using the configured public URL and anon key.',
  },
  {
    q: 'Is this only for wedding tasks?',
    a: 'No. The product combines wedding operations with marriage preparation so couples can plan the event and the relationship together.',
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const navItems = [
    ['About', '#about'],
    ['Features', '#features'],
    ['FAQ', '#faq'],
  ];

  return (
    <main className="min-h-screen w-full bg-cream-50 text-elegant">
      <header className="sticky top-0 z-50 border-b border-elegant/10 bg-cream-50/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ayunikah home">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-elegant text-cream-50">
              <Heart className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-playfair text-xl font-bold leading-none">Ayunikah</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-rosegold-400">
                Marriage prep
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-elegant/70 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-elegant">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-bold text-elegant hover:bg-white">
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-elegant px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-elegant-900"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-elegant/10 bg-white md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-elegant/10 bg-cream-50 md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-elegant/75 hover:bg-white"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link href="/login" className="rounded-lg border border-elegant/15 px-4 py-3 text-center text-sm font-bold">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-lg bg-elegant px-4 py-3 text-center text-sm font-bold text-white">
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="relative overflow-hidden border-b border-elegant/10 bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-elegant/10 bg-cream-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-elegant/65">
              <ShieldCheck className="h-4 w-4 text-rosegold-400" />
              Shared planning for serious couples
            </div>
            <h1 className="font-playfair text-5xl font-bold leading-[1.02] text-elegant sm:text-6xl lg:text-7xl">
              Ayunikah
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-elegant/70 sm:text-lg">
              A professional marriage preparation workspace for engaged couples who want their wedding plans,
              budget decisions, relationship lessons, and invitations in one organized place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-elegant px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-elegant-900"
              >
                Start planning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-elegant/15 bg-white px-6 py-4 text-sm font-bold text-elegant transition-colors hover:bg-cream-50"
              >
                Open workspace
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1200"
              alt="Elegant wedding table setting"
              className="h-[440px] w-full rounded-lg object-cover shadow-2xl shadow-elegant/15 sm:h-[560px]"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/40 bg-white/92 p-4 shadow-xl backdrop-blur md:left-auto md:w-80">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-rosegold-400">Live readiness</p>
              <p className="mt-2 text-3xl font-black text-elegant">64% complete</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream-200">
                <div className="h-full w-[64%] rounded-full bg-elegant" />
              </div>
              <p className="mt-3 text-xs leading-5 text-elegant/65">
                Budget, learning progress, and invitation tasks stay visible as your plans change.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="border-b border-elegant/10 bg-cream-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold-400">About Ayunikah</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-elegant sm:text-5xl">
              Built for the preparation behind the celebration.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-sm leading-7 text-elegant/72">
              Ayunikah helps couples move beyond scattered chats, spreadsheets, and forgotten links. It gives both
              partners a shared view of what matters: money, readiness, family details, invitations, and the
              conversations that shape married life.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {aboutStats.map(([value, label]) => (
                <div key={label} className="rounded-lg border border-elegant/10 bg-white p-5">
                  <p className="text-3xl font-black text-elegant">{value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-elegant/55">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold-400">What is included</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-elegant">A complete couple workspace</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-lg border border-elegant/10 bg-cream-50 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-elegant shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-playfair text-xl font-bold text-elegant">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-elegant/68">{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-elegant/10 bg-[#243b3b] py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-peach-200">Ready workspace</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold">Create an account and continue to the dashboard.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
              Local registration works immediately for testing. Add Supabase later when you need hosted authentication.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-bold text-[#243b3b] transition-colors hover:bg-cream-100"
          >
            Register now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="faq" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-rosegold-400">Questions</p>
          <h2 className="mt-3 text-center font-playfair text-4xl font-bold text-elegant">Useful answers before you start</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.q} className="overflow-hidden rounded-lg border border-elegant/10 bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-elegant"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="border-t border-elegant/10 px-5 py-4 text-sm leading-7 text-elegant/68">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-elegant/10 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-elegant/60 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold">&copy; {new Date().getFullYear()} Ayunikah. All rights reserved.</p>
          <div className="flex gap-5 font-bold">
            <Link href="/login" className="hover:text-elegant">Log in</Link>
            <Link href="/register" className="hover:text-elegant">Register</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
