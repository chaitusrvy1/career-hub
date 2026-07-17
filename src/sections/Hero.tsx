import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Building2, Terminal, Users, Globe } from 'lucide-react';

interface HeroProps {
  onExploreJobs: () => void;
  onContactUs: () => void;
}

export default function Hero({ onExploreJobs, onContactUs }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-32 border-b border-slate-100 dark:border-slate-900">
      {/* Absolute floating glowing blobs for visual design density */}
      <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />
      <div className="absolute bottom-12 left-10 h-56 w-56 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
      
      {/* Ambient background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Sparkle micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-150 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/40 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>NexusLabs is actively hiring the next generation of pioneers</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
        >
          Shape the Future of{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Product & Engineering
          </span>
        </motion.h1>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          We are a distributed squad of researchers, developers, and product creators building fast cloud workspaces and career accelerator portals. Join us in crafting pristine interfaces.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExploreJobs}
            className="group rounded-xl bg-slate-950 dark:bg-slate-50 text-white dark:text-slate-950 px-7 py-4 text-sm font-bold shadow-lg hover:bg-slate-800 dark:hover:bg-white transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            Explore Active Jobs
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onContactUs}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-7 py-4 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
          >
            Contact Partner Solutions
          </button>
        </motion.div>

        {/* Trust metrics block / Trust Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 pt-8 border-t border-slate-100 dark:border-slate-900/80 max-w-4xl mx-auto"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Backed by Top Modern Operating Cultures
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale dark:invert">
            <div className="flex items-center gap-2 font-display font-bold text-slate-800 text-sm">
              <Terminal className="h-5 w-5 text-indigo-600" />
              <span>DevEngine</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-800 text-sm">
              <Users className="h-5 w-5 text-indigo-600" />
              <span>SaaSFlow</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-800 text-sm">
              <Globe className="h-5 w-5 text-indigo-600" />
              <span>GlobalCorp</span>
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-800 text-sm">
              <Building2 className="h-5 w-5 text-indigo-600" />
              <span>ApexConsulting</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
