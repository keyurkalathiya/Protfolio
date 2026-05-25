import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutMeSection from "./components/AboutMeSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ContactFormModal from "./components/ContactFormModal";
import ChatbotWidget from "./components/ChatbotWidget";
import Navbar from "./components/Navbar";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState("Full-Stack Dev");

  // Open contact form handler for the floating interactive modal
  const handleOpenContact = (service: any = "Full-Stack Dev") => {
    const selectedService = typeof service === "string" ? service : "Full-Stack Dev";
    setPreSelectedService(selectedService);
    setIsContactOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-[#B600A8] selection:text-white overflow-x-hidden">
      
      {/* GLOBAL DYNAMIC TRANSPARENT ADAPTIVE NAVBAR */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <HeroSection onOpenContact={(service) => handleOpenContact(service)} />

      {/* 2. ABOUT ME SECTION */}
      <AboutMeSection />

      {/* 3. SKILLS & TECH STACK SECTION */}
      <SkillsSection />

      {/* 4. PROJECTS SECTION */}
      <ProjectsSection />

      {/* 5. WORK EXPERIENCE TIMELINE SECTION */}
      <ExperienceSection />

      {/* 6. TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 7. MINIMAL CONTACT SECTION */}
      <ContactSection />

      {/* 8. FOOTER */}
      <Footer />

      {/* --- FLOATING CONTACT FORM ESTIMATE MODAL --- */}
      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={preSelectedService}
      />

      {/* --- PORTFOLIO INTELLIGENCE AI CHATBOT --- */}
      <ChatbotWidget />

    </div>
  );
}
