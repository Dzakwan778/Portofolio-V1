import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";

export interface LogoWallItem {
  imgUrl?: string;
  alt?: string;
  iconClass?: string;
  text?: string;
}

export interface LogoWallProps {
  items: LogoWallItem[];
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast" | number; // in seconds to complete half-width
  pauseOnHover?: boolean; // if true, it slows down on hover
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  className?: string;
  bgClassName?: string;
  itemClassName?: string;
}

export function LogoWall({
  items,
  direction = "left",
  speed = "medium",
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  className = "",
  bgClassName = "",
  itemClassName = "",
}: LogoWallProps) {
  if (!items || items.length === 0) return null;

  // Translate speed to duration
  let duration = 40; // slowed down from 25s
  if (typeof speed === "number") {
    duration = speed;
  } else if (speed === "slow") {
    duration = 60;
  } else if (speed === "fast") {
    duration = 20;
  }

  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const currentSpeedRef = useRef(0);

  // For a seamless infinite loop with translateX, we duplicate the items EXACTLY 2 times.
  // Translating by exactly -50% of the container width (which corresponds to exactly 1 set of items)
  // results in a perfect loop.
  const duplicatedItems = [...items, ...items];

  useAnimationFrame((time, delta) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const halfWidth = containerWidth / 2;
    if (halfWidth <= 0) return;

    const baseSpeed = halfWidth / duration; // pixels per second
    
    // Slow down on hover: if pauseOnHover is true and user is hovering, speed is 0.15x of base speed (gentle continuous crawl)
    const targetSpeed = isHovered && pauseOnHover ? baseSpeed * 0.15 : baseSpeed;

    // Smooth transition between hover speed and normal speed
    if (currentSpeedRef.current === 0) {
      currentSpeedRef.current = targetSpeed;
    } else {
      // Lerp
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;
    }

    const moveBy = (currentSpeedRef.current * delta) / 1000;

    let newX = x.get();
    if (direction === "left") {
      newX -= moveBy;
      if (newX <= -halfWidth) {
        newX += halfWidth; // perfect mathematical wrap
      }
    } else {
      newX += moveBy;
      if (newX >= 0) {
        newX -= halfWidth; // perfect mathematical wrap
      }
    }
    x.set(newX);
  });

  return (
    <div
      className={`relative w-full overflow-hidden ${
        fadeOut ? "marquee-container" : ""
      } ${bgClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className={`flex gap-[16px] w-max py-[8px] ${className}`}
        style={{ x }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center p-[10px] bg-surface border border-border-primary rounded-[12px] w-[60px] h-[60px] text-[1.5rem] text-text-secondary transition-all duration-300 ${
              scaleOnHover
                ? "hover:scale-110 hover:text-primary hover:border-primary hover:shadow-[0_6px_16px_rgba(74,200,255,0.06)]"
                : ""
            } ${itemClassName}`}
          >
            {item.imgUrl ? (
              <img
                src={item.imgUrl}
                alt={item.alt || "Logo"}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : item.iconClass ? (
              <i className={item.iconClass}></i>
            ) : (
              <span className="text-[1rem] font-bold text-primary">
                {item.text}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
