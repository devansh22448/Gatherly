import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimesCircle, FaArrowRight } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 pt-20 md:pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-bg-card/40 border border-white/10 rounded-3xl p-10 max-w-md w-full text-center backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-error/10 border border-error/30 flex items-center justify-center mx-auto mb-6"
        >
          <FaTimesCircle className="text-error text-4xl" />
        </motion.div>
        <h1 className="text-3xl font-bold text-text-primary mb-4 font-heading">
          Booking Failed
        </h1>
        <p className="text-text-muted mb-8 leading-relaxed">
          We couldn't process your payment. Please ensure your payment details
          are correct and try again.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-error hover:bg-red-600 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-error/20 flex items-center justify-center gap-2"
          >
            Return to Events <FaArrowRight className="text-xs" />
          </Link>
          <Link
            to="/dashboard"
            className="block w-full bg-bg-surface/40 hover:bg-bg-card text-text-primary font-medium py-3.5 px-6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-primary/50"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
