"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Heart, Sparkles, User, Brain } from 'lucide-react';
import { useMarriageState } from '../context/state-context';
import { formatCurrency } from '../lib/utils';
import { motivationalQuotes } from '../lib/mockData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Halo! I am Ayunikah's emotional AI assistant, your digital marriage coach. Ask me about your overall progress, budget status, courses, invitation updates, or ask me for daily marriage wisdom!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    overallProgress,
    budgetItems,
    courses,
    invitees,
    invitation,
    weddingDate,
    groom,
    bride
  } = useMarriageState();
  const groomLabel = groom.nickname || groom.fullName || 'the groom';
  const brideLabel = bride.nickname || bride.fullName || 'the bride';

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputValue.toLowerCase();
    setInputValue('');
    setIsTyping(true);

    void (async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userMsg.text,
            coupleState: {
              overallProgress,
              weddingDate,
              profiles: { groom, bride },
              budget: {
                totalItems: budgetItems.length,
                paidItems: budgetItems.filter(item => item.status === 'Paid').length,
                unpaidItems: budgetItems.filter(item => item.status === 'Unpaid').length,
                totalActual: budgetItems.reduce((acc, curr) => acc + curr.actualBudget, 0),
              },
              courses: courses.map(course => ({
                title: course.title,
                category: course.category,
                completed: course.completed,
                completedLessons: course.lessons.filter(lesson => lesson.completed).length,
                totalLessons: course.lessons.length,
              })),
              invitees: {
                total: invitees.length,
                attending: invitees.filter(item => item.rsvpStatus === 'Attending').length,
                pending: invitees.filter(item => item.rsvpStatus === 'Pending').length,
              },
              invitation,
            },
          }),
        });

        const data = await response.json();
        if (!response.ok || !data.reply) throw new Error(data.error || 'Assistant request failed');

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      } catch {
        fallbackReply(query);
      }
    })();

    function fallbackReply(fallbackQuery: string) {

      // Local fallback for offline development or temporary API outages.
      let aiText = "I hear you! Preparing for marriage is a beautiful and emotional process. Ask me about your 'budget', 'progress', 'courses', 'invitation', or say 'wisdom' for a sweet marriage quote!";
      
      const totalBudget = budgetItems.reduce((acc, curr) => acc + curr.actualBudget, 0);
      const paidItemsCount = budgetItems.filter(item => item.status === 'Paid').length;
      const unpaidItemsCount = budgetItems.filter(item => item.status === 'Unpaid').length;
      
      const totalLessons = courses.reduce((acc, curr) => acc + curr.lessons.length, 0);
      const completedLessons = courses.reduce((acc, curr) => acc + curr.lessons.filter(l => l.completed).length, 0);
      
      const guestCount = invitees.length;
      const attendingCount = invitees.filter(i => i.rsvpStatus === 'Attending').length;

      // Rule-based context-aware responses
      if (fallbackQuery.includes('progress') || fallbackQuery.includes('ready') || fallbackQuery.includes('completion')) {
        aiText = `Your overall preparation readiness is **${overallProgress.toFixed(0)}%**. Here's your component breakdown:
- 💰 Budget paid status: **${paidItemsCount}/${budgetItems.length} items**
- 📚 Marriage course completion: **${completedLessons}/${totalLessons} lessons**
- 💌 Digital invitation: **${invitation.confirmed ? 'Confirmed & Live' : 'Still in Builder draft'}**
- 🤵👰 Personal profile: **${groom.fullName || bride.fullName ? 'In progress' : 'Not filled yet'}**
Keep up the good work! Step-by-step you are getting closer to your big day!`;
      } 
      else if (fallbackQuery.includes('budget') || fallbackQuery.includes('cost') || fallbackQuery.includes('money') || fallbackQuery.includes('expense')) {
        aiText = `Here is your dynamic financial audit:
- Total allocated wedding budget is: **${formatCurrency(totalBudget)}**
- You have paid **${paidItemsCount}** items in full.
- You still have **${unpaidItemsCount}** unpaid items.
- Next due item is **"${budgetItems.find(i => i.status === 'Unpaid')?.itemName || 'None'}"**.
I recommend checking the Budget Sheet to review category pie charts and ensure savings are balanced!`;
      }
      else if (fallbackQuery.includes('course') || fallbackQuery.includes('learn') || fallbackQuery.includes('knowledge') || fallbackQuery.includes('lesson')) {
        aiText = `You have completed **${completedLessons} out of ${totalLessons} lessons** (${((completedLessons/totalLessons)*100).toFixed(0)}%).
- ${groomLabel} can take: *"${courses.find(c => c.category === 'Groom Only')?.title}"*
- ${brideLabel} can take: *"${courses.find(c => c.category === 'Bride Only')?.title}"*
I highly recommend sitting down together this weekend to complete the lesson: *"${courses.flatMap(c => c.lessons).find(l => !l.completed)?.title || 'Constructive Conflict'}"* under the Couple Together category. It's a wonderful intimacy booster!`;
      }
      else if (fallbackQuery.includes('invite') || fallbackQuery.includes('guest') || fallbackQuery.includes('rsvp')) {
        aiText = `You have tracked **${guestCount} guests** on your invitation list.
- **${attendingCount}** have confirmed they are **Attending**.
- **${invitees.filter(i => i.rsvpStatus === 'Declined').length}** declined.
- **${invitees.filter(i => i.rsvpStatus === 'Pending').length}** are still pending responses.
You can use our WhatsApp sharing tool inside the Invitation tab to prompt guests for RSVP confirmations!`;
      }
      else if (fallbackQuery.includes('wisdom') || fallbackQuery.includes('quote') || fallbackQuery.includes('inspire') || fallbackQuery.includes('love')) {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        aiText = `Here is a romantic piece of wisdom for you today:
> *"${randomQuote}"*
Remember, marriage is a commitment of love and a daily choice to lift each other up. 💖`;
      }
      else if (fallbackQuery.includes('groom')) {
        aiText = `${groomLabel} can use the profile card to add personal details, a photo, and private notes. The groom-focused course is: *"${courses.find(c => c.category === 'Groom Only')?.title}"*.`;
      }
      else if (fallbackQuery.includes('bride')) {
        aiText = `${brideLabel} can use the profile card to add personal details, a photo, and private notes. The bride-focused course is: *"${courses.find(c => c.category === 'Bride Only')?.title}"*.`;
      }
      else if (fallbackQuery.includes('hello') || fallbackQuery.includes('hi') || fallbackQuery.includes('hey') || fallbackQuery.includes('help')) {
        aiText = `Hello! How can I assist you in your marriage journey today? Ask me about:
- **"budget"** to audit expenses
- **"progress"** to check overall readiness
- **"courses"** to see lessons
- **"invitees"** to count RSVPs
- **"wisdom"** for sweet quotes.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end select-none no-print">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="w-[calc(100vw-2rem)] sm:w-[360px] h-[min(480px,calc(100vh-8rem))] glass rounded-3xl shadow-2xl flex flex-col mb-4 overflow-hidden border border-blush-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blush-200/50 via-cream-100/40 to-lavender-200/50 p-4 border-b border-blush-200/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blush-200 flex items-center justify-center shadow-inner">
                  <Brain className="w-4.5 h-4.5 text-elegant" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-elegant flex items-center gap-1.5">
                    Ayunikah Coach
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-elegant/60">Active Relationship Advisor</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-blush-100/50 text-elegant/60 hover:text-elegant transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 shadow-sm ${
                      msg.sender === 'user' ? 'bg-gradient-to-tr from-blush-200 to-lavender-200 text-elegant' : 'bg-blush-100 text-rosegold-400'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div>
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-rosegold-400 text-white rounded-tr-none' 
                          : 'bg-white/80 dark:bg-elegant-800 text-elegant border border-blush-100/20 rounded-tl-none shadow-sm'
                      }`}>
                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                      </div>
                      <span className="text-[8px] text-elegant/40 block mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-blush-100 text-rosegold-400 flex items-center justify-center text-[10px]">
                      <Bot className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <div className="p-3 bg-white/60 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rosegold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-rosegold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-rosegold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-blush-200/20 bg-white/50 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about progress, budget, courses..."
                className="flex-1 bg-white/70 dark:bg-elegant-800 border border-blush-200/30 rounded-xl px-3 py-2 text-xs text-elegant focus:outline-none focus:border-rosegold-400/50"
              />
              <button
                type="submit"
                className="p-2 bg-rosegold-400 text-white rounded-xl hover:bg-rosegold-500 transition-colors shadow-md shadow-rosegold-200/30 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-tr from-blush-200 to-lavender-200 hover:from-blush-300 hover:to-lavender-300 rounded-full shadow-2xl flex items-center justify-center border border-blush-300/40 relative group glowing-btn"
      >
        <MessageSquare className="w-6 h-6 text-elegant" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-rosegold-400 border border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-rosegold-400 border border-white rounded-full" />
      </motion.button>
    </div>
  );
};
export default AIAssistant;
