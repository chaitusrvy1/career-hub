import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Sparkles, Code, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Code className="h-6 w-6 text-indigo-500" />,
      title: 'Pristine Code Craftsmanship',
      desc: 'We treat coding as an art. We write beautiful, modular, highly tested TypeScript layouts and keep our bundles clean, fast, and light.',
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: 'Human-First Empathy',
      desc: 'Work is a single pillar of life. We support flexible timelines, remote flexibility, mental rest cycles, and direct, supportive communications.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      title: 'Continuous Growth',
      desc: 'We sponsor direct learning stipends, conference seats, book clusters, and internal tech showcases to foster mutual skill scaling.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-900/80">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Intro grid */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 leading-tight">
              An Agile Force Driving Software Engineering Excellence
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-6 leading-relaxed">
              Founded by developers for developers, NexusLabs is a digital workspace solution and elite technical talent provider. We believe that top tier products can only emerge from environments that prioritize autonomy, clean architectural patterns, and transparent teamwork.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
              Whether we are building microservices in Python, designing state-of-the-art interactive dashboards in React, or matching talented candidate specialists with thriving partners, we deliver with speed and clarity.
            </p>
          </div>

          {/* Mission & Vision Bento */}
          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm"
            >
              <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">Our Mission</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2.5 leading-relaxed">
                To build lightning-fast web applications while creating seamless pathways for tech candidates and corporations to form highly productive alliances.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm"
            >
              <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">Our Vision</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2.5 leading-relaxed">
                A globally connected community where modern talent matches happen instantly based on verified skill competencies and culture alignment.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values Block */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Our Shared Core Values</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2">The engineering principles and social benchmarks guiding our daily releases</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm"
              >
                <div className="mb-4">{v.icon}</div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">{v.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2.5 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
