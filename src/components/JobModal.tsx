import React from 'react';
import { X, MapPin, Briefcase, DollarSign, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (jobTitle: string) => void;
}

export default function JobModal({ job, onClose, onApply }: JobModalProps) {
  return (
    <AnimatePresence>
      {job && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Trigger */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Department & Badges */}
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                {job.type}
              </span>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-slate-100 mt-4 leading-tight">
                {job.title}
              </h3>
              
              {/* Meta Stats Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Department</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>{job.department}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Location</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Experience</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Est. Salary</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Job Details */}
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">Role Summary</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">Key Responsibilities</h4>
                <ul className="mt-2.5 space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">Candidate Requirements</h4>
                <ul className="mt-2.5 space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Close Details
              </button>
              <button
                onClick={() => onApply(job.title)}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-sm font-bold shadow-md transition cursor-pointer"
              >
                Apply & Express Interest
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
