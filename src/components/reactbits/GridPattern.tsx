import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function GridPattern() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-background via-transparent to-background">
      {/* Base Grid */}
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      
      {/* Interactive Glow following mouse - very subtle slate gray */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--primary), transparent 40%)`,
        }}
        transition={{ type: "tween" as any, ease: "backOut", duration: 0.5 }}
      />
    </div>
  );
}
