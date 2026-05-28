"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  UserSquare2, 
  Wallet, 
  BookOpen, 
  Send, 
  Settings, 
  LogOut,
  Heart
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/auth-context';
import { useMarriageState } from '../context/state-context';

export const menuItems = [
  { id: 'board', label: 'Main Board', icon: LayoutDashboard },
  { id: 'profile', label: 'Personal Info', icon: UserSquare2 },
  { id: 'budget', label: 'Budget Sheet', icon: Wallet },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'invitation', label: 'Invitation Builder', icon: Send },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'board';
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { groom, bride } = useMarriageState();
  const coupleLabel = [bride.nickname || bride.fullName, groom.nickname || groom.fullName].filter(Boolean).join(' & ') || 'New Couple';

  const handleTabChange = (tabId: string) => {
    router.push(`${pathname}?tab=${tabId}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* DESKTOP SIDEBAR - Hidden on mobile */}
      <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-2rem)] fixed left-4 top-4 glass rounded-3xl p-6 z-30 select-none overflow-y-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 py-4 mb-8 border-b border-blush-200/30">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full bg-blush-200 flex items-center justify-center shadow-md shadow-blush-300/40"
          >
            <Heart className="w-5 h-5 text-elegant fill-elegant/20" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-elegant leading-none">Ayunikah</h1>
            <span className="text-[10px] text-rosegold-400 font-medium uppercase tracking-wider">Premium Companion</span>
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 relative group",
                  isActive 
                    ? "text-elegant font-semibold shadow-inner shadow-blush-200/20" 
                    : "text-elegant/70 hover:text-elegant hover:bg-blush-100/30"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-blush-100/60 to-lavender-100/50 rounded-2xl -z-10 border border-blush-200/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-rosegold-400 stroke-[2.5px]" : "text-elegant/50"
                )} />
                
                <span>{item.label}</span>
                
                {/* Subtle Right Indicator dot */}
                {isActive && (
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-rosegold-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Footer Profile & Logout */}
        <div className="mt-auto border-t border-blush-200/30 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blush-200 to-lavender-200 flex items-center justify-center font-bold text-sm text-elegant shadow-sm">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-elegant truncate">{coupleLabel}</p>
              <p className="text-[10px] text-elegant/60 truncate">{user?.email || 'No account'}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR - Visible only on mobile screens */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-16 glass rounded-2xl z-40 flex items-center justify-around px-2 shadow-lg shadow-elegant/5 select-none">
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl relative"
            >
              {isActive && (
                <motion.div 
                  layoutId="active-indicator-mobile"
                  className="absolute inset-0 bg-blush-100/60 dark:bg-blush-950/40 rounded-xl -z-10 border border-blush-200/30 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                isActive ? "text-rosegold-400 stroke-[2.5px] scale-110" : "text-elegant/60"
              )} />
              <span className="text-[9px] font-semibold mt-1 tracking-tighter text-elegant/80">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
        
        {/* Mobile Settings Icon */}
        <button
          onClick={() => handleTabChange('settings')}
          className={cn(
            "flex flex-col items-center justify-center w-12 h-12 rounded-xl relative",
            activeTab === 'settings' && "text-rosegold-400 font-semibold"
          )}
        >
          {activeTab === 'settings' && (
            <motion.div 
              layoutId="active-indicator-mobile"
              className="absolute inset-0 bg-blush-100/60 rounded-xl -z-10 border border-blush-200/30 shadow-sm"
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
          )}
          <Settings className={cn("w-5 h-5", activeTab === 'settings' ? "text-rosegold-400 stroke-[2.5px]" : "text-elegant/60")} />
          <span className="text-[9px] font-semibold mt-1 tracking-tighter text-elegant/80">Settings</span>
        </button>
      </nav>
    </>
  );
};
export default Sidebar;
