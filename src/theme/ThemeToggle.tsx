import React from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'motion/react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center w-[64px] h-[32px] rounded-full p-[4px] cursor-pointer 
        transition-all duration-500 focus:outline-none border group shrink-0
        ${isDark 
          ? 'bg-[#0f172a] border-[#1e293b] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:border-primary/50' 
          : 'bg-[#f1f5f9] border-[#e2e8f0] shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] hover:border-primary/30'
        }
      `}
      aria-label="Toggle theme"
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-[8px] pointer-events-none">
        <i className={`fa-solid fa-sun text-[0.75rem] transition-all duration-500 ${isDark ? 'opacity-30 text-slate-500 scale-90' : 'opacity-100 text-amber-500 scale-100'}`} />
        <i className={`fa-solid fa-moon text-[0.75rem] transition-all duration-500 ${isDark ? 'opacity-100 text-[#818cf8] scale-100' : 'opacity-30 text-slate-400 scale-90'}`} />
      </div>

      {/* Subtle glow effect for thumb */}
      {isDark && (
        <motion.div 
          layout
          className="absolute w-[22px] h-[22px] rounded-full bg-[#818cf8]/30 blur-[6px] pointer-events-none"
          animate={{ x: 32 }}
          transition={{
            type: "spring" as any,
            stiffness: 400,
            damping: 25
          }}
        />
      )}

      {/* Thumb */}
      <motion.div
        layout
        className={`
          w-[24px] h-[24px] rounded-full flex items-center justify-center relative z-10 
          shadow-[0_2px_8px_rgba(0,0,0,0.15)] border transition-colors duration-500
          ${isDark 
            ? 'bg-[#1e293b] border-[#334155]' 
            : 'bg-white border-[#e2e8f0]'
          }
        `}
        animate={{
          x: isDark ? 30 : 0,
        }}
        transition={{
          type: "spring" as any,
          stiffness: 400,
          damping: 25
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.i
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className={`fa-solid ${isDark ? 'fa-moon text-[#a5b4fc]' : 'fa-sun text-amber-500'} text-[0.65rem]`}
          />
        </AnimatePresence>
      </motion.div>
    </button>
  );
};
