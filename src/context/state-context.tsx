"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  
  // Budget CRUD
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;
  
  // Courses Toggles
  toggleLesson: (courseId: string, lessonId: string) => void;
  
  // Invitees CRUD
  addInvitee: (invitee: Omit<Invitee, 'id'>) => void;
  updateInvitee: (id: string, updates: Partial<Invitee>) => void;
  deleteInvitee: (id: string) => void;
  
  // Invitation CRUD
  updateInvitation: (updates: Partial<InvitationSettings>) => void;
  confirmInvitation: () => void;
  
  // Notification controls
  addNotification: (title: string, desc: string, type: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;
  
  // Calculated metrics
  budgetProgress: number;
  coursesProgress: number;
  profilesProgress: number;
  overallProgress: number;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load state from localStorage or fallback to initial mocks
  const [groom, setGroom] = useState<Profile>(initialGroomProfile);
  const [bride, setBride] = useState<Profile>(initialBrideProfile);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [invitees, setInvitees] = useState<Invitee[]>(initialInvitees);
  const [invitation, setInvitation] = useState<InvitationSettings>(initialInvitationSettings);
  const [weddingDate, setWeddingDateState] = useState<string>("2027-05-27");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // Sync keys in localStorage
    const getLocal = <T,>(key: string, fallback: T): T => {
      if (typeof window !== 'undefined') {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      }
      return fallback;
    };
    
    setGroom(getLocal('ayunikah_groom', initialGroomProfile));
    setBride(getLocal('ayunikah_bride', initialBrideProfile));
    setBudgetItems(getLocal('ayunikah_budget', initialBudgetItems));
    setCourses(getLocal('ayunikah_courses', initialCourses));
    setInvitees(getLocal('ayunikah_invitees', initialInvitees));
    setInvitation(getLocal('ayunikah_invitation', initialInvitationSettings));
    setWeddingDateState(getLocal('ayunikah_wedding_date', "2027-05-27"));
    setNotifications(getLocal('ayunikah_notifications', [
      {
        id: "n-start",
        title: "Welcome to Ayunikah!",
        description: "Your luxurious, smart marriage preparation dashboard is ready. Begin organizing your dream future together.",
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
        isRead: false,
        type: "system"
      }
    ]));
  }, []);

  const saveLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

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
      const updated = [newItem, ...prev].slice(0, 20); // Keep max 20
      saveLocal('ayunikah_notifications', updated);
      return updated;
    });
  };

  const updateGroom = (updates: Partial<Profile>) => {
    setGroom(prev => {
      const updated = { ...prev, ...updates };
      saveLocal('ayunikah_groom', updated);
      return updated;
    });
    addNotification("Groom Profile Updated", "The details for Groom Ronal have been refreshed.", "system");
  };

  const updateBride = (updates: Partial<Profile>) => {
    setBride(prev => {
      const updated = { ...prev, ...updates };
      saveLocal('ayunikah_bride', updated);
      return updated;
    });
    addNotification("Bride Profile Updated", "The details for Bride Lidya have been refreshed.", "system");
  };

  const setWeddingDate = (date: string) => {
    setWeddingDateState(date);
    saveLocal('ayunikah_wedding_date', date);
    addNotification("Wedding Date Rescheduled", `Your romantic date is now locked in for ${new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' })}.`, "system");
  };

  // Budget CRUD
  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem = { ...item, id: `b-${Date.now()}` };
    setBudgetItems(prev => {
      const updated = [...prev, newItem];
      saveLocal('ayunikah_budget', updated);
      return updated;
    });
    addNotification("New Budget Item Added", `"${item.itemName}" added under ${item.category}.`, "budget");
  };

  const updateBudgetItem = (id: string, updates: Partial<BudgetItem>) => {
    setBudgetItems(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...updates } : item);
      saveLocal('ayunikah_budget', updated);
      
      // Notify if status changed
      if (updates.status) {
        const target = prev.find(i => i.id === id);
        if (target) {
          addNotification("Budget Item Status Changed", `"${target.itemName}" is now marked as ${updates.status}.`, "budget");
        }
      }
      return updated;
    });
  };

  const deleteBudgetItem = (id: string) => {
    const target = budgetItems.find(i => i.id === id);
    setBudgetItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveLocal('ayunikah_budget', updated);
      return updated;
    });
    if (target) {
      addNotification("Budget Item Removed", `"${target.itemName}" was deleted from your budget sheets.`, "budget");
    }
  };

  // Course Actions
  const toggleLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => {
      const updated = prev.map(course => {
        if (course.id !== courseId) return course;
        
        const updatedLessons = course.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
        );
        
        const isAllLessonsCompleted = updatedLessons.every(l => l.completed);
        
        if (isAllLessonsCompleted && !course.completed) {
          // Fire notification asynchronously to avoid updates during render
          setTimeout(() => {
            addNotification("Course Accomplished! 🎉", `Excellent progress! You have completed the entire course: "${course.title}".`, "course");
          }, 100);
        }
        
        return {
          ...course,
          lessons: updatedLessons,
          completed: isAllLessonsCompleted
        };
      });
      
      saveLocal('ayunikah_courses', updated);
      return updated;
    });
  };

  // Invitees CRUD
  const addInvitee = (item: Omit<Invitee, 'id'>) => {
    const newItem = { ...item, id: `i-${Date.now()}` };
    setInvitees(prev => {
      const updated = [...prev, newItem];
      saveLocal('ayunikah_invitees', updated);
      return updated;
    });
    addNotification("New Guest Added", `${item.name} has been added to your invitation guest list.`, "invitee");
  };

  const updateInvitee = (id: string, updates: Partial<Invitee>) => {
    setInvitees(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, ...updates } : item);
      saveLocal('ayunikah_invitees', updated);
      
      // Notify on RSVP updates
      if (updates.rsvpStatus) {
        const target = prev.find(i => i.id === id);
        if (target) {
          addNotification("RSVP Status Updated", `${target.name} marked response as ${updates.rsvpStatus}.`, "invitee");
        }
      }
      return updated;
    });
  };

  const deleteInvitee = (id: string) => {
    const target = invitees.find(i => i.id === id);
    setInvitees(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveLocal('ayunikah_invitees', updated);
      return updated;
    });
    if (target) {
      addNotification("Guest Removed", `${target.name} was removed from the list.`, "invitee");
    }
  };

  // Invitation
  const updateInvitation = (updates: Partial<InvitationSettings>) => {
    setInvitation(prev => {
      const updated = { ...prev, ...updates };
      saveLocal('ayunikah_invitation', updated);
      return updated;
    });
  };

  const confirmInvitation = () => {
    setInvitation(prev => {
      const updated = { ...prev, confirmed: true };
      saveLocal('ayunikah_invitation', updated);
      return updated;
    });
    addNotification("Invitation Builder Locked! 💖", "Your digital invitation build is confirmed. It is now open for RSVPs and synced with Main Board.", "system");
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      saveLocal('ayunikah_notifications', updated);
      return updated;
    });
  };

  // CALCULATE PROGRESS METRICS Dynamically
  
  // 1. Budget progress: Paid / Deposit items vs total tracked
  const paidCount = budgetItems.filter(i => i.status === 'Paid' || i.status === 'Deposit Paid').length;
  const budgetProgress = budgetItems.length > 0 ? (paidCount / budgetItems.length) * 100 : 0;

  // 2. Course progress: total lessons completed / total lessons
  const totalLessons = courses.reduce((acc, curr) => acc + curr.lessons.length, 0);
  const completedLessons = courses.reduce((acc, curr) => acc + curr.lessons.filter(l => l.completed).length, 0);
  const coursesProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // 3. Profiles progress: percent of fields with values
  const groomFields = [groom.fullName, groom.nickname, groom.address, groom.phone, groom.socialMedia, groom.notes].filter(Boolean).length;
  const brideFields = [bride.fullName, bride.nickname, bride.address, bride.phone, bride.socialMedia, bride.notes].filter(Boolean).length;
  const profilesProgress = ((groomFields + brideFields) / 12) * 100;

  // 4. Overall Progress: Weighted sum
  // Budget = 30%, Courses = 35%, Invitation Locked = 20%, Profiles = 15%
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
