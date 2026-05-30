"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Flower2,
  Heart,
  Instagram,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircleHeart,
  PieChart,
  Send,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  ["Features", "#features"],
  ["Preview", "#preview"],
  ["AI", "#ai"],
  ["Stories", "#testimonials"],
  ["FAQ", "#faq"],
];

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description: "Readiness, countdowns, reminders, and every preparation signal in one calm couple workspace.",
  },
  {
    icon: Wallet,
    title: "Budget Planner",
    description: "Compare estimates with actual spending and keep every wedding expense beautifully organized.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Receive thoughtful next steps, budget suggestions, reminders, and course recommendations.",
  },
  {
    icon: Send,
    title: "Invitation Builder",
    description: "Design digital invitations, track RSVPs, and keep guest confirmation progress visible.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Courses",
    description: "Prepare emotionally, financially, spiritually, and relationally with guided learning paths.",
  },
  {
    icon: PieChart,
    title: "Progress Tracker",
    description: "Watch budget, invitation, learning, and overall marriage preparation percentages update together.",
  },
  {
    icon: CalendarDays,
    title: "Couple Journey Timeline",
    description: "Turn deadlines, milestones, and meaningful moments into a shared romantic timeline.",
  },
];

const stats = [
  ["86%", "Overall readiness"],
  ["42", "Days to wedding"],
  ["71%", "Budget clarity"],
  ["124", "RSVP replies"],
];

const messages = [
  ["Ayunikah AI", "Your venue deposit is due soon. Would you like a reminder for both partners?"],
  ["You", "Yes, and suggest what we should review this week."],
  ["Ayunikah AI", "Review catering estimates, finish lesson 3 on communication, and invite 20 priority guests."],
];

const testimonials = [
  {
    quote: "Ayunikah made the wedding plan feel lighter. We could talk about money and family plans without losing the romance.",
    name: "Nadia & Farhan",
  },
  {
    quote: "The dashboard gave us one place for invitations, courses, and budget progress. It felt premium but still personal.",
    name: "Maya & Reza",
  },
  {
    quote: "The AI reminders were gentle and useful. It felt like having a calm companion beside the planning chaos.",
    name: "Alya & Dimas",
  },
];

const faqs = [
  {
    q: "What is Ayunikah built for?",
    a: "Ayunikah helps engaged couples organize wedding preparation, budget planning, invitations, learning, relationship readiness, and AI-guided reminders in one premium dashboard.",
  },
  {
    q: "Can couples use it together?",
    a: "Yes. The product is designed as a shared preparation space where both partners can track progress, see next steps, and prepare for marriage together.",
  },
  {
    q: "Does Ayunikah include invitation management?",
    a: "Yes. The landing page highlights the planned invitation builder, RSVP tracking, guest management, and confirmation workflow described in the PRD.",
  },
  {
    q: "Who created Ayunikah?",
    a: "Ayunikah is made with love by Lidya Ayu Sukamawandira.",
  },
];

const floatingHearts = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  left: `${8 + index * 9}%`,
  delay: index * 0.35,
  duration: 5 + (index % 4),
}));

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-hidden bg-cream-100 text-elegant">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-cream-100/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ayunikah home">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-rosegold text-white shadow-lg shadow-rosegold/30">
              <Heart className="h-5 w-5 fill-white/30" />
            </span>
            <span>
              <span className="block font-playfair text-xl font-bold leading-none">Ayunikah</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-rosegold">
                AI marriage prep
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-elegant/70 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-rosegold">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-bold text-elegant hover:bg-white/70">
              Login
            </Link>
            <Link
              href="/register"
              className="glowing-btn inline-flex items-center gap-2 rounded-lg bg-elegant px-4 py-2 text-sm font-bold text-white"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-rosegold/20 bg-white/70 text-elegant md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/70 bg-cream-100 md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-elegant/75 hover:bg-white/70"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link href="/login" className="rounded-lg border border-rosegold/20 bg-white/80 px-4 py-3 text-center text-sm font-bold">
                    Login
                  </Link>
                  <Link href="/register" className="rounded-lg bg-elegant px-4 py-3 text-center text-sm font-bold text-white">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section className="relative border-b border-white/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(247,214,208,0.9),transparent_30%),radial-gradient(circle_at_82%_26%,rgba(220,207,237,0.85),transparent_28%),linear-gradient(135deg,#fff8f1_0%,#f7d6d0_48%,#dccfed_100%)]" />
        {floatingHearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute top-20 hidden text-rosegold/30 sm:block"
            style={{ left: heart.left }}
            animate={{ y: [0, -28, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
        ))}

        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/55 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-elegant shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-rosegold" />
              Premium AI-powered marriage preparation
            </div>
            <h1 className="font-playfair text-5xl font-bold leading-[1.03] text-elegant sm:text-6xl lg:text-7xl">
              Prepare Your Beautiful Future Together
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-elegant/72 sm:text-lg">
              All-in-one smart marriage preparation platform for budgeting, learning, invitations, and relationship readiness.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="glowing-btn inline-flex items-center justify-center gap-2 rounded-lg bg-elegant px-6 py-4 text-sm font-bold text-white"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-white/65 px-6 py-4 text-sm font-bold text-elegant shadow-sm backdrop-blur-xl transition-colors hover:bg-white"
              >
                Login
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative min-h-[520px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-4 top-4 overflow-hidden rounded-lg border border-white/70 bg-white/45 p-3 shadow-2xl shadow-rosegold/20 backdrop-blur-2xl sm:inset-x-10"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200"
                alt="Bride and groom holding hands"
                className="h-[400px] w-full rounded-md object-cover sm:h-[470px]"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-0 w-64 rounded-lg border border-white/75 bg-white/70 p-4 shadow-xl shadow-rosegold/20 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-blush-200 text-elegant">
                  <Flower2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-rosegold">Wedding readiness</p>
                  <p className="font-playfair text-2xl font-bold">86% aligned</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-rosegold/15">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "86%" }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                  className="h-full rounded-full bg-rosegold"
                />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-2 right-0 max-w-[260px] rounded-lg border border-white/75 bg-elegant p-4 text-white shadow-xl shadow-elegant/20"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blush-200">AI reminder</p>
              <p className="mt-2 text-sm leading-6 text-white/85">Finish invitation confirmation and review this week&apos;s budget notes.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold">All-in-one preparation</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-elegant sm:text-5xl">
              Every important module, softly connected
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.42, delay: index * 0.04 }}
                  className={`rounded-lg border border-white/70 bg-white/70 p-6 shadow-lg shadow-rosegold/10 backdrop-blur-xl ${
                    index === 6 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-lavender-100 text-elegant shadow-inner">
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

      <section id="preview" className="border-y border-white/80 bg-[#f5edf7] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold">Dashboard preview</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-elegant sm:text-5xl">
              A living overview for your wedding and marriage readiness
            </h2>
            <p className="mt-5 text-sm leading-7 text-elegant/68">
              Elegant statistics, progress widgets, RSVP signals, and budget analytics help couples understand what needs attention without feeling overwhelmed.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-white/80 bg-white/55 p-4 shadow-2xl shadow-lavender/30 backdrop-blur-2xl"
          >
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-lg bg-white/80 p-4 shadow-sm"
                >
                  <p className="font-playfair text-3xl font-bold text-elegant">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-elegant/58">{label}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-lg bg-white/80 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-elegant">Preparation analytics</p>
                  <Sparkles className="h-4 w-4 text-rosegold" />
                </div>
                <div className="mt-6 flex h-52 items-end gap-3">
                  {[54, 72, 48, 88, 64, 78, 92].map((height, index) => (
                    <motion.div
                      key={height}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.07 }}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-rosegold to-blush-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                {["Budget review", "Course progress", "Invitation confirmed"].map((label, index) => (
                  <div key={label} className="rounded-lg bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm font-bold text-elegant">
                      <span>{label}</span>
                      <span className="text-rosegold">{[71, 64, 92][index]}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-lavender-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${[71, 64, 92][index]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.12 }}
                        className="h-full rounded-full bg-elegant"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="ai" className="bg-cream-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-lg border border-white/80 bg-elegant p-4 text-white shadow-2xl shadow-elegant/20"
          >
            <div className="rounded-lg bg-white/8 p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-blush-200 text-elegant">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold">Ayunikah AI</p>
                    <p className="text-xs text-white/55">Planning companion is typing</p>
                  </div>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-3 w-3 rounded-full bg-blush-200"
                />
              </div>
              <div className="mt-5 space-y-3">
                {messages.map(([sender, message], index) => (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.16 }}
                    className={`max-w-[86%] rounded-lg p-4 ${
                      sender === "You" ? "ml-auto bg-blush-200 text-elegant" : "bg-white/10 text-white"
                    }`}
                  >
                    <p className="text-xs font-bold opacity-70">{sender}</p>
                    <p className="mt-1 text-sm leading-6">{message}</p>
                  </motion.div>
                ))}
                <div className="flex w-20 gap-1 rounded-lg bg-white/10 p-3">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.75, repeat: Infinity, delay: dot * 0.12 }}
                      className="h-2 w-2 rounded-full bg-blush-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold">AI assistant preview</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-elegant sm:text-5xl">
              Guidance that feels thoughtful, timely, and gentle
            </h2>
            <div className="mt-6 grid gap-3">
              {["Wedding planning guidance", "Budget suggestions", "Reminder notifications", "Course recommendations", "Platform navigation support"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur-xl">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-lavender-100 text-elegant">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-bold text-elegant/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="border-y border-white/80 bg-[#fff1ea] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-rosegold">Testimonials</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-elegant sm:text-5xl">
              Romantic preparation, calmer conversations
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg border border-white/80 bg-white/65 p-6 shadow-lg shadow-rosegold/10 backdrop-blur-xl"
              >
                <MessageCircleHeart className="h-7 w-7 text-rosegold" />
                <p className="mt-5 text-sm leading-7 text-elegant/70">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-5 font-playfair text-xl font-bold text-elegant">{testimonial.name}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-rosegold">FAQ</p>
          <h2 className="mt-3 text-center font-playfair text-4xl font-bold text-elegant">Before you begin</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.q} className="overflow-hidden rounded-lg border border-white/80 bg-white/70 shadow-sm backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-elegant"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-rosegold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="border-t border-rosegold/10 px-5 py-4 text-sm leading-7 text-elegant/68">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/70 bg-elegant py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-blush-200 text-elegant">
                <Heart className="h-5 w-5 fill-elegant/20" />
              </span>
              <p className="font-playfair text-2xl font-bold">Ayunikah</p>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
              Made with love by Lidya Ayu Sukamawandira
            </p>
            <p className="mt-2 text-xs text-white/45">&copy; {new Date().getFullYear()} Ayunikah. Premium AI marriage preparation dashboard.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/login" className="rounded-lg bg-white/8 px-4 py-2 text-sm font-bold text-white hover:bg-white/12">
              Login
            </Link>
            <Link href="/register" className="rounded-lg bg-blush-200 px-4 py-2 text-sm font-bold text-elegant hover:bg-white">
              Get Started
            </Link>
            <a href="mailto:hello@ayunikah.app" aria-label="Email Ayunikah" className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 hover:bg-white/12">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/" aria-label="Ayunikah Instagram" className="grid h-10 w-10 place-items-center rounded-lg bg-white/8 hover:bg-white/12">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
