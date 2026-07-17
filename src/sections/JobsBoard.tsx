import React, { useState } from 'react';
import { Briefcase, Search, Filter, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import jobsData from '../data/jobs.json';

interface JobsBoardProps {
  onViewDetails: (job: Job) => void;
  onApply: (jobTitle: string) => void;
}

export default function JobsBoard({ onViewDetails, onApply }: JobsBoardProps) {
  const jobsList = jobsData as Job[];

  // Filter state variables
  const [search, setSearch] = useState('');
  const [selectedExp, setSelectedExp] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');

  // Derive filter option sets dynamically from our JSON dataset
  const experienceOptions = ['All', 'Junior', 'Mid-level', 'Senior'];
  const locationOptions = ['All', 'Remote', 'Hybrid', 'San Francisco', 'Austin', 'London'];
  const techOptions = ['All', 'React', 'Python', 'Figma', 'Marketing', 'DevOps'];

  // Apply filters to dataset
  const filteredJobs = jobsList.filter((job) => {
    // 1. Text Search matching title, summary, skills or description
    const searchString = search.toLowerCase();
    const matchesSearch = 
      job.title.toLowerCase().includes(searchString) ||
      job.summary.toLowerCase().includes(searchString) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchString)) ||
      job.description.toLowerCase().includes(searchString);

    // 2. Experience Filter matches substring (e.g., 'Senior', 'Junior', 'Mid-level')
    const matchesExp = selectedExp === 'All' || job.experience.toLowerCase().includes(selectedExp.toLowerCase());

    // 3. Location Filter matches substring or remote label
    const matchesLoc = selectedLoc === 'All' || job.location.toLowerCase().includes(selectedLoc.toLowerCase());

    // 4. Tech Filter matches the designated primary tech tag or explicit skills
    const matchesTech = selectedTech === 'All' || 
      job.technology.toLowerCase() === selectedTech.toLowerCase() ||
      job.skills.some(skill => skill.toLowerCase() === selectedTech.toLowerCase());

    return matchesSearch && matchesExp && matchesLoc && matchesTech;
  });

  const resetFilters = () => {
    setSearch('');
    setSelectedExp('All');
    setSelectedLoc('All');
    setSelectedTech('All');
  };

  return (
    <section id="careers" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-900/80">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Join Our Squad
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              Explore Active Career Openings
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-lg">
              We update our positions regularly based on client scoping. Apply directly to initiate quick screening cycles within 24 hours.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-900 px-5 py-3.5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex gap-6 shrink-0 text-xs font-semibold">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block">Total Roles</span>
              <span className="text-slate-900 dark:text-white text-base font-bold mt-0.5 block">{jobsList.length}</span>
            </div>
            <div className="border-l border-slate-100 dark:border-slate-800 pl-6">
              <span className="text-slate-400 uppercase tracking-wider block">Filtered</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-base font-bold mt-0.5 block">{filteredJobs.length}</span>
            </div>
          </div>
        </div>

        {/* Live Filters Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm mb-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            
            {/* Search input */}
            <div className="relative">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 block">Search Keyword</span>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. React, Engineer, Figma..."
                  className="w-full text-xs pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Experience drop button set */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 block">Experience Level</span>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {experienceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Experience Levels' : opt}</option>
                ))}
              </select>
            </div>

            {/* Location selector */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 block">Work Location</span>
              <select
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {locationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Locations' : opt}</option>
                ))}
              </select>
            </div>

            {/* Technology selector */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 block">Primary Technology</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                {techOptions.map(opt => (
                  <option key={opt} value={opt}>{opt === 'All' ? 'All Technologies' : opt}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Applied filters feedback row */}
          {(search || selectedExp !== 'All' || selectedLoc !== 'All' || selectedTech !== 'All') && (
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Tags:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md">
                    Keyword: {search}
                    <button onClick={() => setSearch('')} className="hover:text-indigo-900"><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedExp !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md">
                    Exp: {selectedExp}
                    <button onClick={() => setSelectedExp('All')} className="hover:text-indigo-900"><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedLoc !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md">
                    Loc: {selectedLoc}
                    <button onClick={() => setSelectedLoc('All')} className="hover:text-indigo-900"><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedTech !== 'All' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md">
                    Tech: {selectedTech}
                    <button onClick={() => setSelectedTech('All')} className="hover:text-indigo-900"><X className="h-3 w-3" /></button>
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline"
              >
                Clear All filters
              </button>
            </div>
          )}
        </div>

        {/* Cards Render Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={onViewDetails}
                onApply={onApply}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl shadow-sm">
            <Briefcase className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">No matching vacancies</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              We couldn't locate any listings that align with your search variables. Try softening your filters or resetting keywords.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
