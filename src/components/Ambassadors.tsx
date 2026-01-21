import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck } from 'lucide-react';

// Importing your specific assets
import ella from '../assets/ella.jpeg';
import nuel from '../assets/nuel.jpeg';

export default function Ambassadors() {
  const [expandedAmbassador, setExpandedAmbassador] = useState<number | null>(null);

  const ambassadors = [
    { 
      name: "Ekobosowo Ella", 
      role: "Campus Ambassador", 
      img: ella, 
      bio: "Ella is one of the most recognized faces on campus. She helps represent ServeQrew, spread the word, and connect us with the student community.", 
      color: "from-secondary-teal/20" 
    },
    { 
      name: "Nu3l", 
      role: "Creative Ambassador", 
      img: nuel, 
      bio: "Nu3l is an upcoming artist who brings creativity and culture into the ServeQrew brand. He helps push the vibe, visuals, and creative direction of the platform.", 
      color: "from-accent-yellow/20" 
    }
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
      <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter text-center mb-10 sm:mb-20 text-slate-900">
        Founding <span className="text-secondary-teal">Ambassadors</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-12">
        {ambassadors.map((p, idx) => (
          <motion.div 
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-2 sm:p-0"
          >
            {/* Image Container with your exact layout specs */}
            <div className="w-full aspect-[4/5] rounded-[20px] sm:rounded-[40px] border mb-4 sm:mb-8 flex items-center justify-center relative overflow-hidden bg-white/40 border-black/5 shadow-sm group">
               <img 
                 src={p.img} 
                 alt={p.name} 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
               />
               {/* Brand Gradient Overlay */}
               <div className={`absolute inset-0 bg-gradient-to-t ${p.color} to-transparent opacity-60 pointer-events-none`} />
            </div>
            
            {/* Identity Section */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 mb-1 sm:mb-2 text-center">
              <UserCheck className="w-4 h-4 sm:w-6 sm:h-6 text-secondary-teal flex-shrink-0" />
              <h3 className="text-lg sm:text-4xl font-black uppercase italic tracking-tighter leading-none text-slate-900">
                {p.name}
              </h3>
            </div>

            <span className="text-secondary-teal font-black text-[7px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 sm:mb-4 text-center">
              {p.role}
            </span>

            {/* Responsive Bio Logic */}
            <p className="hidden sm:block text-center max-w-sm text-sm italic text-slate-600 leading-relaxed">
              "{p.bio}"
            </p>

            <p className="sm:hidden text-center max-w-sm text-[10px] italic line-clamp-2 text-slate-600">
              "{p.bio}"
            </p>

            <button
              onClick={() => setExpandedAmbassador(expandedAmbassador === idx ? null : idx)}
              className={`sm:hidden text-[7px] font-black uppercase mt-2 px-2 py-1 rounded transition-colors ${
                expandedAmbassador === idx
                  ? 'bg-secondary-teal text-white'
                  : 'bg-secondary-teal/10 text-secondary-teal'
              }`}
            >
              {expandedAmbassador === idx ? 'Close Bio' : 'Read Bio'}
            </button>

            <AnimatePresence>
              {expandedAmbassador === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:hidden w-full mt-2 pt-2 border-t border-black/5"
                >
                  <p className="text-center text-[10px] italic leading-tight text-slate-800 px-2">
                    "{p.bio}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}