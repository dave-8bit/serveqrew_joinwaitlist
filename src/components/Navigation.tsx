import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export default function Navigation() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-5 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center bg-slate-950/50">
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Animated Logo Container */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 p-[1px] rounded-xl sm:rounded-2xl bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#008080_100%)]" 
          />
          {/* Inner card: Slightly off-white for better dark-mode blending */}
          <div className="relative w-full h-full rounded-[11px] sm:rounded-[15px] bg-slate-50 p-1 flex items-center justify-center z-10 shadow-2xl">
            <img src={logo} alt="ServeQrew" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        {/* Brand Text Section */}
        <div className="hidden sm:flex flex-col border-l border-white/10 pl-5">
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

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Join Button: Dark Mode Logic */}
        <button 
          onClick={scrollToWaitlist}
          className="px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase italic tracking-widest border border-white/10 hover:border-accent-yellow bg-white/5 hover:bg-accent-yellow/10 transition-all text-white hover:text-accent-yellow shadow-lg"
        >
          Join The Waitlist
        </button>
      </div>
    </nav>
  );
}