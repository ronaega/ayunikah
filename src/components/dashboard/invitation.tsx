"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Send, 
  Settings, 
  Share2, 
  Check, 
  X,
  Sparkles,
  Smartphone,
  Eye,
  Sliders,
  Phone,
  Music,
  MapPin,
  Calendar,
  Heart
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';
import { cn } from '../../lib/utils';

const themes = [
  { id: 'Blossom', name: 'Blossom Pink', bg: 'bg-blush-50 dark:bg-elegant-900', primary: '#F7D6D0', accent: '#C79B8B' },
  { id: 'Emerald', name: 'Emerald Luxury', bg: 'bg-emerald-50/50 dark:bg-emerald-950/20', primary: '#8bcdc7', accent: '#40807b' },
  { id: 'Gold', name: 'Champagne Gold', bg: 'bg-cream-100 dark:bg-elegant-900', primary: '#f6c7b6', accent: '#c79b8b' },
  { id: 'Lavender', name: 'Soft Lavender', bg: 'bg-lavender-50 dark:bg-elegant-900', primary: '#DCCFED', accent: '#ab8cfa' }
];

export const InvitationPage: React.FC = () => {
  const { 
    invitees, 
    addInvitee, 
    updateInvitee, 
    deleteInvitee,
    invitation,
    updateInvitation,
    confirmInvitation,
    groom,
    bride,
    weddingDate
  } = useMarriageState();

  const [activeSubTab, setActiveSubTab] = useState<'guests' | 'builder'>('guests');

  // Guest Search & Filters
  const [search, setSearch] = useState('');
  const [filterRsvp, setFilterRsvp] = useState('All');
  const [filterGroup, setFilterGroup] = useState('All');

  // Guest form modal states
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestAddr, setGuestAddr] = useState('');
  const [guestRsvp, setGuestRsvp] = useState<'Attending' | 'Declined' | 'Pending'>('Pending');
  const [guestGroup, setGuestGroup] = useState<'Family' | 'Friends' | 'VIP'>('Friends');
  const [guestNotes, setGuestNotes] = useState('');

  // WhatsApp Share State
  const [shareGuest, setShareGuest] = useState<any | null>(null);

  // Live Emulator states
  const [emulatorRsvp, setEmulatorRsvp] = useState<'Attending' | 'Declined'>('Attending');
  const [emulatorSubmitted, setEmulatorSubmitted] = useState(false);

  // Form states for Builder
  const [themeId, setThemeId] = useState(invitation.theme);
  const [fontFamily, setFontFamily] = useState(invitation.fontFamily);
  const [musicOn, setMusicOn] = useState(invitation.backgroundMusic);
  const [storyText, setStoryText] = useState(invitation.story);

  // Filtered invitees
  const filteredGuests = invitees.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(search.toLowerCase()) || 
                          guest.notes.toLowerCase().includes(search.toLowerCase());
    const matchesRsvp = filterRsvp === 'All' || guest.rsvpStatus === filterRsvp;
    const matchesGroup = filterGroup === 'All' || guest.group === filterGroup;
    return matchesSearch && matchesRsvp && matchesGroup;
  });

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const data = {
      name: guestName,
      phone: guestPhone,
      address: guestAddr,
      rsvpStatus: guestRsvp,
      attendanceStatus: guestRsvp === 'Attending' ? 'Confirmed' : 'Unconfirmed' as any,
      group: guestGroup,
      notes: guestNotes
    };

    if (editingGuestId) {
      updateInvitee(editingGuestId, data);
    } else {
      addInvitee(data);
    }
    resetGuestForm();
  };

  const handleEditGuest = (guest: any) => {
    setEditingGuestId(guest.id);
    setGuestName(guest.name);
    setGuestPhone(guest.phone);
    setGuestAddr(guest.address);
    setGuestRsvp(guest.rsvpStatus);
    setGuestGroup(guest.group);
    setGuestNotes(guest.notes);
    setShowGuestModal(true);
  };

  const resetGuestForm = () => {
    setEditingGuestId(null);
    setGuestName('');
    setGuestPhone('');
    setGuestAddr('');
    setGuestRsvp('Pending');
    setGuestGroup('Friends');
    setGuestNotes('');
    setShowGuestModal(false);
  };

  const handleSaveSettings = () => {
    updateInvitation({
      theme: themeId,
      fontFamily: fontFamily,
      backgroundMusic: musicOn,
      story: storyText
    });
  };

  const handleEmulatorRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating a pending guest to attending
    const pendingGuest = invitees.find(i => i.rsvpStatus === 'Pending');
    if (pendingGuest) {
      updateInvitee(pendingGuest.id, {
        rsvpStatus: emulatorRsvp,
        attendanceStatus: emulatorRsvp === 'Attending' ? 'Confirmed' : 'Unconfirmed'
      });
    }
    setEmulatorSubmitted(true);
    setTimeout(() => {
      setEmulatorSubmitted(false);
    }, 3000);
  };

  const generateWhatsAppMessage = (guest: any) => {
    const text = `Hi ${guest.name}! 💖 We are happy to invite you to celebrate our wedding. Ronal & Lidya are getting married at Amanjiwo Resort on May 27, 2027. View details and confirm your RSVP here: https://ayunikah.vercel.app/invite?id=demo-couple-123`;
    return `https://api.whatsapp.com/send?phone=${guest.phone.replace(/[-+\s]/g, '')}&text=${encodeURIComponent(text)}`;
  };

  const currentTheme = themes.find(t => t.id === themeId) || themes[0];

  return (
    <div className="space-y-6 select-none animate-fade-in no-print">
      {/* Banner */}
      <div className="glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30">
        <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
          Interactive Invitation Suite
        </span>
        <h2 className="text-xl font-black text-elegant mt-2">Wedding Invitations Workspace</h2>
        <p className="text-xs text-elegant/75 mt-1">
          Draft digital theme aesthetics, build live maps, and coordinate RSVP guest lists dynamically.
        </p>
      </div>

      {/* Sub Tabs Toggle */}
      <div className="flex items-center gap-3 border-b border-blush-200/20 pb-1">
        <button
          onClick={() => setActiveSubTab('guests')}
          className={cn(
            "pb-3 text-xs font-bold transition-all relative px-2",
            activeSubTab === 'guests' ? "text-rosegold-400 font-semibold" : "text-elegant/60 hover:text-elegant"
          )}
        >
          <span>Invitee Guest Manager ({invitees.length})</span>
          {activeSubTab === 'guests' && (
            <motion.div layoutId="invitation-sub-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold-400 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('builder')}
          className={cn(
            "pb-3 text-xs font-bold transition-all relative px-2",
            activeSubTab === 'builder' ? "text-rosegold-400 font-semibold" : "text-elegant/60 hover:text-elegant"
          )}
        >
          <span>Theme Builder & Emulator Preview</span>
          {activeSubTab === 'builder' && (
            <motion.div layoutId="invitation-sub-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold-400 rounded-full" />
          )}
        </button>
      </div>

      {/* GUEST MANAGER VIEW */}
      {activeSubTab === 'guests' && (
        <div className="space-y-6">
          {/* Controls toolbar */}
          <div className="glass rounded-2xl p-4 border border-blush-200/20 bg-white/30 flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guest names..."
                className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl py-2.5 pl-10 pr-4 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
              />
              <Search className="w-4 h-4 text-elegant/40 absolute left-3.5 top-3" />
            </div>

            {/* RSVP Filter */}
            <select
              value={filterRsvp}
              onChange={(e) => setFilterRsvp(e.target.value)}
              className="bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none w-full md:w-36"
            >
              <option value="All">All RSVPs</option>
              <option value="Attending">Attending</option>
              <option value="Declined">Declined</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Group Filter */}
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-white/70 dark:bg-elegant-800 border border-blush-200/25 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none w-full md:w-36"
            >
              <option value="All">All Groups</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="VIP">VIP</option>
            </select>

            <button
              onClick={() => setShowGuestModal(true)}
              className="px-5 py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-2xl text-xs font-bold shadow-md shadow-rosegold-200/30 flex items-center gap-1.5 ml-auto w-full md:w-auto text-center justify-center glowing-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Add Guest</span>
            </button>
          </div>

          {/* Guest list Table */}
          <div className="glass rounded-3xl overflow-hidden border border-blush-200/30 bg-white/40">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blush-50/50 border-b border-blush-200/20 text-elegant/70">
                    <th className="p-4 font-bold">Name & Group</th>
                    <th className="p-4 font-bold">Contact Phone</th>
                    <th className="p-4 font-bold">Home address</th>
                    <th className="p-4 font-bold">RSVP Status</th>
                    <th className="p-4 font-bold">Actions & Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush-200/10 text-elegant">
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-elegant/60">
                        No guests tracked matching your filters. Add a new friend.
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-blush-50/20 transition-colors">
                        <td className="p-4">
                          <p className="font-bold">{guest.name}</p>
                          <span className={`inline-block text-[9px] font-extrabold uppercase mt-1 px-2 py-0.5 rounded-full ${
                            guest.group === 'VIP' ? 'bg-amber-100 text-amber-800' : guest.group === 'Family' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {guest.group}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{guest.phone || 'None'}</td>
                        <td className="p-4 text-elegant/70 max-w-xs truncate">{guest.address || 'None'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${
                            guest.rsvpStatus === 'Attending' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : guest.rsvpStatus === 'Declined' 
                              ? 'bg-rose-100 text-rose-800' 
                              : 'bg-slate-100 text-slate-800'
                          }`}>
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEditGuest(guest)}
                              className="p-1.5 rounded-lg hover:bg-blush-100/30 text-elegant/60 hover:text-elegant"
                              title="Edit Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteInvitee(guest.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"
                              title="Delete Guest"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setShareGuest(guest)}
                              className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-500"
                              title="Generate WhatsApp Link"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* THEME BUILDER & MOBILE EMULATOR */}
      {activeSubTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Builder Controls Form (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Theme & Style settings */}
            <div className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 space-y-5">
              <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-wider flex items-center gap-1">
                <Sliders className="w-4 h-4 text-rosegold-400" />
                Customise Theme
              </span>

              {/* Theme Selector */}
              <div>
                <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-2 px-1">Wedding theme palette</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeId(t.id as any)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all ${
                        themeId === t.id
                          ? 'border-rosegold-400 bg-blush-50 shadow-sm'
                          : 'border-blush-200/30 bg-white/20 hover:border-blush-200/60'
                      }`}
                    >
                      <span className="text-xs font-bold text-elegant leading-none">{t.name}</span>
                      <div className="flex gap-1.5 mt-2">
                        <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.primary }} />
                        <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: t.accent }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Font selector */}
                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-2 px-1">Typography Font</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value as any)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                  >
                    <option value="Playfair Display">Playfair Display (Elegant)</option>
                    <option value="Great Vibes">Great Vibes (Romantic Script)</option>
                    <option value="Lora">Lora (Luxurious Serif)</option>
                    <option value="Montserrat">Montserrat (Minimalist Modern)</option>
                  </select>
                </div>

                {/* Music Switch */}
                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-2 px-1">Ambient Music</label>
                  <div className="flex items-center gap-3 h-10 px-1 select-none">
                    <input 
                      type="checkbox"
                      id="music-toggle"
                      checked={musicOn}
                      onChange={(e) => setMusicOn(e.target.checked)}
                      className="rounded border-blush-200 text-rosegold-400 w-4 h-4"
                    />
                    <label htmlFor="music-toggle" className="text-xs font-bold text-elegant cursor-pointer flex items-center gap-1">
                      <Music className="w-4 h-4 text-rosegold-400 shrink-0" />
                      Play background violin music
                    </label>
                  </div>
                </div>
              </div>

              {/* Story Editor */}
              <div>
                <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-2 px-1">Our Romance Story</label>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="How you met, fell in love, and decided to marry..."
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[100px] leading-relaxed"
                />
              </div>

              {/* Action Save Buttons */}
              <div className="flex gap-3 pt-2 border-t border-blush-200/10">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 py-3 bg-blush-100 hover:bg-blush-200/50 text-elegant rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border border-blush-200/20"
                >
                  <Eye className="w-4 h-4 text-rosegold-400" />
                  <span>Update Emulator Preview</span>
                </button>

                <button
                  onClick={() => {
                    handleSaveSettings();
                    confirmInvitation();
                  }}
                  className="flex-1 py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rosegold-200/30 transition-all flex items-center justify-center gap-1.5 glowing-btn"
                >
                  <Check className="w-4 h-4" />
                  <span>Lock & Publish Invites</span>
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE PHONE EMULATOR (5 Columns) */}
          <div className="lg:col-span-5 flex justify-center select-none">
            <div className="w-[280px] h-[540px] bg-slate-900 rounded-[42px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden shrink-0">
              
              {/* iPhone Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-30" />
              
              {/* Live Emulator Screen container */}
              <div className={`flex-1 rounded-[32px] overflow-y-auto relative flex flex-col p-4 z-10 transition-colors duration-300 ${currentTheme.bg}`}>
                
                {/* Simulated Content */}
                <div className="text-center pt-8 space-y-4">
                  <div className="inline-block px-3 py-0.5 bg-white/70 rounded-full border border-blush-200/20 text-[7px] font-bold text-rosegold-400 tracking-wider">
                    WEDDING CELEBRATION
                  </div>
                  
                  <h1 
                    className="text-2xl font-black text-elegant leading-none"
                    style={{ fontFamily: fontFamily }}
                  >
                    {bride.nickname} & {groom.nickname}
                  </h1>
                  
                  <p className="text-[8px] text-elegant/70 tracking-widest uppercase font-semibold">
                    Are getting married!
                  </p>

                  <div className="w-full bg-white/60 p-3 rounded-2xl border border-blush-100/30 text-center space-y-1 my-3">
                    <Calendar className="w-4 h-4 text-rosegold-400 mx-auto" />
                    <span className="text-[7px] text-elegant/50 uppercase font-bold tracking-wider block">Lock the Date</span>
                    <p className="text-[9px] font-bold text-elegant leading-none">
                      {new Date(weddingDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </p>
                    <p className="text-[8px] text-rosegold-400 font-semibold leading-none mt-1">Amanjiwo Luxury Resort</p>
                  </div>

                  {/* Story */}
                  <div className="text-left space-y-1">
                    <span className="text-[7px] text-rosegold-400 uppercase font-bold tracking-wider block">Our Story</span>
                    <p className="text-[8.5px] text-elegant/80 leading-relaxed italic border-l-2 border-blush-200 pl-2">
                      "{storyText.substring(0, 160)}..."
                    </p>
                  </div>

                  {/* Map Pin Mockup */}
                  <div className="w-full h-16 rounded-xl bg-slate-100 flex items-center justify-center text-[9px] font-semibold text-elegant border border-blush-100 relative overflow-hidden mt-3">
                    <MapPin className="w-4 h-4 text-rose-500 absolute mr-1 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />
                    <span className="z-10 bg-white/90 px-2 py-0.5 rounded border border-blush-100 mt-6 text-[7px]">Open Google Maps</span>
                  </div>

                  {/* Live Emulator RSVP Form */}
                  <form onSubmit={handleEmulatorRsvpSubmit} className="bg-white/80 p-3 rounded-2xl border border-blush-200/20 text-left space-y-2 mt-4">
                    <span className="text-[8px] text-rosegold-400 uppercase font-bold tracking-wider block">Confirm Attendance</span>
                    
                    {emulatorSubmitted ? (
                      <div className="text-center py-2 text-emerald-600 font-bold text-[9px] flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>RSVP Sent! Syncing...</span>
                      </div>
                    ) : (
                      <>
                        <select
                          value={emulatorRsvp}
                          onChange={(e) => setEmulatorRsvp(e.target.value as any)}
                          className="w-full bg-white border border-blush-200/20 rounded px-2 py-1 text-[8.5px] text-elegant focus:outline-none"
                        >
                          <option value="Attending">Attending (Confirm Confidentially)</option>
                          <option value="Declined">Declined (With Apologies)</option>
                        </select>
                        <button
                          type="submit"
                          className="w-full bg-rosegold-400 text-white rounded py-1.5 text-[8.5px] font-bold shadow hover:bg-rosegold-500 transition-colors"
                        >
                          Submit RSVP Confirmation
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>

              {/* iPhone Home Bar */}
              <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2 z-20 shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT GUEST MODAL */}
      <AnimatePresence>
        {showGuestModal && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm glass rounded-3xl p-6 shadow-2xl border border-blush-200 bg-white"
            >
              <button 
                onClick={resetGuestForm}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blush-100/40 text-elegant/60 hover:text-elegant"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-black text-elegant mb-4">
                {editingGuestId ? 'Modify Guest Details' : 'Track New Invitee Guest'}
              </h3>

              <form onSubmit={handleGuestSubmit} className="space-y-4">
                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    placeholder="Prof. Irfan, Maulana & spouse..."
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Phone Contact</label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+62 8..."
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Guest Category</label>
                    <select
                      value={guestGroup}
                      onChange={(e) => setGuestGroup(e.target.value as any)}
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                    >
                      <option value="VIP">VIP Guest</option>
                      <option value="Family">Family Circle</option>
                      <option value="Friends">Friends Circle</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">RSVP Status</label>
                    <select
                      value={guestRsvp}
                      onChange={(e) => setGuestRsvp(e.target.value as any)}
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                    >
                      <option value="Pending">Pending Response</option>
                      <option value="Attending">Attending</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Home Address</label>
                    <input
                      type="text"
                      value={guestAddr}
                      onChange={(e) => setGuestAddr(e.target.value)}
                      placeholder="Menteng Road No. 42..."
                      className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2.5 text-xs text-elegant focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase font-bold text-elegant/60 tracking-wider block mb-1">Additional Notes</label>
                  <textarea
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    placeholder="Low sodium diets, speech schedule, flower board request..."
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[50px] resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetGuestForm}
                    className="flex-1 py-3 glass text-elegant rounded-xl text-xs font-bold border border-blush-200/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-rosegold-400 hover:bg-rosegold-500 text-white rounded-xl text-xs font-bold transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Guest</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WHATSAPP LINK SHARE MODAL */}
      <AnimatePresence>
        {shareGuest && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm glass rounded-3xl p-6 shadow-2xl border border-blush-200 bg-white"
            >
              <button 
                onClick={() => setShareGuest(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-blush-100/40 text-elegant/60 hover:text-elegant"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-black text-elegant mb-3">
                Generate Digital RSVP Link
              </h3>
              
              <div className="p-3 bg-cream-50 rounded-2xl border border-blush-200/20 text-xs text-elegant/80 leading-relaxed mb-4">
                <span className="font-extrabold text-[9px] uppercase tracking-wider text-rosegold-400 block mb-1">Pre-filled Invitation Text</span>
                "Hi {shareGuest.name}! 💖 We are happy to invite you to celebrate our wedding. Ronal & Lidya are getting married at Amanjiwo Resort on May 27, 2027. View details and confirm your RSVP here..."
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Hi ${shareGuest.name}! 💖 Ronal & Lidya invite you to celebrate our wedding. View details & confirm RSVP: https://ayunikah.vercel.app/invite?id=demo-couple-123`);
                    setShareGuest(null);
                  }}
                  className="flex-1 py-3 glass text-elegant rounded-xl text-xs font-bold border border-blush-200/20"
                >
                  Copy Text
                </button>
                <a
                  href={generateWhatsAppMessage(shareGuest)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShareGuest(null)}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow flex items-center justify-center gap-1.5 text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default InvitationPage;
