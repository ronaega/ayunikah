"use client";

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../../components/sidebar';
import { Navbar } from '../../components/navbar';
import { AIAssistant } from '../../components/ai-assistant';
import { useAuth } from '../../context/auth-context';

// Dynamic sub-tabs import
import { MainBoard } from '../../components/dashboard/board';
import { ProfilePage } from '../../components/dashboard/profile';
import { BudgetPage } from '../../components/dashboard/budget';
import { KnowledgePage } from '../../components/dashboard/knowledge';
import { InvitationPage } from '../../components/dashboard/invitation';
import { SettingsPage } from '../../components/dashboard/settings';

function DashboardWorkspace() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'board';
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // If not loading and no session user, redirect to login
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blush-200 border-t-rosegold-400 animate-spin" />
          <p className="text-xs font-bold text-elegant/60 uppercase tracking-widest animate-pulse">Synchronising Workspace...</p>
        </div>
      </div>
    );
  }

  // Switch subpages based on active tab state
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfilePage />;
      case 'budget':
        return <BudgetPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'invitation':
        return <InvitationPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <MainBoard />;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-cream-50/5 dark:bg-elegant-900/5 transition-colors duration-500">
      
      {/* 1. Left Desktop Sidebar Navigation */}
      <Sidebar />

      {/* 2. Right Workspace Panel */}
      <main className="flex-1 md:ml-72 min-h-screen p-4 md:p-6 pb-24 md:pb-6 flex flex-col">
        
        {/* Top Navbar Header */}
        <Navbar />

        {/* Dynamic page content transitions */}
        <div className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {renderActiveTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 3. Floating state-aware AI Coach */}
      <AIAssistant />
    </div>
  );
}

export default function DashboardLayoutWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center relative select-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-blush-200 border-t-rosegold-400 animate-spin" />
            <p className="text-xs font-bold text-elegant/60 uppercase tracking-widest animate-pulse">Opening Workspace...</p>
          </div>
        </div>
      }
    >
      <DashboardWorkspace />
    </Suspense>
  );
}
