'use client';

import { useState } from "react";
import Navbar from "../Navbar";
import styles from "../../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name must not exceed 100 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!trimmedMessage) {
      newErrors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = "Message must not exceed 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call to send message
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setSubmitSuccess(false);
    setErrors({});
    setTimeout(() => {
      document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSubmitSuccess(false);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative text-[#570000] ${isFormOpen ? 'min-h-screen pb-24' : 'h-[100dvh] overflow-hidden md:h-auto md:min-h-screen md:overflow-visible md:pb-24'}`}>
      <Navbar />

      <section className="relative pt-[20vh] px-[2%] mb-12 flex flex-col md:flex-row md:justify-between md:items-start">
        {/* Left Side: Header and Details */}
        <div className="relative z-10 -mt-[72px] md:w-1/2 space-y-16 flex flex-col items-center md:items-start w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center md:text-left"
          >
            <h1 className={styles.aboutTitle} style={{ color: '#570000' }}>Reach Out</h1>
            <p className="font-[family-name:var(--font-dm-mono)] text-xl md:text-base uppercase tracking-[0.5em] text-[#570000] mt-4 font-bold leading-relaxed">
              <span className="block md:inline">Connect with</span>
              <span className="hidden md:inline"> </span>
              <span className="block md:inline">the Sanctuary</span>
            </p>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-dm-mono)] text-lg md:text-base uppercase tracking-[0.5em] md:tracking-[0.4em] text-[#570000] font-bold">Find Your Way</h2>
              <p className="font-[family-name:var(--font-eb-garamond)] text-3xl italic text-[#570000] leading-tight">
                SCO 123-124, Sector 17-C,<br />
                Chandigarh, 160017
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-dm-mono)] text-lg md:text-base uppercase tracking-[0.5em] md:tracking-[0.4em] text-[#570000] font-bold">A Conversation</h2>
              <div className="space-y-1">
                <p className="font-[family-name:var(--font-eb-garamond)] text-3xl italic text-[#570000]">
                  +91 94645 06000
                </p>
                <p className="font-[family-name:var(--font-eb-garamond)] text-3xl italic text-[#570000]">
                  hello@cwtchcafe.com
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-dm-mono)] text-lg md:text-base uppercase tracking-[0.5em] md:tracking-[0.4em] text-[#570000] font-bold">Social Sanctuary</h2>
              <a
                href="https://instagram.com/cwtchcafe"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-eb-garamond)] text-3xl italic text-[#570000] hover:text-black transition-colors block"
              >
                @cwtchcafe
              </a>
            </div>

            <div className="pt-2 -translate-y-[2px] md:translate-y-0">
              <button 
                onClick={handleOpenForm} 
                className={styles.discoverButton + " !py-3 !px-8 !bg-[#570000] !text-white hover:!bg-white hover:!text-[#570000] shadow-xl"}
              >
                Send a Message
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form (Top Right on Desktop) */}
        <div className="mt-16 md:-mt-12 md:w-[45%] lg:w-[400px] z-20 md:mr-[2%] flex items-center justify-center">
          <AnimatePresence>
            {isFormOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full origin-center"
              >
                <div id="contact-form-container" className="relative bg-white/30 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/50 shadow-2xl h-[50vh] flex flex-col justify-center">
                  <button 
                    onClick={handleCloseForm} 
                    className="absolute top-4 right-4 text-[#570000] hover:text-black transition-colors p-1 z-30"
                    title="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <AnimatePresence mode="wait">
                    {submitSuccess ? (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="text-center space-y-5 py-4 flex flex-col items-center justify-center h-full"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#570000]/10 flex items-center justify-center text-[#570000] shadow-inner">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.4em] text-[#570000] font-bold">Message Sent</h3>
                          <p className="font-[family-name:var(--font-eb-garamond)] text-2xl italic text-[#570000] max-w-xs leading-snug px-4">
                            Your thoughts have found safe harbor in our sanctuary.
                          </p>
                        </div>
                        <button
                          onClick={handleCloseForm}
                          className={styles.discoverButton + " !py-2.5 !px-6 !bg-[#570000] !text-white hover:!bg-white hover:!text-[#570000] !text-sm !mt-2 shadow-md"}
                        >
                          Return Home
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto scrollbar-hide pr-2 mt-4 flex flex-col justify-between h-full py-2">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.4em] text-[#570000] font-bold">Your Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-transparent border-b border-[#570000]/30 py-1 focus:border-[#570000] transition-colors outline-none font-[family-name:var(--font-eb-garamond)] text-xl text-[#570000] placeholder:text-[#570000]/40"
                              placeholder="e.g. Julian"
                            />
                            {errors.name && (
                              <p className="text-[#570000] text-[10px] font-[family-name:var(--font-dm-mono)] tracking-wider mt-0.5 opacity-90">{errors.name}</p>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.4em] text-[#570000] font-bold">Email Address</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-transparent border-b border-[#570000]/30 py-1 focus:border-[#570000] transition-colors outline-none font-[family-name:var(--font-eb-garamond)] text-xl text-[#570000] placeholder:text-[#570000]/40"
                              placeholder="hello@example.com"
                            />
                            {errors.email && (
                              <p className="text-[#570000] text-[10px] font-[family-name:var(--font-dm-mono)] tracking-wider mt-0.5 opacity-90">{errors.email}</p>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.4em] text-[#570000] font-bold">Your Message</label>
                            <textarea
                              required
                              rows={2}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full bg-transparent border-b border-[#570000]/30 py-1 focus:border-[#570000] transition-colors outline-none font-[family-name:var(--font-eb-garamond)] text-lg text-[#570000] resize-none placeholder:text-[#570000]/40"
                              placeholder="Tell us about your longing..."
                            />
                            {errors.message && (
                              <p className="text-[#570000] text-[10px] font-[family-name:var(--font-dm-mono)] tracking-wider mt-0.5 opacity-90">{errors.message}</p>
                            )}
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={styles.discoverButton + " w-full !mt-4 !py-2.5 !bg-[#570000] !text-white hover:!bg-white hover:!text-[#570000] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Vertical Japanese Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden xl:flex fixed right-[2%] top-[20vh] h-[60vh] flex-col justify-between py-2 pointer-events-none"
      >
        {"心を込めて、お待ちしております".split("").map((char, index) => (
          <span key={index} className={styles.verticalJapaneseChar + " !text-[#570000]"}>
            {char}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
