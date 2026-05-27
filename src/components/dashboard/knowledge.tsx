"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  Smile, 
  Users, 
  Award,
  Sparkles,
  Trophy,
  HelpCircle,
  BookMarked,
  Hourglass
} from 'lucide-react';
import { useMarriageState } from '../../context/state-context';
import confetti from 'canvas-confetti';

export const KnowledgePage: React.FC = () => {
  const { courses, toggleLesson, coursesProgress } = useMarriageState();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Groom Only' | 'Bride Only' | 'Couple Together'>('All');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Trigger Confetti Celebration on Course Completion
  const triggerCelebration = (courseTitle: string) => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F7D6D0', '#C79B8B', '#DCCFED', '#F6C7B6', '#FFF8F1']
    });
  };

  const handleLessonToggle = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const targetLesson = course.lessons.find(l => l.id === lessonId);
    if (!targetLesson) return;

    // Check if this action will complete the course
    const uncompletedLessonsCount = course.lessons.filter(l => !l.completed).length;
    
    // Toggling the last uncompleted lesson to true triggers confetti!
    if (!targetLesson.completed && uncompletedLessonsCount === 1) {
      triggerCelebration(course.title);
    }

    toggleLesson(courseId, lessonId);
  };

  const filteredCourses = courses.filter(course => 
    activeCategory === 'All' || course.category === activeCategory
  );

  return (
    <div className="space-y-6 select-none animate-fade-in">
      {/* Banner */}
      <div className="glass rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-blush-100/40 via-cream-50/20 to-lavender-100/40 border border-blush-200/30">
        <span className="text-[10px] uppercase font-bold text-rosegold-400 tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-400" />
          Guided Wisdom
        </span>
        <h2 className="text-xl font-black text-elegant mt-2">Marriage Knowledge Academy</h2>
        <p className="text-xs text-elegant/75 mt-1">
          Nurture spiritual, financial, parenting, and emotional intimacy step-by-step together.
        </p>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(['All', 'Groom Only', 'Bride Only', 'Couple Together'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border ${
              activeCategory === cat
                ? 'bg-rosegold-400 border-rosegold-400 text-white shadow-md shadow-rosegold-200/20'
                : 'glass text-elegant hover:bg-blush-100/30 border-blush-200/30'
            }`}
          >
            {cat === 'All' ? 'All Curriculums' : cat}
          </button>
        ))}
      </div>

      {/* Course Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const completedCount = course.lessons.filter(l => l.completed).length;
          const totalCount = course.lessons.length;
          const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
          const isExpanded = expandedCourseId === course.id;

          return (
            <motion.div
              key={course.id}
              className={`glass rounded-3xl border overflow-hidden bg-white/40 flex flex-col justify-between transition-all duration-300 ${
                course.completed ? 'border-emerald-200/60 shadow shadow-emerald-50' : 'border-blush-200/30'
              }`}
              layout
            >
              {/* Card Main Block */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-blush-100/80 text-lg flex items-center justify-center shadow-inner">
                    {course.thumbnail}
                  </div>
                  
                  {course.completed ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase rounded-full flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-blush-50 text-rosegold-400 text-[9px] font-bold uppercase rounded-full border border-blush-100">
                      {course.category}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-elegant mt-4 leading-snug">{course.title}</h3>
                <p className="text-xs text-elegant/70 mt-2 leading-relaxed min-h-[50px]">{course.description}</p>
                
                {/* Progress bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-elegant/80">
                    <span>Lessons completion</span>
                    <span>{completedCount}/{totalCount} ({progressPercent.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-blush-100/30 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.completed ? 'bg-emerald-500' : 'bg-rosegold-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expander Button */}
              <div className="border-t border-blush-200/20 bg-blush-50/20 px-6 py-3 flex justify-between items-center no-print">
                <span className="text-[10px] font-bold text-rosegold-400 flex items-center gap-1">
                  <Hourglass className="w-3.5 h-3.5" />
                  Total duration: {course.lessons.reduce((acc, l) => acc + parseInt(l.duration), 0)} mins
                </span>
                
                <button
                  onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                  className="text-xs font-bold text-elegant hover:text-rosegold-400 flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Curriculum' : 'View Lessons'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Lessons Accordion List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-blush-200/10 bg-white/60 dark:bg-elegant-900/60 p-4 space-y-2.5 no-print"
                  >
                    <span className="text-[9px] uppercase font-bold text-rosegold-400 tracking-wider block mb-2 px-1">Curriculum Checklist</span>
                    
                    {course.lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        onClick={() => handleLessonToggle(course.id, lesson.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          lesson.completed
                            ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-950'
                            : 'bg-white/70 dark:bg-elegant-800 border-blush-200/20 hover:border-blush-200/60 text-elegant'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                            lesson.completed
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-blush-200 text-transparent'
                          }`}>
                            {lesson.completed && <CheckCircle2 className="w-4.5 h-4.5" />}
                          </div>
                          <span className={`text-xs font-semibold ${lesson.completed ? 'line-through opacity-70' : ''}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold opacity-60 shrink-0">{lesson.duration}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default KnowledgePage;
