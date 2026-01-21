import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BarChart3, X, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import logo from '../assets/logo.jpeg';

interface NavigationProps {
  session: Session | null;
}

export default function Navigation({ session }: NavigationProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStatsClick = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 6000);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm bg-secondary-teal/10 border border-secondary-teal/50 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(0,128,128,0.2)]"
          >
            <div className="bg-secondary-teal rounded-full p-2 shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-black italic uppercase text-[10px] leading-tight tracking-wider">Returning operative?</p>
              <p className="text-secondary-teal/80 text-[9px] font-bold uppercase tracking-wider mt-0.5">Enter your email below to receive your secure access link.</p>
            </div>
            <button onClick={() => setShowLoginPrompt(false)} className="text-white/40 hover:text-white">
               <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 px-2 sm:px-8 py-2.5 sm:py-5 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center bg-slate-950/50">
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="relative w-9 h-9 sm:w-16 sm:h-16 p-[1px] rounded-lg sm:rounded-2xl bg-white/10 overflow-hidden shrink-0">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
              className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#008080_100%)]" 
            />
            <div className="relative w-full h-full rounded-[7px] sm:rounded-[15px] bg-slate-50 p-0.5 sm:p-1 flex items-center justify-center z-10 shadow-2xl">
              <img src={logo} alt="ServeQrew" className="w-full h-full object-cover rounded-md" />
            </div>
          </div>

          <div className="hidden md:flex flex-col border-l border-white/10 pl-5">
            <h1 className="text-2xl font-black uppercase italic leading-none tracking-tighter text-white">
              SERVE<span className="text-secondary-teal">QREW</span>
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <ShieldCheck className="w-3 h-3 text-secondary-teal" />
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">
                LOC: {mousePos.x}, {mousePos.y}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <button 
            onClick={handleStatsClick}
            className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:text-secondary-teal hover:border-secondary-teal/50 transition-all group"
          >
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-teal group-hover:scale-110" />
            <span className="text-[8px] sm:text-xs font-black uppercase italic tracking-widest">Stats</span>
          </button>

          {session ? (
            <button 
              onClick={() => supabase.auth.signOut()}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 sm:gap-2 border border-transparent hover:border-red-400/20"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[8px] sm:text-xs font-black uppercase italic text-nowrap">Exit</span>
            </button>
          ) : (
            <button 
              onClick={scrollToWaitlist}
              className="px-2.5 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[8px] sm:text-xs font-black uppercase italic tracking-wider border border-white/10 hover:border-accent-yellow bg-white/5 hover:bg-accent-yellow/10 transition-all text-white hover:text-accent-yellow shadow-lg"
            >
              Join
            </button>
          )}
        </div>
      </nav>
    </>
  );
}