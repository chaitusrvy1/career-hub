import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      aria-label="Toggle visual theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 360 : 0, scale: darkMode ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={darkMode ? 'absolute invisible' : 'block'}
      >
        <Sun className="h-5 w-5 text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : -360, scale: darkMode ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={darkMode ? 'block' : 'absolute invisible'}
      >
        <Moon className="h-5 w-5 text-indigo-400" />
      </motion.div>
    </button>
  );
}
