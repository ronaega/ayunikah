"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Music, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Check, 
  Send,
  MessageCircle
} from 'lucide-react';
import { getCountdown, cn } from '../../lib/utils';

export default function GuestInvitationPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [name, setName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'Attending' | 'Declined'>('Attending');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const weddingDate = "2027-05-27";
  const brideNick = "Lidya";
  const groomNick = "Ronal";
  const venue = "Amanjiwo Luxury Resort, Borobudur, Central Java";
  const story = "Ronal and Lidya met at a creative tech conference in 2022. Shared cups of coffee grew into late-night designs and code commits. Over two years, they inspired each other's work and fell in love. On a quiet evening in Ubud, Ronal asked Lidya to spend forever together. Now, they invite you to celebrate their union and embark on their lifetime journey of love.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(weddingDate));
    }, 1000);
    setCountdown(getCountdown(weddingDate));
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById('wedding-music-guest') as HTMLAudioElement;
    if (audio) {
      if (musicPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Simulate updating list
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setNotes('');
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full gradient-bg relative flex flex-col items-center p-4 select-none">
      <audio id="wedding-music-guest" loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Floating Sparkles */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blush-200/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-lavender-200/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Main Glass invitation card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg glass rounded-3xl p-6 md:p-10 shadow-2xl relative border border-blush-200/40 text-center space-y-8 my-8 bg-white/40"
      >
        {/* Floating audio control */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={toggleMusic}
            className="p-3 rounded-full bg-white/80 dark:bg-elegant-800 text-elegant shadow border border-blush-200/30 hover:scale-105 transition-transform"
          >
            {musicPlaying ? <Volume2 className="w-4 h-4 text-rosegold-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-elegant/60" />}
          </button>
        </div>

        {/* Wedding Intro */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-blush-200/30 text-[10px] font-extrabold uppercase text-rosegold-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            The Wedding Celebration
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-elegant leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
            {brideNick} & {groomNick}
          </h1>
          <p className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">
            Are Getting Married!
          </p>
        </div>

        {/* Story Section */}
        <div className="space-y-2 border-t border-b border-blush-200/20 py-6 max-w-sm mx-auto text-left leading-relaxed">
          <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest block mb-2 text-center">Our Romantic Journey</span>
          <p className="text-xs text-elegant/80 italic leading-relaxed text-center">
            "{story}"
          </p>
        </div>

        {/* Countdown Ticker */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest block">Lock the date countdown</span>
          <div className="flex justify-center gap-3">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Mins' }
            ].map((cell, idx) => (
              <div key={idx} className="w-16 py-3 rounded-2xl glass border border-blush-200/20 bg-white/60 shadow-sm shrink-0">
                <span className="text-lg font-black text-elegant leading-none block">{cell.val}</span>
                <span className="text-[8px] uppercase font-bold text-rosegold-400 tracking-wider mt-1 block">{cell.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm mx-auto text-left text-xs font-semibold text-elegant leading-normal">
          <div className="p-4 rounded-2xl glass bg-white/70 border border-blush-200/10 space-y-1.5 flex flex-col justify-between">
            <Calendar className="w-5 h-5 text-rosegold-400" />
            <div>
              <span className="text-[9px] uppercase font-extrabold text-rosegold-400 tracking-wider block">Ceremony Date</span>
              <p className="font-bold">Thursday, May 27, 2027</p>
              <p className="text-[10px] opacity-60">09:00 AM - 11:00 AM WIB</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass bg-white/70 border border-blush-200/10 space-y-1.5 flex flex-col justify-between">
            <MapPin className="w-5 h-5 text-rose-500" />
            <div>
              <span className="text-[9px] uppercase font-extrabold text-rosegold-400 tracking-wider block">Wedding Venue</span>
              <p className="font-bold">Amanjiwo Resorts</p>
              <p className="text-[10px] opacity-60">Borobudur, Central Java</p>
            </div>
          </div>
        </div>

        {/* Maps Embed Mockup */}
        <div className="max-w-sm mx-auto">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-bold text-elegant border border-blush-200/20 relative overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <MapPin className="w-6 h-6 text-rose-500 absolute mr-1 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
            <span className="z-10 bg-white/95 px-3 py-1 rounded-lg border border-blush-200/20 mt-12 text-[9px] shadow-sm">Get GPS Coordinates Route</span>
          </a>
        </div>

        {/* RSVP FORM */}
        <div className="max-w-sm mx-auto border-t border-blush-200/20 pt-6">
          <form onSubmit={handleRSVPSubmit} className="bg-white/80 p-5 rounded-3xl border border-blush-200/30 text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-rosegold-400 fill-rosegold-400/20 animate-pulse" />
              <span className="text-[10px] text-rosegold-400 uppercase font-extrabold tracking-widest">Confirm Attendance RSVP</span>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 text-emerald-600 font-bold text-xs flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                  <Check className="w-5 h-5" />
                </div>
                <span>Thank you! Your response is confirmed.</span>
              </motion.div>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter guest name..."
                    className="w-full bg-white border border-blush-200/20 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider">Attendance RSVP</label>
                    <select
                      value={rsvpStatus}
                      onChange={(e) => setRsvpStatus(e.target.value as any)}
                      className="w-full bg-white border border-blush-200/20 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none shadow-sm"
                    >
                      <option value="Attending">Yes, I am Attending with pleasure</option>
                      <option value="Declined">No, I regretfully decline</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider">Warm wishes to Couple</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Congratulations on your beautiful journey together! Wishing you love..."
                    className="w-full bg-white border border-blush-200/20 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[60px] resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rosegold-400 text-white rounded-2xl py-3.5 text-xs font-bold shadow-md shadow-rosegold-200/30 hover:bg-rosegold-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Confirmation</span>
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-[9px] text-elegant/50 uppercase tracking-widest pt-4">
          Made with love by Lidya Ayu Sukamawandira
        </div>
      </motion.div>
    </main>
  );
}
