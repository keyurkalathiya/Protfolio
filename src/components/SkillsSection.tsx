import React from "react";
import { 
  Code, Cpu, Database, Figma, Layers, Palette, Terminal, Wrench, Focus, Airplay, Settings, Flame, Sparkles, Github 
} from "lucide-react";
import FadeIn from "./FadeIn";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  level: string;
}

interface CategoryGroup {
  categoryName: string;
  categoryDesc: string;
  items: TechItem[];
}

export default function SkillsSection() {
  const categories: CategoryGroup[] = [
    {
      categoryName: "Core Web & Backend Engineering",
      categoryDesc: "Constructing strong database-driven APIs, RESTful services, and highly responsive user interfaces.",
      items: [
        { name: "React.js / TS", icon: <Layers className="w-5 h-5 text-cyan-500" />, level: "Medium" },
        { name: "PHP Backend", icon: <Terminal className="w-5 h-5 text-purple-500" />, level: "Expert" },
        { name: "Tailwind & CSS3", icon: <Palette className="w-5 h-5 text-teal-500" />, level: "Beginner" },
        { name: "Java & OOP Core", icon: <Code className="w-5 h-5 text-blue-500" />, level: "Advanced" },
      ]
    },
    {
      categoryName: "Data Science & Machine Learning",
      categoryDesc: "Developing custom statistical predictive algorithms, evaluating model energy parameters, and SQL data schemas.",
      items: [
        { name: "Python Language", icon: <Terminal className="w-5 h-5 text-green-500" />, level: "Expert" },
        { name: "Scikit-Learn ML", icon: <Cpu className="w-5 h-5 text-yellow-500" />, level: "Advanced" },
        { name: "NumPy & Pandas", icon: <Layers className="w-5 h-5 text-teal-400" />, level: "Advanced" },
        { name: "MySQL & SQL DB", icon: <Database className="w-5 h-5 text-[#B600A8]/85" />, level: "Medium" },
      ]
    },
    {
      categoryName: "Tools & AI Productivity Flows",
      categoryDesc: "Utilizing advanced large language assistant loops, rapid wireframing, and code version controllers.",
      items: [
        { name: "Claude & ChatGPT", icon: <Sparkles className="w-5 h-5 text-orange-400" />, level: "Expert" },
        { name: "Git & GitHub", icon: <Github className="w-5 h-5 text-rose-500" />, level: "Medium" },
        { name: "VS Code Suite", icon: <Code className="w-5 h-5 text-blue-400" />, level: "Advanced" },
        { name: "Figma Prototyping", icon: <Figma className="w-5 h-5 text-violet-400" />, level: "Medium" },
      ]
    }
  ];

  return (
    <section 
      id="skills"
      className="relative bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 py-24 md:py-32 font-sans overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 text-center">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 text-[#B600A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Infrastructure</span>
            </div>
            <h2 className="text-[#0C0C0C] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              TECH STACK &amp; SKILLS
            </h2>
            <p className="text-[#0C0C0C]/60 text-sm sm:text-base max-w-xl mx-auto uppercase tracking-wider font-medium">
              A comprehensive view of languages, packages, and authoring suites utilized daily.
            </p>
          </FadeIn>
        </div>

        {/* Stack Groups Column List */}
        <div className="space-y-16">
          {categories.map((cat, groupIdx) => (
            <div key={cat.categoryName} className="border-t border-[#0C0C0C]/10 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
              
              {/* Left Column: Category Label */}
              <div className="lg:col-span-4 space-y-2">
                <FadeIn delay={groupIdx * 0.1} y={20}>
                  <div className="text-[10px] uppercase font-bold text-[#B600A8] tracking-[0.25em]">
                    0{groupIdx + 1} &middot; Category
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#0C0C0C] tracking-tight">
                    {cat.categoryName}
                  </h3>
                  <p className="text-[#0C0C0C]/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                    {cat.categoryDesc}
                  </p>
                </FadeIn>
              </div>

              {/* Right Column: Responsive Skill Cards Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.items.map((item, itemIdx) => (
                  <FadeIn 
                    key={item.name} 
                    delay={(groupIdx * 0.15) + (itemIdx * 0.05)} 
                    y={20}
                    className="group relative flex items-center justify-between p-4 rounded-2xl bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/5 hover:bg-[#0C0C0C]/[0.04] hover:border-[#B600A8]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Interactive icon frame */}
                      <div className="p-2.5 rounded-xl bg-[#0C0C0C]/[0.03] group-hover:bg-white border border-[#0C0C0C]/5 group-hover:shadow-sm transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <span className="font-bold text-[#0C0C0C] uppercase tracking-wider text-sm sm:text-base block">
                          {item.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#0C0C0C]/40 font-medium block">
                          Proficiency
                        </span>
                      </div>
                    </div>

                    {/* Level Pill Indicator */}
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#B600A8]/80 px-2.5 py-1 rounded-md border border-[#B600A8]/15 bg-[#B600A8]/5 select-none font-sans">
                      {item.level}
                    </span>
                  </FadeIn>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
