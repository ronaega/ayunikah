"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserSquare2, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Hash, 
  PenTool, 
  Save, 
  Edit3, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';

export const ProfilePage: React.FC = () => {
  const { groom, bride, updateGroom, updateBride } = useMarriageState();

  const [isEditingGroom, setIsEditingGroom] = useState(false);
  const [isEditingBride, setIsEditingBride] = useState(false);

  // Groom Form States
  const [groomName, setGroomName] = useState(groom.fullName);
  const [groomNick, setGroomNick] = useState(groom.nickname);
  const [groomBirth, setGroomBirth] = useState(groom.birthDate);
  const [groomOcc, setGroomOcc] = useState(groom.occupation);
  const [groomAddr, setGroomAddr] = useState(groom.address);
  const [groomPhone, setGroomPhone] = useState(groom.phone);
  const [groomSocial, setGroomSocial] = useState(groom.socialMedia);
  const [groomNotes, setGroomNotes] = useState(groom.notes);

  // Bride Form States
  const [brideName, setBrideName] = useState(bride.fullName);
  const [brideNick, setBrideNick] = useState(bride.nickname);
  const [brideBirth, setBrideBirth] = useState(bride.birthDate);
  const [brideOcc, setBrideOcc] = useState(bride.occupation);
  const [brideAddr, setBrideAddr] = useState(bride.address);
  const [bridePhone, setBridePhone] = useState(bride.phone);
  const [brideSocial, setBrideSocial] = useState(bride.socialMedia);
  const [brideNotes, setBrideNotes] = useState(bride.notes);

  const handleSaveGroom = () => {
    updateGroom({
      fullName: groomName,
      nickname: groomNick,
      birthDate: groomBirth,
      occupation: groomOcc,
      address: groomAddr,
      phone: groomPhone,
      socialMedia: groomSocial,
      notes: groomNotes
    });
    setIsEditingGroom(false);
  };

  const handleSaveBride = () => {
    updateBride({
      fullName: brideName,
      nickname: brideNick,
      birthDate: brideBirth,
      occupation: brideOcc,
      address: brideAddr,
      phone: bridePhone,
      socialMedia: brideSocial,
      notes: brideNotes
    });
    setIsEditingBride(false);
  };

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Banner */}
      <div className="glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30">
        <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
          Romantic Dual Identity
        </span>
        <h2 className="text-xl font-black text-elegant mt-2">Personal Profiles Workspace</h2>
        <p className="text-xs text-elegant/75 mt-1.5 leading-relaxed">
          Nurture your individual vows and coordinates. These custom profiles are fully integrated and showcase details gracefully in digital invitations.
        </p>
      </div>

      {/* Dual Column Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GROOM COLUMN */}
        <motion.div 
          className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col relative"
          layout
        >
          <div className="absolute top-6 right-6 z-10">
            {isEditingGroom ? (
              <button
                onClick={handleSaveGroom}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold shadow flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditingGroom(true)}
                className="px-4 py-2 glass text-elegant hover:bg-blush-100/25 rounded-xl text-[10px] font-bold border border-blush-200/30 flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-rosegold-400" />
                <span>Edit Details</span>
              </button>
            )}
          </div>

          {/* Groom Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-blush-200/20 pb-5">
            <img 
              src={groom.photoUrl} 
              alt={groom.nickname}
              className="w-20 h-20 rounded-2xl object-cover border border-blush-100 shadow-md"
            />
            <div className="text-center sm:text-left">
              <span className="text-[9px] uppercase font-semibold text-rosegold-400 tracking-wider">The Groom</span>
              <h3 className="text-lg font-black text-elegant leading-none mt-1">{groom.fullName}</h3>
              <p className="text-xs text-elegant/60 mt-1">{groom.occupation}</p>
            </div>
          </div>

          {/* Groom Fields Form */}
          <div className="mt-6 space-y-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Full Name</label>
                {isEditingGroom ? (
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{groom.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Nickname</label>
                {isEditingGroom ? (
                  <input
                    type="text"
                    value={groomNick}
                    onChange={(e) => setGroomNick(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{groom.nickname}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Date of Birth</label>
                {isEditingGroom ? (
                  <input
                    type="date"
                    value={groomBirth}
                    onChange={(e) => setGroomBirth(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{new Date(groom.birthDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                )}
              </div>

              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Occupation</label>
                {isEditingGroom ? (
                  <input
                    type="text"
                    value={groomOcc}
                    onChange={(e) => setGroomOcc(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{groom.occupation}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Contact Phone</label>
              {isEditingGroom ? (
                <input
                  type="text"
                  value={groomPhone}
                  onChange={(e) => setGroomPhone(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                />
              ) : (
                <p className="text-xs text-elegant font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rosegold-400" />
                  {groom.phone}
                </p>
              )}
            </div>

            <div>
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Home Address</label>
              {isEditingGroom ? (
                <textarea
                  value={groomAddr}
                  onChange={(e) => setGroomAddr(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[50px] resize-none"
                />
              ) : (
                <p className="text-xs text-elegant font-bold flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                  {groom.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Social Media</label>
                {isEditingGroom ? (
                  <input
                    type="text"
                    value={groomSocial}
                    onChange={(e) => setGroomSocial(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-rosegold-400" />
                    {groom.socialMedia}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-blush-200/10 pt-4">
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1 flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5 text-rosegold-400" />
                Vows / Personal Notes
              </label>
              {isEditingGroom ? (
                <textarea
                  value={groomNotes}
                  onChange={(e) => setGroomNotes(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[80px]"
                />
              ) : (
                <p className="text-xs text-elegant/80 leading-relaxed italic">
                  "{groom.notes}"
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* BRIDE COLUMN */}
        <motion.div 
          className="glass rounded-3xl p-6 border border-blush-200/30 bg-white/40 flex flex-col relative"
          layout
        >
          <div className="absolute top-6 right-6 z-10">
            {isEditingBride ? (
              <button
                onClick={handleSaveBride}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold shadow flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditingBride(true)}
                className="px-4 py-2 glass text-elegant hover:bg-blush-100/25 rounded-xl text-[10px] font-bold border border-blush-200/30 flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-rosegold-400" />
                <span>Edit Details</span>
              </button>
            )}
          </div>

          {/* Bride Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-blush-200/20 pb-5">
            <img 
              src={bride.photoUrl} 
              alt={bride.nickname}
              className="w-20 h-20 rounded-2xl object-cover border border-blush-100 shadow-md"
            />
            <div className="text-center sm:text-left">
              <span className="text-[9px] uppercase font-semibold text-rosegold-400 tracking-wider">The Bride</span>
              <h3 className="text-lg font-black text-elegant leading-none mt-1">{bride.fullName}</h3>
              <p className="text-xs text-elegant/60 mt-1">{bride.occupation}</p>
            </div>
          </div>

          {/* Bride Fields Form */}
          <div className="mt-6 space-y-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Full Name</label>
                {isEditingBride ? (
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{bride.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Nickname</label>
                {isEditingBride ? (
                  <input
                    type="text"
                    value={brideNick}
                    onChange={(e) => setBrideNick(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{bride.nickname}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Date of Birth</label>
                {isEditingBride ? (
                  <input
                    type="date"
                    value={brideBirth}
                    onChange={(e) => setBrideBirth(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{new Date(bride.birthDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                )}
              </div>

              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Occupation</label>
                {isEditingBride ? (
                  <input
                    type="text"
                    value={brideOcc}
                    onChange={(e) => setBrideOcc(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold">{bride.occupation}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Contact Phone</label>
              {isEditingBride ? (
                <input
                  type="text"
                  value={bridePhone}
                  onChange={(e) => setBridePhone(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                />
              ) : (
                <p className="text-xs text-elegant font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rosegold-400" />
                  {bride.phone}
                </p>
              )}
            </div>

            <div>
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Home Address</label>
              {isEditingBride ? (
                <textarea
                  value={brideAddr}
                  onChange={(e) => setBrideAddr(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[50px] resize-none"
                />
              ) : (
                <p className="text-xs text-elegant font-bold flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                  {bride.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1">Social Media</label>
                {isEditingBride ? (
                  <input
                    type="text"
                    value={brideSocial}
                    onChange={(e) => setBrideSocial(e.target.value)}
                    className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none"
                  />
                ) : (
                  <p className="text-xs text-elegant font-bold flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-rosegold-400" />
                    {bride.socialMedia}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-blush-200/10 pt-4">
              <label className="text-[9px] uppercase font-extrabold tracking-widest text-elegant/60 block mb-1 flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5 text-rosegold-400" />
                Vows / Personal Notes
              </label>
              {isEditingBride ? (
                <textarea
                  value={brideNotes}
                  onChange={(e) => setBrideNotes(e.target.value)}
                  className="w-full bg-white/70 dark:bg-elegant-800 border border-blush-200/30 focus:border-rosegold-400/50 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none min-h-[80px]"
                />
              ) : (
                <p className="text-xs text-elegant/80 leading-relaxed italic">
                  "{bride.notes}"
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default ProfilePage;
