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
  const [visibleCount, setVisibleCount] = useState(3);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic viewport matching for 3-4 columns on desktop/wide displays
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1440) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [autoplay, currentIndex]);

  const handleInteractiveClick = (action: () => void) => {
    setAutoplay(false);
    action();
  };

  // Get active subset of testimonials to display concurrently
  const getVisibleTestimonials = () => {
    const list = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      list.push({ ...testimonials[idx], displayIndex: idx });
    }
    return list;
  };

  const activeTestimonials = getVisibleTestimonials();

  return (
    <section 
      id="testimonials"
      className="relative bg-[#060608] border-t border-white/5 px-6 sm:px-10 py-24 md:py-36 font-sans overflow-hidden z-10"
    >
      {/* Visual decorative ambient grids and purple/pink radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#B600A8]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-900/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF5CE2]/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Modern styled displays segment */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeIn delay={0.1} y={20}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[#FF5CE2] text-xs font-bold uppercase tracking-widest mb-4">
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>COLLEAGUE &amp; ACADEMIC RECOMMENDATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white font-sans">
              PEER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#FF5CE2] to-amber-500">ENDORSEMENTS</span>
            </h2>
            <p className="text-[#D7E2EA]/50 text-xs sm:text-xs uppercase tracking-widest font-mono mt-4 flex items-center gap-2">
              <span>● {visibleCount === 1 ? "SINGLE FOCUS" : `${visibleCount} COMMENDATIONS DISPLAYED`}</span>
              <span>• AUTHENTIC CONCURRENT REVIEWS</span>
            </p>
          </FadeIn>

          {/* Navigation controls for interactive rotational control */}
          <FadeIn delay={0.15} y={20} className="flex items-center gap-3">
            <button
              onClick={() => handleInteractiveClick(prevSlide)}
              className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF5CE2]/30 text-white hover:text-[#FF5CE2] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous testimonials"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleInteractiveClick(nextSlide)}
              className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FF5CE2]/30 text-white hover:text-[#FF5CE2] flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next testimonials"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>

        {/* Dynamic Multi-Card Rotating Grid Layout */}
        <div className="relative min-h-[420px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {activeTestimonials.map((test, index) => (
                <motion.div
                  key={test.id}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut",
                    layout: { type: "spring", stiffness: 120, damping: 20 }
                  }}
                  className="bg-[#101014] border border-white/5 hover:border-[#FF5CE2]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 shadow-2xl min-h-[380px]"
                >
                  {/* Glowing subtle radial gradient backdrop on hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#B600A8]/5 rounded-full blur-3xl group-hover:bg-[#B600A8]/10 transition-colors pointer-events-none" />
                  
                  {/* Floating double quotes decorative element */}
                  <div className="absolute top-6 right-6 text-white/[0.01] group-hover:text-white/[0.03] select-none pointer-events-none transition-colors">
                    <Quote className="w-20 h-20 transform rotate-180" />
                  </div>

                  {/* Header containing ratings and validation details */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial review speech block */}
                    <div className="pt-2">
                      <p className="text-[#D7E2EA]/80 text-xs sm:text-sm leading-relaxed font-light italic font-sans group-hover:text-white transition-colors duration-200">
                        "{test.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Footer profile block */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#B600A8]/20 bg-[#B600A8]/5 text-[#FF5CE2] font-black text-xs uppercase select-none group-hover:border-[#FF5CE2]/40 transition-all">
                      {test.name.replace("MR. ", "").replace("DR. ", "").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-white uppercase tracking-tight text-xs sm:text-sm group-hover:text-[#FF5CE2] transition-colors truncate">
                        {test.name}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-semibold font-mono mt-0.5 truncate">
                        {test.role}
                      </p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel slide indicators */}
        <div className="flex justify-center gap-2 mt-12 relative z-10">
          {testimonials.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                onClick={() => handleInteractiveClick(() => setCurrentIndex(dotIdx))}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? "w-8 bg-gradient-to-r from-[#B600A8] to-[#FF5CE2]" 
                    : "w-1.5 bg-white/10 hover:bg-white/20"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

