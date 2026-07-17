import React, { useState } from 'react';
import { Briefcase, Github, Linkedin, Twitter, Sparkles, X, Shield, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-900 py-12 relative z-30">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="grid gap-10 md:grid-cols-12 mb-10 pb-10 border-b border-slate-100 dark:border-slate-900/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-md shadow-indigo-100 dark:shadow-none">
                <Briefcase className="h-5.5 w-5.5 text-white" />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Nexus<span className="text-indigo-600 dark:text-indigo-400">Labs</span>
              </span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We coordinate distributed squads of world-class developers and designers to deploy cloud workspaces and career placement pipelines.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Ecosystem</span>
              <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-400">
                <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</a></li>
                <li><a href="#careers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Job Board</a></li>
                <li><a href="#apply" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Apply Form</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Partners</span>
              <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-400">
                <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Corporate Solutions</a></li>
                <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Our Core Values</a></li>
              </ul>
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">Connect Coordinates</span>
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 dark:text-slate-500">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              100% Serverless Frontend Pipeline
            </span>
          </div>

        </div>

        {/* Lower row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© 2026 NexusLabs. Certified Talent Placements. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveModal('privacy')} 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveModal('terms')} 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Document Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 z-10 max-h-[75vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {activeModal === 'privacy' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                    <Shield className="h-6 w-6" />
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Privacy Policy</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    At NexusLabs, we value your privacy above all. This policy explains how we collect and process your digital coordinates when you submit applications or contact forms.
                  </p>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">1. Data Storage</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Since this website runs as a static serverless app, your submissions are transmitted directly to our secure email intake via FormSubmit. We also cache your transaction logs locally on your own computer’s <code>localStorage</code> so you can audit them yourself. We never sell your profile details to advertising hubs.
                  </p>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">2. Cookie Policy</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    We only use local storage values to maintain your chosen visual theme state (light or dark) and render submission history cards.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                    <Scale className="h-6 w-6" />
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Terms of Use</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    By submitting your career inquiry, resume links, or contact requests, you acknowledge the following parameters.
                  </p>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">1. Profile Truthfulness</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Candidates must provide precise, authentic details regarding their skills, current company affiliations, and LinkedIn profiles. Providing fraudulent links may invalidate screening status.
                  </p>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">2. Link Content Liability</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    When specifying third-party resume links (Google Drive, Dropbox, Notion, etc.), candidates are fully responsible for ensuring secure sharing access configurations and compliance.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white px-5 py-2 text-xs font-bold transition cursor-pointer"
                >
                  I Understand
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
}
