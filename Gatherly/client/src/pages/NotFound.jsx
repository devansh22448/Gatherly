import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaCompass, FaTicketAlt } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative overflow-hidden bg-bg-primary text-text-primary">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 px-4">
        {/* Animated Abstract Ticket / Space Graphic */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary text-5xl shadow-2xl shadow-primary/20"
        >
          <FaTicketAlt className="animate-pulse" />
        </motion.div>

        {/* Large 404 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-7xl md:text-9xl font-black font-heading leading-none tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold font-heading mb-4 text-text-primary"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-muted text-base md:text-lg max-w-lg mx-auto font-light leading-relaxed mb-8"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30 text-sm"
          >
            <FaHome className="text-base" /> Back to Home
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-bg-surface hover:bg-bg-card text-text-primary font-semibold px-7 py-3.5 rounded-2xl border border-border-color hover:border-primary/50 transition-all duration-300 hover:scale-105 text-sm"
          >
            <FaCompass className="text-base text-primary" /> Explore Events
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
