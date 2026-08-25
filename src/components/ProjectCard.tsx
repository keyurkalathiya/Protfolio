import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";

interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
}

export default function ProjectCard({ project }: { project: PortfolioProject }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isLiveSupported = project.id === "supercall-pro" || project.id === "creatorcheck";

  // Motion values for tracking exact normalized mouse position inside current element bounds
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Setup fine-grained interactive spring parameters for 3D tilt effects
  const springConfig = { stiffness: 220, damping: 25, mass: 0.5 };
  
  const rotateX = useSpring(
    useTransform(y, [0, 1], [6, -6]), 
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-6, 6]), 
    springConfig
  );

  // Smooth parallax translation values for the zoomed thumbnail to shift slightly opposite of hover angle
  const imgTranslateX = useSpring(
    useTransform(x, [0, 1], [-8, 8]), 
    springConfig
  );
  const imgTranslateY = useSpring(
    useTransform(y, [0, 1], [-8, 8]), 
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from 0 to 1
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl border border-[#D7E2EA]/10 bg-[#121215] overflow-hidden flex flex-col justify-between hover:border-[#B600A8]/50 transition-colors duration-400 shadow-xl group"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full flex flex-col justify-between"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 1. Thumbnail Block with zoom & mouse-parallax offset */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1A1E] border-b border-[#D7E2EA]/5">
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 opacity-70 pointer-events-none" />
          
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            style={{
              x: imgTranslateX,
              y: imgTranslateY,
              scale: isHovered ? 1.08 : 1.0,
            }}
            className="w-[112%] h-[112%] -left-[6%] -top-[6%] relative object-cover transition-scale duration-500 font-medium"
          />
          
          {/* Parallaxing Overlay Glow element */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(182,0,168,0.15)_0%,transparent_50%)] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              // @ts-ignore
              "--x": useTransform(x, [0, 1], ["0%", "100%"]),
              "--y": useTransform(y, [0, 1], ["0%", "100%"]),
            }}
          />

          {/* Floating Number Badge with 3D Pop depth */}
          <div 
            className="absolute top-4 left-4 z-20 font-black text-2xl tracking-tighter text-white bg-[#0C0C0C]/85 px-4 py-1.5 rounded-2xl border border-white/10 backdrop-blur-md select-none transition-all duration-300 group-hover:border-[#FF5CE2]/30 group-hover:shadow-[0_0_15px_rgba(182,0,168,0.25)]"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.number}
          </div>
        </div>

        {/* 2. Content Details Block which shifts upwards on Hover style parallax */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-[#0e0e11] relative overflow-hidden">
          
          <motion.div 
            className="space-y-4"
            animate={{
              y: isHovered ? -8 : 0,
            }}
            transition={springConfig}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Project Title with perspective popup */}
            <h3 
              className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-[#FF5CE2] transition-colors duration-300"
              style={{ transform: "translateZ(15px)" }}
            >
              {project.title}
            </h3>

            {/* Description details visible state */}
            <p className="text-[#D7E2EA]/70 text-xs sm:text-sm font-light leading-relaxed">
              {project.description}
            </p>
            
            {/* Tech tag pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/60 font-mono transition-colors duration-300 group-hover:border-[#B600A8]/30 group-hover:bg-[#B600A8]/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Shipped/revealed live action button */}
          {isLiveSupported && (
            <motion.div 
              className="pt-4 border-t border-white/5 shrink-0 mt-5 w-full"
              animate={{
                y: isHovered ? -4 : 4,
                opacity: isHovered ? 1 : 0.85,
              }}
              transition={springConfig}
            >
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  background: isHovered 
                    ? "linear-gradient(123deg, #1d0026 7%, #B600A8 45%, #9026d3 72%, #f16405 100%)"
                    : "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  boxShadow: isHovered 
                    ? "0px 6px 18px rgba(181, 1, 167, 0.45)"
                    : "0px 2px 4px rgba(181, 1, 167, 0.15)",
                }}
                className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-extrabold uppercase tracking-widest text-white cursor-pointer select-none border border-white/10 w-full transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Project Demo</span>
              </motion.a>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
