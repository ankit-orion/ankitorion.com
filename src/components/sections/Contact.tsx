"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar, MessageSquare, Clock, Check, Send, User, Mail, Sparkles } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type ViewType = "none" | "book" | "message";

export function Contact() {
  const [view, setView] = useState<ViewType>("none");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [msgForm, setMsgForm] = useState({ name: "", email: "", message: "" });
  const [msgErrors, setMsgErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateMsg = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!msgForm.name.trim() || msgForm.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msgForm.email))
      errs.email = "Please enter a valid email address.";
    if (!msgForm.message.trim() || msgForm.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleMsgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateMsg();
    if (Object.keys(errs).length > 0) {
      setMsgErrors(errs);
      return;
    }
    setMsgErrors({});
    // TODO: send msgForm to backend API
    toast.success("Inquiry sent!", { description: "I'll respond within 24 hours." });
    setMsgForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#book") setView("book");
      if (hash === "#message") setView("message");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const dates = [
    { day: "Mon", date: 24, month: "Mar" },
    { day: "Tue", date: 25, month: "Mar" },
    { day: "Wed", date: 26, month: "Mar" },
    { day: "Thu", date: 27, month: "Mar" },
    { day: "Fri", date: 28, month: "Mar" },
  ];

  const times = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-white dark:bg-black pb-24 border-b border-black/[0.12] dark:border-white/20">
      <div id="book" className="absolute top-0" />
      <div id="message" className="absolute top-0" />
      <SectionCornerMarks />
      <div className="py-16 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
        
        {/* Main Header Container */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center lg:items-start mb-12 md:mb-24">
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 md:gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] dark:text-white">
                Your <span className="text-gray-400 dark:text-gray-600 font-medium italic">Vision.</span><br />
                My <span className="text-black dark:text-white">Creation.</span>
              </h2>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-[#111] flex-shrink-0 border-2 border-black/5 dark:border-white/10 hidden sm:block">
                 <Image src="/portrait.png" alt="Ankit Orion" fill className="object-cover filter grayscale contrast-125" />
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Doesn't Matter If You Do Not Understand Code Or Structure Of The Business Online. Just Share With Me Some Specific Things You Fancy Or You Would Want To Understand; Like Specific Competitor Strategies, Missing Points Or Features You Would Like To See To Build The App Better.
            </p>

            {/* View Selector Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
               <button 
                 onClick={() => setView("book")}
                 className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 border-2 w-full sm:w-auto ${
                   view === "book" 
                   ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-xl sm:scale-105" 
                   : "bg-transparent border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white"
                 }`}
               >
                 <Calendar className="w-5 h-5" />
                 Book a 15-Min Call
               </button>
               <button 
                 onClick={() => setView("message")}
                 className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 border-2 w-full sm:w-auto ${
                   view === "message" 
                   ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-xl sm:scale-105" 
                   : "bg-transparent border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white"
                 }`}
               >
                 <MessageSquare className="w-5 h-5" />
                 Get in Touch
               </button>
            </div>
          </div>
        </div>

        {/* Action Panel Container */}
        <AnimatePresence mode="wait">
          {view === "book" && (
            <motion.div 
              key="booking-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-gray-50 dark:bg-white/[0.02] rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                 <div className="space-y-8 md:space-y-10">
                    <div className="space-y-3 md:space-y-4">
                       <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Pick Your Slot.</h3>
                       <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">Select a date and time that works best for you. Let&rsquo;s talk business + technology.</p>
                    </div>

                    {/* Date Picker (Mock) */}
                    <div className="space-y-4">
                       <label className="text-[10px] uppercase font-black tracking-widest text-gray-600 dark:text-gray-300">Available week</label>
                       <div className="flex flex-wrap gap-2 md:gap-3">
                          {dates.map((d, i) => (
                             <button 
                               key={i}
                               onClick={() => setSelectedDate(i)}
                               className={`flex flex-col items-center justify-center w-[calc(33.33%-8px)] sm:w-20 h-20 md:h-24 rounded-2xl border-2 transition-all duration-300 ${
                                 selectedDate === i 
                                 ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105" 
                                 : "bg-white dark:bg-black/20 border-gray-300 dark:border-white/20 text-gray-800 dark:text-gray-200 hover:border-black/20 dark:hover:border-white/20"
                               }`}
                             >
                                <span className="text-[10px] font-bold opacity-60 tracking-tighter sm:tracking-normal">{d.day}</span>
                                <span className="text-xl md:text-3xl font-black">{d.date}</span>
                                <span className="text-[10px] font-bold uppercase tracking-tighter sm:tracking-normal">{d.month}</span>
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8 md:space-y-10">
                    {/* Time Picker (Mock) */}
                    <div className="space-y-4">
                       <label className="text-[10px] uppercase font-black tracking-widest text-gray-600 dark:text-gray-300">Available Slots (IST)</label>
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                          {times.map((t, i) => (
                             <button 
                               key={i}
                               onClick={() => setSelectedTime(t)}
                               className={`py-3 md:py-4 px-2 rounded-xl border-2 font-bold text-center text-xs md:text-sm transition-all duration-300 ${
                                 selectedTime === t 
                                 ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" 
                                 : "bg-white dark:bg-black/20 border-gray-300 dark:border-white/20 text-gray-800 dark:text-gray-200 hover:border-black/20 dark:hover:border-white/20"
                               }`}
                             >
                                {t}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 dark:border-white/5">
                        <button className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black py-4 md:py-5 rounded-2xl font-black flex items-center justify-center gap-2 md:gap-3 hover:scale-[1.02] transition shadow-xl group disabled:opacity-50" disabled={!selectedTime || selectedDate === null}>
                           <span>Confirm Appointment</span>
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6">Securely encrypted &bull; Orion Scheduler</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {view === "message" && (
            <motion.div 
              key="message-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-gray-50 dark:bg-white/[0.02] rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-2xl relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                 <div className="space-y-6 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                       <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Share Your Vision.</h3>
                       <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">Let me know the details of your request. I specialize in building exactly what you need, even if you can&rsquo;t explain the code behind it.</p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                       <div className="flex items-center gap-3 md:gap-4 text-gray-600 dark:text-gray-400">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                             <Check className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-xs md:text-sm font-medium">Free 24h Response Strategy</span>
                       </div>
                       <div className="flex items-center gap-3 md:gap-4 text-gray-600 dark:text-gray-400">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                             <Sparkles className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="text-xs md:text-sm font-medium">End-to-End Execution Plan</span>
                       </div>
                    </div>
                 </div>

                 <form className="space-y-4 md:space-y-6" onSubmit={handleMsgSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 flex items-center gap-2"><User className="w-3 h-3"/> Name</label>
                          <input type="text" placeholder="John Doe" value={msgForm.name} onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })} className="w-full bg-white dark:bg-white/5 px-4 md:px-5 py-3 md:py-4 rounded-2xl border-2 border-gray-200 dark:border-white/20 focus:border-black dark:focus:border-white transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium" required />
                          {msgErrors.name && <p className="text-xs text-red-500">{msgErrors.name}</p>}
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 flex items-center gap-2"><Mail className="w-3 h-3"/> Email</label>
                          <input type="email" placeholder="john@example.com" value={msgForm.email} onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })} className="w-full bg-white dark:bg-white/5 px-4 md:px-5 py-3 md:py-4 rounded-2xl border-2 border-gray-200 dark:border-white/20 focus:border-black dark:focus:border-white transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium" required />
                          {msgErrors.email && <p className="text-xs text-red-500">{msgErrors.email}</p>}
                       </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-600 dark:text-gray-300 flex items-center gap-2"><MessageSquare className="w-3 h-3"/> Your Vision</label>
                        <textarea placeholder="Tell me about your project..." rows={4} value={msgForm.message} onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })} className="w-full bg-white dark:bg-white/5 px-4 md:px-5 py-3 md:py-4 rounded-2xl border-2 border-gray-200 dark:border-white/20 focus:border-black dark:focus:border-white transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium resize-none" required></textarea>
                        {msgErrors.message && <p className="text-xs text-red-500">{msgErrors.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 md:py-5 rounded-2xl font-black flex items-center justify-center gap-2 md:gap-3 hover:scale-[1.02] transition shadow-xl group">
                       <span>Send Inquiry</span>
                       <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </form>
              </div>
            </motion.div>
          )}

          {view === "none" && (
            <motion.div 
               key="intro-view"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center py-6 md:py-10"
            >
               <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-bold animate-bounce shadow-sm">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                  Select an option below to proceed
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
