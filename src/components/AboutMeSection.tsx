import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, Sparkles, User, BadgeCheck, Award, ExternalLink, 
  GraduationCap, MapPin, Briefcase, FileCode, CheckCircle2, 
  ArrowRight, BookOpen, Brain, Terminal, Code2, Heart, Languages 
} from "lucide-react";
import FadeIn from "./FadeIn";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  score: string;
  desc: string;
  verifyUrl: string;
}

interface AboutMeSectionProps {
  onOpenResume: () => void;
}

export default function AboutMeSection({ onOpenResume }: AboutMeSectionProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillsList = [
    { name: "Python", category: "AI & Data", level: 90, icon: Brain },
    { name: "PHP & APIs", category: "Web Systems", level: 85, icon: Terminal },
    { name: "MySQL & SQL", category: "Web Systems", level: 82, icon: Code2 },
    { name: "React.js", category: "Modern Web", level: 80, icon: Sparkles },
    { name: "Scikit-Learn", category: "AI & Data", level: 84, icon: Brain },
    { name: "NumPy & Pandas", category: "AI & Data", level: 88, icon: Code2 },
    { name: "Git & GitHub", category: "Productivity", level: 92, icon: Terminal },
    { name: "AI Vibe Coding", category: "Productivity", level: 95, icon: Sparkles },
  ];

  const certifications: Certification[] = [
    {
      id: "cert1",
      title: "Data Science Using Python",
      issuer: "SWAYAM Online Course, AMU",
      date: "Jul - Oct 2025",
      score: "86% (Assg: 24.88/25 | Exam: 61.61/75)",
      desc: "Excelled across data modeling, statistical algorithms, and data structures. Highly recommended for 3-4 institutional academic credits.",
      verifyUrl: "https://verify.swayam.gov.in"
    },
    {
      id: "cert2",
      title: "Using Python to Access Web Data",
      issuer: "University of Michigan (Coursera)",
      date: "Feb 23, 2026",
      score: "Authorized by Prof. Charles Severance",
      desc: "Mastered core HTTP request protocols, socket programming, web scraping with BeautifulSoup, and RESTful web APIs integration.",
      verifyUrl: "https://coursera.org/verify/OSE0SN4PSLHD"
    },
    {
      id: "cert3",
      title: "Capstone: Retrieving, Processing, & Visualizing Data",
      issuer: "University of Michigan (Coursera)",
      date: "Feb 23, 2026",
      score: "Authorized by Univ. of Michigan",
      desc: "Architected end-to-end data pipelines incorporating web scraping, SQLite relational modeling, and dynamic D3.js browser visualization.",
      verifyUrl: "https://coursera.org/verify/RM65DX97CQVT"
    },
    {
      id: "cert4",
      title: "Python Data Structures",
      issuer: "University of Michigan (Coursera)",
      date: "Feb 16, 2026",
      score: "Authorized by Univ. of Michigan",
      desc: "Built deep analytical knowledge of Python collection structures - lists, dictionaries, tuples, and multi-key structures to index complex logs.",
      verifyUrl: "https://coursera.org/verify/X8GRXXO5XI4O"
    },
    {
      id: "cert5",
      title: "Programming for Everybody (Getting Started with Python)",
      issuer: "University of Michigan (Coursera)",
      date: "Feb 14, 2026",
      score: "Authorized by Univ. of Michigan",
      desc: "Mastered foundations including variables, conditionals, execution loops, modular custom functions, and nested structured algorithms.",
      verifyUrl: "https://coursera.org/verify/VFTKWXE42FWK"
    }
  ];

  const handleDownloadResume = () => {
    onOpenResume();
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen bg-[#060608] border-t border-white/5 px-6 sm:px-10 py-24 md:py-36 font-sans overflow-hidden"
    >
      {/* Absolute Ambient Background Lights for Depth */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#B600A8]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-900/5 blur-[150px] pointer-events-none" />
      
      {/* Decorative vertical/horizontal line frames acting as subtle grid elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5CE2]/15 to-transparent" />
      <div className="absolute left-[8%] inset-y-0 w-px bg-white/[0.02] hidden xl:block" />
      <div className="absolute right-[8%] inset-y-0 w-px bg-white/[0.02] hidden xl:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* DESIGN REDESIGN: Premium Display Header Block */}
        <div className="mb-20">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[#FF5CE2] text-xs font-bold uppercase tracking-widest mb-4">
              <User className="w-3.5 h-3.5" />
              <span>THE ARCHITECT BIOGRAPHY</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none text-white font-sans">
                  ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#FF5CE2] to-amber-500">ME</span>
                </h2>
                <p className="text-xs sm:text-sm uppercase tracking-widest font-mono text-[#D7E2EA]/50 mt-3 flex items-center gap-2">
                  <span className="w-2- h-2 px-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-xs">EST. 1999+</span>
                  <span>• Computer Science Postgrad • AI Intelligence Engineering</span>
                </p>
              </div>

              {/* Unique Quick Stats Action */}
              <motion.button
                id="ats-download-top"
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#1E0F2E] to-[#0A0A0C] border border-[#FF5CE2]/20 hover:border-[#FF5CE2]/70 text-white font-bold uppercase tracking-widest text-xs px-6 py-4.5 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF5CE2] group-hover:animate-bounce" />
                <span>Download Resume</span>
              </motion.button>
            </div>
          </FadeIn>
        </div>

        {/* 3D Bento-Styled Grid Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
          
          {/* Bento Item 1: High Density Narrative Card with glowing border (Cols 7) */}
          <div className="lg:col-span-8 bg-[#101014] border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#B600A8]/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B600A8]/5 rounded-bl-[100px] blur-sm transition-opacity group-hover:opacity-75" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#FF5CE2]">
                <FileCode className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-mono font-bold">Bio Narrative</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight pt-1">
                Combining Academic Research Performance &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5CE2] to-amber-400">Green Computing Metrics</span>
              </h3>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#D7E2EA]/80 font-light font-sans max-w-3xl">
                <p>
                  I'm <strong className="font-extrabold text-white">Keyur Kalathiya</strong>, a software engineer and AI portfolio architect based in Surat, Gujarat. Currently pursuing an <strong className="text-[#FF5CE2] font-semibold">M.Sc in Computer Science</strong> (2024 - 2026), my focus spans high-throughput full stack engineering with deep Python architectures.
                </p>
                <p>
                  My research aims to build ecologically sustainable AI systems. I authored a peer-reviewed ML paper on benchmarking model energy parameters, culminating in the formulation of the <strong className="text-white font-medium">Energy Efficiency Score (EES)</strong>. Highly expert in AI-supported workflow orchestration, I deliver pristine platforms that couple clean design with lightning fast executions.
                </p>
              </div>
            </div>

            {/* Micro details grid inside bento narrative card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#B600A8]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Affiliation</span>
                  <span className="text-xs text-white/90 font-bold">P P Savani University</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#B600A8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Base</span>
                  <span className="text-xs text-white/90 font-bold">Surat, Gujarat, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#B600A8]">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest block">Languages</span>
                  <span className="text-xs text-white/90 font-bold">English, Gujarati, Hindi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Visual Concept Portrait Frame (Cols 4) */}
          <div className="lg:col-span-4 bg-[#101014] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-[#FF5CE2]/30 transition-all duration-500 flex flex-col justify-between">
            <div className="aspect-[4/3] sm:aspect-square relative w-full rounded-2xl overflow-hidden bg-[#1E1E24] border border-white/5">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#060608] via-transparent to-transparent z-10" />
              
              {/* Corner tech indicators */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#FF5CE2] z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#FF5CE2] z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#FF5CE2] z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#FF5CE2] z-20 pointer-events-none" />

              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=80"
                alt="AI Neural Network Visual Representing Keyur's Focus"
                loading="lazy"
                className="w-full h-full object-cover grayscale brightness-80 opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 font-medium"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Embedded Micro Status Badge */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-white/50">RESEARCH INDEX</span>
                <span className="font-bold text-[#FF5CE2] font-mono">ACTIVE (2026)</span>
              </div>
              <p className="text-xs text-[#D7E2EA]/70 font-light leading-snug">
                Formulating sustainable computing metrics for transformer-based deep learning paradigms.
              </p>
            </div>
          </div>

        </div>

        {/* 2-Column Section: Left side features Skills Core, Right side houses Tab Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Proving that all data is Authentic, Real, and Auditable (4 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#101014] border border-[#FF5CE2]/20 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden group hover:border-[#FF5CE2]/50 transition-all duration-300">
              {/* Subtle background glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#B600A8]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#B600A8]/20 transition-all" />
              
              <div className="space-y-1.5 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED DATA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-tight">
                  REAL &amp; AUDITABLE
                </h3>
                <p className="text-xs text-[#D7E2EA]/60 leading-relaxed">
                  Every metric, certificate code, research DOI, and GPA in this workspace reflects official university records. Zero simulated mock indicators or placeholder values.
                </p>
              </div>

              {/* Verified Features list */}
              <div className="space-y-4 pt-2 relative z-10">
                <div className="flex gap-3 items-start p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white tracking-wider">Official DOI Publication Mapping</h4>
                    <p className="text-[11px] text-[#D7E2EA]/50 mt-1 leading-snug">
                      Academic paper registered under official DOI registry <span className="text-[#FF5CE2] font-mono">10.55248/gengpi.07.0426.20830</span>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white tracking-wider">SWAYAM / NPTEL Records</h4>
                    <p className="text-[11px] text-[#D7E2EA]/50 mt-1 leading-snug">
                      Authorized 86% final grade database entry for Data Science using Python via Aligarh Muslim University.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white tracking-wider">Academic Integrity Verified</h4>
                    <p className="text-[11px] text-[#D7E2EA]/50 mt-1 leading-snug">
                      Bachelor's and ongoing Master's Degree certifications fully integrated with institutional keys.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative signature of trust */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>SYSTEM STATUS: VALIDATED</span>
                <span className="text-emerald-400 flex items-center gap-1">● CERTIFIED INTEGRITY</span>
              </div>
            </div>

          </div>

          {/* Right Column: Verified Credentials List Only */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5 text-[#FF5CE2]">
                <Award className="w-5 h-5 animate-pulse" />
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                  Verified Academic Credentials
                </h2>
              </div>
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/50">
                {certifications.length} Credentials
              </span>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#101014] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-[#FF5CE2]/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                >
                  <div className="space-y-3 flex-1">
                    <div className="space-y-1">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5CE2]">
                        {cert.issuer}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight group-hover:text-[#FF5CE2] transition-colors leading-tight">
                        {cert.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-[#D7E2EA]/70 font-light leading-relaxed">
                      {cert.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#D7E2EA]/40 bg-white/[0.02] px-2.5 py-1 rounded-lg">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#B600A8]" />
                      <span>SCORE STATUS: {cert.score}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-between h-full min-w-[130px] shrink-0 border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-4 self-stretch sm:self-auto">
                    <span className="text-[10px] font-mono text-white/50 block">
                      ISSUED: {cert.date}
                    </span>
                    
                    <a
                      id={`verify-${cert.id}`}
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-extrabold text-[#FF5CE2]/80 hover:text-white hover:translate-x-1 transition-all mt-2 sm:mt-0"
                    >
                      <span>VERIFY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        
      </div>
    </section>
  );
}
