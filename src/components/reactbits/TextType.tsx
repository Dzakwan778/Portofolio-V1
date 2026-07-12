import React, { useState, useEffect } from "react";

export interface TextTypeProps {
  texts: string[];
  activeIndex?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorChar?: string;
  className?: string;
  cursorClassName?: string;
}

export default function TextType({
  texts,
  activeIndex,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000,
  cursorChar = "|",
  className = "",
  cursorClassName = "animate-pulse"
}: TextTypeProps) {
  const [currentText, setCurrentText] = useState("");
  const [localIndex, setLocalIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // If activeIndex is passed from parent, we use it to drive the target index
  const isControlled = activeIndex !== undefined;
  const targetIndex = isControlled ? activeIndex : localIndex;

  // Track what index is currently being typed/displayed
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  // Sync activeTextIndex with targetIndex
  useEffect(() => {
    if (isControlled) {
      const normalizedTarget = targetIndex % texts.length;
      const normalizedActive = activeTextIndex % texts.length;
      
      if (normalizedTarget !== normalizedActive) {
        // If they are different, start deleting the old text first
        if (currentText !== "") {
          setIsDeleting(true);
        } else {
          // Once it's fully deleted (empty), switch to the new index and type it
          setActiveTextIndex(normalizedTarget);
          setIsDeleting(false);
        }
      }
    }
  }, [targetIndex, activeTextIndex, currentText, isControlled, texts.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWordIndex = isControlled ? activeTextIndex : (localIndex % texts.length);
    const fullText = texts[currentWordIndex];

    if (!isDeleting) {
      if (currentText !== fullText) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else if (!isControlled) {
        // Only trigger auto-deleting internally if not controlled from outside
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        if (!isControlled) {
          setLocalIndex((prev) => prev + 1);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, localIndex, activeTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration, isControlled]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span className={`ml-0.5 inline-block text-primary ${cursorClassName}`} style={{ animationDuration: "0.8s" }}>
        {cursorChar}
      </span>
    </span>
  );
}
