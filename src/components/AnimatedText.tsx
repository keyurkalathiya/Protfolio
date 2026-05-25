import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  key?: any;
}

function Char({ char, progress, range }: CharProps) {
  // Animates from 0.2 to 1 opacity
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder to reserve layout width and height */}
      <span className="opacity-0">{char === " " ? "\u00A0" : char}</span>
      {/* Absolute positioned animated character */}
      <motion.span style={{ opacity }} className="absolute top-0 left-0 select-none">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className = "", style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = text.split("");
  const total = characters.length;

  return (
    <p
      ref={containerRef}
      style={style}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {characters.map((char, index) => {
        // Calculate transition range for each character
        // Start from 0 up to 0.9, ensuring the end is within 1.0 limit
        const start = (index / total) * 0.85;
        const end = start + 0.15;
        
        return (
          <Char
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[Math.max(0, start), Math.min(1, end)]}
          />
        );
      })}
    </p>
  );
}
