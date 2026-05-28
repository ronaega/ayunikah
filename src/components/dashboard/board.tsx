"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  Wallet, 
  BookOpen, 
  Send, 
  Sparkles, 
  CheckSquare, 
  Flame, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';
import { formatCurrency, getCountdown } from '../../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export const MainBoard: React.FC = () => {
  const {
    groom,
    bride,
    weddingDate,
    overallProgress,
    budgetProgress,
    coursesProgress,
    profilesProgress,
    budgetItems,
    courses,
    invitees,
    invitation,
    notifications
  } = useMarriageState();

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(weddingDate));
    }, 1000);
    setCountdown(getCountdown(weddingDate));
    return () => clearInterval(timer);
  }, [weddingDate]);

  // Dynamic Chart Data: Actual vs Estimated
  const categories = Array.from(new Set(budgetItems.map(item => item.category)));
  const chartData = categories.map(cat => {
    const items = budgetItems.filter(item => item.category === cat);
    const estimated = items.reduce((acc, curr) => acc + curr.estimatedBudget, 0);
    const actual = items.reduce((acc, curr) => acc + curr.actualBudget, 0);
    return {
      name: cat,
      estimated: estimated / 1000000, // Show in Millions IDR
      actual: actual / 1000000
    };
  }).slice(0, 5); // Limit to top 5 categories for layout elegance

  const totalSpent = budgetItems.reduce((acc, curr) => acc + curr.actualBudget, 0);
  const totalEstimated = budgetItems.reduce((acc, curr) => acc + curr.estimatedBudget, 0);
  const attendingCount = invitees.filter(i => i.rsvpStatus === 'Attending').length;
  const coupleLabel = [bride.nickname || bride.fullName, groom.nickname || groom.fullName].filter(Boolean).join(' & ') || 'New Couple';
  const groomLabel = groom.nickname || groom.fullName || 'the groom';

  // Custom Recharts colors
  const COLORS = ['#F7D6D0', '#C79B8B', '#DCCFED', '#F6C7B6', '#E5D1C9'];

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Welcome Banner */}
      <div className="glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1 justify-center md:justify-start">
            <Sparkles className="w-3.5 h-3.5" />
            Cohesive Union Workspace
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-elegant">Happy Planning, {coupleLabel}!</h2>
          <p className="text-xs text-elegant/70 max-w-md leading-relaxed">
            Every paid bill, completed course, and guest RSVP confirmation is automatically synced to track your marital readiness.
          </p>
        </div>

        {/* Global Countdown Widget */}
        <div className="glass rounded-2xl px-4 sm:px-5 py-4 border border-blush-200/30 flex items-center gap-3 sm:gap-4 bg-white/50 shrink-0 w-full sm:w-auto">
          <Calendar className="w-8 h-8 text-rosegold-400 stroke-[1.5px]" />
          <div>
            <span className="text-[9px] uppercase font-semibold text-rosegold-400 tracking-wider">Locked Wedding Date</span>
            <p className="text-sm font-black text-elegant">{new Date(weddingDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
            <p className="text-[10px] text-rosegold-400 font-bold mt-0.5">{countdown.days} days, {countdown.hours} hours remaining</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Overall readiness ring + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Readiness Dynamic SVG Circular Ring */}
        <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400 mb-6">Overall Marriage Readiness</span>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-blush-100/40"
                strokeWidth="12"
                fill="transparent"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-rosegold-400"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 74}
                initial={{ strokeDashoffset: 2 * Math.PI * 74 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 74 * (1 - overallProgress / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-4xl font-black text-elegant tracking-tighter">{overallProgress.toFixed(0)}%</p>
              <p className="text-[9px] uppercase font-bold text-rosegold-400 tracking-widest mt-1">Ready for Union</p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 mt-6 border-t border-blush-200/20 pt-4 text-center">
            <div>
              <p className="text-xs font-black text-elegant">{budgetProgress.toFixed(0)}%</p>
              <span className="text-[8px] text-elegant/60 uppercase font-semibold">Budget</span>
            </div>
            <div>
              <p className="text-xs font-black text-elegant">{coursesProgress.toFixed(0)}%</p>
              <span className="text-[8px] text-elegant/60 uppercase font-semibold">Courses</span>
            </div>
            <div>
              <p className="text-xs font-black text-elegant">{invitation.confirmed ? '100%' : '0%'}</p>
              <span className="text-[8px] text-elegant/60 uppercase font-semibold">Invite</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Cards (Grid of 4) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1: Budget details */}
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-wider">Financial sheet</span>
              <Wallet className="w-5 h-5 text-emerald-500 stroke-[1.5px]" />
            </div>
            <div className="my-4">
              <p className="text-2xl font-black text-elegant">{formatCurrency(totalSpent)}</p>
              <p className="text-[10px] text-elegant/60 mt-1 font-semibold">Estimated Budget: {formatCurrency(totalEstimated)}</p>
            </div>
            <div className="flex items-center justify-between text-[10px] border-t border-blush-200/10 pt-3">
              <span className="text-emerald-600 font-bold">✓ {budgetItems.filter(i => i.status === 'Paid').length} paid in full</span>
              <span className="text-elegant/50 font-semibold">{budgetItems.filter(i => i.status === 'Unpaid').length} payments pending</span>
            </div>
          </div>

          {/* Card 2: Knowledge details */}
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-wider">Preparation Courses</span>
              <BookOpen className="w-5 h-5 text-purple-500 stroke-[1.5px]" />
            </div>
            <div className="my-4">
              <p className="text-2xl font-black text-elegant">
                {courses.reduce((acc, curr) => acc + curr.lessons.filter(l => l.completed).length, 0)} / {courses.reduce((acc, curr) => acc + curr.lessons.length, 0)}
              </p>
              <p className="text-[10px] text-elegant/60 mt-1 font-semibold">Toggled Lessons Completed</p>
            </div>
            <div className="flex items-center justify-between text-[10px] border-t border-blush-200/10 pt-3">
              <span className="text-purple-600 font-bold">✓ {courses.filter(c => c.completed).length} courses finished</span>
              <span className="text-elegant/50 font-semibold">{courses.filter(c => !c.completed).length} in progress</span>
            </div>
          </div>

          {/* Card 3: Invitation details */}
          <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-wider">Guest Confirmation</span>
              <Send className="w-5 h-5 text-sky-500 stroke-[1.5px]" />
            </div>
            <div className="my-4">
              <p className="text-2xl font-black text-elegant">
                {attendingCount} / {invitees.length} Guests
              </p>
              <p className="text-[10px] text-elegant/60 mt-1 font-semibold">Attending RSVP Responses</p>
            </div>
            <div className="flex items-center justify-between text-[10px] border-t border-blush-200/10 pt-3">
              <span className="text-sky-600 font-bold">{invitees.filter(i => i.rsvpStatus === 'Pending').length} responses pending</span>
              <span className="text-elegant/50 font-semibold">{invitation.confirmed ? 'Invites Live' : 'Draft stage'}</span>
            </div>
          </div>

          {/* Card 4: AI intelligent suggestion widget */}
          <div className="glass rounded-3xl p-6 border border-rosegold-200/50 bg-gradient-to-tr from-blush-50 to-lavender-50 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-wider">Smart Assistant Tip</span>
              <Flame className="w-5 h-5 text-rosegold-400 stroke-[1.5px] animate-pulse" />
            </div>
            <div className="my-3">
              <p className="text-xs font-bold text-elegant leading-relaxed">
                {`Hi ${groomLabel}! Your groom course still has lessons to finish. Setting aside 15 minutes today can keep your preparation moving steadily.`}
              </p>
            </div>
            <div className="text-[10px] text-rosegold-400 font-bold flex items-center gap-1 border-t border-blush-200/20 pt-3 cursor-pointer">
              <span>View Lessons Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: Charts + Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Category Expense Bar Chart (2/3 width) */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">Category Budgeting Analytics</span>
              <h3 className="text-sm font-bold text-elegant mt-0.5">Estimated vs. Actual Expenditures (Millions IDR)</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-elegant/70">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-rosegold-400/40" />
                <span>Estimated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-rosegold-400" />
                <span>Actual</span>
              </div>
            </div>
          </div>

          <div className="w-full h-56 mt-2">
            {chartData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-xs text-elegant/50">
                No budget data to display. Please populate items.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#4B3B39" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4B3B39" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255,255,255,0.9)', 
                      borderRadius: '12px', 
                      border: '1px solid #F7D6D0',
                      fontSize: '11px',
                      color: '#4B3B39'
                    }} 
                    formatter={(val: number) => [`${val.toFixed(1)}M IDR`, '']}
                  />
                  <Bar dataKey="estimated" fill="#C79B8B" radius={[4, 4, 0, 0]} opacity={0.4} maxBarSize={30} />
                  <Bar dataKey="actual" fill="#C79B8B" radius={[4, 4, 0, 0]} maxBarSize={30}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Real-time Activities Feed (1/3 width) */}
        <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col h-80">
          <div className="mb-4 border-b border-blush-200/20 pb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-rosegold-400 stroke-[2px]" />
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-rosegold-400">Preparation Log</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {notifications.length === 0 ? (
              <p className="text-[10px] text-elegant/60 text-center py-10">No recent logs recorded.</p>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rosegold-400 shrink-0 mt-1.5 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-elegant leading-none">{notif.title}</p>
                    <p className="text-[10px] text-elegant/70 mt-1 leading-normal">{notif.description}</p>
                    <span className="text-[8px] text-elegant/40 font-medium block mt-0.5">{notif.timestamp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainBoard;
