"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Wallet, 
  BookOpen, 
  Send, 
  LayoutDashboard, 
  Bot, 
  CheckCircle,
  MessageSquare,
  ChevronDown,
  Star,
  Quote
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard Overview",
    description: "Get real-time feedback on your marriage readiness. Monitor overall completion percentages dynamically synchronized from all modules."
  },
  {
    icon: Wallet,
    title: "Data-Driven Budget Planner",
    description: "Keep wedding costs optimized. Add, edit, and categorize items with dynamic pie charts, comparisons, and print-ready PDF reporting."
  },
  {
    icon: Bot,
    title: "State-Aware AI Coach",
    description: "Receive personalized relationship advice, budget optimizations, and reminders based on your actual preparation progress."
  },
  {
    icon: Send,
    title: "Digital Invitation Builder",
    description: "Design premium responsive Javanese or modern wedding invitations, complete with maps, background music, RSVP management, and mobile emulator."
  },
  {
    icon: BookOpen,
    title: "Marriage Readiness Courses",
    description: "Expand spiritual, financial, parenting, and emotional intimacy through tailored lesson checklists designed for Grooms, Brides, and Couples."
  },
  {
    icon: Heart,
    title: "Couple Journey Timeline",
    description: "Lock in important dates and reflect on motivational couple prompts daily to ground your hearts during wedding preparation stress."
  }
];

const testimonials = [
  {
    name: "Ahmad & Diana",
    role: "Married Sept 2025",
    text: "Ayunikah completely saved our relationship during the peak stress of our wedding planning! The emotional intelligence courses grounded us, and the state-aware budget tracker kept our finances totally transparent and balanced.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Farhan & Clarissa",
    role: "Married Dec 2025",
    text: "The digital invitation builder is phenomenal! We customised our gold theme and shared RSVP links on WhatsApp. The live mobile preview let us test RSVPs in real time. We got 100% confirmation within a week!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Budi & Sarah",
    role: "Married Feb 2026",
    text: "We loved the AI assistant. It answered questions about our pending tasks, read our budget state to advise on savings, and gave the sweetest daily quotes. It felt like having a romantic wedding coordinator in our pocket.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
  }
];

const faqs = [
  {
    q: "Is Ayunikah a standard wedding event planner?",
    a: "No! Ayunikah is a holistic marriage preparation suite. While we offer industry-standard budget planners and guest lists, our main focus is emotional readiness, couple synergy, learning courses, and smart state-aware AI guidance."
  },
  {
    q: "How does the dynamic database synchronization work?",
    a: "Every budget item paid, course lesson ticked, or guest RSVP confirmation automatically updates your Main Board progress calculations and overall readiness tracker in real time, keeping your dashboard beautifully aligned."
  },
  {
    q: "Can I deploy this platform on Vercel?",
    a: "Absolutely! The entire architecture is optimized for Vercel. We use standard Next.js App Router endpoints, TypeScript, and client-side database persistence to ensure it runs out-of-the-box perfectly with zero configurations."
  },
  {
    q: "How do I connect my live Supabase PostgreSQL database?",
    a: "We have provided a dedicated SQL schema script and environment config instructions directly inside the Settings module of the dashboard. Connecting your live DB is as simple as adding two environment variables."
  }
];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full relative overflow-x-hidden min-h-screen">
      {/* BACKGROUND PARTICLES AND SHADOWS */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blush-200/20 rounded-full filter blur-3xl animate-float pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-lavender-200/20 rounded-full filter blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      {/* STUNNING HERO SECTION */}
      <section className="container mx-auto px-6 pt-24 pb-16 text-center select-none relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Animated Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-blush-200/40 text-xs font-semibold text-rosegold-400 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rosegold-400 animate-pulse" />
            <span>Made with love by Lidya Ayu Sukamawandira</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-elegant leading-tight">
            Prepare Your Beautiful <br />
            <span className="bg-gradient-to-r from-rosegold-400 via-peach-500 to-lavender-400 bg-clip-text text-transparent italic">
              Future Together
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-elegant/75 max-w-2xl mx-auto leading-relaxed">
            Ayunikah is a premium, AI-powered marriage preparation ecosystem designed to guide engaged couples through financial budgeting, relationship courses, RSVP management, and dynamic digital invitations beautifully.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-rosegold-200/30 transition-all flex items-center gap-2 group glowing-btn w-full sm:w-auto text-center justify-center"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 glass text-elegant hover:bg-blush-100/30 rounded-2xl text-sm font-bold transition-all w-full sm:w-auto text-center justify-center border border-blush-200/40"
            >
              Login Workspace
            </Link>
          </div>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW MOCKUP */}
      <section className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto glass rounded-3xl p-6 md:p-8 shadow-2xl relative border border-blush-200/30 select-none overflow-hidden"
        >
          {/* Simulated Browser Bar */}
          <div className="flex items-center gap-2 mb-6 border-b border-blush-200/20 pb-4">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <div className="bg-blush-50/50 dark:bg-elegant-800 rounded-lg text-[10px] text-elegant/60 px-4 py-1 flex-1 max-w-xs mx-auto text-center truncate font-medium">
              https://ayunikah.vercel.app/dashboard
            </div>
          </div>

          {/* Mockup Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1 */}
            <div className="glass-no-hover rounded-2xl p-5 border border-blush-100/30 relative overflow-hidden bg-white/40">
              <span className="text-[10px] font-bold text-rosegold-400 uppercase tracking-wider">Overall Progress</span>
              <p className="text-3xl font-black text-elegant mt-2">64% Completed</p>
              <div className="w-full bg-blush-100/50 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-rosegold-400 to-peach-500 h-full w-[64%] rounded-full animate-pulse" />
              </div>
              <p className="text-[10px] text-elegant/60 mt-3 font-medium">Budget and courses are synced in real-time.</p>
            </div>

            {/* Widget 2 */}
            <div className="glass-no-hover rounded-2xl p-5 border border-blush-100/30 relative overflow-hidden bg-white/40">
              <span className="text-[10px] font-bold text-rosegold-400 uppercase tracking-wider">Budget Spent</span>
              <p className="text-3xl font-black text-elegant mt-2">IDR 176.0M</p>
              <div className="flex items-center gap-2 mt-4 text-[10px] text-emerald-600 font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>6/9 Items paid in full</span>
              </div>
              <p className="text-[10px] text-elegant/60 mt-3 font-medium">Pie charts display wedding categories.</p>
            </div>

            {/* Widget 3 */}
            <div className="glass-no-hover rounded-2xl p-5 border border-blush-100/30 relative overflow-hidden bg-white/40">
              <span className="text-[10px] font-bold text-rosegold-400 uppercase tracking-wider">Course Toggles</span>
              <p className="text-3xl font-black text-elegant mt-2">8/14 Lessons</p>
              <div className="w-full bg-blush-100/50 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-blush-400 h-full w-[57%] rounded-full" />
              </div>
              <p className="text-[10px] text-elegant/60 mt-3 font-medium">Spiritual, emotional & financial readiness.</p>
            </div>
          </div>

          {/* AI assistant mockup bubble */}
          <div className="mt-8 p-4 rounded-2xl border border-blush-200/30 bg-blush-50/30 flex items-start gap-4 max-w-xl">
            <div className="w-9 h-9 rounded-full bg-blush-200 flex items-center justify-center text-elegant font-bold shadow-sm">
              AI
            </div>
            <div>
              <p className="text-xs font-bold text-elegant">Ayunikah Intelligent Advisor</p>
              <p className="text-xs text-elegant/80 mt-1 leading-relaxed">
                "Hi Lidya & Ronal! You still have 3 unpaid budget items due next month. I highly recommend taking the course lesson *'Joint checking account debate'* today to align your financial schedules."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PREMIUM FEATURES GRID */}
      <section className="container mx-auto px-6 py-20 relative z-10 select-none">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">Holistic Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-elegant mt-2">Everything You Need To Prepare Beautifully</h2>
          <p className="text-xs sm:text-sm text-elegant/60 mt-3">We go beyond booking tables. We prepare your emotional, financial, and collaborative future together.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass rounded-3xl p-6 border border-blush-200/30 relative overflow-hidden bg-white/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blush-200 to-lavender-200 text-elegant flex items-center justify-center shadow-md mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-elegant mb-2">{feature.title}</h3>
                <p className="text-xs text-elegant/75 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SLIDER CAROUSEL */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">Loved by Couples</span>
          <h2 className="text-3xl font-bold text-elegant mt-2">Our Romantic Companionship Journeys</h2>
        </div>

        <div className="max-w-2xl mx-auto relative select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 border border-blush-200/40 relative text-center bg-white/40"
            >
              <Quote className="w-10 h-10 text-blush-300/40 mx-auto mb-4" />
              <p className="text-xs sm:text-sm text-elegant/80 italic leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="flex justify-center gap-1 my-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 mt-6">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-10 h-10 rounded-full object-cover shadow border border-blush-100"
                />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-elegant leading-none">{testimonials[activeTestimonial].name}</h4>
                  <span className="text-[10px] text-rosegold-400 font-semibold">{testimonials[activeTestimonial].role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeTestimonial === i ? 'bg-rosegold-400' : 'bg-blush-200/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION FAQ SECTION */}
      <section className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">Answering Questions</span>
          <h2 className="text-3xl font-bold text-elegant mt-2">Frequently Asked Inquiries</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 select-none">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            
            return (
              <div 
                key={idx}
                className="glass rounded-2xl border border-blush-200/30 overflow-hidden bg-white/40"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-elegant"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-rosegold-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-xs text-elegant/70 leading-relaxed border-t border-blush-200/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="w-full relative py-12 select-none border-t border-blush-200/20 bg-gradient-to-b from-transparent to-blush-100/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blush-200 flex items-center justify-center shadow-md shadow-blush-300/40">
              <Heart className="w-4 h-4 text-elegant fill-elegant/20" />
            </div>
            <div>
              <h3 className="text-base font-bold text-elegant">Ayunikah</h3>
              <span className="text-[10px] text-rosegold-400 uppercase tracking-widest font-semibold block">Wedding Prep companion</span>
            </div>
          </div>

          <div className="text-xs text-elegant/60">
            &copy; {new Date().getFullYear()} Ayunikah. All rights reserved. <br />
            <span className="text-rosegold-400 font-bold">Made with love by Lidya Ayu Sukamawandira</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-elegant/70">
            <Link href="/login" className="hover:text-rosegold-400 transition-colors">Workspace</Link>
            <Link href="/register" className="hover:text-rosegold-400 transition-colors">Register</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-rosegold-400 transition-colors">GitHub Code</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
