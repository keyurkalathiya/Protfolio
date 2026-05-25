import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, MapPin, Send, CheckCircle2, Sparkles, MessageSquareDot, 
  Github, Linkedin, Globe 
} from "lucide-react";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    setSubmitted(true);

    // Save to localStorage
    const currentSubmissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
    currentSubmissions.push({
      ...formData,
      service: "Direct Message",
      estimate: 0,
      date: new Date().toISOString()
    });
    localStorage.setItem("contact_submissions", JSON.stringify(currentSubmissions));

    // Draft WhatsApp message & open thread
    const waText = `Hello Keyur,
My name is: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;
    const encodedText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/919510703901?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 py-24 md:py-32 font-sans overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 md:mb-24 text-center">
          <FadeIn delay={0.1} y={30}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 text-[#B600A8] text-xs font-semibold uppercase tracking-wider mb-4">
              <MessageSquareDot className="w-3.5 h-3.5" />
              <span>Contact Channels</span>
            </div>
            <h2 className="text-[#0C0C0C] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none mb-4">
              GET IN TOUCH
            </h2>
            <p className="text-[#0C0C0C]/60 text-sm sm:text-base max-w-xl mx-auto uppercase tracking-wider font-medium">
              Want to integrate a machine learning workflow or construct a full-stack web application? Reach out!
            </p>
          </FadeIn>
        </div>

        {/* Clean, Modular Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Info and stylized map coordinate placeholder (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn delay={0.15} x={-30} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0C0C0C]">
                  Visual Studio Channels
                </h3>
                <p className="text-[#0C0C0C]/70 text-sm sm:text-base font-light leading-relaxed">
                  I typically respond to verified professional inquiries within 12 hours. Reach out to discuss timelines, pricing matrices, and technical specifications.
                </p>
              </div>

              {/* Status details container with icons */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/5">
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/5 text-[#B600A8] border border-[#0C0C0C]/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0C0C0C]/40 tracking-wider block">Send email</span>
                    <a href="mailto:keyurkalathiya121@gmail.com" className="font-semibold text-[#0C0C0C] hover:text-[#B600A8] transition-colors text-sm sm:text-base">
                      keyurkalathiya121@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/5">
                  <div className="p-3 rounded-xl bg-[#0C0C0C]/5 text-[#B600A8] border border-[#0C0C0C]/5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#0C0C0C]/40 tracking-wider block">Physical Location</span>
                    <span className="font-semibold text-[#0C0C0C] text-sm sm:text-base block">
                      Surat, Gujarat, India &middot; Available Remotely
                    </span>
                  </div>
                </div>
              </div>

              {/* Stylized high-contrast geometric vector map placeholder */}
              <div className="relative rounded-3xl overflow-hidden border border-[#0C0C0C]/10 h-48 bg-[#0C0C0C]/5 flex items-center justify-center p-6">
                {/* Simulated coordinate background art */}
                <div className="absolute inset-0 opacity-[0.06] select-none pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                
                {/* Clean, humble label */}
                <div className="relative text-center space-y-2">
                  <div className="inline-flex py-1.5 px-3 rounded-xl bg-white text-xs font-semibold text-[#0C0C0C] uppercase tracking-wider shadow-sm items-center gap-2 border border-[#0C0C0C]/10">
                    <Globe className="w-3.5 h-3.5 text-[#B600A8]" />
                    <span>21.1702&deg; N, 72.8311&deg; E</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[#0C0C0C]/40 font-bold block">
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>

              {/* Social Channels List with beautiful design */}
              <div className="space-y-3 pt-4">
                <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/40 font-bold block">
                  Connect on Socials
                </span>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/keyurkalathiya" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 rounded-xl bg-[#0C0C0C]/5 border border-[#0C0C0C]/5 hover:bg-[#B600A8]/10 hover:border-[#B600A8]/30 hover:text-[#B600A8] text-[#0C0C0C]/70 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/keyurkalathiya-871451330" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 rounded-xl bg-[#0C0C0C]/5 border border-[#0C0C0C]/5 hover:bg-[#B600A8]/10 hover:border-[#B600A8]/30 hover:text-[#B600A8] text-[#0C0C0C]/70 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Column 2: Minimalist Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
            <FadeIn delay={0.2} x={30} className="w-full h-full flex flex-col justify-center">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#0C0C0C]/60 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/15 rounded-xl px-4 py-3 text-[#0C0C0C] placeholder-[#0C0C0C]/30 focus:outline-none focus:border-[#B600A8] focus:bg-[#0C0C0C]/[0.01] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#0C0C0C]/60 font-bold">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/15 rounded-xl px-4 py-3 text-[#0C0C0C] placeholder-[#0C0C0C]/30 focus:outline-none focus:border-[#B600A8] focus:bg-[#0C0C0C]/[0.01] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#0C0C0C]/60 font-bold">
                      Your Vision Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hello Keyur, we would love to build a machine learning predictor or web integration..."
                      className="w-full bg-[#0C0C0C]/[0.03] border border-[#0C0C0C]/15 rounded-xl px-4 py-3 text-[#0C0C0C] placeholder-[#0C0C0C]/30 focus:outline-none focus:border-[#B600A8] focus:bg-[#0C0C0C]/[0.01] transition-all resize-none"
                    />
                  </div>

                  {/* Submit button following the Bold Gradient pattern */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                      }}
                      className="w-full rounded-xl py-4 uppercase font-bold tracking-widest text-white cursor-pointer flex items-center justify-center gap-2 border border-white/10"
                    >
                      <Send className="w-4 h-4" />
                      Transmit Message
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-[#0C0C0C] tracking-wide">
                      Message Received!
                    </h3>
                    <p className="text-[#0C0C0C]/70 max-w-sm mt-2 mx-auto text-sm">
                      Thank you, {formData.name}. Keyur will trace back and review your project specifications within 12 hours.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="px-8 py-2.5 rounded-full border border-[#0C0C0C]/20 hover:border-[#0C0C0C]/50 text-[#0C0C0C] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
