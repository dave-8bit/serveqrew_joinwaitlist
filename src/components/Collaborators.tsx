import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// Importing your assets
import primegadgets from '../assets/primegadgets.jpeg';
import cryptoqrew from '../assets/crypto.jpeg';
import jessica from '../assets/jessica.jpeg';
import alex from '../assets/alex.jpeg';
import muna from '../assets/muna.jpeg';
import crochetArt from '../assets/crochet.jpeg';
import kekachi from '../assets/kekachi.jpeg';
import chioma from '../assets/chioma.jpeg';
import tessy from '../assets/tessy.jpeg';

export default function Collaborators() {
  const [expandedBrand, setExpandedBrand] = useState<number | null>(null);

  const collaborators = [
    { name: 'Prime Gadgets', img: primegadgets, desc: 'Premier hardware devices.' },
    { name: 'Crypto Qrew', img: cryptoqrew, desc: 'Seamless crypto-related insights, transactions and digital finance awareness.' },
    { name: 'Jessica', img: jessica, desc: 'Driving awareness and helping ServeQrew reach the right audience through engagement.' },
    { name: 'Alex', img: alex, desc: 'Driving awareness and helping ServeQrew reach the right audience through organic promotion.' },
    { name: 'Muna Style', img: muna, desc: 'Showcasing friendly fashion and lifestyle products.' },
    { name: 'Crochet Art', img: crochetArt, desc: 'Luxury Handcrafted Art.' },
    { name: 'Shadow Enterprise', img: kekachi, desc: 'Your Online Gadget Store.' },
    { name: 'Essence Haven', img: chioma, desc: 'Premium fragrances.' },
    { name: "Tessy's Kitchen", img: tessy, desc: 'Fresh pastries, cakes, and homemade delicious treats.' }
  ];

  return (
    <section className="relative z-10 py-16 sm:py-32 border-y bg-transparent border-white/5 transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4 text-white">
            Our Most <span className="text-secondary-teal">Trusted</span> Brands
          </h2>
          <p className="text-[8px] sm:text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-10 sm:mb-20 text-white/30">
            The Elite Partnership Network
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8"
        >
          {collaborators.map((collab, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ y: -10 }} 
              className="group relative"
            >
              {/* Glow Effect: Adjusted for Slate-950 */}
              <div className="absolute inset-0 bg-secondary-teal/20 blur-[30px] sm:blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative h-full p-3 sm:p-8 rounded-2xl sm:rounded-[40px] border border-white/5 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 flex flex-col items-center justify-center group-hover:border-secondary-teal/50 group-hover:bg-white/[0.07]">
                
                {/* Branding Gradient in Corner */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-bl from-secondary-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-12 h-12 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-6">
                  <div className="absolute inset-0 rounded-xl sm:rounded-3xl animate-pulse blur-[2px] sm:blur-sm bg-secondary-teal/30" />
                  <div className="relative w-full h-full rounded-xl sm:rounded-3xl border border-white/10 bg-slate-900 p-0.5 sm:p-1 overflow-hidden transition-transform duration-500 group-hover:scale-110">
                    <img src={collab.img} alt={collab.name} className="w-full h-full object-cover rounded-lg sm:rounded-[20px]" />
                  </div>
                </div>

                <h3 className="text-[10px] sm:text-xl font-black uppercase italic tracking-tighter transition-colors text-center text-white group-hover:text-secondary-teal">
                  {collab.name}
                </h3>

                {/* Desktop Description */}
                <p className="hidden sm:block text-[10px] font-bold leading-relaxed italic text-center text-slate-500 group-hover:text-slate-300">
                  {collab.desc}
                </p>

                {/* Mobile Interaction */}
                <button
                  onClick={() => setExpandedBrand(expandedBrand === i ? null : i)}
                  className={`sm:hidden text-[7px] font-black uppercase mt-1 px-1.5 py-0.5 rounded transition-colors ${
                    expandedBrand === i ? 'bg-secondary-teal/20 text-secondary-teal' : 'text-secondary-teal/60'
                  }`}
                >
                  {expandedBrand === i ? 'Hide' : 'More'}
                </button>

                <AnimatePresence>
                  {expandedBrand === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="sm:hidden w-full mt-2 pt-2 border-t border-white/5"
                    >
                      <p className="text-[8px] font-bold leading-tight italic text-center text-slate-400">
                        {collab.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Line */}
                <div className="mt-3 sm:mt-6 flex justify-center">
                  <div className="h-[1px] sm:h-[2px] w-4 sm:w-8 rounded-full bg-secondary-teal/20 transition-all duration-500 group-hover:w-16 group-hover:bg-secondary-teal group-hover:shadow-[0_0_10px_#008080]" />
                </div>

                <ExternalLink className="absolute top-3 right-3 w-3 h-3 sm:w-4 sm:h-4 transition-all duration-500 text-white/10 group-hover:text-secondary-teal" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}