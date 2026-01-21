import { motion, type Variants } from 'framer-motion';

export default function Hero() {
  // Logic to make words appear one after the other
  const wordVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        // Delay increases for each word (0s, 0.5s, 1s)
        delay: i * 0.5, 
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // Smooth entrance
      }
    }),
  };

  // Pulse animation for the dots
  const dotVariants: Variants = {
    animate: {
      opacity: [1, 0.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative z-10 pt-32 sm:pt-52 pb-40 px-4 sm:px-6 text-center">
      {/* Subtle connectivity line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[45%] w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-secondary-teal/20 to-transparent -z-10" />

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {["Connect", "Chat", "Grow"].map((word, i) => (
          <motion.h1 
            key={word} 
            custom={i} // Passes the index to the variants
            variants={wordVariants} 
            initial="initial" 
            animate="animate" 
            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase italic drop-shadow-2xl text-white"
          >
            {word}
            <motion.span 
              variants={dotVariants}
              animate="animate"
              className="text-secondary-teal"
            >
              .
            </motion.span>
          </motion.h1>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        // Delay this until after all words have appeared (0.5 * 2 + 0.8 = ~1.8s)
        transition={{ delay: 1.8, duration: 1 }}
        className="text-lg sm:text-xl font-bold italic uppercase tracking-widest text-white"
      >
        The Service Exchange for the Bold.
      </motion.p>
    </section>
  );
}