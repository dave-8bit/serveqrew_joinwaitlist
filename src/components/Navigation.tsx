import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BarChart3, X, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js'; // Import the specific type
import logo from '../assets/logo.jpeg';

// Define the interface instead of using 'any'
interface NavigationProps {
  session: Session | null;
}

export default function Navigation({ session }: NavigationProps) {
  // ... rest of your code stays the same
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPestyMessage, setShowPestyMessage] = useState(false);
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
      // If logged in, go straight to dashboard
      navigate('/dashboard');
    } else {
      // If pesty (not logged in), scroll to waitlist and show error
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      setShowPestyMessage(true);
      setTimeout(() => setShowPestyMessage(false), 4000);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {showPestyMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm bg-red-500/10 border border-red-500/50 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4"
          >
            <div className="bg-red-500 rounded-full p-2 shrink-0">
              <X className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-black italic uppercase text-[10px] leading-tight">Unauthorized Access</p>
              <p className="text-red-200/80 text-[9px] font-bold uppercase tracking-wider">Join the waitlist first before checking for stats.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 px-2 sm:px-8 py-2.5 sm:py-5 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center bg-slate-950/50">
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Logo Section */}
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

          {/* Desktop Branding */}
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

          {/* Mobile Branding */}
          <div className="flex sm:hidden flex-col">
             <span className="text-[10px] font-black uppercase italic text-white tracking-tighter leading-none">
               SERVE<span className="text-secondary-teal">QREW</span>
             </span>
             <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-secondary-teal/80 italic mt-0.5">
               Track Referrals
             </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Stats Button - Works for both logged in and pesty users */}
          <button 
            onClick={handleStatsClick}
            className="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:text-secondary-teal hover:border-secondary-teal/50 transition-all group shrink-0"
          >
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-teal group-hover:scale-110 transition-transform" />
            <span className="text-[8px] sm:text-xs font-black uppercase italic tracking-widest">Stats</span>
          </button>

          {session ? (
            /* Log Out Button - Shows only when logged in */
            <button 
              onClick={() => supabase.auth.signOut()}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 sm:gap-2 border border-transparent hover:border-red-400/20"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[8px] sm:text-xs font-black uppercase italic">Exit</span>
            </button>
          ) : (
            /* Join Button - Shows only when logged out */
            <button 
              onClick={scrollToWaitlist}
              className="px-2.5 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[8px] sm:text-xs font-black uppercase italic tracking-wider border border-white/10 hover:border-accent-yellow bg-white/5 hover:bg-accent-yellow/10 transition-all text-white hover:text-accent-yellow shadow-lg whitespace-nowrap"
            >
              Join
            </button>
          )}
        </div>
      </nav>
    </>
  );
}