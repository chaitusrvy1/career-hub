import React from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { Job } from '../types';
import { motion } from 'motion/react';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onApply: (jobTitle: string) => void;
  key?: string;
}

export default function JobCard({ job, onViewDetails, onApply }: JobCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col justify-between rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg dark:hover:shadow-indigo-950/20 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative top-right brand gradient flare */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Badges line */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full">
            {job.type}
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            {job.department}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 mt-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1">
          {job.title}
        </h3>

        {/* Vital Info Grid */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{job.salary}</span>
          </div>
        </div>

        {/* Summary text */}
        <p className="text-slate-600 dark:text-slate-400 text-xs mt-4 line-clamp-2 leading-relaxed">
          {job.summary}
        </p>

        {/* Skills Tag Cloud */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-800"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 font-medium px-1.5 py-0.5">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer trigger line */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails(job)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          View Details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        
        <button
          onClick={() => onApply(job.title)}
          className="rounded-xl bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-indigo-600 dark:hover:text-white dark:text-slate-100 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 shadow-sm cursor-pointer"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
}
