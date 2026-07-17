import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Award, Compass, DollarSign, Smile, ArrowRight } from 'lucide-react';

export default function WhyJoinUs() {
  const benefits = [
    {
      icon: <Calendar className="h-6 w-6 text-indigo-500" />,
      title: 'Asynchronous & Flexible Work',
      desc: 'Work where and when you are most productive. We operate on global remote structures and place trust in results over screen monitoring.',
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      title: 'Continuous Learning Budgets',
      desc: 'Up to $2,000 annually for books, tech conferences, premium software courses, and technical certificates to keep your skills sharp.',
    },
    {
      icon: <Compass className="h-6 w-6 text-purple-500" />,
      title: 'Rapid Career Trajectories',
      desc: 'Our engineering ladder is clear and transparent. Move from Associate to Principal, or transition from Dev to Product Lead on explicit indicators.',
    },
    {
      icon: <DollarSign className="h-6 w-6 text-amber-500" />,
      title: 'Highly Competitive Salaries',
      desc: 'We benchmark against the 75th percentile of global tech hubs. Enjoy regular reviews, performance bonuses, and optional workspace setup support.',
    },
    {
      icon: <Smile className="h-6 w-6 text-rose-500" />,
      title: 'Open, Meetings-Light Culture',
      desc: 'No more useless 1-hour huddles. We rely on written Slack briefs, clean JIRA ticket logs, and focused 15-minute alignment standups.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Why Work With Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
              A Culture Built for Modern Talent
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md">
            We strip away administrative bloat so you can focus on building outstanding software, solving client challenges, and expanding your professional horizon.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl dark:hover:shadow-indigo-950/20 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
            >
              <div className="h-12 w-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-slate-700 dark:text-slate-200 mb-5 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 transition-colors">
                {b.icon}
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {b.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-3 leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}

          {/* Quick hiring stats callout box in grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-extrabold text-xl leading-tight">Ready to Take the Leap?</h3>
              <p className="text-indigo-100 text-xs mt-3 leading-relaxed">
                We review applications and contact prospective candidates within 24 hours. Your coding journey starts right here.
              </p>
            </div>
            <a
              href="#careers"
              className="mt-6 text-xs font-bold text-white hover:underline flex items-center gap-1.5"
            >
              View Active Openings
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
