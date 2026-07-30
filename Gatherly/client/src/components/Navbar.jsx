import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTicketAlt, FaBars, FaTimes, FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/events");
    }
  };

  const navLinks = [
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navbarClasses = scrolled
    ? "bg-bg-primary/70 border-white/10 shadow-2xl"
    : "bg-transparent border-transparent shadow-none";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${navbarClasses}`}>
      <div className="backdrop-blur-xl border-b transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group relative">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                <FaTicketAlt className="text-lg" />
              </div>
            </div>
            <span className="text-text-primary text-2xl font-black tracking-wide font-heading">
              Gatherly
            </span>
          </Link>

          {/* Center: Nav Links + Search */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-all duration-300 ${
                    active ? "text-primary" : "text-text-muted hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Compact Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-bg-surface/50 border border-white/10 hover:border-primary/40 rounded-full px-4 py-2 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-bg-surface/80">
                <FaSearch className="text-text-muted text-sm group-hover:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 xl:w-48 bg-transparent border-none text-text-primary placeholder-text-muted/50 text-sm focus:outline-none ml-2"
                />
              </div>
            </form>
          </div>

          {/* Right: Auth Actions */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2.5 text-text-muted hover:text-white transition-colors text-sm font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                    <FaUser className="text-xs" />
                  </div>
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-text-muted hover:text-error transition-colors flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/5"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <Link
                  to="/login"
                  className="text-text-muted hover:text-white transition-colors text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary focus:outline-none hover:bg-white/10 transition-all"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 lg:hidden bg-bg-card/95 border-t border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="p-6">
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-surface border border-border-color text-text-primary placeholder-text-muted/50 focus:ring-2 focus:ring-primary/40 outline-none"
                />
              </form>

              <div className="flex flex-col gap-2 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === "admin" ? "/admin" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center bg-primary/10 text-primary hover:bg-primary hover:text-white py-3.5 rounded-xl font-bold border border-primary/30 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center bg-error/10 text-error hover:bg-error hover:text-white py-3.5 rounded-xl font-bold border border-error/20 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center bg-white/5 text-text-primary hover:bg-white/10 py-3.5 rounded-xl font-bold border border-white/10 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
