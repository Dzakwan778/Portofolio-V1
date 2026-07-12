import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

interface InteractiveTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees
  perspective?: number; // Perspective value in pixels
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  key?: React.Key;
}

export function InteractiveTilt({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.15,
  glareColor = "#ffffff",
}: InteractiveTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw mouse coordinates (-0.5 to 0.5 range)
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(rotateXRaw, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(rotateYRaw, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare position in percentages
  const glareX = useSpring(useMotionValue(50), springConfig);
  const glareY = useSpring(useMotionValue(50), springConfig);
  const glareOpacity = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse coordinates to relative -0.5 to 0.5
    const relativeX = (mouseX / width) - 0.5;
    const relativeY = (mouseY / height) - 0.5;

    rotateXRaw.set(relativeY); // tilt around horizontal axis depends on Y position
    rotateYRaw.set(relativeX); // tilt around vertical axis depends on X position

    // Glare position in percentages (0% to 100%)
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    glareOpacity.set(glareMaxOpacity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareOpacity.set(0);
  };

  // Safe multi-value transform for background
  const glareBg = useTransform(
    [glareX, glareY],
    (values) => {
      const [x, y] = values as [number, number];
      return `radial-gradient(circle at ${x}% ${y}%, ${glareColor} 0%, transparent 60%)`;
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: perspective,
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      className={`relative select-none ${className}`}
    >
      <div style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>

      {glareEnable && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: glareBg,
            opacity: glareOpacity,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 30,
          }}
        />
      )}
    </motion.div>
  );
}
