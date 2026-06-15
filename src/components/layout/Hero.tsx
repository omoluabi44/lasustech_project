"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 md:px-8">
      {/* Background Image (fully visible) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/Lasustech-BG.webp")' }}
      />
      
      {/* Flat solid overlay for text readability. NO GRADIENTS. */}
      <div className="absolute inset-0 z-0 bg-black/60" />

      {/* Content */}
      <div className="z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center mt-4 md:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="flex items-center gap-3 mb-6 md:mb-8 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-100 font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs shrink-0">
              Welcome to the future
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          </motion.div>
          
          <h1 className="font-sans text-4xl md:text-6xl lg:text-8xl font-semibold leading-[1.05] tracking-tighter text-white m-0">
            Lasustech Student <br className="hidden md:block"/> 
            <span className="text-sky-200 italic font-light tracking-tight">Consultative</span> Assembly.
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 text-slate-200 max-w-md text-sm md:text-base font-light leading-relaxed"
          >
            A minimal, progressive approach to student governance. We are the architects of our academic experience.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-slate-400 font-medium text-[9px] tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-8 bg-sky-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
