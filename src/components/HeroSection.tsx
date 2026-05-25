import React from "react";
import { motion } from "motion/react";
import ContactButton from "./ContactButton";
import Magnet from "./Magnet";
import FadeIn from "./FadeIn";

interface HeroSectionProps {
  onOpenContact: (defaultService?: string) => void;
}

export default function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C] font-sans">
      


      {/* 2. HERO PORTRAIT (Centered absolutely, background layers) */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <FadeIn
          delay={0.6}
          y={30}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Keyur Portrait"
              width={520}
              height={520}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-105"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* 3. HERO HEADING */}
      <div className="flex-1 flex flex-col justify-center items-center z-20">
        <div className="overflow-hidden w-full flex justify-center">
          <FadeIn
            as="h1"
            delay={0.15}
            y={40}
            className="hero-heading text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] font-black uppercase tracking-tight leading-none text-center whitespace-nowrap w-full mt-6 sm:mt-4 md:-mt-5 select-none"
          >
            Hi, i&apos;m keyur
          </FadeIn>
        </div>
      </div>

      {/* 4. BOTTOM BAR */}
      <div className="relative z-20 w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end gap-4">
        {/* Left Text */}
        <FadeIn delay={0.35} y={20} className="text-left">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: "clamp(0.70rem, 1.4vw, 1.5rem)" }}
          >
            a computer science graduate &amp; ml researcher crafting high-performance full-stack systems
          </p>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col items-end gap-3 sm:gap-4">
            <div className="glass-pill px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/80 font-medium select-none">
              Available for hire
            </div>
            <ContactButton onClick={() => onOpenContact("Full-Stack Dev")} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
