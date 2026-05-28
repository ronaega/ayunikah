"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarCheck,
  ChevronDown,
  Flower2,
  Heart,
  LayoutDashboard,
  Menu,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'A shared planning home',
    description: 'See readiness, tasks, profiles, invitations, and budget progress in one gentle workspace.',
  },
  {
    icon: Wallet,
    title: 'Budget with less tension',
    description: 'Track estimates, deposits, paid items, and priorities so money conversations stay clear.',
  },
  {
    icon: BookOpen,
    title: 'Marriage preparation',
    description: 'Work through guided lessons for communication, finances, expectations, and emotional closeness.',
  },
  {
    icon: Send,
    title: 'Lovely invitations',
    description: 'Build digital invitations, manage guests, and keep RSVP progress visible from the dashboard.',
  },
  {
    icon: Bot,
    title: 'AI companion',
    description: 'Ask for planning next steps, relationship prompts, reminder ideas, and budget suggestions.',
  },
  {
    icon: CalendarCheck,
    title: 'Milestones that feel calm',
    description: 'Keep meaningful dates and preparation steps organized while the celebration gets closer.',
  },
];

const moments = [
  ['01', 'Create your couple account'],
  ['02', 'Complete profiles and wedding details'],
  ['03', 'Plan the budget, lessons, and invitations'],
];

const faqs = [
  {
    q: 'Can I use Ayunikah with Supabase?',
    a: 'Yes. Connect a Supabase URL and anon key, run the SQL schema, then register through the app.',
  },
  {
    q: 'What should I do while testing?',
    a: 'Turn off Supabase email confirmation, or confirm the email before trying to log in.',
  },
  {
    q: 'Is Ayunikah only for wedding logistics?',
    a: 'No. It combines wedding planning with marriage preparation so both partners can prepare the event and the relationship.',
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const navItems = [
    ['About', '#about'],
    ['Features', '#features'],
    ['Journey', '#journey'],
    ['FAQ', '#faq'],
  ];

  return (
    <main className="min-h-screen w-full bg-[#fff5f8] text-[#51323b]">
      <header className="sticky top-0 z-50 border-b border-pink-200/70 bg-[#fff5f8]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ayunikah home">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 text-white shadow-sm shadow-pink-200">
              <Heart className="h-5 w-5 fill-white/25" />
            </span>
            <span>
              <span className="block font-playfair text-xl font-bold leading-none text-[#51323b]">Ayunikah</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-pink-500">
                Lovely marriage prep
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#76515d] md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-pink-600">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-bold text-[#51323b] hover:bg-white">
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-pink-600"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-pink-200 bg-white text-[#51323b] md:hidden"
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
              className="overflow-hidden border-t border-pink-200 bg-[#fff5f8] md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-[#76515d] hover:bg-white"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link href="/login" className="rounded-lg border border-pink-200 bg-white px-4 py-3 text-center text-sm font-bold">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-lg bg-pink-500 px-4 py-3 text-center text-sm font-bold text-white">
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="border-b border-pink-200/70 bg-[#fff8fa]">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.96fr_1.04fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-pink-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Soft planning for two hearts
            </div>
            <h1 className="font-playfair text-5xl font-bold leading-[1.03] text-[#51323b] sm:text-6xl lg:text-7xl">
              Prepare your wedding and your marriage with love.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#76515d] sm:text-lg">
              Ayunikah is a pink, gentle planning space for engaged couples to organize wedding budgets,
              relationship lessons, guest lists, invitations, and meaningful next steps together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-6 py-4 text-sm font-bold text-white shadow-md shadow-pink-200 transition-colors hover:bg-pink-600"
              >
                Start our journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-pink-200 bg-white px-6 py-4 text-sm font-bold text-[#51323b] transition-colors hover:bg-pink-50"
              >
                Open workspace
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="grid gap-4"
          >
            <div className="overflow-hidden rounded-lg border border-pink-200 bg-white p-3 shadow-2xl shadow-pink-100">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200"
                alt="Bride and groom holding hands"
                className="h-[360px] w-full rounded-md object-cover sm:h-[500px]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {moments.map(([number, label]) => (
                <div key={number} className="rounded-lg border border-pink-200 bg-white p-4 shadow-sm shadow-pink-100">
                  <p className="text-xs font-black text-pink-500">{number}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-[#51323b]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="border-b border-pink-200/70 bg-[#ffeef4] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">About Ayunikah</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-[#51323b] sm:text-5xl">
              Designed for calm decisions, tender conversations, and beautiful preparation.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-sm leading-7 text-[#76515d]">
              Wedding preparation can become scattered quickly. Ayunikah gives both partners a shared place to see
              what is done, what needs care, and what deserves a thoughtful conversation before the big day.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100">
                <Flower2 className="h-6 w-6 text-pink-500" />
                <h3 className="mt-4 font-playfair text-2xl font-bold text-[#51323b]">Lovely, not loud</h3>
                <p className="mt-2 text-sm leading-6 text-[#76515d]">
                  Soft colors, clear sections, and gentle progress views keep the experience warm without feeling messy.
                </p>
              </div>
              <div className="rounded-lg border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100">
                <ShieldCheck className="h-6 w-6 text-pink-500" />
                <h3 className="mt-4 font-playfair text-2xl font-bold text-[#51323b]">Practical underneath</h3>
                <p className="mt-2 text-sm leading-6 text-[#76515d]">
                  Supabase auth, PostgreSQL tables, and dashboard modules support the romantic layer with real structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#fff8fa] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">What is inside</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-[#51323b]">Everything feels easier when it has a home</h2>
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
                  className="rounded-lg border border-pink-200 bg-white p-6 shadow-sm shadow-pink-100 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-playfair text-xl font-bold text-[#51323b]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#76515d]">{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="journey" className="border-y border-pink-200/70 bg-pink-500 py-16 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-100">Begin beautifully</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold">Create your account and continue straight to the dashboard.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/82">
              Once Supabase is connected and email confirmation is handled, registration and login move directly into your planning workspace.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-bold text-pink-600 shadow-md shadow-pink-700/10 transition-colors hover:bg-pink-50"
          >
            Register now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="faq" className="bg-[#fff5f8] py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-pink-600">Questions</p>
          <h2 className="mt-3 text-center font-playfair text-4xl font-bold text-[#51323b]">Before you start</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.q} className="overflow-hidden rounded-lg border border-pink-200 bg-white shadow-sm shadow-pink-100">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-[#51323b]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-pink-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="border-t border-pink-100 px-5 py-4 text-sm leading-7 text-[#76515d]">
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

      <footer className="border-t border-pink-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-[#76515d] sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold">&copy; {new Date().getFullYear()} Ayunikah. Made for lovely preparation.</p>
          <div className="flex gap-5 font-bold">
            <Link href="/login" className="hover:text-pink-600">Log in</Link>
            <Link href="/register" className="hover:text-pink-600">Register</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
