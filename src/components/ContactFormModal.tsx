import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Sparkles, Mail } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ContactFormModal({ isOpen, onClose, initialService = "Full-Stack Dev" }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: initialService,
    message: "",
    complexity: "Medium", // Low, Medium, High
  });

  const [customService, setCustomService] = useState("");
  const [useCustomBudget, setUseCustomBudget] = useState(false);
  const [customBudget, setCustomBudget] = useState("75000");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleComplexityChange = (complexity: string) => {
    setFormData((prev) => ({ ...prev, complexity }));
  };

  // Beautiful real-time interactive price estimator (Rupees)
  const calculateEstimate = () => {
    let basePrice = 50000;
    switch (formData.service) {
      case "Full-Stack Dev":
        basePrice = 80000;
        break;
      case "Machine Learning":
        basePrice = 100000;
        break;
      case "Data Analytics":
        basePrice = 55000;
        break;
      case "RESTful APIs":
        basePrice = 65000;
        break;
      case "React Dashboard":
        basePrice = 75000;
        break;
      case "Other":
        basePrice = 50000;
        break;
    }

    let multiplier = 1;
    if (formData.complexity === "Low") multiplier = 0.75;
    if (formData.complexity === "High") multiplier = 1.5;

    return Math.round(basePrice * multiplier);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }
    if (formData.service === "Other" && !customService.trim()) {
      setError("Please specify your custom service.");
      return;
    }
    setError("");

    const displayedService = formData.service === "Other" ? `Other: ${customService}` : formData.service;
    const finalBudgetVal = useCustomBudget ? Number(customBudget) || 0 : calculateEstimate();
    const formattedBudget = `₹${finalBudgetVal.toLocaleString("en-IN")}`;

    setSubmitted(true);

    // Persist to local storage to simulate secure submission
    const currentSubmissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
    currentSubmissions.push({
      ...formData,
      service: displayedService,
      estimate: finalBudgetVal,
      date: new Date().toISOString(),
    });
    localStorage.setItem("contact_submissions", JSON.stringify(currentSubmissions));

    // Construct Mailto draft and direct
    const mailSubject = `[Project Proposal] ${formData.name} - ${displayedService}`;
    const mailBody = `Hello Keyur,

I would like to initiate a project proposal with you.

Here are the details:
- Name: ${formData.name}
- Email: ${formData.email}
- Service Required: ${displayedService}
- Project Scope Scale: ${formData.complexity}
- Estimated Budget: ${formattedBudget}

Message:
${formData.message}

Looking forward to your reply.
Best regards,
${formData.name}`;

    const mailtoUrl = `mailto:keyurkalathiya121@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      service: "Full-Stack Dev",
      message: "",
      complexity: "Medium",
    });
    setCustomService("");
    setUseCustomBudget(false);
    setCustomBudget("75000");
    setSubmitted(false);
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#0F0F11] border border-[#D7E2EA]/15 rounded-3xl overflow-hidden shadow-2xl z-10 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D7E2EA]/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B600A8]" />
                <span className="font-semibold text-lg tracking-wider uppercase text-[#D7E2EA]">
                  Start Your Project
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="p-1 px-2 text-[#D7E2EA] hover:text-white hover:bg-white/10 rounded-full transition-all text-sm shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-950/45 border border-red-500/20 rounded-xl text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-[#1A1A1E] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-[#1A1A1E] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Category */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                        Requested Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-[#1A1A1E] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                      >
                        <option value="Full-Stack Dev">Full-Stack Dev</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="RESTful APIs">RESTful APIs</option>
                        <option value="React Dashboard">React Dashboard</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Complexity / Scope scale */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                        Project Scope scale
                      </label>
                      <div className="flex bg-[#1A1A1E] rounded-xl p-1 border border-[#D7E2EA]/15">
                        {["Low", "Medium", "High"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => handleComplexityChange(level)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                              formData.complexity === level
                                ? "bg-[#B600A8] text-white"
                                : "text-white/50 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom spec description for "Other" */}
                  {formData.service === "Other" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                        Specify Your Custom Service Request *
                      </label>
                      <input
                        type="text"
                        required
                        value={customService}
                        onChange={(e) => setCustomService(e.target.value)}
                        placeholder="e.g. Android Application Development, AWS System Deployment"
                        className="w-full bg-[#1A1A1E] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </motion.div>
                  )}

                  {/* Calculator Widget embedded */}
                  <div className="bg-[#15151A] rounded-2xl p-5 border border-[#D7E2EA]/10 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-lg font-bold select-none w-11 h-11 flex items-center justify-center shrink-0">
                          ₹
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-semibold uppercase tracking-wider">
                            Est. Project Budget Cost
                          </h4>
                          <p className="text-xs text-white/50">
                            Based on standard Software Engineering rates (INR)
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        {useCustomBudget ? (
                          <div className="flex items-center gap-1.5 bg-[#1F1F24] px-3 py-1.5 rounded-xl border border-white/10 w-full sm:w-auto">
                            <span className="text-green-400 font-bold">₹</span>
                            <input
                              type="number"
                              value={customBudget}
                              onChange={(e) => setCustomBudget(e.target.value)}
                              placeholder="Budget"
                              className="bg-transparent text-green-400 font-black text-xl sm:text-2xl w-32 focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none border-none outline-none p-0"
                            />
                          </div>
                        ) : (
                          <div>
                            <span className="text-2xl sm:text-3xl font-black text-green-400 block">
                              ₹{calculateEstimate().toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-white/40 block">INR base</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Custom estimate input toggle */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <input
                        type="checkbox"
                        id="custom-budget-toggle"
                        checked={useCustomBudget}
                        name="useCustomBudget"
                        onChange={(e) => setUseCustomBudget(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#B600A8] focus:ring-[#B600A8]/50 bg-black/40 accent-[#B600A8] cursor-pointer"
                      />
                      <label htmlFor="custom-budget-toggle" className="text-xs text-white/60 uppercase tracking-widest font-bold cursor-pointer select-none hover:text-white transition-colors">
                        I want to set my own custom budget (₹)
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                      Tell me about your vision *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Explain your ideas, ML algorithms, database architecture or overall website requirements..."
                      className="w-full bg-[#1A1A1E] border border-[#D7E2EA]/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
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
                      Submit Details
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-wider">
                      Details Transmitted!
                    </h3>
                    <p className="text-[#D7E2EA]/70 max-w-sm mt-2 mx-auto text-sm">
                      Thank you, {formData.name}. Keyur has received your query and will generate a full scope of work estimate within 12 hours.
                    </p>
                  </div>

                  <div className="bg-[#1A1A1E] rounded-xl p-4 border border-[#D7E2EA]/10 w-full text-left max-w-md">
                    <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold mb-3 border-b border-[#D7E2EA]/10 pb-2">
                      Summary Recap
                    </div>
                    <div className="space-y-2 text-sm text-white/80">
                      <div className="flex justify-between">
                        <span className="text-white/50">Service:</span>
                        <span className="font-medium text-white">
                          {formData.service === "Other" ? `Other: ${customService}` : formData.service}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Est. Budget:</span>
                        <span className="font-bold text-green-400 text-right">
                          ₹{(useCustomBudget ? Number(customBudget) || 0 : calculateEstimate()).toLocaleString("en-IN")} INR
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Average Reply Time:</span>
                        <span className="font-medium text-purple-400">Under 12 hours</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="px-8 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-white font-medium text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
