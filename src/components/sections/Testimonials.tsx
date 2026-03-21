"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CEO at TechFlow",
    content: "Ankit is a rare talent. He doesn't just design; he understands the business goals and crafts experiences that drive real results. Our conversion rate increased by 40% after the redesign.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager at EcoSaaS",
    content: "Working with Ankit was the best decision for our mobile app launch. His attention to detail and ability to simplify complex user flows is unmatched. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&fit=crop",
  },
  {
    name: "David Miller",
    role: "Founder at Finly",
    content: "The design system Ankit built for us has saved our development team hundreds of hours. It's clean, scalable, and beautiful. A true professional who over-delivers.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&fit=crop",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight dark:text-white">
              What Our <span className="text-gray-400 dark:text-gray-500 font-medium">Clients Say</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl text-base md:text-lg leading-relaxed">
              I pride myself on building long-term relationships through exceptional design and reliability.
            </p>
          </div>
          
          <div className="flex -space-x-4">
             {[1,2,3,4,5].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-gray-100 dark:bg-[#111] overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
               </div>
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-black dark:bg-white dark:text-black flex items-center justify-center text-white text-xs font-bold shadow-sm">
               50+
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-[30px] md:rounded-[40px] bg-white dark:bg-[#111] border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/20 dark:shadow-none relative group hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute top-8 right-8 text-gray-50 dark:text-white/5 opacity-20 group-hover:opacity-40 dark:group-hover:opacity-10 transition-opacity">
                 <Quote className="w-16 h-16 fill-current" />
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-8 italic leading-relaxed text-sm md:text-base">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-100 dark:border-white/10">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
