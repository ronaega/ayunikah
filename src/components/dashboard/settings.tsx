"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Calendar, 
  Database, 
  Sparkles, 
  Check, 
  Volume2, 
  BookMarked,
  KeyRound
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';

export const SettingsPage: React.FC = () => {
  const { weddingDate, setWeddingDate, invitation, updateInvitation } = useMarriageState();
  const [formDate, setFormDate] = useState(weddingDate);
  const [savedDate, setSavedDate] = useState(false);

  const [soundUrl, setSoundUrl] = useState(invitation.musicUrl);
  const [soundOn, setSoundOn] = useState(invitation.backgroundMusic);
  const [savedSound, setSavedSound] = useState(false);

  const handleDateSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWeddingDate(formDate);
    setSavedDate(true);
    setTimeout(() => setSavedDate(false), 3000);
  };

  const handleSoundSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateInvitation({
      musicUrl: soundUrl,
      backgroundMusic: soundOn
    });
    setSavedSound(true);
    setTimeout(() => setSavedSound(false), 3000);
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Banner */}
      <div className="glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30">
        <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
          Settings Panel
        </span>
        <h2 className="text-xl font-black text-elegant mt-2">Platform & DB Configurations</h2>
        <p className="text-xs text-elegant/75 mt-1">
          Coordinate global wedding date milestones and access database integration script credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: PLATFORM CONFIGS */}
        <div className="space-y-6">
          
          {/* Wedding Date Milestones Form */}
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400 mb-4 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rosegold-400" />
              Locked Marriage Date
            </h3>

            <form onSubmit={handleDateSave} className="space-y-4">
              <div>
                <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Union Ceremony Date</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
              >
                {savedDate ? <Check className="w-4 h-4 text-white" /> : null}
                <span>{savedDate ? 'Wedding Date Locked!' : 'Update Marriage Date'}</span>
              </button>
            </form>
          </div>

          {/* Sound & Ambient audio configs */}
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400 mb-4 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-rosegold-400" />
              Audio Soundtrack Coordinates
            </h3>

            <form onSubmit={handleSoundSave} className="space-y-4">
              <div>
                <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Soundtrack MP3 Source URL</label>
                <input
                  type="text"
                  value={soundUrl}
                  onChange={(e) => setSoundUrl(e.target.value)}
                  placeholder="https://example.com/soundtrack.mp3"
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 px-1 py-1">
                <input
                  type="checkbox"
                  id="sound-opt"
                  checked={soundOn}
                  onChange={(e) => setSoundOn(e.target.checked)}
                  className="rounded border-blush-200 text-rosegold-400 w-4 h-4"
                />
                <label htmlFor="sound-opt" className="text-xs font-bold text-elegant cursor-pointer">
                  Autoplay soundtrack on digital guest cards
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
              >
                {savedSound ? <Check className="w-4 h-4 text-white" /> : null}
                <span>{savedSound ? 'Audio Saved!' : 'Update Audio Soundtrack'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: SUPABASE DB INTEGRATION INSTRUCTIONS */}
        <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col h-[400px] overflow-y-auto">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400 mb-2 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-rosegold-400" />
            Supabase PostgreSQL Integration
          </h3>
          <p className="text-[10px] text-elegant/75 leading-relaxed border-b border-blush-200/20 pb-3 mb-4">
            Ayunikah is production-ready for deployment on **Vercel** and connects seamlessly with **Supabase PostgreSQL**. Follow these quick integration guidelines:
          </p>

          <div className="space-y-4 text-[10px] leading-relaxed text-elegant">
            <div>
              <span className="font-extrabold text-rosegold-400 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                <KeyRound className="w-3.5 h-3.5" />
                1. Configure Environment Variables
              </span>
              In your Vercel Project Settings or local `.env.local` file, add these two environment keys:
              <pre className="bg-blush-50/50 p-2.5 rounded-xl border border-blush-200/10 text-[8.5px] mt-1.5 overflow-x-auto text-elegant/80">
{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
            </div>

            <div>
              <span className="font-extrabold text-rosegold-400 flex items-center gap-1.5 uppercase tracking-wider mb-1">
                <BookMarked className="w-3.5 h-3.5" />
                2. Execute SQL Database Schema
              </span>
              In your Supabase Dashboard, open **SQL Editor**, create a new query, paste and execute the schema definitions:
              <pre className="bg-blush-50/50 p-2.5 rounded-xl border border-blush-200/10 text-[8px] mt-1.5 max-h-44 overflow-y-auto text-left text-elegant/80 font-mono">
{`create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);

create table couples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  wedding_date date,
  created_at timestamp default now()
);

create table budget_items (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references couples(id),
  item_name text,
  estimated_budget numeric,
  actual_budget numeric,
  status text,
  due_date date,
  notes text,
  created_at timestamp default now()
);

create table invitees (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references couples(id),
  name text,
  phone text,
  address text,
  rsvp_status text,
  attendance_status text,
  notes text,
  created_at timestamp default now()
);`}
              </pre>
            </div>

            <div className="p-3 bg-blush-50/50 border border-blush-200/20 rounded-2xl">
              <span className="font-bold text-rosegold-400 uppercase tracking-widest block mb-1">Vercel Deployment Checklist</span>
              Push your codebase to your GitHub Repository, select import on Vercel, inject the keys, and your luxury live full-stack system is live and synced!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
