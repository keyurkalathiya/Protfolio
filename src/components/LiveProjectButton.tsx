import React from "react";
import { motion } from "motion/react";

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function LiveProjectButton({ href, onClick, className = "" }: LiveProjectButtonProps) {
  const content = "Live Project";

  const btnClasses = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer
    px-8 py-3 sm:px-10 sm:py-3.5
    text-sm sm:text-base hover:bg-[#D7E2EA]/10 ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={btnClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={btnClasses}
    >
      {content}
    </motion.button>
  );
}
