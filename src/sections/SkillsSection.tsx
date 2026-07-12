import React from "react";
import { Skill, SkillCategory } from "../types";
import { LogoWall, LogoWallItem } from "../components/reactbits/LogoWall";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { InteractiveTilt } from "../components/reactbits/InteractiveTilt";

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Membuat antarmuka responsif & interaktif",
    iconClass: "fa-solid fa-code",
  },
  {
    title: "Backend",
    description: "Membangun logic, API, dan sistem",
    iconClass: "fa-solid fa-server",
  },
  {
    title: "Tools & Others",
    description: "Tools pendukung development workflow",
    iconClass: "fa-solid fa-screwdriver-wrench",
  },
  {
    title: "System",
    description: "Mengelola server dan infrastruktur",
    iconClass: "fa-solid fa-cloud",
  },
];

const languageSkills: Skill[] = [
  { name: "TypeScript", percentage: 90, iconClass: "fa-brands fa-square-js text-[#3178c6]" },
  { name: "JavaScript", percentage: 85, iconClass: "fa-brands fa-js text-[#f7df1e]" },
  { name: "HTML", percentage: 95, iconClass: "fa-brands fa-html5 text-[#e34f26]" },
  { name: "CSS", percentage: 90, iconClass: "fa-brands fa-css3-alt text-[#1572b6]" },
  { name: "SASS", percentage: 75, iconClass: "fa-brands fa-sass text-[#cc6699]" },
];

const frameworkSkills: Skill[] = [
  { name: "React", percentage: 90, iconClass: "fa-brands fa-react spin-icon text-[#61dafb]" },
  { name: "Next.js", percentage: 85, iconClass: "fa-solid fa-n text-[#000000]" },
  { name: "Tailwind CSS", percentage: 90, iconClass: "fa-solid fa-wind text-[#06b6d4]" },
  { name: "Node.js", percentage: 70, iconClass: "fa-brands fa-node-js text-[#339933]" },
  { name: "Express.js", percentage: 65, iconClass: "fa-solid fa-server text-[#4f46e5]" },
];

const toolSkills: Skill[] = [
  { name: "Git", percentage: 90, iconClass: "fa-brands fa-git-alt text-[#f05032]" },
  { name: "Figma", percentage: 85, iconClass: "fa-brands fa-figma text-[#f24e1e]" },
  { name: "VS Code", percentage: 95, iconClass: "fa-solid fa-laptop-code text-[#007acc]" },
  { name: "Firebase", percentage: 70, iconClass: "fa-solid fa-fire text-[#ffca28]" },
  { name: "MySQL", percentage: 65, iconClass: "fa-solid fa-database text-[#00758f]" },
];

const logoItems: LogoWallItem[] = [
  { iconClass: "fa-brands fa-html5 text-[#e34f26]" },
  { iconClass: "fa-brands fa-css3-alt text-[#1572b6]" },
  { iconClass: "fa-brands fa-js text-[#f7df1e]" },
  { text: "TS" },
  { iconClass: "fa-brands fa-react text-[#61dafb]" },
  { iconClass: "fa-brands fa-node-js text-[#339933]" },
  { iconClass: "fa-solid fa-wind text-[#06b6d4]" },
  { iconClass: "fa-brands fa-git-alt text-[#f05032]" },
  { iconClass: "fa-brands fa-github text-[#181717]" },
  { iconClass: "fa-brands fa-figma text-[#f24e1e]" },
  { iconClass: "fa-solid fa-laptop-code text-[#007acc]" },
  { iconClass: "fa-brands fa-docker text-[#2496ed]" },
  { iconClass: "fa-brands fa-linux text-[#f0b823]" },
  { iconClass: "fa-solid fa-fire text-[#ffca28]" },
  { iconClass: "fa-brands fa-sass text-[#cc6699]" },
];

const SkillItem = ({ skill, index, columnIndex }: { skill: Skill; index: number; columnIndex: number; key?: React.Key }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  const baseDelay = 0.3 + (columnIndex * 0.15) + (index * 0.1);

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex justify-between items-center text-[0.85rem] font-semibold text-text-primary">
        <span className="flex items-center gap-[8px]">
          <i className={skill.iconClass}></i> {skill.name}
        </span>
        <div className="flex text-text-secondary">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
            onViewportEnter={() => {
              count.set(0);
              animate(count, skill.percentage, { duration: 1.2, delay: baseDelay, ease: "easeOut" });
            }}
          >
            {rounded}
          </motion.span>
          <span>%</span>
        </div>
      </div>
      <div className="w-full h-[8px] bg-background-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
          transition={{ duration: 1.2, delay: baseDelay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-[#2F6BFF] rounded-full"
        />
      </div>
    </div>
  );
};

export default function SkillsSection() {
  return (
    <section className="py-[80px] md:py-[120px] px-[24px] md:px-[10%] bg-transparent flex justify-center border-b border-border-primary relative overflow-hidden" id="skills">
      {/* Premium Skills Background Composition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle dot pattern with premium mask fading */}
        <div 
          className="absolute inset-0 opacity-[0.85] bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" 
        />
        
        {/* Elegant ambient glow highlights */}
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#2563eb]/3 blur-[140px]" />

        {/* Soft white-to-transparent linear gradient overlay at the top */}
        <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b from-background to-transparent pointer-events-none z-[1]" />
      </div>

      <div className="max-w-[1200px] w-full relative z-10">
        {/* HEADER UTAMA */}
        <div className="flex justify-between items-start mb-[48px] relative">
          <div>
            <div className="flex items-center gap-[8px] mb-[12px]">
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
                SKILLS
              </motion.span>
            </div>
            
            <h2 className="text-[2.25rem] font-extrabold leading-[1.25] text-text-primary flex flex-wrap gap-[8px]">
              {["Skills", "&", "Technologies"].map((word, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }} 
                  transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.15 + i * 0.05 }} 
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <div className="basis-full h-0"></div>
              {["I", "Work"].map((word, i) => (
                <motion.span 
                  key={i + 3} 
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }} 
                  transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.3 + i * 0.05 }} 
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }} 
                transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.4 }} 
                className="text-primary inline-block"
              >
                With
              </motion.span>
            </h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.5 }}
              className="text-text-secondary mt-[16px] text-[0.95rem] max-w-[500px] leading-[1.6]"
            >
              Berbagai teknologi, bahasa pemrograman, dan tools yang sedang saya
              pelajari dan kuasai saat ini.
            </motion.p>
          </div>
        </div>

      {/* 4 KATEGORI UTAMA (TOP CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[40px]">
        {categories.map((cat, idx) => (
          <InteractiveTilt key={idx} maxTilt={10} glareMaxOpacity={0.12} glareColor="#4ac8ff">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.2 + idx * 0.1 }}
              className="bg-background-secondary border border-border-primary rounded-[16px] p-[20px] h-full flex items-center gap-[16px] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_20px_rgba(74,200,255,0.08)] group"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-[48px] h-[48px] rounded-[12px] bg-surface border border-border-primary flex items-center justify-center text-primary text-[1.25rem] transition-transform duration-300 group-hover:scale-105">
                  <i className={cat.iconClass}></i>
                </div>
                <div className="w-[14px] h-[3px] bg-primary rounded-full mt-[8px]"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-[0.95rem] font-bold text-text-primary mb-[4px]">{cat.title}</h4>
                <p className="text-[0.75rem] text-text-secondary leading-[1.4]">{cat.description}</p>
              </div>
            </motion.div>
          </InteractiveTilt>
        ))}
      </div>

      {/* 3 KOLOM GRID DETAIL SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mb-[48px]">
        {/* KOLOM 1: LANGUAGE */}
        <InteractiveTilt maxTilt={5} glareMaxOpacity={0.08} glareColor="#4ac8ff" className="h-full">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
            transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.3 }}
            className="bg-surface border border-border-primary rounded-[20px] p-[28px] h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_20px_rgba(74,200,255,0.08)]"
          >
            <div className="flex items-center gap-[8px] mb-[24px] border-b border-border-primary pb-[12px]">
              <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
              <span className="text-[0.75rem] font-bold tracking-[1.5px] text-primary">LANGUAGE</span>
            </div>
            <div className="flex flex-col gap-[20px]">
              {languageSkills.map((skill, idx) => (
                <SkillItem key={idx} skill={skill} index={idx} columnIndex={0} />
              ))}
            </div>
          </motion.div>
        </InteractiveTilt>

        {/* KOLOM 2: FRAMEWORK / LIBRARY */}
        <InteractiveTilt maxTilt={5} glareMaxOpacity={0.08} glareColor="#4ac8ff" className="h-full">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
            transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.4 }}
            className="bg-surface border border-border-primary rounded-[20px] p-[28px] h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_20px_rgba(74,200,255,0.08)]"
          >
            <div className="flex items-center gap-[8px] mb-[24px] border-b border-border-primary pb-[12px]">
              <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
              <span className="text-[0.75rem] font-bold tracking-[1.5px] text-primary">FRAMEWORK / LIBRARY</span>
            </div>
            <div className="flex flex-col gap-[20px]">
              {frameworkSkills.map((skill, idx) => (
                <SkillItem key={idx} skill={skill} index={idx} columnIndex={1} />
              ))}
            </div>
          </motion.div>
        </InteractiveTilt>

        {/* KOLOM 3: TOOLS & DATABASE */}
        <InteractiveTilt maxTilt={5} glareMaxOpacity={0.08} glareColor="#4ac8ff" className="h-full">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
            transition={{ type: "spring" as any, stiffness: 250, damping: 15, delay: 0.5 }}
            className="bg-surface border border-border-primary rounded-[20px] p-[28px] h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_8px_20px_rgba(74,200,255,0.08)]"
          >
            <div className="flex items-center gap-[8px] mb-[24px] border-b border-border-primary pb-[12px]">
              <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
              <span className="text-[0.75rem] font-bold tracking-[1.5px] text-primary">TOOLS & DATABASE</span>
            </div>
            <div className="flex flex-col gap-[20px]">
              {toolSkills.map((skill, idx) => (
                <SkillItem key={idx} skill={skill} index={idx} columnIndex={2} />
              ))}
            </div>
          </motion.div>
        </InteractiveTilt>
      </div>

      {/* FOOTER: REACTBITS LOGO LOOP */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mt-[60px] border-t border-border-primary pt-[32px]"
      >
        <div className="flex items-center gap-[8px] mb-[24px]">
          <span className="w-[6px] h-[6px] rounded-full bg-primary"></span>
          <span className="text-[0.7rem] font-bold tracking-[2px] text-text-secondary">TOOLS & TECHNOLOGIES I USE</span>
        </div>

        <LogoWall
          items={logoItems}
          direction="left"
          speed="medium"
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
        />
      </motion.div>

    </div>
  </section>
  );
}

