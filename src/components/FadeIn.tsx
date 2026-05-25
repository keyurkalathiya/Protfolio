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

// Map to cache dynamically registered motion tags/elements.
// Recreating motion components on every render resets React DOM elements, losing input focus and shifting viewport scroll.
const motionComponentsCache = new Map<any, any>();

function getMotionComponent(tag: any) {
  if (!motionComponentsCache.has(tag)) {
    motionComponentsCache.set(tag, motion.create(tag));
  }
  return motionComponentsCache.get(tag);
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
  // Retrieve static motion-wrapped element type from the cache
  const MotionComponent = getMotionComponent(as);

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
