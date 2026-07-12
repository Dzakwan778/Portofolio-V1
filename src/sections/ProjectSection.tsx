import React, { useState } from "react";
import { motion } from "motion/react";
import { InteractiveTilt } from "../components/reactbits/InteractiveTilt";
import { ProjectDetailModal } from "../components/ProjectDetailModal";

// @ts-ignore
const metadataModules = import.meta.glob('../projects/*/metadata.json', { eager: true, import: 'default' });
// @ts-ignore
const readmeModules = import.meta.glob('../projects/*/README.md', { eager: true, query: '?raw', import: 'default' });

const dynamicProjects = Object.entries(metadataModules).map(([path, metadata]) => {
  const projectDir = path.replace('/metadata.json', '');
  const readmePath = `${projectDir}/README.md`;
  const readme = readmeModules[readmePath] || '';
  return { metadata: metadata as any, readme: readme as string };
}).sort((a, b) => (a.metadata.order || 99) - (b.metadata.order || 99));

const getTagIcon = (tag: string) => {
  switch (tag) {
    case "Node.js":
      return <i className="fa-brands fa-node-js text-[#339933] mr-1.5"></i>;
    case "Baileys":
      return <i className="fa-solid fa-link text-[#25d366] mr-1.5"></i>;
    case "MongoDB":
      return <i className="fa-solid fa-database text-[#47a248] mr-1.5"></i>;
    case "Express.js":
      return <i className="fa-solid fa-server text-[#000000] mr-1.5"></i>;
    case "OpenAI API":
      return <i className="fa-solid fa-brain text-[#412991] mr-1.5"></i>;
    case "MySQL":
      return <i className="fa-solid fa-database text-[#00758f] mr-1.5"></i>;
    case "Kotlin":
      return <i className="fa-brands fa-android text-[#3ddc84] mr-1.5"></i>;
    case "Firebase":
      return <i className="fa-solid fa-fire text-[#ffca28] mr-1.5"></i>;
    case "Room DB":
      return <i className="fa-solid fa-box text-[#4479a1] mr-1.5"></i>;
    case "Material 3":
      return <i className="fa-solid fa-layer-group text-[#7f52ff] mr-1.5"></i>;
    default:
      return null;
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 35, scale: 0.97 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as any,
      stiffness: 180,
      damping: 14,
      delay: delay
    }
  }),
  hover: {
    y: -8,
    borderColor: "var(--primary)",
    boxShadow: "0 12px 30px var(--shadow-medium)",
    transition: {
      type: "spring" as any,
      stiffness: 300,
      damping: 20
    }
  }
};

const tagVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (custom: { cardDelay: number; tagIdx: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as any,
      stiffness: 260,
      damping: 15,
      delay: custom.cardDelay + 0.35 + custom.tagIdx * 0.05
    }
  })
};

export default function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section className="py-[120px] px-[10%] bg-transparent flex justify-center border-b border-border-primary relative overflow-hidden" id="projects">
      {/* Premium Projects Background Composition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Barely noticeable noise/grain texture (opacity below 1%) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.006] mix-blend-overlay" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="projectsNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
        </svg>

        {/* Top-Right Abstract Technology Pattern */}
        <div 
          className="absolute -top-12 -right-12 w-[550px] h-[550px] opacity-[0.3] text-[#D8E3EC] [mask-image:radial-gradient(circle_at_top_right,black_40%,transparent_90%)] [WebkitMaskImage:radial-gradient(circle_at_top_right,black_40%,transparent_90%)]"
        >
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Blueprint/Wireframe paths with rounded corners */}
            <path d="M 120 40 H 280 A 16 16 0 0 1 296 56 V 180 L 340 224 V 320" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 60 140 H 160 A 10 10 0 0 0 170 130 V 80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 220 40 V 260 L 160 320" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            <path d="M 240 110 H 296" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            
            {/* Connected circular nodes */}
            <circle cx="120" cy="40" r="4.5" fill="currentColor" />
            <circle cx="296" cy="56" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="340" cy="320" r="5" fill="currentColor" />
            <circle cx="60" cy="140" r="4.5" fill="currentColor" />
            <circle cx="170" cy="80" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="160" cy="320" r="4" fill="currentColor" />
            <circle cx="240" cy="110" r="3" fill="currentColor" />
            
            {/* Delicate radar/geometric circular indicators */}
            <path d="M 260 20 A 120 120 0 0 1 380 140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 5" />
            <circle cx="380" cy="20" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
          </svg>
        </div>

        {/* Bottom-Left Abstract Technology Pattern */}
        <div 
          className="absolute -bottom-16 -left-16 w-[550px] h-[550px] opacity-[0.3] text-[#D8E3EC] [mask-image:radial-gradient(circle_at_bottom_left,black_40%,transparent_90%)] [WebkitMaskImage:radial-gradient(circle_at_bottom_left,black_40%,transparent_90%)]"
        >
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Blueprint/Wireframe paths with rounded corners */}
            <path d="M 40 80 L 110 150 A 16 16 0 0 0 122 155 H 280" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 70 230 H 200 A 12 12 0 0 1 212 242 V 330" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 122 155 V 280 L 70 330" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
            <path d="M 230 80 V 155" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

            {/* Connected circular nodes */}
            <circle cx="40" cy="80" r="5" fill="currentColor" />
            <circle cx="280" cy="155" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="70" cy="230" r="4" fill="currentColor" />
            <circle cx="212" cy="330" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="70" cy="330" r="4" fill="currentColor" />
            <circle cx="230" cy="80" r="3" fill="currentColor" />

            {/* Micro grid alignment details */}
            <line x1="20" y1="280" x2="60" y2="280" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="260" x2="20" y2="300" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
      </div>

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
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ type: "spring" as any, stiffness: 200, damping: 18, delay: 0.1 }}
                className="text-[0.75rem] font-bold uppercase tracking-[3px] text-primary"
              >
                PROJECTS
              </motion.span>
            </div>
            <h2 className="text-[2.25rem] font-extrabold leading-[1.25] text-text-primary flex flex-wrap gap-x-[10px]">
              {["Projects", "I've"].map((word, i) => (
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
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.25 }}
                className="text-primary inline-block"
              >
                Built
              </motion.span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 200, damping: 20, delay: 0.35 }}
              className="text-text-secondary mt-[16px] text-[0.95rem] max-w-[500px] leading-[1.6]"
            >
              Beberapa project yang sudah saya selesaikan, dan beberapa lainnya sedang dalam tahap perencanaan.
            </motion.p>
          </div>
        </div>

        {/* RESPONSIVE GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {dynamicProjects.map((proj, idx) => {
            const { metadata } = proj;
            const isSecondRow = idx >= 3;
            const cardDelay = isSecondRow 
              ? 0.75 + (idx - 3) * 0.12 
              : 0.4 + idx * 0.12;

            return (
              <InteractiveTilt key={idx} maxTilt={10} glareMaxOpacity={0.12} glareColor="#4ac8ff" className="h-full">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.12 }}
                  variants={cardVariants}
                  custom={cardDelay}
                  className={`bg-surface border border-border-primary rounded-[20px] p-[24px] flex flex-col gap-[16px] md:gap-[20px] h-full ${
                    metadata.isPrivate ? "opacity-75 bg-background-secondary" : ""
                  }`}
                >
                  {/* Project Image Preview */}
                  <div className="w-full h-[140px] md:h-[180px] rounded-[12px] overflow-hidden bg-background-secondary relative border border-border-primary shrink-0">
                    {metadata.isPrivate ? (
                      <motion.div 
                        variants={{
                          initial: { borderColor: "var(--border)" },
                          hover: { borderColor: "var(--primary)", backgroundColor: "var(--primary-hover)", color: "var(--primary)" }
                        }}
                        className="absolute inset-0 border-2 border-dashed bg-background-secondary flex flex-col items-center justify-center gap-[10px] text-text-muted transition-all duration-300"
                      >
                        <motion.i 
                          variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.15, transition: { type: "spring" as any, stiffness: 400, damping: 10 } }
                          }}
                          className="fa-solid fa-lock text-[1.5rem]"
                        ></motion.i>
                        <span className="text-[0.8rem] font-semibold tracking-[1px]">Coming Soon</span>
                      </motion.div>
                    ) : (
                      <motion.img
                        src={metadata.thumbnail}
                        alt={metadata.title}
                        variants={{
                          initial: { scale: 1.08 },
                          animate: {
                            scale: 1,
                            transition: { duration: 1.2, delay: cardDelay, ease: "easeOut" }
                          },
                          hover: {
                            scale: 1.03,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }
                        }}
                        className="w-full h-full object-cover block"
                      />
                    )}
                  </div>

                  <div className="flex items-center">
                    <h3 className="text-[1.15rem] font-bold text-text-primary">{metadata.title}</h3>
                  </div>

                  <p className="text-[0.85rem] text-text-secondary leading-[1.6] line-clamp-2 md:line-clamp-none min-h-[40px] md:min-h-[48px]">
                    {metadata.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-[8px]">
                    {metadata.technologies?.map((tag: string, tagIdx: number) => (
                      <motion.span
                        key={tagIdx}
                        variants={tagVariants}
                        custom={{ cardDelay, tagIdx }}
                        className={`border border-border-primary py-[6px] px-[12px] rounded-full text-[0.75rem] font-semibold flex items-center ${
                          tag === "Unknown"
                            ? "bg-background-secondary text-text-secondary border-border-primary"
                            : "bg-background-secondary text-text-secondary"
                        }`}
                      >
                        {getTagIcon(tag)}
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {!metadata.isPrivate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "10000px 0px 0px 0px" }}
                      transition={{
                        type: "spring" as any,
                        stiffness: 200,
                        damping: 15,
                        delay: cardDelay + 0.45
                      }}
                      className="mt-auto border-t border-border-primary pt-[16px] flex flex-row items-center gap-[12px]"
                    >
                      <motion.a
                        href={metadata.github}
                        className="flex-1 md:flex-none flex items-center justify-center gap-[8px] bg-surface border-[1.5px] border-border-primary text-text-primary py-[10px] px-[20px] rounded-[10px] text-[0.85rem] font-semibold cursor-pointer no-underline transition-all duration-300 hover:bg-text-primary hover:border-text-primary hover:text-[var(--background)] hover:shadow-[0_10px_20px_rgba(15,23,42,0.15)] group"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover="buttonHover"
                      >
                        <motion.i 
                          variants={{
                            initial: { x: 0 },
                            buttonHover: { x: 4, transition: { type: "spring" as any, stiffness: 300, damping: 15 } }
                          }}
                          className="fa-brands fa-github text-[1.05rem]"
                        ></motion.i>
                        <span className="hidden md:inline">View on GitHub</span>
                        <span className="md:hidden">GitHub</span>
                      </motion.a>
                      
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-[8px] bg-text-primary border-[1.5px] border-text-primary text-[var(--background)] py-[10px] px-[20px] rounded-[10px] text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 hover:opacity-80"
                      >
                        Detail <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </InteractiveTilt>
            );
          })}
        </div>
      </div>

      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        metadata={selectedProject?.metadata}
        readme={selectedProject?.readme}
      />
    </section>
  );
}
