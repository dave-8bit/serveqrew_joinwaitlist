import { motion } from 'framer-motion';
// Import your local logo asset
import logo from '../assets/logo.jpeg'; 

export default function Footer() {
  return (
    <footer className="relative py-20 md:py-32 border-t border-white/5 bg-slate-950 overflow-hidden">
      {/* Top Accent Line - Cyberpunk Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-secondary-teal/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-10 md:gap-12"
        >
          {/* Logo Container with "Active" Status */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary-teal/10 rounded-full blur-2xl group-hover:bg-secondary-teal/20 transition-all duration-700" />
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-[20px] border border-white/10 bg-white/5 p-2 overflow-hidden flex items-center justify-center shadow-2xl group-hover:shadow-secondary-teal/20 transition-all">
               <img 
                src={logo} 
                alt="ServeQrew" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'text-secondary-teal');
                    parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.71 14 3 12 10.29h8l-10 11.71 2-7.29H4z"/></svg>';
                  }
                }}
               />
            </div>
          </div>

          {/* Branding & Mission */}
          <div className="text-center space-y-3 px-4">
            <h4 className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase italic text-white leading-relaxed">
              © 2026 <span className="text-secondary-teal">ServeQrew</span>. 
              <span className="hidden md:inline text-slate-500 ml-2 font-bold">The Future of Campus Commerce & Authority.</span>
            </h4>
            
            <p className="md:hidden text-[9px] font-bold tracking-[0.2em] uppercase text-slate-500 italic">
              The Future of Campus Commerce.
            </p>
          </div>

          {/* Tactical Divider */}
          <div className="flex items-center gap-6 opacity-50">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-secondary-teal animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-secondary-teal animate-ping opacity-40" />
            </div>
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
          </div>

          {/* System Terminal Text */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[8px] md:text-[10px] font-black tracking-[1.5em] md:tracking-[2em] uppercase text-secondary-teal/40 pointer-events-none translate-x-[0.75em] md:translate-x-[1em]">
              End Stream
            </p>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] font-mono uppercase text-slate-500 tracking-[0.3em]">
                Node: UNN_001 // SECURE_CONNECTED
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute bottom-8 left-8 w-6 h-6 border-l-2 border-b-2 border-white/5 hidden md:block rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-r-2 border-b-2 border-white/5 hidden md:block rounded-br-lg" />
    </footer>
  );
}