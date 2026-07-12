import React from "react";
import { RotatingText } from "../components/reactbits/RotatingText";
import { HexagonPattern } from "../components/magicui/HexagonPattern";
import { motion } from "motion/react";

interface HeroSectionProps {
  onIndexChange?: (index: number) => void;
}

export default function HeroSection({ onIndexChange }: HeroSectionProps) {
  // Stagger configurations for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as any,
        stiffness: 140,
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as any,
        stiffness: 100,
        damping: 13,
      },
    },
  };

  const pitchVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as any,
        stiffness: 90,
        damping: 16,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as any,
        stiffness: 110,
        damping: 14,
      },
    },
  };

  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center border-b border-border-primary relative overflow-hidden bg-transparent select-none py-[80px] md:py-0" 
      id="hero"
    >
      {/* 1. Interactive Hexagon Pattern Background Component (Magic UI style) */}
      <HexagonPattern 
        size={44}
        stroke="rgba(15, 23, 42, 0.04)"
        hoverStroke="#4ac8ff"
        hoverRadius={220}
        gridWidth={50}
        gridHeight={28}
        className="opacity-90 transition-opacity duration-500"
      />

      {/* 2. Premium Light Background Blurs (Soft accent lighting) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft blue/cyan ambient glow on the top-right */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.06, scale: 1 }} viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-primary blur-[140px] translate-x-[20%] -translate-y-[20%]" 
        />
        
        {/* Soft secondary ambient glow on the bottom-left */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.03, scale: 1 }} viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-0 left-0 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#2563eb] blur-[120px] -translate-x-[20%] translate-y-[20%]" 
        />

        {/* Soft white-to-transparent linear gradient overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* 3. Hero Interactive Content Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.1 }}
        className="relative z-10 w-full flex flex-col justify-center items-center px-[24px]"
      >
        {/* 3a. Interactive High-End Status Badge */}
        <motion.div 
          variants={badgeVariants}
          className="mb-[18px] sm:mb-[24px] flex items-center gap-[8px] bg-surface border border-border-primary py-[6px] sm:py-[8px] px-[12px] sm:px-[16px] rounded-full text-[0.7rem] sm:text-[0.8rem] font-semibold text-text-secondary shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-primary hover:shadow-[0_4px_16px_rgba(74,200,255,0.1)] transition-all duration-300 cursor-default max-w-full text-center"
        >
          <span className="relative flex h-[8px] w-[8px] shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-primary"></span>
          </span>
          <span className="tracking-[0.5px] truncate sm:whitespace-normal">Open for Collaboration & Freelance Projects</span>
        </motion.div>

        {/* 3b. Heading Title with ReactBits RotatingText */}
        <motion.div 
          variants={titleVariants}
          className="text-center w-full"
        >
          <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold mb-[12px] sm:mb-[20px] flex items-center justify-center gap-[10px] sm:gap-[16px] tracking-tight text-text-primary flex-col sm:flex-row">
            <motion.span 
              className="text-text-primary inline-block cursor-default select-none"
              whileHover={{ 
                scale: 1.12, 
                rotate: -6,
                transition: { type: "spring" as any, stiffness: 350, damping: 10 }
              }}
            >
              I'm
            </motion.span>
            <RotatingText
              texts={["Wan Ma2", "Dzakwan", "Vloren"]}
              onIndexChange={onIndexChange}
              rotationInterval={5500}
              staggerDuration={0.08}
              staggerFrom="first"
              splitBy="characters"
              auto={true}
              loop={true}
              stiffness={110}
              damping={12}
              type="bounce"
              mainClassName="inline-flex py-[2px] px-[16px] sm:px-[20px] bg-[#4ccbff] text-white rounded-full min-w-[160px] xs:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] justify-center overflow-hidden font-bold shadow-[0_8px_20px_rgba(76,203,255,0.2)]"
            />
          </h1>
        </motion.div>
        
        {/* 3c. Elegant Premium Professional Pitch */}
        <motion.div 
          variants={pitchVariants}
          className="text-center px-[8px] sm:px-0"
        >
          <p className="w-full max-w-[650px] mt-[12px] sm:mt-[16px] mx-auto mb-0 text-center leading-[1.6] text-text-secondary text-[0.95rem] sm:text-[1.05rem] font-medium tracking-wide">
            Passionate about crafting pixel-perfect, highly-interactive web architectures and immersive digital experiences that combine robust code with elegant aesthetics.
          </p>
        </motion.div>

        {/* 3d. Staggered CTA Interactive Buttons */}
        <motion.div 
          variants={buttonVariants}
          className="mt-[32px] sm:mt-[44px] gap-[14px] sm:gap-[20px] flex justify-center items-center flex-col sm:flex-row w-full px-[20px] sm:px-0"
        >
          <a 
            href="#about" 
            className="w-full max-w-[260px] sm:w-[190px] h-[52px] sm:h-[56px] flex justify-center items-center gap-[8px] rounded-full no-underline text-[0.95rem] sm:text-[1rem] font-bold transition-all duration-300 ease-in-out bg-[#4ccbff] text-white shadow-[0_8px_20px_rgba(76,203,255,0.15)] hover:shadow-[0_12px_24px_rgba(76,203,255,0.25)] hover:bg-[#2ab8ff] hover:translate-y-[-4px] active:translate-y-[-1px] group"
          >
            Get Started
            <i className="fa-solid fa-arrow-right text-[0.9rem] transition-transform duration-300 group-hover:translate-x-[4px]" />
          </a>
          <a 
            href="#contact" 
            className="w-full max-w-[260px] sm:w-[190px] h-[52px] sm:h-[56px] flex justify-center items-center gap-[8px] rounded-full no-underline text-[0.95rem] sm:text-[1rem] font-bold transition-all duration-300 ease-in-out bg-surface text-[#4ccbff] border-2 border-border-primary hover:border-primary hover:text-primary hover:translate-y-[-4px] active:translate-y-[-1px] hover:shadow-[0_8px_20px_rgba(74,200,255,0.08)]"
          >
            Contact Me
            <i className="fa-solid fa-chevron-right text-[0.8rem]" />
          </a>
        </motion.div>
      </motion.div>

      {/* 4. Elegant Animated Scroll-Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-[30px] flex flex-col items-center gap-[6px] text-text-muted"
      >
        <span className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <i className="fa-solid fa-chevron-down text-[0.95rem] text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
