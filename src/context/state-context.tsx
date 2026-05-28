"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Profile,
  BudgetItem,
  Course,
  Invitee,
  InvitationSettings,
  initialGroomProfile,
  initialBrideProfile,
  initialBudgetItems,
  initialCourses,
  initialInvitees,
  initialInvitationSettings
} from '../lib/mockData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useAuth } from './auth-context';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: 'budget' | 'course' | 'invitee' | 'system';
}

interface StateContextType {
  groom: Profile;
  bride: Profile;
  budgetItems: BudgetItem[];
  courses: Course[];
  invitees: Invitee[];
  invitation: InvitationSettings;
  weddingDate: string;
  notifications: NotificationItem[];
  updateGroom: (profile: Partial<Profile>) => void;
  updateBride: (profile: Partial<Profile>) => void;
  setWeddingDate: (date: string) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;
  toggleLesson: (courseId: string, lessonId: string) => void;
  addInvitee: (invitee: Omit<Invitee, 'id'>) => void;
  updateInvitee: (id: string, updates: Partial<Invitee>) => void;
  deleteInvitee: (id: string) => void;
  updateInvitation: (updates: Partial<InvitationSettings>) => void;
  confirmInvitation: () => void;
  addNotification: (title: string, desc: string, type: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;
  budgetProgress: number;
  coursesProgress: number;
  profilesProgress: number;
  overallProgress: number;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const profileFromRow = (row: any, fallback: Profile): Profile => ({
  fullName: row?.full_name ?? fallback.fullName,
  nickname: row?.nickname ?? fallback.nickname,
  birthDate: row?.birth_date ?? fallback.birthDate,
  occupation: row?.occupation ?? fallback.occupation,
  address: row?.address ?? fallback.address,
  phone: row?.phone ?? fallback.phone,
  socialMedia: row?.social_media ?? fallback.socialMedia,
  notes: row?.notes ?? fallback.notes,
  photoUrl: row?.photo_url ?? fallback.photoUrl,
});

const profileToRow = (profile: Profile, coupleId: string, role: 'groom' | 'bride') => ({
  couple_id: coupleId,
  role,
  full_name: profile.fullName,
  nickname: profile.nickname,
  birth_date: profile.birthDate,
  occupation: profile.occupation,
  address: profile.address,
  phone: profile.phone,
  social_media: profile.socialMedia,
  notes: profile.notes,
  photo_url: profile.photoUrl,
});

const budgetFromRow = (row: any): BudgetItem => ({
  id: row.id,
  itemName: row.item_name,
  category: row.budget_categories?.name ?? 'Other',
  estimatedBudget: Number(row.estimated_budget ?? 0),
  actualBudget: Number(row.actual_budget ?? 0),
  status: row.status ?? 'Unpaid',
  dueDate: row.due_date ?? new Date().toISOString().split('T')[0],
  notes: row.notes ?? '',
});

const budgetToRow = (item: Omit<BudgetItem, 'id'> | BudgetItem, coupleId: string, categoryIds: Record<string, string>) => ({
  couple_id: coupleId,
  category_id: categoryIds[item.category] ?? null,
  item_name: item.itemName,
  estimated_budget: item.estimatedBudget,
  actual_budget: item.actualBudget,
  status: item.status,
  due_date: item.dueDate,
  notes: item.notes,
});

const inviteeFromRow = (row: any): Invitee => ({
  id: row.id,
  name: row.name,
  phone: row.phone ?? '',
  address: row.address ?? '',
  rsvpStatus: row.rsvp_status ?? 'Pending',
  attendanceStatus: row.attendance_status ?? 'Unconfirmed',
  group: row.group_name ?? 'Friends',
  notes: row.notes ?? '',
});

const inviteeToRow = (invitee: Omit<Invitee, 'id'> | Invitee, coupleId: string) => ({
  couple_id: coupleId,
  name: invitee.name,
  phone: invitee.phone,
  address: invitee.address,
  rsvp_status: invitee.rsvpStatus,
  attendance_status: invitee.attendanceStatus,
  group_name: invitee.group,
  notes: invitee.notes,
});

const invitationFromRow = (row: any, fallback: InvitationSettings): InvitationSettings => ({
  theme: row?.theme ?? fallback.theme,
  primaryColor: row?.primary_color ?? fallback.primaryColor,
  fontFamily: row?.font_family ?? fallback.fontFamily,
  backgroundMusic: row?.background_music ?? fallback.backgroundMusic,
  musicUrl: row?.music_url ?? fallback.musicUrl,
  story: row?.story ?? fallback.story,
  confirmed: row?.confirmed ?? fallback.confirmed,
});

const invitationToRow = (settings: InvitationSettings, coupleId: string) => ({
  couple_id: coupleId,
  theme: settings.theme,
  primary_color: settings.primaryColor,
  font_family: settings.fontFamily,
  background_music: settings.backgroundMusic,
  music_url: settings.musicUrl,
  story: settings.story,
  confirmed: settings.confirmed,
});

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [categoryIds, setCategoryIds] = useState<Record<string, string>>({});
  const [groom, setGroom] = useState<Profile>(initialGroomProfile);
  const [bride, setBride] = useState<Profile>(initialBrideProfile);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [invitees, setInvitees] = useState<Invitee[]>(initialInvitees);
  const [invitation, setInvitation] = useState<InvitationSettings>(initialInvitationSettings);
  const [weddingDate, setWeddingDateState] = useState<string>("2027-05-27");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const localKey = (key: string) => user ? `ayunikah_${user.id}_${key}` : `ayunikah_guest_${key}`;

  const getLocal = <T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  };

  const saveLocal = (key: string, data: unknown) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const loadLocalState = () => {
    setGroom(getLocal(localKey('groom'), initialGroomProfile));
    setBride(getLocal(localKey('bride'), initialBrideProfile));
    setBudgetItems(getLocal(localKey('budget'), initialBudgetItems));
    setCourses(getLocal(localKey('courses'), initialCourses));
    setInvitees(getLocal(localKey('invitees'), initialInvitees));
    setInvitation(getLocal(localKey('invitation'), initialInvitationSettings));
    setWeddingDateState(getLocal(localKey('wedding_date'), "2027-05-27"));
    setNotifications(getLocal(localKey('notifications'), [{
      id: "n-start",
      title: "Welcome to Ayunikah!",
      description: "Your Supabase-ready marriage preparation dashboard is ready.",
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      isRead: false,
      type: "system"
    }]));
  };

  useEffect(() => {
    const loadSupabaseState = async () => {
      if (!isSupabaseConfigured || !supabase || !user) {
        loadLocalState();
        return;
      }

      await supabase.from('users').upsert({ id: user.id, email: user.email });

      const { data: existingCouple } = await supabase
        .from('couples')
        .select('id,wedding_date')
        .eq('user_id', user.id)
        .maybeSingle();

      const couple = existingCouple ?? (await supabase
        .from('couples')
        .insert({ user_id: user.id, wedding_date: "2027-05-27" })
        .select('id,wedding_date')
        .single()).data;

      if (!couple) return;

      setCoupleId(couple.id);
      setWeddingDateState(couple.wedding_date ?? "2027-05-27");

      const { data: categories } = await supabase.from('budget_categories').select('id,name');
      const ids = Object.fromEntries((categories ?? []).map((cat: any) => [cat.name, cat.id]));
      setCategoryIds(ids);

      const { data: profiles } = await supabase.from('profiles').select('*').eq('couple_id', couple.id);
      const groomRow = profiles?.find((profile: any) => profile.role === 'groom');
      const brideRow = profiles?.find((profile: any) => profile.role === 'bride');

      if (groomRow) setGroom(profileFromRow(groomRow, initialGroomProfile));
      if (brideRow) setBride(profileFromRow(brideRow, initialBrideProfile));
      if (!groomRow) {
        setGroom(initialGroomProfile);
        await supabase.from('profiles').insert(profileToRow(initialGroomProfile, couple.id, 'groom'));
      }
      if (!brideRow) {
        setBride(initialBrideProfile);
        await supabase.from('profiles').insert(profileToRow(initialBrideProfile, couple.id, 'bride'));
      }

      const { data: budgetRows } = await supabase
        .from('budget_items')
        .select('*,budget_categories(name)')
        .eq('couple_id', couple.id)
        .order('due_date');
      if (budgetRows?.length) setBudgetItems(budgetRows.map(budgetFromRow));

      const { data: inviteeRows } = await supabase.from('invitees').select('*').eq('couple_id', couple.id).order('created_at');
      if (inviteeRows?.length) setInvitees(inviteeRows.map(inviteeFromRow));

      const { data: invitationRow } = await supabase.from('invitations').select('*').eq('couple_id', couple.id).maybeSingle();
      if (invitationRow) {
        setInvitation(invitationFromRow(invitationRow, initialInvitationSettings));
      } else {
        await supabase.from('invitations').insert(invitationToRow(initialInvitationSettings, couple.id));
      }

      setCourses(getLocal(localKey('courses'), initialCourses));
      setNotifications(getLocal(localKey('notifications'), []));
    };

    loadSupabaseState();
  }, [user]);

  const addNotification = (title: string, description: string, type: NotificationItem['type']) => {
    const newItem: NotificationItem = {
      id: `n-${Date.now()}`,
      title,
      description,
      timestamp: new Date().toLocaleString(),
      isRead: false,
      type
    };
    setNotifications(prev => {
      const updated = [newItem, ...prev].slice(0, 20);
      saveLocal(localKey('notifications'), updated);
      return updated;
    });
  };

  const updateGroom = (updates: Partial<Profile>) => {
    setGroom(prev => {
      const updated = { ...prev, ...updates };
      saveLocal(localKey('groom'), updated);
      if (isSupabaseConfigured && supabase && coupleId) {
        void supabase.from('profiles').upsert(profileToRow(updated, coupleId, 'groom'), { onConflict: 'couple_id,role' });
      }
      return updated;
    });
    addNotification("Groom Profile Updated", "The groom profile has been refreshed.", "system");
  };

  const updateBride = (updates: Partial<Profile>) => {
    setBride(prev => {
      const updated = { ...prev, ...updates };
      saveLocal(localKey('bride'), updated);
      if (isSupabaseConfigured && supabase && coupleId) {
        void supabase.from('profiles').upsert(profileToRow(updated, coupleId, 'bride'), { onConflict: 'couple_id,role' });
      }
      return updated;
    });
    addNotification("Bride Profile Updated", "The bride profile has been refreshed.", "system");
  };

  const setWeddingDate = (date: string) => {
    setWeddingDateState(date);
    saveLocal(localKey('wedding_date'), date);
    if (isSupabaseConfigured && supabase && coupleId) {
      void supabase.from('couples').update({ wedding_date: date }).eq('id', coupleId);
    }
    addNotification("Wedding Date Rescheduled", `Your romantic date is now locked in for ${new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' })}.`, "system");
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem = { ...item, id: `b-${Date.now()}` };
    setBudgetItems(prev => {
      const updated = [...prev, newItem];
      saveLocal(localKey('budget'), updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase && coupleId) {
      void supabase.from('budget_items').insert(budgetToRow(item, coupleId, categoryIds)).select('*,budget_categories(name)').single().then(({ data }) => {
        if (data) setBudgetItems(prev => prev.map(existing => existing.id === newItem.id ? budgetFromRow(data) : existing));
      });
    }

    addNotification("New Budget Item Added", `"${item.itemName}" added under ${item.category}.`, "budget");
  };

  const updateBudgetItem = (id: string, updates: Partial<BudgetItem>) => {
    setBudgetItems(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...updates } : item);
      saveLocal(localKey('budget'), updated);
      const target = updated.find(item => item.id === id);
      if (target && isSupabaseConfigured && supabase && coupleId) {
        void supabase.from('budget_items').update(budgetToRow(target, coupleId, categoryIds)).eq('id', id);
      }
      return updated;
    });
    if (updates.status) addNotification("Budget Item Status Changed", "A budget status was updated and synced.", "budget");
  };

  const deleteBudgetItem = (id: string) => {
    const target = budgetItems.find(item => item.id === id);
    setBudgetItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveLocal(localKey('budget'), updated);
      return updated;
    });
    if (isSupabaseConfigured && supabase) void supabase.from('budget_items').delete().eq('id', id);
    if (target) addNotification("Budget Item Removed", `"${target.itemName}" was deleted from your budget sheets.`, "budget");
  };

  const toggleLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => {
      const updated = prev.map(course => {
        if (course.id !== courseId) return course;
        const updatedLessons = course.lessons.map(lesson => lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson);
        const isAllLessonsCompleted = updatedLessons.every(lesson => lesson.completed);
        if (isAllLessonsCompleted && !course.completed) {
          setTimeout(() => addNotification("Course Accomplished!", `Excellent progress! You completed "${course.title}".`, "course"), 100);
        }
        return { ...course, lessons: updatedLessons, completed: isAllLessonsCompleted };
      });
      saveLocal(localKey('courses'), updated);
      return updated;
    });
  };

  const addInvitee = (item: Omit<Invitee, 'id'>) => {
    const newItem = { ...item, id: `i-${Date.now()}` };
    setInvitees(prev => {
      const updated = [...prev, newItem];
      saveLocal(localKey('invitees'), updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase && coupleId) {
      void supabase.from('invitees').insert(inviteeToRow(item, coupleId)).select('*').single().then(({ data }) => {
        if (data) setInvitees(prev => prev.map(existing => existing.id === newItem.id ? inviteeFromRow(data) : existing));
      });
    }

    addNotification("New Guest Added", `${item.name} has been added to your invitation guest list.`, "invitee");
  };

  const updateInvitee = (id: string, updates: Partial<Invitee>) => {
    setInvitees(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...updates } : item);
      saveLocal(localKey('invitees'), updated);
      const target = updated.find(item => item.id === id);
      if (target && isSupabaseConfigured && supabase && coupleId) {
        void supabase.from('invitees').update(inviteeToRow(target, coupleId)).eq('id', id);
      }
      return updated;
    });
    if (updates.rsvpStatus) addNotification("RSVP Status Updated", `A guest marked response as ${updates.rsvpStatus}.`, "invitee");
  };

  const deleteInvitee = (id: string) => {
    const target = invitees.find(item => item.id === id);
    setInvitees(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveLocal(localKey('invitees'), updated);
      return updated;
    });
    if (isSupabaseConfigured && supabase) void supabase.from('invitees').delete().eq('id', id);
    if (target) addNotification("Guest Removed", `${target.name} was removed from the list.`, "invitee");
  };

  const updateInvitation = (updates: Partial<InvitationSettings>) => {
    setInvitation(prev => {
      const updated = { ...prev, ...updates };
      saveLocal(localKey('invitation'), updated);
      if (isSupabaseConfigured && supabase && coupleId) {
        void supabase.from('invitations').upsert(invitationToRow(updated, coupleId), { onConflict: 'couple_id' });
      }
      return updated;
    });
  };

  const confirmInvitation = () => {
    updateInvitation({ confirmed: true });
    addNotification("Invitation Builder Locked!", "Your digital invitation build is confirmed and synced with Main Board.", "system");
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      saveLocal('ayunikah_notifications', updated);
      return updated;
    });
  };

  const paidCount = budgetItems.filter(i => i.status === 'Paid' || i.status === 'Deposit Paid').length;
  const budgetProgress = budgetItems.length > 0 ? (paidCount / budgetItems.length) * 100 : 0;
  const totalLessons = courses.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const completedLessons = courses.reduce((acc, curr) => acc + curr.lessons.filter(l => l.completed).length, 0);
  const coursesProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const groomFields = [groom.fullName, groom.nickname, groom.address, groom.phone, groom.socialMedia, groom.notes].filter(Boolean).length;
  const brideFields = [bride.fullName, bride.nickname, bride.address, bride.phone, bride.socialMedia, bride.notes].filter(Boolean).length;
  const profilesProgress = ((groomFields + brideFields) / 12) * 100;
  const invitationProgress = invitation.confirmed ? 100 : 0;
  const overallProgress = (budgetProgress * 0.3) + (coursesProgress * 0.35) + (invitationProgress * 0.2) + (profilesProgress * 0.15);

  return (
    <StateContext.Provider value={{
      groom, bride, budgetItems, courses, invitees, invitation, weddingDate, notifications,
      updateGroom, updateBride, setWeddingDate,
      addBudgetItem, updateBudgetItem, deleteBudgetItem,
      toggleLesson,
      addInvitee, updateInvitee, deleteInvitee,
      updateInvitation, confirmInvitation,
      addNotification, markNotificationsAsRead,
      budgetProgress, coursesProgress, profilesProgress, overallProgress
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useMarriageState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useMarriageState must be used within a StateProvider');
  }
  return context;
};
