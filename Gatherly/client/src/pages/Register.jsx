import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTicketAlt, FaUserPlus, FaLock, FaCheckCircle, FaGoogle, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  const { register, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "bg-border-color" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 33, label: "Weak", color: "bg-red-500" };
    if (score === 2 || score === 3) return { score: 66, label: "Medium", color: "bg-accent" };
    return { score: 100, label: "Strong", color: "bg-success" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedTerms) {
      setError("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (!showOTP) {
        await register(name, email, password);
        setShowOTP(true);
        setError("");
      } else {
        await verifyOTP(email, otp);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.message || err || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-bg-primary pt-16 md:pt-20">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-bg-card/70 border border-border-color rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
          {/* Left Column - Split Marketing */}
          <div className="lg:col-span-6 bg-gradient-to-br from-bg-surface via-bg-card to-bg-primary p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-color/60">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
                <FaTicketAlt className="text-xs" /> Join Gatherly
              </div>

              <h1 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-4 text-text-primary">
                Unlock Campus{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>

              <p className="text-text-muted text-base leading-relaxed mb-8 font-light">
                Create your Gatherly account to start discovering workshops, booking event tickets, and connecting with student organizations.
              </p>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaUserPlus />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      Seamless Registration
                    </h4>
                    <p className="text-text-muted text-xs">
                      Instant setup with simple email & password verification
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaLock />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      Verified Access
                    </h4>
                    <p className="text-text-muted text-xs">
                      Secure OTP verification ensures valid student & guest accounts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-base flex-shrink-0 mt-0.5">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm font-heading">
                      Instant Digital Tickets
                    </h4>
                    <p className="text-text-muted text-xs">
                      Receive tickets and event notifications immediately upon registration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-text-muted/60 border-t border-border-color/40 mt-8">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In here</Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold text-text-primary mb-2 font-heading">
                Create Account
              </h2>
              <p className="text-text-muted text-sm mb-6">
                Join thousands of students on Gatherly today
              </p>


             

             

              {error && (
                <div className="bg-error/10 border border-error/30 text-error p-3.5 rounded-xl mb-6 text-center text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!showOTP ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

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
                      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="mt-2.5 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-text-muted/60">Strength:</span>
                            <span className="font-bold text-text-primary">{strength.label}</span>
                          </div>
                          <div className="w-full bg-bg-surface h-1.5 rounded-full overflow-hidden border border-border-color/50">
                            <div
                              className={`h-full ${strength.color} transition-all duration-300`}
                              style={{ width: `${strength.score}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-muted leading-relaxed">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded border-border-color bg-bg-surface text-primary focus:ring-primary/40 cursor-pointer"
                        />
                        <span>
                          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                        </span>
                      </label>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="bg-success/10 border border-success/30 text-success p-3.5 rounded-xl mb-6 text-center text-sm font-medium">
                      ✓ Account created! Please verify your email code below.
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
                      Check your email inbox for the 6-digit code
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-primary/25 disabled:opacity-60 text-sm flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : showOTP ? (
                    "✓ Verify OTP & Finish Setup"
                  ) : (
                    <>
                      Create Free Account <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>
              </form>

              {!showOTP && (
                <div className="mt-8 pt-6 border-t border-border-color/60 text-center">
                  <p className="text-text-muted text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary font-bold hover:text-primary-hover transition"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
