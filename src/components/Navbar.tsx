import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Send } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor active sections using IntersectionObserver
  useEffect(() => {
    const sectionIds = MENU_ITEMS.map((item) => item.id);
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger when 35% of the section is visible in the viewport
          threshold: 0.35,
          rootMargin: "-10% 0px -40% 0px",
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    // Also monitor scroll offset to add ambient blur
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  const handleMenuClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll with modern API
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Determine theme matches based on section background type
  // Light sections in portfolio: Skills, Experience, Contact
  // Dark sections in portfolio: Home, About, Projects
  const isLightSectionActive = ["skills", "experience", "contact"].includes(activeSection);

  return (
    <>
      <nav
        id="main-fixed-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans ${
          isScrolled
            ? isLightSectionActive
              ? "bg-white/75 backdrop-blur-md shadow-sm border-b border-black/5 py-3"
              : "bg-[#0C0C0C]/75 backdrop-blur-md shadow-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-center min-h-[44px] relative">
          
          {/* Desktop Navigation Menu Links Centered */}
          <div className="hidden md:flex items-center gap-1.5 bg-white/[0.02] border border-white/5 backdrop-blur-xs rounded-full p-1">
            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              
              // Custom interactive tag styles per state
              let btnClass = "relative px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer select-none ";
              
              if (isActive) {
                if (isLightSectionActive) {
                  // White Section: Intense dark font with custom Magenta highlights
                  btnClass += "text-white bg-[#B600A8] shadow-sm";
                } else {
                  // Dark Section: Crisp white text with pink-magenta background pill
                  btnClass += "text-white bg-[#B600A8] shadow-[0_4px_12px_rgba(182,0,168,0.3)]";
                }
              } else {
                if (isLightSectionActive) {
                  // White Section idle
                  btnClass += "text-slate-800 hover:text-[#B600A8] hover:bg-slate-100";
                } else {
                  // Dark Section idle
                  btnClass += "text-[#D7E2EA]/70 hover:text-[#FF5CE2] hover:bg-white/5";
                }
              }

              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={btnClass}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-[#B600A8] -z-10 mix-blend-normal"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile responsive toggle button on absolute right to avoid occupying space */}
          <button
            id="mobile-nav-toggle"
            aria-label="Toggle Navigation Drawer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden absolute right-6 p-2 rounded-xl transition-colors duration-300 cursor-pointer ${
              isLightSectionActive
                ? "text-slate-900 hover:bg-slate-100"
                : "text-white hover:bg-white/5"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu Overlays */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[60px] left-0 w-full z-40 border-b shadow-2xl p-6 flex flex-col gap-4 md:hidden backdrop-blur-xl ${
              isLightSectionActive
                ? "bg-white/95 border-slate-200 text-slate-900"
                : "bg-[#0C0C0C]/95 border-white/5 text-[#D7E2EA]"
            }`}
          >
            <div className="space-y-2">
              {MENU_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-[#B600A8] text-white"
                        : isLightSectionActive
                        ? "hover:bg-slate-100 text-slate-800"
                        : "hover:bg-white/5 text-[#D7E2EA]/80"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
