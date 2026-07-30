import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/axios";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFilter,
  FaSortAmountDown,
  FaTicketAlt,
} from "react-icons/fa";
import { EventCardSkeleton } from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const CATEGORIES = [
  "All",
  "Workshop",
  "Sports",
  "Seminar",
  "Guest Lecture",
  "Cultural",
];

const SORT_OPTIONS = [
  { label: "Date: Soonest First", value: "date-asc" },
  { label: "Date: Latest First", value: "date-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Title: A-Z", value: "title-asc" },
];

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("date-asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8; // Increased to 8 for better bento grid look

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearch(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 350);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/events?search=${encodeURIComponent(search)}`);
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("failed-load");
    } finally {
      setLoading(false);
    }
  };

  // Filter by category
  const filteredEvents = events.filter((event) => {
    if (selectedCategory === "All") return true;
    return event.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "price-asc") return (a.ticketPrice || 0) - (b.ticketPrice || 0);
    if (sortBy === "price-desc") return (b.ticketPrice || 0) - (a.ticketPrice || 0);
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  // Bento logic: Make 1st and 6th item span 2 columns and rows on large screens
  const isFeaturedBento = (idx) => idx === 0 || idx === 5;

  return (
    <div className="min-h-screen bg-bg-primary pb-24 pt-20 md:pt-24 relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="mesh-bg-blob bg-primary/20 w-[600px] h-[600px] top-[-10%] left-[-10%] mix-blend-screen" />
        <div className="mesh-bg-blob bg-secondary/20 w-[500px] h-[500px] top-[40%] right-[-10%] mix-blend-screen animation-delay-2000" />
        <div className="mesh-bg-blob bg-accent/10 w-[400px] h-[400px] bottom-[-10%] left-[20%] mix-blend-screen animation-delay-4000" />
      </div>

      {/* Hero Search Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass-panel text-primary px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 border-primary/20"
        >
          <FaTicketAlt /> Event Directory
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-8 font-heading leading-tight"
        >
          Find Your Next <br/>
          <span className="text-gradient-animated">Experience</span>
        </motion.h1>

        {/* Immersive Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-3xl mx-auto group"
        >
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500 -z-10" />
          <div className="relative flex items-center glass-panel rounded-full p-2 border border-white/10 shadow-2xl">
            <div className="pl-6 pr-4">
              <FaSearch className="text-text-muted text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search hackathons, concerts, workshops..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent border-none text-text-primary placeholder-text-muted/60 text-lg py-4 focus:outline-none focus:ring-0"
            />
            
            {/* Embedded Sort */}
            <div className="hidden sm:flex items-center pl-4 border-l border-white/10">
              <FaSortAmountDown className="text-primary mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-text-muted text-sm focus:outline-none cursor-pointer w-36 pr-4 appearance-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-bg-primary text-text-primary">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating Category Pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-md border ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105"
                  : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-text-primary border-white/10 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-black text-text-primary font-heading tracking-tight">
            {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
          </h2>
          <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            {sortedEvents.length} Events
          </span>
        </div>

        {/* Dynamic State Handling */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className={`${isFeaturedBento(idx) ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}>
                <EventCardSkeleton />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState type={error} onRetry={fetchEvents} />
        ) : sortedEvents.length === 0 ? (
          <EmptyState
            type={search ? "no-search-results" : "no-events"}
            onAction={() => {
              setSearch("");
              handleCategoryChange("All");
            }}
          />
        ) : (
          <>
            {/* Bento Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[450px] mb-16"
            >
              {paginatedEvents.map((event, idx) => {
                const isFeatured = isFeaturedBento(idx) && paginatedEvents.length > 2;

                return (
                  <motion.div
                    key={event._id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 30 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    whileHover={{ y: -10 }}
                    className={`group glass-panel rounded-[2.5rem] overflow-hidden flex flex-col relative ${
                      isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                    }`}
                  >
                    {/* Background Image full cover */}
                    <div className="absolute inset-0 z-0">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-40 group-hover:opacity-60"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                      <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {event.category}
                      </span>
                      <span className="bg-primary/20 backdrop-blur-md text-white border border-primary/40 shadow-lg shadow-primary/20 text-sm font-black px-4 py-1.5 rounded-full">
                        {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                      <h3 className={`font-black font-heading text-text-primary mb-4 leading-tight ${
                        isFeatured ? "text-3xl md:text-5xl" : "text-2xl"
                      }`}>
                        {event.title}
                      </h3>

                      <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-3 text-text-primary/90 text-sm font-medium">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <FaCalendarAlt className="text-primary" />
                          </div>
                          <span>
                            {new Date(event.date).toLocaleDateString(undefined, {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-text-primary/90 text-sm font-medium">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <FaMapMarkerAlt className="text-primary" />
                          </div>
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Hover Action Reveal */}
                      <div className="overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: "auto" }}
                          className="pt-2"
                        >
                          <Link
                            to={`/events/${event._id}`}
                            className="w-full flex items-center justify-center gap-2 bg-white text-bg-primary hover:bg-primary hover:text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-xl"
                          >
                            Explore Event <span>→</span>
                          </Link>
                        </motion.div>
                        {/* Always visible on touch devices via CSS, but framer motion handles hover. Let's make it always visible but styled differently if not hovered, or just keep it simple: */}
                        <div className="pt-4 lg:hidden">
                          <Link
                            to={`/events/${event._id}`}
                            className="w-full flex items-center justify-center gap-2 bg-primary/20 border border-primary/40 text-white font-bold py-3.5 rounded-2xl backdrop-blur-md"
                          >
                            Explore Event <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-full glass-panel text-text-primary font-bold hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-12 h-12 rounded-full font-bold transition-all shadow-lg ${
                      currentPage === pageNum
                        ? "bg-primary text-white shadow-primary/40 scale-110"
                        : "glass-panel text-text-muted hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-full glass-panel text-text-primary font-bold hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
