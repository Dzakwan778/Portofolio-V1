import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectSection from "./sections/ProjectSection";
import ContactSection from "./sections/ContactSection";
import ScrollVelocity from "./components/reactbits/ScrollVelocity";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Preloader } from "./components/layout/Preloader";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [activeNameIndex, setActiveNameIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="theme-transition min-h-screen relative text-text-primary font-sans selection:bg-primary/30 bg-background"
      >
        {/* Global premium subtle noise overlay */}
        <div className="noise-overlay" />

        <Navbar activeNameIndex={activeNameIndex} />
        <HeroSection onIndexChange={setActiveNameIndex} />
        {/* <ScrollVelocity 
          texts={["Creative Developer", "Interactive Architect", "Frontend Engineer", "UI Designer"]} 
          velocity={3}
        /> */}
        <AboutSection />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}

