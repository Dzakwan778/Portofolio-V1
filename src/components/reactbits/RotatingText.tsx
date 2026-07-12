import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random";
  splitBy?: "characters" | "words" | "lines";
  auto?: boolean;
  loop?: boolean;
  className?: string;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  stiffness?: number;
  damping?: number;
  type?: "slide" | "pop" | "bounce";
  onIndexChange?: (index: number) => void;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      rotationInterval = 2700,
      staggerDuration = 0.025,
      staggerFrom = "first",
      splitBy = "characters",
      auto = true,
      loop = true,
      className = "",
      mainClassName = "",
      splitLevelClassName = "",
      elementLevelClassName = "",
      stiffness = 80,
      damping = 16,
      type = "slide",
      onIndexChange,
      ...props
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const onIndexChangeRef = React.useRef(onIndexChange);
    useEffect(() => {
      onIndexChangeRef.current = onIndexChange;
    }, [onIndexChange]);

    useEffect(() => {
      if (onIndexChangeRef.current) {
        onIndexChangeRef.current(currentTextIndex);
      }
    }, [currentTextIndex]);

    useEffect(() => {
      if (!auto) return;
      const timer = setInterval(() => {
        setCurrentTextIndex((prev) => {
          if (prev === texts.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, rotationInterval);

      return () => clearInterval(timer);
    }, [auto, rotationInterval, loop, texts.length]);

    useImperativeHandle(ref, () => ({
      next: () => {
        setCurrentTextIndex((prev) => (prev === texts.length - 1 ? (loop ? 0 : prev) : prev + 1));
      },
      previous: () => {
        setCurrentTextIndex((prev) => (prev === 0 ? (loop ? texts.length - 1 : prev) : prev - 1));
      },
      jumpTo: (index: number) => {
        if (index >= 0 && index < texts.length) {
          setCurrentTextIndex(index);
        }
      },
      reset: () => {
        setCurrentTextIndex(0);
      },
    }));

    const currentText = texts[currentTextIndex];

    let elements: string[] = [];
    if (splitBy === "characters") {
      elements = Array.from(currentText);
    } else if (splitBy === "words") {
      elements = currentText.split(" ");
    } else {
      elements = [currentText];
    }

    const getDelay = (index: number, total: number) => {
      if (staggerFrom === "first") {
        return index * staggerDuration;
      }
      if (staggerFrom === "last") {
        return (total - 1 - index) * staggerDuration;
      }
      if (staggerFrom === "center") {
        const center = (total - 1) / 2;
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomMultiplier = (Math.sin(index + 1) * 10000) % 1;
        return Math.abs(randomMultiplier) * total * staggerDuration;
      }
      return index * staggerDuration;
    };

    const containerVariants = {
      animate: {
        transition: {
          staggerChildren: staggerDuration,
        },
      },
    };

    const getVariants = () => {
      if (type === "bounce") {
        return {
          initial: { y: "60%", scaleY: 0.6, scaleX: 1.2, opacity: 0 },
          animate: (custom: number) => ({
            y: "0%",
            scaleY: 1,
            scaleX: 1,
            opacity: 1,
            transition: {
              delay: custom,
              type: "spring" as any,
              stiffness: stiffness * 1.5,
              damping: damping * 0.8,
            },
          }),
          exit: (custom: number) => ({
            y: "-60%",
            scaleY: 0.6,
            scaleX: 1.2,
            opacity: 0,
            transition: {
              delay: custom * 0.5,
              type: "spring" as any,
              stiffness: stiffness * 1.5,
              damping: damping,
            },
          }),
        };
      }
      if (type === "pop") {
        return {
          initial: { scale: 0.3, rotate: -12, y: 10, opacity: 0 },
          animate: (custom: number) => ({
            scale: 1,
            rotate: 0,
            y: 0,
            opacity: 1,
            transition: {
              delay: custom,
              type: "spring" as any,
              stiffness: stiffness * 2.2,
              damping: damping * 0.8,
            },
          }),
          exit: (custom: number) => ({
            scale: 0.3,
            rotate: 12,
            y: -10,
            opacity: 0,
            transition: {
              delay: custom * 0.5,
              type: "spring" as any,
              stiffness: stiffness * 1.8,
              damping: damping,
            },
          }),
        };
      }
      return {
        initial: { y: "100%", opacity: 0 },
        animate: (custom: number) => ({
          y: "0%",
          opacity: 1,
          transition: {
            delay: custom,
            type: "spring" as any,
            stiffness: stiffness,
            damping: damping,
          },
        }),
        exit: (custom: number) => ({
          y: "-100%",
          opacity: 0,
          transition: {
            delay: custom * 0.5,
            type: "spring" as any,
            stiffness: stiffness,
            damping: damping,
          },
        }),
      };
    };

    const elementVariants = getVariants();

    return (
      <span className={`inline-flex flex-wrap overflow-hidden vertical-align-middle ${mainClassName}`} {...props}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTextIndex}
            className={`inline-flex flex-wrap ${className}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {elements.map((el, i) => {
              const delay = getDelay(i, elements.length);
              const isSpace = splitBy === "characters" && el === " ";

              return (
                <motion.span
                  key={i}
                  className={`inline-block whitespace-pre cursor-default select-none ${splitLevelClassName}`}
                  custom={delay}
                  variants={elementVariants}
                  whileHover={{
                    scale: 1.2,
                    y: -4,
                    rotate: [0, -6, 6, 0],
                    transition: { duration: 0.2, ease: "easeInOut" }
                  }}
                >
                  <span className={elementLevelClassName}>
                    {isSpace ? "\u00A0" : el}
                  </span>
                </motion.span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
