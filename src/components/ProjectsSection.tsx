import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Sparkles, FolderKanban } from "lucide-react";
import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";

interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
}

export default function ProjectsSection() {
  const projects: PortfolioProject[] = [
    {
      id: "supercall-pro",
      number: "01",
      title: "SUPERCALL PRO",
      description: "AI-assisted web product developed using modern rapid-development workflows, with emphasis on product UI, responsive web implementation, and a production-facing user experience.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "AI Integrations"],
      liveUrl: "https://www.supercall.pro/"
    },
    {
      id: "creatorcheck",
      number: "02",
      title: "CREATORCHECK",
      description: "Creator-focused platform supporting creator discovery, fraud detection, campaign/ROI analysis, and data-driven workflows. Developed as an AI-assisted product using rapid application development practices.",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
      tech: ["Python", "FastAPI", "React.js", "Data Analytics"],
      liveUrl: "https://creatorcheck.org"
    },
    {
      id: "proj3",
      number: "03",
      title: "NLP MOVIE RECOMMENDATION",
      description: "Analyzes film datasets, executes automated data cleaning/feature engineering, and implements similarity matrices (Cosine Similarity, TF-IDF Vectorization) to map metadata correlations.",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
      tech: ["Python", "NLP", "Pandas", "Scikit-Learn"],
      liveUrl: "https://github.com/keyurkalathiya/movie-recommender"
    },
    {
      id: "proj4",
      number: "04",
      title: "FOOD & VEG ECOMMERCE",
      description: "Built a responsive full-stack platform managing custom catalog registries. Designed normalized MySQL logical keys, product state controls, customer dashboard components, and dynamic ordering workflows.",
      imageUrl: "https://images.unsplash.com/photo-1506617564039-2f3b65017261?w=800&auto=format&fit=crop&q=80",
      tech: ["PHP", "JavaScript", "MySQL", "HTML5 & CSS3"],
      liveUrl: "https://github.com/keyurkalathiya/ecommerce-platform"
    },
    {
      id: "proj5",
      number: "05",
      title: "BLOOD DONATION NETWORK",
      description: "Created an emergency blood donation network platform which matches localized emergency blood requirements with registered local donors in real time.",
      imageUrl: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&auto=format&fit=crop&q=80",
      tech: ["PHP", "MySQL", "HTML5", "JavaScript"],
      liveUrl: "https://github.com/keyurkalathiya/blood-donation"
    }
  ];

  return (
    <section 
      id="projects"
      className="relative bg-[#0C0C0C] border-t border-white/5 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 py-24 md:py-32 font-sans overflow-hidden z-10 -mt-10"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(182,0,168,0.06),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 md:mb-24 text-center">
          <FadeIn delay={0.15} y={30}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#B600A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>STUNNING EXPERIENCES</span>
            </div>
            <h2 className="hero-heading text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="text-[#D7E2EA]/50 text-sm sm:text-base max-w-xl mx-auto uppercase tracking-wider font-medium">
              Explore custom systems merging robust machine learning with reliable full-stack software architectures.
            </p>
          </FadeIn>
        </div>

        {/* Responsive Grid Layout (3-Column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <FadeIn 
              key={project.id} 
              delay={0.1 + (idx * 0.1)} 
              y={30}
              className="flex"
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
