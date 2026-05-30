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
  Instagram,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircleHeart,
  MessageCircle,
  Phone,
  PieChart,
  Send,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  ["About Us", "/about"],
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
    description: "A soft overview for readiness, countdowns, tasks, and meaningful next steps.",
  },
  {
    icon: Wallet,
    title: "Budget Planner",
    description: "Track estimates, real spending, and priorities without making money talks feel heavy.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Gentle recommendations for planning, budgeting, reminders, and learning.",
  },
  {
    icon: Send,
    title: "Invitation Builder",
    description: "Create invitations, manage guests, and follow RSVP progress in one place.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Courses",
    description: "Guided lessons for communication, finances, spirituality, and emotional readiness.",
  },
  {
    icon: PieChart,
    title: "Progress Tracker",
    description: "See budget, learning, invitation, and overall preparation progress update together.",
  },
  {
    icon: CalendarDays,
    title: "Couple Journey Timeline",
    description: "Keep milestones, schedules, and sweet preparation moments beautifully organized.",
  },
];

const stats = [
  ["86%", "Readiness"],
  ["42", "Days left"],
  ["71%", "Budget"],
  ["124", "RSVPs"],
];

const messages = [
  ["Ayunikah AI", "Your venue deposit is coming up. Shall I make a reminder for both of you?"],
  ["You", "Yes, and what should we prepare this week?"],
  ["Ayunikah AI", "Review catering estimates, continue communication lessons, and invite priority guests."],
];

const testimonials = [
  {
    quote: "Ayunikah made our preparation feel calmer, softer, and more organized.",
    name: "Nadia & Farhan",
  },
  {
    quote: "The dashboard felt elegant without being complicated. Everything had a gentle place.",
    name: "Maya & Reza",
  },
  {
    quote: "The reminders helped us move forward without losing the joy of preparing together.",
    name: "Alya & Dimas",
  },
];

const faqs = [
  {
    q: "What is Ayunikah built for?",
    a: "Ayunikah helps couples prepare for marriage with wedding planning, budgeting, learning, invitations, readiness tracking, and AI guidance.",
  },
  {
    q: "Can couples use it together?",
    a: "Yes. Ayunikah is designed as a shared workspace for both partners to prepare calmly and intentionally.",
  },
  {
    q: "Does it include invitation management?",
    a: "Yes. It supports the PRD vision for digital invitations, RSVP tracking, invitee management, and confirmation progress.",
  },
  {
    q: "Who created Ayunikah?",
    a: "Ayunikah is made with love by Lidya Ayu Sukamawandira.",
  },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M14.2 8.1V6.7c0-.7.5-.9.9-.9h2.1V2.3L14.3 2c-3.2 0-4.9 1.9-4.9 5.3v.8H6.8v3.9h2.6v9.9h4.1v-9.9h3.1l.5-3.9h-3Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.8 8.9H3v12.2h3.8ZM4.9 3A2.2 2.2 0 1 0 5 7.4 2.2 2.2 0 0 0 4.9 3Zm16.2 11.4c0-3.3-1.8-4.9-4.2-4.9a3.6 3.6 0 0 0-3.3 1.8h-.1V8.9H9.9v12.2h3.8v-6c0-1.6.3-3.1 2.2-3.1s1.9 1.8 1.9 3.2v5.9h3.8Z" />
    </svg>
  );
}

function LogoMark({ label = true }: { label?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img src="/logo.png" alt="Ayunikah logo" className="h-11 w-11 rounded-lg object-contain" />
      {label && (
        <span>
          <span className="block font-playfair text-xl font-bold leading-none text-[#4B3B39]">Ayunikah</span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C79B8B]">
            Marriage preparation
          </span>
        </span>
      )}
    </span>
  );
}

const socialLinks = [
  { label: "Phone", href: "tel:", icon: Phone },
  { label: "WhatsApp", href: "https://wa.me/", icon: MessageCircle },
  { label: "Gmail", href: "mailto:", icon: Mail },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedinIcon },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-[#FFF8F1] text-[#4B3B39]">
      <header className="sticky top-0 z-50 border-b border-[#F7D6D0]/70 bg-[#FFF8F1]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Ayunikah home">
            <LogoMark />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#4B3B39]/68 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-[#C79B8B]">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-bold text-[#4B3B39] hover:bg-white/70">
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-[#C79B8B] px-4 py-2 text-sm font-bold text-white shadow-sm shadow-[#C79B8B]/20 transition-colors hover:bg-[#b88978]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[#F7D6D0] bg-white/70 text-[#4B3B39] md:hidden"
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
              className="overflow-hidden border-t border-[#F7D6D0] bg-[#FFF8F1] md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navItems.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-bold text-[#4B3B39]/70 hover:bg-white/70"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link href="/login" className="rounded-lg border border-[#F7D6D0] bg-white/80 px-4 py-3 text-center text-sm font-bold">
                    Login
                  </Link>
                  <Link href="/register" className="rounded-lg bg-[#C79B8B] px-4 py-3 text-center text-sm font-bold text-white">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex-1">
        <section className="relative border-b border-[#F7D6D0]/70">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFF8F1_0%,#FFF3EE_42%,#F8EFFA_100%)]" />
          <div className="absolute left-8 top-20 h-28 w-28 rounded-full bg-[#F7D6D0]/30 blur-3xl" />
          <div className="absolute bottom-12 right-10 h-32 w-32 rounded-full bg-[#DCCFED]/35 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/80 bg-white/60 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8A655C] shadow-sm backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-[#C79B8B]" />
                Soft AI-powered marriage preparation
              </div>
              <h1 className="font-playfair text-5xl font-bold leading-[1.04] text-[#4B3B39] sm:text-6xl lg:text-7xl">
                Prepare Your Beautiful Future Together
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#4B3B39]/70 sm:text-lg">
                All-in-one smart marriage preparation platform for budgeting, learning, invitations, and relationship readiness.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C79B8B] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#C79B8B]/20 transition hover:-translate-y-0.5 hover:bg-[#b88978]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg border border-[#F7D6D0] bg-white/70 px-6 py-4 text-sm font-bold text-[#4B3B39] shadow-sm backdrop-blur-xl transition-colors hover:bg-white"
                >
                  Login
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="relative"
            >
              <div className="rounded-lg border border-white/80 bg-white/55 p-5 shadow-xl shadow-[#F7D6D0]/25 backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-[#F7D6D0]/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#F7D6D0]/70">
                      <Flower2 className="h-5 w-5 text-[#8A655C]" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Today&apos;s preparation</p>
                      <p className="text-xs text-[#4B3B39]/55">Gentle focus for both partners</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#DCCFED]/45 px-3 py-1 text-xs font-bold text-[#6D5576]">86%</span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {["Budget review", "Course lesson", "Guest list", "Invitation draft"].map((item, index) => (
                    <motion.div
                      key={item}
                      animate={{ y: [0, index % 2 === 0 ? -4 : 4, 0] }}
                      transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-lg border border-[#F7D6D0]/55 bg-white/72 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF8F1]">
                          <Check className="h-4 w-4 text-[#C79B8B]" />
                        </span>
                        <p className="text-sm font-bold text-[#4B3B39]/78">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg border border-[#F7D6D0]/55 bg-[#FFF8F1]/72 p-4">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>Marriage readiness</span>
                    <span className="text-[#C79B8B]">Almost there</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#F7D6D0]/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "86%" }}
                      transition={{ duration: 1.1, delay: 0.4 }}
                      className="h-full rounded-full bg-[#C79B8B]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="bg-[#FFF8F1] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C79B8B]">All-in-one preparation</p>
              <h2 className="mt-3 font-playfair text-4xl font-bold text-[#4B3B39] sm:text-5xl">
                Simple tools for a beautiful season
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.article
                    key={feature.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.36, delay: index * 0.035 }}
                    className={`rounded-lg border border-[#F7D6D0]/65 bg-white/65 p-6 shadow-sm shadow-[#F7D6D0]/30 backdrop-blur-xl ${
                      index === 6 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#DCCFED]/35 text-[#6D5576]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-playfair text-xl font-bold text-[#4B3B39]">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4B3B39]/64">{feature.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="preview" className="border-y border-[#F7D6D0]/60 bg-[#FFF3EE] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C79B8B]">Dashboard preview</p>
              <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-[#4B3B39] sm:text-5xl">
                A calm overview for everything that matters
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#4B3B39]/66">
                Readiness, budget, learning, and invitations are shown with quiet analytics so couples can decide what needs care next.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-lg border border-white/80 bg-white/60 p-4 shadow-xl shadow-[#F7D6D0]/25 backdrop-blur-2xl"
            >
              <div className="grid gap-3 sm:grid-cols-4">
                {stats.map(([value, label], index) => (
                  <div key={label} className="rounded-lg border border-[#F7D6D0]/45 bg-white/75 p-4">
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="font-playfair text-3xl font-bold text-[#4B3B39]"
                    >
                      {value}
                    </motion.p>
                    <p className="mt-1 text-xs font-semibold text-[#4B3B39]/55">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-lg border border-[#F7D6D0]/45 bg-white/75 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#4B3B39]">Preparation flow</p>
                    <Sparkles className="h-4 w-4 text-[#C79B8B]" />
                  </div>
                  <div className="mt-6 flex h-44 items-end gap-3">
                    {[48, 64, 54, 78, 62, 72, 86].map((height, index) => (
                      <motion.div
                        key={height}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: index * 0.055 }}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[#C79B8B]/80 to-[#F7D6D0]"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid gap-3">
                  {["Budget", "Learning", "Invitation"].map((label, index) => (
                    <div key={label} className="rounded-lg border border-[#F7D6D0]/45 bg-white/75 p-4">
                      <div className="flex items-center justify-between text-sm font-bold text-[#4B3B39]">
                        <span>{label}</span>
                        <span className="text-[#C79B8B]">{[71, 64, 92][index]}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-[#F7D6D0]/45">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${[71, 64, 92][index]}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.75, delay: index * 0.1 }}
                          className="h-full rounded-full bg-[#C79B8B]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="ai" className="bg-[#FFF8F1] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-[#F7D6D0]/65 bg-white/65 p-4 shadow-xl shadow-[#F7D6D0]/25 backdrop-blur-2xl"
            >
              <div className="rounded-lg bg-[#FFF8F1]/80 p-4">
                <div className="flex items-center justify-between border-b border-[#F7D6D0]/55 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#DCCFED]/45 text-[#6D5576]">
                      <Bot className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-bold text-[#4B3B39]">Ayunikah AI</p>
                      <p className="text-xs text-[#4B3B39]/55">Planning companion is typing</p>
                    </div>
                  </div>
                  <motion.span
                    animate={{ scale: [1, 1.16, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="h-3 w-3 rounded-full bg-[#C79B8B]"
                  />
                </div>
                <div className="mt-5 space-y-3">
                  {messages.map(([sender, message], index) => (
                    <motion.div
                      key={message}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.14 }}
                      className={`max-w-[88%] rounded-lg p-4 ${
                        sender === "You" ? "ml-auto bg-[#F7D6D0]/70 text-[#4B3B39]" : "bg-white text-[#4B3B39]"
                      }`}
                    >
                      <p className="text-xs font-bold text-[#8A655C]">{sender}</p>
                      <p className="mt-1 text-sm leading-6 text-[#4B3B39]/72">{message}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C79B8B]">AI assistant preview</p>
              <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-[#4B3B39] sm:text-5xl">
                Guidance that stays gentle and useful
              </h2>
              <div className="mt-6 grid gap-3">
                {["Wedding planning guidance", "Budget suggestions", "Reminder notifications", "Course recommendations", "Platform navigation support"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-[#F7D6D0]/65 bg-white/65 p-4 shadow-sm backdrop-blur-xl">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#DCCFED]/35 text-[#6D5576]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-bold text-[#4B3B39]/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="border-y border-[#F7D6D0]/60 bg-[#FFF3EE] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C79B8B]">Testimonials</p>
              <h2 className="mt-3 font-playfair text-4xl font-bold text-[#4B3B39] sm:text-5xl">
                Softer planning, sweeter conversations
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-lg border border-[#F7D6D0]/65 bg-white/65 p-6 shadow-sm shadow-[#F7D6D0]/30 backdrop-blur-xl"
                >
                  <MessageCircleHeart className="h-7 w-7 text-[#C79B8B]" />
                  <p className="mt-5 text-sm leading-7 text-[#4B3B39]/68">&quot;{testimonial.quote}&quot;</p>
                  <p className="mt-5 font-playfair text-xl font-bold text-[#4B3B39]">{testimonial.name}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#FFF8F1] py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[#C79B8B]">FAQ</p>
            <h2 className="mt-3 text-center font-playfair text-4xl font-bold text-[#4B3B39]">Before you begin</h2>
            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.q} className="overflow-hidden rounded-lg border border-[#F7D6D0]/65 bg-white/70 shadow-sm backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-[#4B3B39]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#C79B8B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="border-t border-[#F7D6D0]/50 px-5 py-4 text-sm leading-7 text-[#4B3B39]/66">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-auto bg-[#FFF8F1]">
        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
          <div className="rounded-lg border border-[#F7D6D0]/65 bg-[#F7D6D0]/42 px-6 py-8 shadow-sm shadow-[#F7D6D0]/35 sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8A655C]">Begin beautifully</p>
                <h2 className="mt-4 max-w-2xl font-playfair text-4xl font-bold leading-[1.05] text-[#4B3B39] sm:text-5xl">
                  Ready to prepare your beautiful future together?
                </h2>
              </div>
              <div className="space-y-4 lg:justify-self-end">
                {["Plan your wedding with clarity", "Track readiness with gentle progress", "Let AI guide the next loving step"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#4B3B39]/76">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#FFF8F1]/85 text-[#C79B8B]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C79B8B] px-5 py-3 text-sm font-bold text-white shadow-sm shadow-[#C79B8B]/25 transition hover:bg-[#b88978]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-9 border-b border-[#F7D6D0]/65 py-8 md:grid-cols-[1.35fr_0.9fr_1fr]">
            <div>
              <LogoMark />
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#4B3B39]/66">
                A soft AI-powered marriage preparation dashboard for budgeting, learning, invitations, and relationship readiness.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-bold text-[#4B3B39]/74">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="hover:text-[#C79B8B]">
                  {label}
                </a>
              ))}
              <Link href="/login" className="hover:text-[#C79B8B]">
                Login
              </Link>
            </nav>

            <div className="md:justify-self-end">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8A655C]">Social</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-[#F7D6D0]/80 bg-white/70 text-[#8A655C] transition hover:border-[#C79B8B]/50 hover:text-[#C79B8B]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-5 text-xs font-semibold text-[#4B3B39]/58 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Ayunikah. All rights reserved.</p>
            <p>Made with love by Lidya Ayu Sukamawandira</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
