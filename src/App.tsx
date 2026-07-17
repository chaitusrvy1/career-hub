import React, { useState, useEffect } from 'react';
import { Briefcase, ChevronRight, Menu, X, Terminal, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
import { Job, SubmissionLog } from './types';

// Components & Sections
import ThemeToggle from './components/ThemeToggle';
import ToastContainer, { ToastItem } from './components/Toast';
import JobModal from './components/JobModal';
import Hero from './sections/Hero';
import About from './sections/About';
import WhyJoinUs from './sections/WhyJoinUs';
import JobsBoard from './sections/JobsBoard';
import ApplicationForm from './sections/ApplicationForm';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  // Theme Management
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_dark_mode');
    return saved === 'true';
  });

  // Apply dark class directly to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nexus_dark_mode', String(darkMode));
  }, [darkMode]);

  // Toast Queue
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  // Job detailed modal state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Prefilled role for application form
  const [preFilledRole, setPreFilledRole] = useState<string>('');

  // Mobile navigation trigger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Submissions state to render live client logs in a local dashboard panel
  const [submissions, setSubmissions] = useState<SubmissionLog[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_submissions_history');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse logs', e);
      }
    }
  }, []);

  // Update submission history log
  const handleSubmissionSuccess = (newLog: SubmissionLog) => {
    const updated = [newLog, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('nexus_submissions_history', JSON.stringify(updated));
  };

  // Clear local logs
  const clearHistoryLog = () => {
    localStorage.removeItem('nexus_submissions_history');
    setSubmissions([]);
    addToast('Submission log history cleared!', 'info');
  };

  // Apply trigger
  const handleApplyToJob = (jobTitle: string) => {
    setPreFilledRole(jobTitle);
    setSelectedJob(null); // Close modal if open

    // Smooth scroll to application form
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
    addToast(`Pre-filled role as "${jobTitle}"`, 'info');
  };

  const handleNavigate = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 antialiased selection:bg-indigo-100 dark:selection:bg-indigo-950 selection:text-indigo-900 transition-colors duration-200">
      
      {/* 1. Global Sticky Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-md shadow-indigo-100 dark:shadow-none">
              <Briefcase className="h-5.5 w-5.5 text-white" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nexus<span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">Labs</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <button 
              onClick={() => handleNavigate('about')} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('careers')} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
            >
              Careers
            </button>
            <button 
              onClick={() => handleNavigate('apply')} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
            >
              Apply Form
            </button>
            <button 
              onClick={() => handleNavigate('contact')} 
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Right utility rail */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle Component */}
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Apply CTA Button */}
            <button
              onClick={() => handleNavigate('careers')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4.5 py-2.5 text-xs font-bold text-white shadow hover:shadow-md transition cursor-pointer"
            >
              Browse Jobs
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-200 md:hidden hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Drawer Slide */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-6 py-4 space-y-3 relative z-40"
          >
            <button
              onClick={() => handleNavigate('about')}
              className="block w-full text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
            >
              About
            </button>
            <button
              onClick={() => handleNavigate('careers')}
              className="block w-full text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
            >
              Careers
            </button>
            <button
              onClick={() => handleNavigate('apply')}
              className="block w-full text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
            >
              Apply Form
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className="block w-full text-left py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigate('careers')}
              className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow mt-2"
            >
              Browse Jobs
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <Hero 
        onExploreJobs={() => handleNavigate('careers')} 
        onContactUs={() => handleNavigate('contact')} 
      />

      {/* 3. About Section */}
      <About />

      {/* 4. Why Join Us Benefit Grid */}
      <WhyJoinUs />

      {/* 5. Career Vacancy Board */}
      <JobsBoard 
        onViewDetails={(job) => setSelectedJob(job)} 
        onApply={(roleTitle) => handleApplyToJob(roleTitle)} 
      />

      {/* 6. Professional Inquiry Application Form */}
      <ApplicationForm 
        preFilledRole={preFilledRole} 
        addToast={addToast} 
        onSubmissionSuccess={handleSubmissionSuccess} 
      />

      {/* 7. Contact Info & Second Form Section */}
      <ContactSection 
        addToast={addToast} 
        onSubmissionSuccess={handleSubmissionSuccess} 
      />

      {/* 8. Active Submissions History dashboard - locally persisted sandbox verification */}
      {submissions.length > 0 && (
        <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 relative z-30">
          <div className="mx-auto max-w-4xl px-6">
            
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-850 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-4 mb-6 gap-4">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    My Active Submission Records ({submissions.length})
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Locally cached logs to verify client-side dispatch parameters.</p>
                </div>
                <button
                  onClick={clearHistoryLog}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline cursor-pointer"
                >
                  Clear History Logs
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 divide-y divide-slate-100 dark:divide-slate-800/80">
                {submissions.map((sub, idx) => (
                  <div key={sub.id} className={`pt-4 first:pt-0 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {sub.type === 'application' ? sub.data.fullName : sub.data.name}
                        </span>
                        <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
                          {sub.type}
                        </span>
                        <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400">
                          Pending Review
                        </span>
                      </div>
                      
                      {sub.type === 'application' ? (
                        <div className="text-slate-600 dark:text-slate-400 space-y-1">
                          <p><strong>Target Placement Role:</strong> {sub.data.preferredRole} ({sub.data.experience})</p>
                          <p><strong>Competencies:</strong> {sub.data.skills}</p>
                          <p className="italic text-slate-500 dark:text-slate-500 font-medium">"{sub.data.message}"</p>
                        </div>
                      ) : (
                        <div className="text-slate-600 dark:text-slate-400 space-y-1">
                          <p><strong>Subject:</strong> {sub.data.subject}</p>
                          <p className="italic text-slate-500 dark:text-slate-500 font-medium">"{sub.data.message}"</p>
                        </div>
                      )}
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{sub.timestamp}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">ID: {sub.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 9. Footer Section */}
      <Footer />

      {/* 10. Floating Job Details Modal Overlay */}
      <JobModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
        onApply={(roleTitle) => handleApplyToJob(roleTitle)} 
      />

      {/* 11. Premium Toasts notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

    </div>
  );
}
