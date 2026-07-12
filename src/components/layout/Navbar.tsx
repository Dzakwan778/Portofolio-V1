import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import TextType from "../reactbits/TextType";
import { ThemeToggle } from "../../theme/ThemeToggle";

interface NavbarProps {
  activeNameIndex?: number;
}

export default function Navbar({ activeNameIndex }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#hero");

  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: "Beranda", href: "#hero" },
    { label: "Tentang Saya", href: "#about" },
    { label: "Keahlian", href: "#skills" },
    { label: "Proyek", href: "#projects" },
    { label: "Kontak", href: "#contact" },
  ];

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close mobile menu on scroll to prevent covering the screen
  useEffect(() => {
    const handleScrollClose = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [isOpen]);

  // Monitor scroll for header shrink/floating layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor scroll of sections to update active page state deterministically
  useEffect(() => {
    const handleScrollActiveSection = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // 35% from the top of the viewport defines the visual focus line
      const focusPoint = scrollPosition + windowHeight * 0.35;

      let currentActive = "#hero";

      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + scrollPosition;
          const absoluteBottom = absoluteTop + rect.height;

          if (focusPoint >= absoluteTop && focusPoint <= absoluteBottom) {
            currentActive = item.href;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScrollActiveSection, { passive: true });
    // Run initially
    handleScrollActiveSection();

    return () => window.removeEventListener("scroll", handleScrollActiveSection);
  }, []);

  const activeIndex = navItems.findIndex((item) => item.href === activeSection);
  const highlightedIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-500 ease-out flex items-center justify-between ${
        scrolled
          ? "top-[16px] w-[90%] max-w-[1000px] h-[64px] bg-surface/95 backdrop-blur-3xl border border-primary/25 rounded-full shadow-[0_12px_40px_rgba(74,200,255,0.12)] px-[24px]"
          : "top-0 w-full h-[76px] bg-surface/95 backdrop-blur-2xl border-b border-border-primary px-[10%]"
      }`}
    >
      {/* Brand/Logo */}
      <a href="#hero" className="flex items-center gap-[10px] no-underline group">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.08 }}
          transition={{ type: "spring" as any, stiffness: 400, damping: 15 }}
          className="flex items-center"
        >
          <img
            src="https://placehold.co/100x100/4ac8ff/ffffff?text=WM"
            alt="Logo"
            className="w-[32px] h-[32px] object-cover rounded-full border border-border-primary transition-all duration-300"
          />
        </motion.div>
        <span className="text-[1.2rem] font-black text-text-primary tracking-[-0.5px] flex items-center gap-[2px]">
          <TextType
            texts={["Wan Ma2", "Dzakwan", "Vloren"]}
            activeIndex={activeNameIndex}
            cursorChar="|"
            typingSpeed={160}
            deletingSpeed={110}
            pauseDuration={3500}
            className="font-black text-text-primary"
          />
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-primary"
          >
            .
          </motion.span>
        </span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-[24px] md:gap-[36px]">
        <ul className="list-none flex items-center gap-[4px] m-0 p-0">
          {navItems.map((item, idx) => {
            const isHighlighted = highlightedIndex === idx;
            const isHovered = hoveredIndex === idx;
            const isActive = activeIndex === idx;

            return (
              <li
                key={idx}
                className="relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={item.href}
                  className={`relative z-10 block py-[8px] px-[14px] no-underline text-[0.9rem] font-semibold transition-colors duration-300 ${
                    isHovered
                      ? "text-primary"
                      : isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </a>
                
                {isHighlighted && (
                  <motion.div
                    layoutId="nav-active-hover-pill"
                    className={`absolute inset-0 rounded-full z-0 transition-colors duration-300 ${
                      isHovered ? "bg-primary/12" : "bg-primary/8"
                    }`}
                    initial={false}
                    transition={{ type: "spring" as any, stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Call to Action Button */}
        <ThemeToggle />
        <motion.a
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring" as any, stiffness: 450, damping: 15 }}
          href="#contact"
          className="py-[10px] px-[20px] bg-primary text-white text-[0.85rem] font-bold rounded-full no-underline shadow-[0_4px_12px_rgba(74,200,255,0.15)] hover:shadow-[0_6px_16px_rgba(74,200,255,0.25)] transition-shadow duration-300"
        >
          Hubungi Saya
        </motion.a>
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex md:hidden items-center gap-3">
        <ThemeToggle />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-text-primary/5 border border-text-primary/10 text-text-primary hover:text-primary transition-all focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: "spring" as any, stiffness: 350, damping: 25 }}
            className={`absolute left-0 right-0 z-40 p-[20px] flex flex-col gap-[16px] md:hidden ${
              scrolled
                ? "top-[calc(100%+12px)] rounded-3xl bg-surface/95 backdrop-blur-3xl border border-primary/25 shadow-[0_16px_40px_rgba(74,200,255,0.16)]"
                : "top-[100%] rounded-b-3xl bg-surface/95 backdrop-blur-2xl border-b border-border-primary shadow-lg"
            }`}
          >
            <ul className="list-none flex flex-col gap-[8px] m-0 p-0">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-[12px] px-[20px] rounded-2xl text-[1rem] font-semibold no-underline transition-all duration-300 ${
                        isActive
                          ? "bg-primary/15 text-primary pl-[26px]"
                          : "text-text-secondary hover:text-text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-indicator"
                            className="w-[6px] h-[6px] rounded-full bg-primary"
                          />
                        )}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-[12px] px-[20px] bg-primary text-white text-center text-[0.95rem] font-bold rounded-full no-underline shadow-[0_4px_12px_rgba(74,200,255,0.15)] hover:shadow-[0_6px_16px_rgba(74,200,255,0.25)] block transition-shadow duration-300 mt-[8px]"
            >
              Hubungi Saya
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
