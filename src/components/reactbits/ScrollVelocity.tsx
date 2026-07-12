import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from "motion/react";

interface VelocityMarqueeProps {
  children: string;
  baseVelocity: number;
  className?: string;
  key?: React.Key;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 5, className = "" }: VelocityMarqueeProps) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // We wrap between -20% and -45% which matches our layout perfectly for infinite looping
  const xTransform = useTransform(x, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() !== 0) {
      directionFactor.current = velocityFactor.get() < 0 ? -1 : 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    x.set(x.get() + moveBy);
  });

  return (
    <div className="overflow-hidden tracking-tight leading-none flex whitespace-nowrap flex-nowrap w-full">
      <motion.div className={`flex whitespace-nowrap flex-nowrap text-[1.4rem] sm:text-[2.2rem] md:text-[2.8rem] font-black uppercase ${className}`} style={{ x: xTransform }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="mr-[20px] sm:mr-[35px] md:mr-[45px] flex items-center gap-[10px] sm:gap-[15px] md:gap-[20px] select-none">
            {children}
            <span className="text-[#2563eb] font-bold">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  fontClassName?: string;
}

export default function ScrollVelocity({
  texts,
  velocity = 4,
  className = "",
  fontClassName = ""
}: ScrollVelocityProps) {
  return (
    <div className={`relative z-10 w-full overflow-hidden py-[12px] sm:py-[18px] flex flex-col gap-[6px] sm:gap-[10px] border-y border-border-primary bg-surface/50 backdrop-blur-md select-none ${className}`}>
      {/* Subtle fade overlays at the edges for premium aesthetic */}
      <div className="absolute top-0 bottom-0 left-0 w-[60px] sm:w-[150px] md:w-[200px] bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-[60px] sm:w-[150px] md:w-[200px] bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />

      {texts.map((text, index) => (
        <ParallaxText
          key={index}
          baseVelocity={index % 2 === 0 ? velocity : -velocity}
          className={`${fontClassName} ${index % 2 === 0 ? "text-text-primary" : "text-[#475569]/30"}`}
        >
          {text}
        </ParallaxText>
      ))}
    </div>
  );
}
