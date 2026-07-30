import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTicketAlt, FaShieldAlt, FaKey, FaCalendarCheck, FaGoogle, FaArrowRight, FaTimes } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const { login, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!showOTP) {
        const data = await login(email, password);
        if (data.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        const data = await verifyOTP(email, otp);
        if (data.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      }
    } catch (err) {
      if (err?.needsVerification) {
        setShowOTP(true);
        setError("Account not verified. A new OTP has been sent to your email.");
      } else {
        setError(err?.message || err || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetMessage("If an account exists with this email, password reset instructions have been sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-bg-primary pt-16 md:pt-20">
      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-bg-card/70 border border-border-color rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Column - Split Screen Marketing */}
          <div className="lg:col-span-6 bg-gradient-to-br from-bg-surface via-bg-card to-bg-primary p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-color/60">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
                <FaTicketAlt className="text-xs" /> Gatherly Portal
              </div>

              <h1 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-4 text-text-primary">
                Welcome Back to{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Gatherly
                </span>
              </h1>

              <p className="text-text-muted text-base leading-relaxed mb-8 font-light">
                Sign in to manage your event registrations, access your digital tickets, and explore upcoming campus activities.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      Enterprise Security
                    </h4>
                    <p className="text-text-muted text-xs">
                      Industry standard encryption keeping your credentials safe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaKey />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      2FA OTP Protection
                    </h4>
                    <p className="text-text-muted text-xs">
                      Two-factor verification via email for account safety
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      Instant Booking Access
                    </h4>
                    <p className="text-text-muted text-xs">
                      Retrieve all tickets and manage check-ins directly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-text-muted/60 border-t border-border-color/40 mt-8">
              Need assistance? <Link to="/contact" className="text-primary hover:underline">Contact Support</Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold text-text-primary mb-2 font-heading">
                Sign In
              </h2>
              <p className="text-text-muted text-sm mb-6">
                Enter your credentials to access your account
              </p>

              

             
              

              {error && (
                <div className="bg-error/10 border border-error/30 text-error p-3.5 rounded-xl mb-6 text-center text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!showOTP ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-xs text-primary hover:text-primary-hover font-semibold transition"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-text-muted">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-border-color bg-bg-surface text-primary focus:ring-primary/40 cursor-pointer"
                        />
                        <span>Remember me for 30 days</span>
                      </label>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="bg-success/10 border border-success/30 text-success p-3.5 rounded-xl mb-6 text-center text-sm font-medium">
                      OTP sent to your email address
                    </div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="000000"
                      className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-center text-lg font-bold tracking-widest"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                    />
                    <p className="text-text-muted/60 text-xs mt-3 text-center">
                      Please enter the 6-digit code sent to your email
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-primary/25 disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : showOTP ? (
                    "Verify OTP & Sign In"
                  ) : (
                    <>
                      Sign In to Account <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-border-color/60 text-center">
                <p className="text-text-muted text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-bold hover:text-primary-hover transition"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal (UI Only) */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg-card border border-border-color rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
          >
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetMessage("");
              }}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-2"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold font-heading text-text-primary mb-2">
              Reset Password
            </h3>
            <p className="text-text-muted text-xs mb-6">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            {resetMessage ? (
              <div className="bg-success/10 border border-success/30 text-success p-3.5 rounded-xl text-center text-xs font-medium mb-4">
                {resetMessage}
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl text-sm transition"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Login;
