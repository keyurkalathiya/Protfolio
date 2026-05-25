import React, { useState, useRef, useEffect } from "react";
import { Quote, Star, MessageSquareCode, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FadeIn from "./FadeIn";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: "test1",
      name: "DR. SUBHASHINI K.",
      role: "Dept. of Computer Science, PPSU",
      quote: "Collaborating with Keyur on our published ML research was an absolute pleasure. His empirical analysis of deep learning networks showed outstanding rigor and understanding of computational footprint metrics.",
      rating: 5
    },
    {
      id: "test-rajkumar",
      name: "MR. RAJKUMAR SHARMA",
      role: "Senior Software Architect & IT Consultant",
      quote: "Keyur's expertise in full-stack backend APIs and machine learning is exceptional. He builds remarkably lightweight architectures and applies modern development toolkits to maximize system output.",
      rating: 5
    },
    {
      id: "test-srikant",
      name: "SRIKANT SINGH",
      role: "Database Administrator & Tech Lead",
      quote: "Keyur understands MySQL design structures and API optimization exceptionally well. His implementation of content delivery layers greatly boosted data-fetching velocities in our joint pipelines.",
      rating: 5
    },
    {
      id: "test-vivek",
      name: "VIVEK SOLANKI",
      role: "Frontend Engineer & System Lead",
      quote: "An incredible collaborator with superb focus. Keyur seamlessly stitches high fidelity UI states, bringing polished responsive fluidity into every page, coupled with fast loading times.",
      rating: 5
    },
    {
      id: "test-meet",
      name: "MEET AGHEDA",
      role: "Senior NLP Research Collaborator",
      quote: "Keyur has phenomenal algorithmic intuition. His execution under Python Pandas modeling, text analytics matrices, and similarity matching methods is highly clean, professional, and reliable.",
      rating: 5
    },
    {
      id: "test2",
      name: "MR. AAKASH GUPTA",
      role: "Assistant Professor, Dept. of Computer Science",
      quote: "Keyur exhibits remarkable expertise in full-stack architectures and machine learning optimization. His work on predictive algorithms and clean object-oriented development is truly professional.",
      rating: 5
    },
    {
      id: "test3",
      name: "DR. INDRAJEET KUMAR",
      role: "Professor of Machine Learning & AI",
      quote: "Working alongside Keyur in advanced machine learning systems was highly impressive. His empirical understanding of computational costs in deep neural networks and complex databases reflects true dedication.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setInterval(nextSlide, 7000);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [autoplay, currentIndex]);

  const handleInteractiveClick = (action: () => void) => {
    setAutoplay(false);
    action();
  };

  return (
    <section 
      id="testimonials"
      className="relative bg-[#08080A] border-t border-white/5 px-6 sm:px-10 py-24 md:py-36 font-sans overflow-hidden z-10"
    >
      {/* Visual decorative grids and glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#B600A8]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute right-10 top-12 w-px h-64 bg-gradient-to-b from-white/[0.03] to-transparent hidden lg:block" />
      <div className="absolute left-10 bottom-12 w-px h-64 bg-gradient-to-t from-white/[0.03] to-transparent hidden lg:block" />

      <div className="max-w-5xl mx-auto relative">
        
        {/* Header Title with premium badge styling */}
        <div className="mb-16 md:mb-20 text-center">
          <FadeIn delay={0.1} y={20}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[#FF5CE2] text-xs font-bold uppercase tracking-widest mb-4">
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>COLLEAGUE &amp; ACADEMIC FEEDBACK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white font-sans max-w-4xl mx-auto">
              ENDORSEMENTS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#FF5CE2] to-amber-500">TESTIMONIALS</span>
            </h2>
            <p className="text-[#D7E2EA]/50 text-xs sm:text-xs uppercase tracking-widest font-mono text-center mt-4 max-w-xl mx-auto">
              Trusted reviews, academic recommendations, and peer evaluations from colleagues and guides.
            </p>
          </FadeIn>
        </div>

        {/* Horizontal Slider Layout */}
        <div className="relative">
          <FadeIn delay={0.2} y={30}>
            <div 
              className="relative rounded-3xl border border-white/5 bg-[#101014] p-8 sm:p-12 md:p-16 min-h-[380px] sm:min-h-[340px] flex flex-col justify-between overflow-hidden group hover:border-[#FF5CE2]/20 transition-all duration-300"
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              {/* Glowing Ambient Background Elements */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#B600A8]/5 rounded-full blur-2xl group-hover:bg-[#B600A8]/10 transition-colors" />
              <div className="absolute top-10 right-10 text-white/[0.02] select-none pointer-events-none">
                <Quote className="w-48 h-48 transform rotate-180" />
              </div>

              {/* Slider Content Frame */}
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                
                {/* Upper block with stars and interactive indicators */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-[#FF5CE2] tracking-widest uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      Colleague Review {currentIndex + 1} of {testimonials.length}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="min-h-[140px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-white/90 text-base sm:text-lg md:text-2xl font-light leading-relaxed tracking-wide italic font-sans"
                      >
                        "{testimonials[currentIndex].quote}"
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Lower block containing Profile detail mapping */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      {/* Avatar initials with responsive glow elements */}
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-[#B600A8]/30 bg-[#B600A8]/10 text-[#FF5CE2] font-black text-sm uppercase select-none shadow-[0_4px_12px_rgba(182,0,168,0.1)]">
                        {testimonials[currentIndex].name.replace("MR. ", "").replace("DR. ", "").charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white uppercase tracking-wider text-sm sm:text-base">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-semibold font-mono mt-0.5">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Arrow Controls and Dots Row */}
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {/* Navigation buttons */}
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => handleInteractiveClick(prevSlide)}
                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#B600A8]/20 border border-white/5 hover:border-[#B600A8]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                        aria-label="Previous Endorsement"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleInteractiveClick(nextSlide)}
                        className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#B600A8]/20 border border-white/5 hover:border-[#B600A8]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                        aria-label="Next Endorsement"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </FadeIn>
        </div>

        {/* Dots Navigator Pills Line */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleInteractiveClick(() => setCurrentIndex(dotIdx))}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx 
                  ? "w-8 bg-[#FF5CE2]" 
                  : "w-2 bg-white/10 hover:bg-white/20"
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

