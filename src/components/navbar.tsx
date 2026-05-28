"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Sun, 
  Moon, 
  Calendar, 
  ChevronDown, 
  CheckCheck,
  Smile,
  Wallet,
  BookOpen,
  Send,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useMarriageState } from '../context/state-context';
import { useAuth } from '../context/auth-context';
import { getCountdown, cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { 
    weddingDate, 
    notifications, 
    markNotificationsAsRead,
    groom,
    bride
  } = useMarriageState();

  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Initialize countdown and theme
  useEffect(() => {
    // Check local storage for dark mode
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      setDarkMode(true);
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }

    const timer = setInterval(() => {
      setCountdown(getCountdown(weddingDate));
    }, 1000);
    setCountdown(getCountdown(weddingDate));

    // Handle clicks outside of dropdowns
    const handleOutsideClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [weddingDate]);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const toggleMusic = () => {
    const audio = document.getElementById('wedding-music') as HTMLAudioElement;
    if (audio) {
      if (musicPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const coupleLabel = [bride.nickname || bride.fullName, groom.nickname || groom.fullName].filter(Boolean).join(' & ') || 'New Couple';
  const profileInitial = coupleLabel === 'New Couple' ? (user?.email?.charAt(0).toUpperCase() ?? 'A') : coupleLabel.charAt(0).toUpperCase();

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'budget': return <Wallet className="w-4 h-4 text-emerald-500" />;
      case 'course': return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'invitee': return <Send className="w-4 h-4 text-sky-500" />;
      default: return <Smile className="w-4 h-4 text-blush-500" />;
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-2 px-3 sm:px-6 py-3 sm:py-4 glass rounded-3xl mb-4 sm:mb-6 select-none z-20 relative">
      {/* Background Wedding Music Tag (Loaded silently) */}
      <audio id="wedding-music" loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Left: Romantic Wedding Countdown Clock */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-blush-100 flex items-center justify-center text-rosegold-400 border border-blush-200/50 shrink-0">
          <Calendar className="w-4 h-4 animate-bounce" />
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] uppercase font-semibold tracking-wider text-rosegold-400">Countdown to Forever</p>
          <p className="text-xs font-bold text-elegant">
            {countdown.days}d : {countdown.hours}h : {countdown.minutes}m Left
          </p>
        </div>
        <div className="sm:hidden text-[10px] font-bold text-elegant whitespace-nowrap">
          {countdown.days}d left
        </div>
      </div>

      {/* Center Message: Greeting */}
      <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-elegant italic">
        <Sparkles className="w-4 h-4 text-rosegold-400 animate-pulse" />
        <span>"Preparing beautifully with love, {coupleLabel}."</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1 sm:gap-3 md:gap-4 shrink-0">
        {/* Background Music Toggle */}
        <button
          onClick={toggleMusic}
          title={musicPlaying ? "Pause romantic soundtrack" : "Play romantic soundtrack"}
          className="hidden sm:block p-2.5 rounded-xl hover:bg-blush-100/30 text-elegant/70 hover:text-elegant transition-colors"
        >
          {musicPlaying ? <Volume2 className="w-4.5 h-4.5 text-rosegold-400 animate-pulse" /> : <VolumeX className="w-4.5 h-4.5" />}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 sm:p-2.5 rounded-xl hover:bg-blush-100/30 text-elegant/70 hover:text-elegant transition-colors"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications Center */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-blush-100/30 text-elegant/70 hover:text-elegant transition-colors relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="fixed sm:absolute right-3 sm:right-0 left-3 sm:left-auto mt-3 sm:w-80 glass rounded-2xl shadow-xl p-4 overflow-hidden z-50 border border-blush-200/50"
              >
                <div className="flex items-center justify-between pb-3 border-b border-blush-200/20 mb-2">
                  <h3 className="text-xs font-bold text-elegant">Notification Feed</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        markNotificationsAsRead();
                        setShowNotifications(false);
                      }}
                      className="text-[10px] text-rosegold-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-[11px] text-elegant/60 text-center py-6">No recent updates.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={cn(
                          "p-2.5 rounded-xl text-left border flex items-start gap-2.5 transition-colors",
                          notif.isRead 
                            ? "bg-transparent border-transparent" 
                            : "bg-blush-50/50 border-blush-100/30"
                        )}
                      >
                        <div className="mt-0.5 p-1 rounded bg-white shadow-sm flex items-center justify-center">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-elegant truncate">{notif.title}</p>
                          <p className="text-[10px] text-elegant/80 mt-0.5 leading-snug">{notif.description}</p>
                          <span className="text-[8px] text-elegant/40 font-medium block mt-1">{notif.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 sm:pr-3 rounded-2xl hover:bg-blush-100/30 text-elegant transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blush-200 to-lavender-200 text-elegant font-bold flex items-center justify-center text-xs shadow-sm">
              {profileInitial}
            </div>
            <span className="hidden sm:block text-xs font-semibold">{coupleLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-elegant/50" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute right-0 mt-3 w-48 glass rounded-2xl shadow-xl py-2 z-50 border border-blush-200/50"
              >
                <button
                  onClick={() => {
                    router.push('/dashboard?tab=profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-elegant hover:bg-blush-100/30 font-semibold"
                >
                  Edit Groom & Bride Profiles
                </button>
                <button
                  onClick={() => {
                    router.push('/dashboard?tab=settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-elegant hover:bg-blush-100/30 font-semibold"
                >
                  Platform settings
                </button>
                <hr className="my-1 border-blush-200/20" />
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-rose-500 hover:bg-rose-50/50 font-semibold"
                >
                  Logout Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
