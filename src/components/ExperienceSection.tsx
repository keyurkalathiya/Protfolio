import React from "react";
import { Briefcase, Calendar, Star, Milestone } from "lucide-react";
import FadeIn from "./FadeIn";

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  points: string[];
}

export default function ExperienceSection() {
  const experiences: WorkExperience[] = [
    {
      id: "exp0",
      company: "SENSUSSOFT SOFTWARE PRIVATE LIMITED",
      role: "Software Developer Intern",
      duration: "January 2026 - August 2026",
      points: [
        "Worked on AI-assisted software development and rapid product implementation using modern AI coding and research workflows.",
        "Built and refined web-based product experiences with a focus on responsive UI, functional workflows, debugging, and production-ready presentation.",
        "Used AI development tools including Claude, Codex, ChatGPT, GitHub Copilot, Grok, and Perplexity to accelerate coding, research, debugging, documentation, and problem solving.",
        "Worked across product requirements, implementation, testing, refinement, and deployment-oriented workflows."
      ]
    },
    {
      id: "exp1",
      company: "P P SAVANI UNIVERSITY",
      role: "Master of Science (M.Sc.) in Computer Science",
      duration: "August 2024 - June 2026",
      points: [
        "Deeply focused study on Advanced Algorithms, Machine Learning, Database Systems, Software Engineering, and data visualization.",
        "Achieved hands-on expertise building sustainable high-performance full-stack web applications with Python & PHP.",
        "Maintained top-tier academic standards while executing empirical studies on deep learning computational energy metrics."
      ]
    },
    {
      id: "exp2",
      company: "IJRPR JOURNAL PUBLICATION",
      role: "Published Machine Learning Researcher",
      duration: "April 2026",
      points: [
        "Authored & published a peer-reviewed research paper: 'Energy Efficiency of Machine Learning Algorithms: An Empirical Study' (DOI: 10.55248/gengpi.07.0426.20830).",
        "Benchmarked electricity consumption, GPU load, CO2 emissions, and predictive accuracies of BiLSTM, Transformers, and custom hybrid models.",
        "Introduced an innovative 'Energy Efficiency Score (EES)' framework to evaluate predictive accuracy proportional to electrical cost."
      ]
    },
    {
      id: "exp3",
      company: "VEER NARMAD SOUTH GUJARAT UNIVERSITY (VNSGU)",
      role: "Bachelor of Computer Application (BCA)",
      duration: "June 2019 - June 2022",
      points: [
        "Core coursework focused on Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP) in Java, and Web Technologies.",
        "Mastered fundamental database engineering paradigms (MySQL, SQL) and classic MVC structural architectures.",
        "Created custom client-side tools and resolved complex optimization challenges, setting up strong programming baselines."
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative min-h-screen bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 py-24 md:py-32 font-sans overflow-hidden z-20"
    >
      <div className="max-w-5xl mx-auto relative">
        
        {/* Header Title */}
        <div className="mb-20 md:mb-28 text-center">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 text-[#B600A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience &amp; Journey</span>
            </div>
            <h2 className="text-[#0C0C0C] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              PROFESSIONAL JOURNEY
            </h2>
            <p className="text-[#0C0C0C]/60 text-sm sm:text-base max-w-xl mx-auto uppercase tracking-wider font-medium">
              A chronological overview of my software engineering experience, research publications, and computer science education.
            </p>
          </FadeIn>
        </div>

        {/* Timeline container */}
        <div className="relative mt-16 md:mt-24">
          
          {/* Vertical timeline spine (Desktop only, centered) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[#0C0C0C]/10 transform md:-translate-x-1/2 z-0 hidden sm:block" />

          <div className="space-y-12 md:space-y-20 relative z-10">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={exp.id}
                  className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-0 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Spine connection Node element */}
                  <div className="absolute left-[20px] md:left-1/2 top-8 w-6 h-6 rounded-full bg-white border-4 border-[#B600A8] transform md:-translate-x-1/2 z-20 flex items-center justify-center shadow-md hidden sm:flex">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B600A8] animate-ping" />
                  </div>

                  {/* Left part: Card Element (occupies 48% width) */}
                  <div className="w-full md:w-[46%] flex flex-col justify-center">
                    <FadeIn 
                      delay={0.15 * idx} 
                      x={isEven ? 30 : -30}
                      className="w-full"
                    >
                      <div className="p-6 sm:p-8 rounded-3xl border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.02] hover:bg-[#0C0C0C]/[0.04] transition-all duration-300 relative group">
                        {/* Decorative Badge top left */}
                        <div className="absolute top-4 right-4 text-[#OCOC0C]/20 group-hover:text-[#B600A8]/20 transition-colors">
                          <Milestone className="w-5 h-5" />
                        </div>

                        {/* Top stack */}
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-extrabold text-[#B600A8]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0C0C0C] tracking-tight">
                            {exp.role}
                          </h3>
                          <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/40 font-bold block">
                            {exp.company}
                          </span>
                        </div>

                        {/* Bullet points mapping */}
                        <ul className="space-y-3.5 text-xs sm:text-sm text-[#0C0C0C]/70 font-light leading-relaxed">
                          {exp.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex gap-2.5 items-start">
                              <Star className="w-3.5 h-3.5 text-[#B600A8] shrink-0 mt-1" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </FadeIn>
                  </div>

                  {/* Desktop layout spacing column (occupies the remaining width) */}
                  <div className="w-[8%] hidden md:block" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
