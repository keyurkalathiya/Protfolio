import React from "react";
import { Quote, Star, MessageSquareCode } from "lucide-react";
import FadeIn from "./FadeIn";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: "test1",
      name: "DR. SUBHASHINI K.",
      role: "Dept. of Computer Science, PPSU",
      quote: "Collaborating with Keyur on our published ML research was an absolute pleasure. His empirical analysis of deep learning networks showed outstanding rigor and understanding of computational footprint metrics."
    },
    {
      id: "test2",
      name: "MR. AAKASH GUPTA",
      role: "Assistant Professor, Dept. of Computer Science",
      quote: "Keyur exhibits remarkable expertise in full-stack architectures and machine learning optimization. His work on predictive algorithms and clean object-oriented development is truly professional."
    },
    {
      id: "test3",
      name: "DR. INDRAJEET KUMAR",
      role: "Professor of Machine Learning &amp; AI",
      quote: "Working alongside Keyur in advanced machine learning systems was highly impressive. His empirical understanding of computational costs in deep neural networks and complex databases reflects true dedication."
    }
  ];

  return (
    <section 
      id="testimonials"
      className="relative bg-[#0C0C0C] border-t border-white/5 px-6 sm:px-10 py-24 md:py-32 font-sans overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto relative">
        
        {/* Header Title */}
        <div className="mb-16 md:mb-24 text-center">
          <FadeIn delay={0.15} y={30}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#B600A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>COLLEAGUE REVIEWS</span>
            </div>
            <h2 className="hero-heading text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              ACADEMIC ENDORSEMENTS
            </h2>
            <p className="text-[#D7E2EA]/50 text-sm sm:text-base max-w-xl mx-auto uppercase tracking-wider font-medium">
              Read recommendations and comments from academic advisors and engineering guides.
            </p>
          </FadeIn>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <FadeIn 
              key={test.id}
              delay={0.1 * idx}
              y={30}
              className="flex"
            >
              <div className="relative w-full rounded-3xl border border-[#D7E2EA]/10 bg-[#121215] p-6 sm:p-8 flex flex-col justify-between hover:border-[#B600A8]/30 transition-all duration-300 shadow-xl group">
                
                {/* Quote details */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Quote className="w-8 h-8 text-[#B600A8]/30 group-hover:text-[#B600A8] transition-colors duration-300" />
                    
                    {/* Stars bar */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#D7E2EA]/85 text-sm leading-relaxed font-light italic">
                    "{test.quote}"
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-8 shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#B600A8]/30 bg-[#B600A8]/10 text-[#B600A8] font-bold text-xs select-none">
                    {test.name.startsWith("MR.") || test.name.startsWith("DR.") ? test.name.split(" ")[1]?.charAt(0) || test.name.charAt(0) : test.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase tracking-wider text-xs block">
                      {test.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium block">
                      {test.role}
                    </span>
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
