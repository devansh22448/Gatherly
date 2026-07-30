import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock form submission logic for UI feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-20 pt-20 md:pt-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-16 pb-16 px-4 bg-gradient-to-b from-bg-surface/40 to-bg-primary border-b border-border-color/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <FaEnvelope className="text-xs" />
            Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black font-heading mb-4"
          >
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Hear From You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-muted text-base md:text-lg max-w-xl mx-auto font-light"
          >
            Have questions about event registrations, organizing campus fests, or partnership inquiries? Send us a message!
          </motion.p>
        </div>
      </section>

      {/* Main Content: Split Screen Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-bg-card border border-border-color p-8 md:p-10 rounded-3xl shadow-xl shadow-black/20">
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-2">
                Send Us a Message
              </h2>
              <p className="text-text-muted text-sm mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-3 text-success text-sm font-medium"
                >
                  <FaCheckCircle className="text-xl flex-shrink-0" />
                  <span>
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@university.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Event registration inquiry or feedback..."
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Write your details or question here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/25 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Cards */}
            <div className="bg-bg-card border border-border-color p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold font-heading text-text-primary border-b border-border-color/60 pb-4">
                Contact Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-lg flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase font-semibold">Email Us</p>
                  <p className="text-text-primary text-sm font-semibold">gatherly@gmail.com</p>
                  <p className="text-text-muted/60 text-xs">For general inquiries & ticketing</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-lg flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase font-semibold">Call Us</p>
                  <p className="text-text-primary text-sm font-semibold">+91 89345689##</p>
                  <p className="text-text-muted/60 text-xs">Toll-free student support line</p>
                </div>
              </div>

             

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-lg flex-shrink-0">
                  <FaClock />
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase font-semibold">Support Hours</p>
                  <p className="text-text-primary text-sm font-semibold">Monday - Friday: 9 AM - 6 PM</p>
                  <p className="text-text-muted/60 text-xs">Weekend event emergency support active</p>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-bg-card border border-border-color p-8 rounded-3xl">
              <h3 className="text-lg font-bold font-heading text-text-primary mb-4">
                Connect on Social Media
              </h3>
              <p className="text-text-muted text-xs mb-6">
                Follow our official channels for real-time event updates and announcements.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-11 h-11 rounded-2xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/60 transition-all duration-300 text-lg">
                  <FaTwitter />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/60 transition-all duration-300 text-lg">
                  <FaInstagram />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/60 transition-all duration-300 text-lg">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/60 transition-all duration-300 text-lg">
                  <FaGithub />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/60 transition-all duration-300 text-lg">
                  <FaDiscord />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Contact;
