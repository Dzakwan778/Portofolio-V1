import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing systems...");

  useEffect(() => {
    // Elegant progressing simulation with variable speeds for organic feel
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 6) + 3; // randomized speed increments
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // short delay after hitting 100%
      }
      setProgress(start);

      // Dynamically update status text based on progress
      if (start < 30) {
        setStatusText("Loading design tokens...");
      } else if (start < 60) {
        setStatusText("Optimizing core components...");
      } else if (start < 85) {
        setStatusText("Rendering workspace engine...");
      } else {
        setStatusText("System ready.");
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070a13] text-white select-none overflow-hidden font-sans"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(76,203,255,0.07),transparent_50%)] pointer-events-none" />

      {/* Decorative tech grid backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" 
      />

      <div className="relative flex flex-col items-center w-full max-w-[320px] px-6">
        {/* Elegant Abstract Icon / Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-[70px] h-[70px] mb-8 flex items-center justify-center"
        >
          {/* External rotating frame */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-0 rounded-xl border border-dashed border-[#4CCBFF]/40"
          />
          {/* Inner solid glowing frame */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute w-[50px] h-[50px] rounded-lg border border-[#2F6BFF] bg-gradient-to-tr from-[#2F6BFF]/10 to-[#4CCBFF]/10 shadow-[0_0_15px_rgba(76,203,255,0.2)]"
          />
          {/* Core dot indicator */}
          <span className="w-[8px] h-[8px] rounded-full bg-[#4CCBFF] shadow-[0_0_8px_#4CCBFF]" />
        </motion.div>

        {/* Brand / Name Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-[1.25rem] font-bold tracking-[0.2em] text-[#F4F7FB] uppercase font-sans">
            Wan Ma2
          </h1>
          <p className="text-[0.65rem] tracking-[0.3em] text-[#94A3B8]/80 font-mono mt-1 uppercase">
            Portfolio
          </p>
        </motion.div>

        {/* Modern Minimal Progress bar */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4CCBFF] to-[#2F6BFF] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Stats Row */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] text-[#94A3B8]">
          <motion.span 
            key={statusText}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="tracking-wider"
          >
            {statusText}
          </motion.span>
          <span className="font-semibold text-[#4CCBFF]">{progress}%</span>
        </div>
      </div>

      {/* Frame details for extra premium tech touch */}
      <div className="absolute top-8 left-8 font-mono text-[9px] text-[#94A3B8]/30 tracking-widest hidden sm:block">
        SYS_VER: 2.1.0 // ONLINE
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[#94A3B8]/30 tracking-widest hidden sm:block">
        © {new Date().getFullYear()} ALL RIGHTS RESERVED
      </div>
    </motion.div>
  );
};
