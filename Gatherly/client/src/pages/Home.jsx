import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaLaptopCode,
  FaMusic,
  FaTrophy,
  FaChalkboardTeacher,
  FaArrowRight,
  FaStar,
  FaHeart,
  FaTicketAlt,
} from "react-icons/fa";

const HERO_SLIDES = [
  {
    badge: "Featured Campus Portal",
    title: "Discover. Connect. Celebrate.",
    subtitle: "Explore curated campus events, workshops, seminars, cultural festivals, hackathons, and sports events with instant 2FA ticketing.",
    ctaPrimary: "Explore Events",
    ctaSecondary: "About Gatherly",
    linkPrimary: "/events",
    linkSecondary: "/about",
    bgGradient: "from-primary/20 via-secondary/10 to-transparent",
  },
  {
    badge: "Hackathons & Innovation",
    title: "Code. Innovate. Build Together.",
    subtitle: "Compete in 24-hour campus hackathons, robotics expos, and developer summits with top student talent.",
    ctaPrimary: "Browse Hackathons",
    ctaSecondary: "Learn More",
    linkPrimary: "/events?category=Workshop",
    linkSecondary: "/about",
    bgGradient: "from-blue-600/20 via-purple-600/10 to-transparent",
  },
  {
    badge: "Cultural & Music Nights",
    title: "Live Concerts & Stage Performances.",
    subtitle: "Reserve your tickets for annual college fests, live band concerts, open mics, and dance showcases.",
    ctaPrimary: "Browse Cultural Fests",
    ctaSecondary: "Explore All",
    linkPrimary: "/events?category=Cultural",
    linkSecondary: "/events",
    bgGradient: "from-pink-600/20 via-secondary/10 to-transparent",
  },
];

const CATEGORIES_LIST = [
  {
    name: "Workshops",
    icon: <FaLaptopCode className="text-primary text-2xl" />,
    desc: "Hands-on tech bootcamps, AI workshops, & dev sessions.",
    badge: "badge-workshop",
  },
  {
    name: "Sports",
    icon: <FaTrophy className="text-success text-2xl" />,
    desc: "Inter-college tournaments, esports leagues, & athletic meets.",
    badge: "badge-sports",
  },
  {
    name: "Seminar",
    icon: <FaChalkboardTeacher className="text-blue-400 text-2xl" />,
    desc: "Keynote talks, panel discussions, & research presentations.",
    badge: "badge-seminar",
  },
  {
    name: "Guest Lecture",
    icon: <FaGraduationCap className="text-amber-400 text-2xl" />,
    desc: "Industry leaders & alumni sharing real-world insights.",
    badge: "badge-guest",
  },
  {
    name: "Cultural",
    icon: <FaMusic className="text-secondary text-2xl" />,
    desc: "Music concerts, open mics, drama fests, & dance battles.",
    badge: "badge-cultural",
  },
];

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/events");
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const marqueeItems = [
    "🎤 Open Mic",
    "💻 Hackathons",
    "🎭 Cultural Fest",
    "🎵 Music Concerts",
    "🏆 Sports League",
    "🚀 Startup Expo",
    "📚 Tech Workshops",
    "🎯 Academic Seminars",
    "🤝 Student Networking",
    "🎓 Guest Lectures",
    "🎮 Gaming Tournaments",
    "📸 Photography Expos",
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const featuredEvents = events.slice(0, 6);

  const handlePrevFeatured = () => {
    setFeaturedIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => Math.min(prev + 1, Math.max(0, featuredEvents.length - 1)));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
        .animate-marquee-left {
          animation: marqueeLeft 38s linear infinite;
          width: fit-content;
        }
        .animate-marquee-right {
          animation: marqueeRight 38s linear infinite;
          width: fit-content;
        }
      `}</style>
      <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary font-sans">
        {/* ===== HERO SECTION (Navbar + Hero = 100vh) ===== */}
        <section className="relative pt-20 md:pt-24 pb-12 px-4 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] flex items-center justify-center overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-primary/10 rounded-full blur-[160px] animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-secondary/10 rounded-full blur-[140px] animate-blob animation-delay-2000" />
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-accent/5 rounded-full blur-[100px] animate-blob animation-delay-4000" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/3 left-8 w-2 h-2 bg-primary rounded-full opacity-40 animate-float" />
          <div className="absolute bottom-1/3 right-12 w-3 h-3 bg-secondary rounded-full opacity-30 animate-float-slow" />
          <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-accent rounded-full opacity-50 animate-float" style={{ animationDelay: "1s" }} />

          <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* Hero Top Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-bg-card/40 border border-white/10 text-text-primary px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-md mb-8 transition-all"
                >
                  <span className="bg-primary/20 border border-primary/40 text-primary text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {HERO_SLIDES[currentSlide].badge}
                  </span>
                  <span className="text-text-muted text-xs">Campus Event Platform</span>
                  <span className="text-text-muted/60 text-xs">→</span>
                </motion.div>

                {/* Hero Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] font-heading tracking-tight text-center text-text-primary max-w-4xl"
                >
                  {HERO_SLIDES[currentSlide].title.split(".")[0]}.
                  <br />
                  <span className="bg-gradient-to-r from-white via-purple-300 to-secondary bg-clip-text text-transparent">
                    {HERO_SLIDES[currentSlide].title.split(".").slice(1).join(".")}
                  </span>
                </motion.h1>

                {/* Hero Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                  className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto text-center font-light leading-relaxed mb-10"
                >
                  {HERO_SLIDES[currentSlide].subtitle}
                </motion.p>

                {/* Hero CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md w-full mb-8"
                >
                  <Link
                    to={HERO_SLIDES[currentSlide].linkPrimary}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/20 text-center"
                  >
                    {HERO_SLIDES[currentSlide].ctaPrimary}
                  </Link>
                  <Link
                    to={HERO_SLIDES[currentSlide].linkSecondary}
                    className="w-full sm:w-auto bg-bg-card/40 hover:bg-bg-card border border-white/10 hover:border-primary/50 text-text-primary font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 hover:scale-105 text-center backdrop-blur-md"
                  >
                    {HERO_SLIDES[currentSlide].ctaSecondary}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-bg-card/40 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "w-8 bg-gradient-to-r from-primary to-secondary" : "w-2 bg-border-color"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-bg-card/40 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURED EVENTS CAROUSEL (Cover Flow) ===== */}
        {featuredEvents.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-bg-primary via-bg-surface/30 to-bg-primary border-y border-border-color/30 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header & Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
                  >
                    <FaStar className="text-xs text-accent" /> Cover Flow Showcase
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-black font-heading text-text-primary">
                    Featured Events
                  </h2>
                </div>

                {/* Index Counter & Navigation Controls */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-mono font-semibold">
                    <span className="text-primary text-base">0{featuredIndex + 1}</span>
                    <span>/</span>
                    <span>0{Math.max(1, featuredEvents.length)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevFeatured}
                      disabled={featuredIndex === 0}
                      className="w-12 h-12 rounded-full bg-bg-card/40 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={handleNextFeatured}
                      disabled={featuredIndex >= featuredEvents.length - 1}
                      className="w-12 h-12 rounded-full bg-bg-card/40 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Cover Flow Carousel */}
              <div
                className="relative h-[450px] sm:h-[500px] flex items-center justify-center w-full mt-4"
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                {featuredEvents.map((event, idx) => {
                  const offset = idx - featuredIndex;
                  const absOffset = Math.abs(offset);
                  const isActive = offset === 0;

                  let zIndex = 10 - absOffset;
                  let scale = 1 - absOffset * 0.2;
                  let rotateY = offset * -25;
                  let x = offset * 160;

                  const mobileMediaQuery = typeof window !== "undefined" && window.innerWidth < 640;
                  if (mobileMediaQuery) {
                    x = offset * 90;
                    scale = 1 - absOffset * 0.25;
                  }

                  return (
                    <motion.div
                      key={`coverflow-${event._id}`}
                      initial={false}
                      animate={{
                        scale,
                        x,
                        rotateY,
                        zIndex,
                        opacity: absOffset > 2 ? 0 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`absolute w-[280px] sm:w-[340px] h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-bg-card/40 border-2 flex flex-col shadow-2xl cursor-pointer backdrop-blur-xl ${
                        isActive
                          ? "border-primary/80 ring-4 ring-primary/20 shadow-primary/30"
                          : "border-white/10 opacity-70 hover:opacity-100 hover:border-primary/50"
                      }`}
                      style={{
                        transformOrigin: "center center",
                        pointerEvents: absOffset > 2 ? "none" : "auto",
                      }}
                    >
                      <div className="h-[55%] relative overflow-hidden bg-gradient-to-br from-primary/20 via-surface to-secondary/20">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">🎪</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-bg-primary/90 backdrop-blur-md text-text-primary border border-border-color">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-purple-300 border border-primary/40">
                            {event.ticketPrice === 0 ? <span className="text-success font-extrabold">FREE</span> : `₹${event.ticketPrice}`}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2 inline-block">
                            {event.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold font-heading text-text-primary mb-2 line-clamp-2 leading-tight">
                            {event.title}
                          </h3>
                          <div className="space-y-1 text-xs text-text-muted">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-primary/70" />
                              <span>
                                {new Date(event.date).toLocaleDateString(undefined, {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-primary/70" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/events/${event._id}`}
                          onClick={(e) => !isActive && e.preventDefault()}
                          className={`w-full text-center py-2.5 rounded-xl transition-all duration-300 border text-xs font-bold ${
                            isActive
                              ? "bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-md shadow-primary/20"
                              : "bg-bg-surface/40 text-text-muted border-white/10 hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {isActive ? "Book Ticket →" : "Select to View"}
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ===== INFINITE MARQUEE ===== */}
        <section className="relative py-8 bg-bg-primary border-y border-border-color/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
              ⚡ Campus Buzz
            </span>
          </div>

          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-bg-primary to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-bg-primary to-transparent z-20 pointer-events-none" />

          {/* Marquee Row 1 */}
          <div className="flex overflow-hidden mb-3 marquee-container">
            <div className="marquee-track flex items-center gap-4 animate-marquee-left whitespace-nowrap">
              {marqueeItems.concat(marqueeItems).map((item, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card/40 border border-white/10 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 shadow-md group/item cursor-pointer backdrop-blur-md"
                >
                  <span className="text-text-primary group-hover/item:text-primary font-medium text-xs sm:text-sm transition-colors">
                    {item}
                  </span>
                  <span className="text-accent/60 group-hover/item:text-accent text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 */}
          <div className="flex overflow-hidden marquee-container">
            <div className="marquee-track-reverse flex items-center gap-4 animate-marquee-right whitespace-nowrap">
              {marqueeItems.slice().reverse().concat(marqueeItems.slice().reverse()).map((item, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg-card/40 border border-white/10 hover:border-secondary/60 hover:bg-secondary/10 transition-all duration-300 shadow-md group/item cursor-pointer backdrop-blur-md"
                >
                  <span className="text-text-primary group-hover/item:text-secondary font-medium text-xs sm:text-sm transition-colors">
                    {item}
                  </span>
                  <span className="text-secondary/60 group-hover/item:text-secondary text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== UPCOMING EVENTS ===== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10 border-b border-border-color/50 pb-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-text-primary font-heading">
                Upcoming Events
              </h2>
              <p className="text-text-muted text-xs md:text-sm mt-1">
                Browse latest campus events and reserve your seats instantly
              </p>
            </div>
            <Link
              to="/events"
              className="text-primary hover:text-primary-hover text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              View All Events <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-bg-card/40 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-bg-surface/80" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-border-color/50 rounded w-3/4" />
                    <div className="h-4 bg-border-color/40 rounded w-1/2" />
                    <div className="h-4 bg-border-color/40 rounded w-2/3" />
                    <div className="h-10 bg-border-color/50 rounded-xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-bg-card/40 border border-white/10 rounded-3xl backdrop-blur-sm"
            >
              <div className="text-5xl mb-4">🎭</div>
              <p className="text-text-muted text-lg">No upcoming events scheduled right now.</p>
              <Link to="/events" className="text-primary text-sm font-semibold mt-3 inline-block">
                Check Event Directory →
              </Link>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.slice(0, 6).map((event) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  transition={{ duration: 0.4 }}
                  className="group bg-bg-card/40 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-lg backdrop-blur-xl"
                >
                  <div className="h-52 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🎪</div>
                    )}

                    <div className="absolute top-4 right-4 bg-bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-color shadow-md">
                      {event.ticketPrice === 0 ? (
                        <span className="text-success text-xs font-bold">FREE</span>
                      ) : (
                        <span className="text-primary text-xs font-bold">₹{event.ticketPrice}</span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="badge badge-workshop">{event.category}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-3 font-heading leading-snug line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-6 text-text-muted text-xs md:text-sm">
                        <div className="flex items-center gap-2.5">
                          <FaCalendarAlt className="text-primary/70 flex-shrink-0" />
                          <span>
                            {new Date(event.date).toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FaMapMarkerAlt className="text-primary/70 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/events/${event._id}`}
                      className="w-full block text-center bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 border border-primary/20 hover:border-primary text-sm shadow-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* ===== CATEGORIES ===== */}
        <section className="py-16 bg-gradient-to-b from-bg-primary via-bg-surface/20 to-bg-primary border-y border-border-color/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black font-heading text-text-primary mb-3">
                Explore by Category
              </h2>
              <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto">
                Discover campus events tailored to your technical interests, artistic passions, and sports activities.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {CATEGORIES_LIST.map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  variants={itemVariants}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => navigate(`/events?category=${cat.name}`)}
                  className="bg-bg-card/40 border border-white/10 p-6 rounded-2xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-lg backdrop-blur-xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-bg-surface/50 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-bold font-heading text-text-primary mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>
                  <span className="text-xs text-primary font-semibold group-hover:underline flex items-center gap-1">
                    Explore {cat.name} →
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== STATISTICS ===== */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-bg-card/40 via-surface/30 to-bg-card/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black font-heading text-text-primary">
                Gatherly in Numbers
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <motion.div variants={itemVariants} transition={{ duration: 0.4 }} className="space-y-2">
                <div className="text-3xl md:text-5xl font-black font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1">
                  50,000+
                </div>
                <div className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                  Active Students
                </div>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-2">
                <div className="text-3xl md:text-5xl font-black font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1">
                  1,200+
                </div>
                <div className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                  Campus Events
                </div>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ duration: 0.4, delay: 0.2 }} className="space-y-2">
                <div className="text-3xl md:text-5xl font-black font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1">
                  100+
                </div>
                <div className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                  Partner Campuses
                </div>
              </motion.div>

              <motion.div variants={itemVariants} transition={{ duration: 0.4, delay: 0.3 }} className="space-y-2">
                <div className="text-3xl md:text-5xl font-black font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1">
                  99.9%
                </div>
                <div className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                  Satisfaction Rate
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="max-w-5xl mx-auto px-4 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-heading text-text-primary mb-4 relative z-10">
              Ready to Join Your Next Event?
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-8 relative z-10">
              Sign up today to discover hackathons, concerts, and workshops happening across your campus.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto relative z-10">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
              >
                Create Free Account
              </Link>
              <Link
                to="/events"
                className="w-full sm:w-auto bg-bg-card/40 hover:bg-bg-card border border-white/10 hover:border-primary/50 text-text-primary font-semibold px-8 py-3.5 rounded-2xl text-sm transition-all duration-300 hover:scale-105 backdrop-blur-md"
              >
                Explore Events
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Home;
