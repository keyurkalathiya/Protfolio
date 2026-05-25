import React from "react";
import { ArrowUp, Sparkles, Github, Linkedin, Twitter, Globe, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#08080A] border-t border-white/5 px-6 sm:px-10 py-16 md:py-24 z-20 font-sans">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Main callout block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#D7E2EA]/10 pb-16 mb-16 items-start">
          
          {/* Logo Brand / Brief Tagline Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="text-[2.2rem] font-black uppercase text-white select-none tracking-tighter leading-none hero-heading">
                KEYUR
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[#D7E2EA]/60 font-bold mt-1.5 pl-0.5">
                Computing Engineer &amp; ML Researcher
              </span>
            </div>
            <p className="text-[#D7E2EA]/60 text-sm leading-relaxed max-w-sm font-light">
              Engineering high-performance full-stack architectures and optimizing neural network parameters for sustainable digital spaces.
            </p>
          </div>

          {/* Quick Nav Links Column (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#B600A8] font-black">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 font-semibold text-xs uppercase tracking-widest">
              <button 
                onClick={() => handleScrollToSection("about")} 
                className="text-left py-0.5 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit cursor-pointer"
              >
                About Me
              </button>
              <button 
                onClick={() => handleScrollToSection("skills")} 
                className="text-left py-0.5 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit cursor-pointer"
              >
                Skills &amp; Tech
              </button>
              <button 
                onClick={() => handleScrollToSection("projects")} 
                className="text-left py-0.5 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit cursor-pointer"
              >
                Featured Projects
              </button>
              <button 
                onClick={() => handleScrollToSection("experience")} 
                className="text-left py-0.5 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit cursor-pointer"
              >
                Work History
              </button>
              <button 
                onClick={() => handleScrollToSection("contact")} 
                className="text-left py-0.5 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit cursor-pointer"
              >
                Reach Channel
              </button>
            </div>
          </div>

          {/* Social connections Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#B600A8] font-black">
              Social Connection Systems
            </h4>
            <div className="flex flex-col gap-2.5 font-semibold text-xs uppercase tracking-widest">
              <a 
                href="https://github.com/keyurkalathiya" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit"
              >
                <Github className="w-4 h-4 text-[#B600A8]/80 animate-pulse" /> GitHub Codebases
              </a>
              <a 
                href="https://linkedin.com/in/keyurkalathiya-871451330" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit"
              >
                <Linkedin className="w-4 h-4 text-[#B600A8]/80" /> LinkedIn Network
              </a>
              <a 
                href="mailto:keyurkalathiya121@gmail.com" 
                className="flex items-center gap-2 text-[#D7E2EA]/70 hover:text-white hover:translate-x-1.5 transition-all w-fit"
              >
                <Globe className="w-4 h-4 text-[#B600A8]/80" /> Email Channel
              </a>
            </div>
          </div>

        </div>

        {/* Socials & meta info row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 opacity-80 text-xs text-white/50 border-t border-white/5 pt-10">
          
          {/* Left: Branding badge */}
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>COMMITTED TO DIGITAL INNOVATION</span>
          </div>

          {/* Right: Scrolling Up controller */}
          <button
            onClick={handleScrollToTop}
            className="p-3 bg-[#131317] border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 hover:text-white hover:bg-[#1A1A22] rounded-full text-[#D7E2EA] transition-all cursor-pointer shadow-lg"
            title="Scroll to cosmic top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Copyright notice (clean and standard) */}
        <div className="text-center text-[10px] text-white/20 uppercase tracking-[0.2em] mt-10 select-none flex items-center justify-center gap-1.5">
          <span>&copy; {new Date().getFullYear()} KEYUR. ALL RIGHTS RESERVED.</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">CRAFTED WITH <Heart className="w-3 h-3 text-[#B600A8] fill-[#B600A8] inline" /> FOR EXCELLENCE</span>
        </div>

      </div>
    </footer>
  );
}
