import React from "react";
import { motion } from "motion/react";
import { InteractiveTilt } from "../components/reactbits/InteractiveTilt";
import { GridPattern } from "../components/reactbits/GridPattern";

export default function AboutSection() {
  return (
    <section 
      className="py-[120px] px-[10%] bg-transparent flex justify-center border-b border-border-primary relative overflow-hidden" 
      id="about"
    >
      <GridPattern />

      {/* Soft white-to-transparent linear gradient overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b from-background to-transparent pointer-events-none z-[1]" />

      <div className="max-w-[1200px] w-full relative z-10">
        
        {/* HEADER UTAMA */}
        <div className="flex justify-between items-start mb-[56px] relative">
          <div>
            <div className="flex items-center gap-[12px] mb-[16px]">
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ type: "spring" as any, stiffness: 350, damping: 15 }}
                className="relative flex h-[10px] w-[10px]"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-primary"></span>
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ type: "spring" as any, stiffness: 350, damping: 15, delay: 0.1 }}
                className="text-[0.75rem] font-bold uppercase tracking-[3px] text-primary"
              >
                ABOUT ME
              </motion.span>
            </div>
            
            <h2 className="text-[2.25rem] font-extrabold leading-[1.25] text-text-primary">
              {"Mengenal Lebih Dekat ".split("").map((char, index) => (
                <motion.span 
                  key={`t1-${index}`} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.15 + index * 0.02 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {"Tentang ".split("").map((char, index) => (
                <motion.span 
                  key={`t2-${index}`} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.15 + ("Mengenal Lebih Dekat ".length + index) * 0.02 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <span className="text-primary">
                {"Wan Ma2".split("").map((char, index) => (
                  <motion.span 
                    key={`t3-${index}`} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                    transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.15 + ("Mengenal Lebih Dekat Tentang ".length + index) * 0.02 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.8 }}
              className="text-text-secondary mt-[16px] text-[0.95rem] max-w-[600px] leading-[1.6]"
            >
              Seorang developer yang antusias dalam membangun antarmuka web interaktif, sistem otomatisasi cerdas, serta mengelola infrastruktur cloud.
            </motion.p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-[56px] items-stretch">
          
          {/* LEFT COLUMN: INTRO & CAPABILITIES */}
          <div className="flex flex-col justify-center items-start gap-[32px]">
            <div className="space-y-[16px]">
              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.3 }}
                className="text-[1.4rem] font-bold text-text-primary leading-tight"
              >
                Menggabungkan Seni Desain dengan Keandalan Rekayasa Sistem
              </motion.h3>
              
              <div className="leading-[1.6] text-text-secondary text-[0.95rem] sm:text-[1.05rem] font-medium tracking-wide space-y-[16px]">
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.4 }}
                >
                  Saya adalah seorang Frontend Developer dan System Administrator yang gemar mengeksplorasi teknologi modern. Fokus utama saya adalah menciptakan aplikasi web yang responsif, cepat, dan intuitif, yang didukung oleh infrastruktur server serta otomatisasi sistem yang handal dan aman.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.5 }}
                >
                  Dengan latar belakang pengerjaan bot otomatisasi serta deployment aplikasi, saya berkomitmen memberikan pengalaman pengguna terbaik di setiap baris kode yang saya tulis.
                </motion.p>
              </div>
            </div>

            {/* Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] w-full" style={{ perspective: 1200 }}>
              {/* Frontend Card */}
              <InteractiveTilt maxTilt={8} glareMaxOpacity={0.12} glareColor="#4ac8ff">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.5 }}
                  className="p-[20px] bg-surface border border-border-primary rounded-[16px] h-full transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(74,200,255,0.06)] hover:border-primary/60 group"
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                    transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.65 }}
                    className="w-[42px] h-[42px] rounded-[12px] bg-primary/10 flex items-center justify-center text-primary text-[1.2rem] mb-[16px] transition-transform duration-300 group-hover:scale-110"
                  >
                    <i className="fa-solid fa-code"></i>
                  </motion.div>
                  <h4 className="text-[1rem] text-text-primary mb-[6px] font-bold">Frontend</h4>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.5]">React, TypeScript, Tailwind CSS, Next.js</p>
                </motion.div>
              </InteractiveTilt>

              {/* Design Card */}
              <InteractiveTilt maxTilt={8} glareMaxOpacity={0.12} glareColor="#4ac8ff">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.6 }}
                  className="p-[20px] bg-surface border border-border-primary rounded-[16px] h-full transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(74,200,255,0.06)] hover:border-primary/60 group"
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                    transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.75 }}
                    className="w-[42px] h-[42px] rounded-[12px] bg-primary/10 flex items-center justify-center text-primary text-[1.2rem] mb-[16px] transition-transform duration-300 group-hover:scale-110"
                  >
                    <i className="fa-brands fa-figma"></i>
                  </motion.div>
                  <h4 className="text-[1rem] text-text-primary mb-[6px] font-bold">Design</h4>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.5]">Interface Prototyping & Visual Assets</p>
                </motion.div>
              </InteractiveTilt>

              {/* System Card */}
              <InteractiveTilt maxTilt={8} glareMaxOpacity={0.12} glareColor="#4ac8ff">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.7 }}
                  className="p-[20px] bg-surface border border-border-primary rounded-[16px] h-full transition-shadow duration-300 hover:shadow-[0_12px_24px_rgba(74,200,255,0.06)] hover:border-primary/60 group"
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                    transition={{ type: "spring" as any, stiffness: 350, damping: 12, delay: 0.85 }}
                    className="w-[42px] h-[42px] rounded-[12px] bg-primary/10 flex items-center justify-center text-primary text-[1.2rem] mb-[16px] transition-transform duration-300 group-hover:scale-110"
                  >
                    <i className="fa-solid fa-server"></i>
                  </motion.div>
                  <h4 className="text-[1rem] text-text-primary mb-[6px] font-bold">System</h4>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.5]">VPS, Linux, Docker, Automated Bots</p>
                </motion.div>
              </InteractiveTilt>
            </div>

            {/* Actions Buttons */}
            <div className="flex flex-wrap gap-[16px] mt-[8px]">
              <motion.a
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.8 }}
                href="#contact"
                className="py-[14px] px-[32px] rounded-full font-bold text-[0.95rem] no-underline shadow-[0_8px_20px_rgba(74,200,255,0.15)] bg-primary text-white hover:bg-[#2ab8ff] transition-all duration-300"
              >
                Hubungi Saya
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.9 }}
                href="#projects"
                className="py-[14px] px-[32px] rounded-full font-bold text-[0.95rem] no-underline border-2 border-border-primary text-text-secondary hover:border-primary hover:text-primary bg-transparent transition-all duration-300"
              >
                Lihat Proyek
              </motion.a>
            </div>
          </div>

          {/* RIGHT COLUMN: PREMIUM INTERACTIVE ID BADGE */}
          <div className="flex items-center justify-center" style={{ perspective: 1200 }}>
            <InteractiveTilt maxTilt={15} glareMaxOpacity={0.25} glareColor="#4ac8ff" className="w-full max-w-[340px]">
              <div
                className="relative w-full aspect-[3/4.5] bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-slate-800 rounded-[24px] p-[24px] shadow-[0_20px_50px_rgba(15,23,42,0.3)] overflow-hidden flex flex-col justify-between"
              >
                {/* Mesh Accent Lights */}
                <div className="absolute top-[-50px] left-[-50px] w-[150px] h-[150px] rounded-full bg-primary/10 blur-[40px] pointer-events-none" />
                <div className="absolute bottom-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#38bdf8]/10 blur-[40px] pointer-events-none" />

                {/* Lanyard Strap Slot */}
                <div className="flex justify-center w-full mb-[10px]">
                  <div className="w-[50px] h-[8px] bg-slate-800 rounded-full border border-slate-700/50" />
                </div>

                {/* Badge Header */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-[16px] mb-[16px]">
                  <div>
                    <h4 className="text-[0.7rem] font-bold text-slate-400 tracking-[1.5px] uppercase">CREATIVE STAFF</h4>
                    <p className="text-[0.8rem] font-black text-white mt-[2px]">PORTFOLIO CONSOLE</p>
                  </div>
                  <div className="flex items-center gap-[6px] px-[8px] py-[4px] bg-slate-900 rounded-full border border-slate-800">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#10b981] animate-pulse"></span>
                    <span className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-[0.5px]">ONLINE</span>
                  </div>
                </div>

                {/* Badge Photo Frame & Core Info */}
                <div className="flex flex-col items-center flex-1 justify-center my-[10px]">
                  <div className="relative p-[8px] bg-slate-900/50 border border-slate-800 rounded-[20px] mb-[16px] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#4ac8ff]/20 to-transparent rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src="https://placehold.co/180x180/1e293b/4ac8ff?text=WM"
                      alt="Wan Ma2 profile photo"
                      className="w-[120px] h-[120px] rounded-[14px] object-cover border border-slate-700 relative z-10 transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Decorative glowing corners */}
                    <span className="absolute top-2 left-2 w-[8px] h-[8px] border-t-2 border-l-2 border-primary/40 z-20"></span>
                    <span className="absolute top-2 right-2 w-[8px] h-[8px] border-t-2 border-r-2 border-primary/40 z-20"></span>
                    <span className="absolute bottom-2 left-2 w-[8px] h-[8px] border-b-2 border-l-2 border-primary/40 z-20"></span>
                    <span className="absolute bottom-2 right-2 w-[8px] h-[8px] border-b-2 border-r-2 border-primary/40 z-20"></span>
                  </div>

                  <h3 className="text-[1.25rem] font-extrabold text-white tracking-tight">Wan Ma2</h3>
                  <p className="text-[0.8rem] font-medium text-primary mt-[2px]">Full-Stack Developer</p>
                  <p className="text-[0.7rem] text-slate-500 font-mono mt-[4px]">ID: WM-2026.07.09</p>
                </div>

                {/* Badge Footer & Barcode */}
                <div className="border-t border-slate-800/80 pt-[16px] mt-[16px]">
                  <div className="flex justify-between items-center">
                    <div className="space-y-[2px]">
                      <span className="block text-[0.55rem] font-bold text-slate-500 uppercase tracking-wider">DEV SYSTEM</span>
                      <span className="block text-[0.7rem] font-mono text-slate-300">LINUX / NODEJS / REACT</span>
                    </div>
                    {/* Visual Barcode */}
                    <div className="flex flex-col items-end opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-[1.5px] h-[24px]">
                        <span className="w-[1.5px] h-full bg-slate-400"></span>
                        <span className="w-[3.5px] h-full bg-slate-400"></span>
                        <span className="w-[1px] h-full bg-slate-400"></span>
                        <span className="w-[4.5px] h-full bg-slate-400"></span>
                        <span className="w-[1.5px] h-full bg-slate-400"></span>
                        <span className="w-[2.5px] h-full bg-slate-400"></span>
                        <span className="w-[3.5px] h-full bg-slate-400"></span>
                        <span className="w-[1px] h-full bg-slate-400"></span>
                        <span className="w-[4.5px] h-full bg-slate-400"></span>
                      </div>
                      <span className="text-[0.5rem] font-mono text-slate-500 mt-[4px] tracking-[1px] uppercase">WM2 CODES</span>
                    </div>
                  </div>
                </div>

              </div>
            </InteractiveTilt>
          </div>

        </div>

      </div>

      {/* Soft white-to-transparent linear gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
    </section>
  );
}
