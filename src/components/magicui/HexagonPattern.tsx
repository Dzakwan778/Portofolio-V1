import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface HexagonPatternProps {
  size?: number; // Radius of each hexagon
  stroke?: string; // Standard stroke color
  hoverStroke?: string; // Glow stroke color
  hoverRadius?: number; // Spotlight bubble radius
  className?: string;
  gridWidth?: number; // Total columns (default 45)
  gridHeight?: number; // Total rows (default 25)
}

export function HexagonPattern({
  size = 40,
  stroke = "rgba(15, 23, 42, 0.04)",
  hoverStroke = "#4ac8ff",
  hoverRadius = 180,
  className = "",
  gridWidth = 45,
  gridHeight = 25,
}: HexagonPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring configurations for smooth movement
  const springConfig = { damping: 40, stiffness: 180 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const glowOpacity = useSpring(useMotionValue(0), springConfig);

  const glowX = useTransform(mouseX, (x) => `${x}px`);
  const glowY = useTransform(mouseY, (y) => `${y}px`);

  // Keep track of some pseudo-random indices to animate
  const [pulsingHexagons, setPulsingHexagons] = useState<{ r: number; c: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate 8-12 random hexagons to pulse gently
    const randomHexs = [];
    for (let i = 0; i < 10; i++) {
      randomHexs.push({
        r: Math.floor(Math.random() * gridHeight),
        c: Math.floor(Math.random() * gridWidth),
        delay: Math.random() * 4,
      });
    }
    setPulsingHexagons(randomHexs);
  }, [gridWidth, gridHeight]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    glowOpacity.set(0);
  };

  // Hexagon geometry math
  const H = Math.sqrt(3) * size; // Height of flat-topped hexagon
  const W = 2 * size; // Width

  // Generate paths
  const hexPaths: React.ReactNode[] = [];

  for (let r = 0; r < gridHeight; r++) {
    for (let c = 0; c < gridWidth; c++) {
      const cx = c * 1.5 * size;
      const cy = r * H + (c % 2 === 1 ? H / 2 : 0);

      const pathString = `M ${cx + size} ${cy} L ${cx + size / 2} ${cy + H / 2} L ${cx - size / 2} ${cy + H / 2} L ${cx - size} ${cy} L ${cx - size / 2} ${cy - H / 2} L ${cx + size / 2} ${cy - H / 2} Z`;

      // Check if this hexagon is one of the pulsing ones
      const isPulsing = pulsingHexagons.some((ph) => ph.r === r && ph.c === c);
      const pulseDelay = pulsingHexagons.find((ph) => ph.r === r && ph.c === c)?.delay || 0;

      hexPaths.push(
        <path
          key={`${r}-${c}`}
          d={pathString}
          fill={isPulsing ? "rgba(74, 200, 255, 0.015)" : "none"}
          className={isPulsing ? "animate-pulse" : ""}
          style={
            isPulsing
              ? {
                  animationDuration: "4s",
                  animationDelay: `${pulseDelay}s`,
                }
              : undefined
          }
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto z-0 ${className}`}
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* 1. Base Layer SVG (Drawn with regular faint stroke) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      >
        <g stroke={stroke} strokeWidth="1" fill="none">
          {hexPaths}
        </g>
      </svg>

      {/* 2. Glow Layer SVG (Masked by CSS radial gradient centered on cursor) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: glowOpacity,
          WebkitMaskImage: `radial-gradient(circle ${hoverRadius}px at var(--glow-x) var(--glow-y), black 100%, transparent 100%)`,
          maskImage: `radial-gradient(circle ${hoverRadius}px at var(--glow-x) var(--glow-y), black 100%, transparent 100%)`,
        }}
      >
        {/* We bind the Motion Values to CSS Custom Properties */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={
            {
              "--glow-x": glowX,
              "--glow-y": glowY,
            } as any
          }
        >
          <svg className="absolute inset-0 w-full h-full">
            <g stroke={hoverStroke} strokeWidth="1.5" fill="none">
              {hexPaths}
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
