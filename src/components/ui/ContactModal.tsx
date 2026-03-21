"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Later implement backend
    console.log("Form Data:", formData);
    alert("Message sent! (Simulation)");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10"
          >
            {/* Corner Marks Decoration */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-black/10 dark:bg-white/10" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-black/10 dark:bg-white/10" />
            <div className="absolute top-0 right-0 w-8 h-[1px] bg-black/10 dark:bg-white/10" />
            <div className="absolute top-0 right-0 w-[1px] h-8 bg-black/10 dark:bg-white/10" />
            <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-black/10 dark:bg-white/10" />
            <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-black/10 dark:bg-white/10" />
            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-black/10 dark:bg-white/10" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-black/10 dark:bg-white/10" />

            {/* Header */}
            <div className="p-8 pb-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight dark:text-white">Let&rsquo;s Connect.</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Fill out the form below to start a conversation.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Brief Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What project are we building?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-100 transition shadow-xl"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2 animate-pulse" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
