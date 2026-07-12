import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

interface ScrollRevealProps {
  children: string;
  className?: string;
  splitBy?: "words" | "characters";
  enableBlur?: boolean;
  blurStrength?: number;
  startingOpacity?: number;
  startingRotation?: number;
  staggerDuration?: number;
  duration?: number;
}

function ScrollRevealParagraph({ 
  text, 
  progress, 
  index, 
  total 
}: { 
  text: string; 
  progress: MotionValue<number>; 
  index: number; 
  total: number; 
  key?: any;
}) {
  // Map the overall progress to this paragraph's chunk
  // For example, if there are 2 paragraphs:
  // para 0: 0.0 to 0.5
  // para 1: 0.5 to 1.0
  const start = index / total;
  const end = (index + 1) / total;
  
  const paraProgress = useTransform(progress, [start, end], [0, 1]);

  // Translate paragraph progress [0, 1] to backgroundPositionX ["100%", "0%"]
  const backgroundPositionX = useTransform(paraProgress, [0, 1], ["100%", "0%"]);

  return (
    <p className="mb-[16px] last:mb-0">
      <motion.span
        style={{
          background: "linear-gradient(to right, var(--text-primary) 50%, var(--text-muted) 50%)",
          backgroundSize: "200% 100%",
          backgroundPositionX,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline",
        }}
      >
        {text}
      </motion.span>
    </p>
  );
}

export function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  const paragraphs = (children || "").split("\n\n");

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((para, idx) => (
        <ScrollRevealParagraph 
          key={idx} 
          text={para} 
          progress={smoothProgress} 
          index={idx} 
          total={paragraphs.length} 
        />
      ))}
    </div>
  );
}
