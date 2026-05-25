import React from "react";
import { motion } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: any; // To allow any tag such as "div", "section", "p", etc.
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  key?: any;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
  id,
  style,
}: FadeInProps) {
  // Uses motion.create() for dynamic element types as requested
  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      id={id}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
