import { motion } from 'framer-motion';

export default function ContactStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed z-[60] bottom-4 md:bottom-6 inset-x-0 md:inset-x-auto md:right-6 flex justify-center md:justify-end pointer-events-auto px-4 md:px-0"
    >
      {/* Container: Changed to dark glass effect */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 px-3 py-3 md:px-5 md:py-3.5 rounded-[24px] border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[340px] md:max-w-none">
        
        {/* LABEL */}
        <div className="flex flex-col items-center md:items-start shrink-0">
          <span className="text-[8px] md:text-[10px] font-black uppercase italic tracking-[0.2em] text-secondary-teal leading-none">
            Chat or Call the Qrew
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center w-full md:w-auto">
          
          {/* CONTACT ONE: LIME ACCENT (Remains high visibility) */}
          <div className="flex items-center overflow-hidden rounded-xl shadow-lg border border-white/5 w-full sm:w-auto min-w-[180px]">
            <a
              href="https://wa.me/2349112536022?text=Hello%20ServeQrew%2C%20I%20need%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A3E635] hover:bg-[#bef264] text-slate-950 text-[10px] md:text-xs font-black uppercase italic px-3 py-2.5 border-r border-black/10 transition-colors flex-1 text-center"
            >
              Chat
            </a>
            <a
              href="tel:09112536022"
              className="bg-[#A3E635] hover:bg-[#bef264] text-slate-950 text-[10px] md:text-xs font-black uppercase italic px-4 py-2.5 transition-colors flex-[2] text-center"
            >
              0911 253 6022
            </a>
          </div>

          {/* CONTACT TWO: TEAL ACCENT (Adjusted for Dark Mode legibility) */}
          <div className="flex items-center overflow-hidden rounded-xl shadow-lg border border-secondary-teal/30 w-full sm:w-auto min-w-[180px]">
            <a
              href="https://wa.me/2347084515746?text=Hello%20ServeQrew%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary-teal/10 text-secondary-teal text-[10px] md:text-xs font-black uppercase italic px-3 py-2.5 border-r border-secondary-teal/20 hover:bg-secondary-teal/20 transition-colors flex-1 text-center"
            >
              Chat
            </a>
            <a
              href="tel:07084515746"
              className="bg-secondary-teal/10 text-secondary-teal text-[10px] md:text-xs font-black uppercase italic px-4 py-2.5 transition-colors flex-[2] text-center"
            >
              0708 451 5746
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  );
}