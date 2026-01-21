import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Shield, GraduationCap } from 'lucide-react';

const faqs = [
  { q: "What exactly is ServeQrew?", a: "Think of it as a digital market. It's where people find, buy and offer goods and services. You're not just borrowing to purchase, you can also list the products you sell or services you offer, chat directly with customers and grow your hustle." },
  { q: "Do I have to be a student to use it?", a: "Our heart is in UNN for now as we have to start somewhere so students are our priority. However, anyone in Nigeria (lecturers, business owners, etc.) can buy or sell services! UNN is the starting point!" },
  { q: "How do I get paid for my services?", a: "You search for a provider, chat with them directly on the app, and agree on terms. We are building secure ways to ensure everyone gets what they paid for and also maximum security of vital information." },
  { q: "Is my data safe?", a: "100%. We use modern security to keep your chats private. Plus, we verify users to keep the scammers out." },
  { q: "Why should I join the waitlist?", a: "Waitlist members get the ServeQrew badge, early access to the best deals especially from our collaborators, and a chance to use our premium features for free when we go live." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 py-24 px-4 bg-transparent overflow-hidden border-t border-white/5">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-6">
            The <span className="text-secondary-teal">Intel</span>
          </h2>
          <div className="flex items-center justify-center gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <GraduationCap className="w-4 h-4 text-secondary-teal" /> Rooted in UNN
             </div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <Shield className="w-4 h-4 text-secondary-teal" /> Verified Secure
             </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border transition-all duration-300 rounded-[24px] overflow-hidden ${
                openIndex === i 
                ? 'border-secondary-teal/50 bg-secondary-teal/[0.05] shadow-[0_0_30px_rgba(0,128,128,0.1)]' 
                : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left outline-none"
              >
                <span className={`font-black uppercase italic tracking-tight text-lg md:text-xl pr-4 transition-colors ${
                  openIndex === i ? 'text-secondary-teal' : 'text-white'
                }`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === i ? 'bg-secondary-teal text-white rotate-180' : 'bg-white/5 border border-white/10 text-slate-400'
                }`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    <div className="px-6 pb-8 text-slate-400 font-bold leading-relaxed text-sm md:text-base max-w-[95%]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Background Glow for the Section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-secondary-teal/5 blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}