import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaCheck, FaTimes, FaDollarSign, FaUsers, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaImage, FaAlignLeft, FaMapMarkedAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    totalSeats: "",
    ticketPrice: "",
    image: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [eventsRes, bookingsRes] = await Promise.all([
        api.get("/events"),
        api.get("/bookings/my"),
      ]);
      setEvents(eventsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", formData);
      setShowEventForm(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        totalSeats: "",
        ticketPrice: "",
        image: "",
      });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting event");
      }
    }
  };

  const handleConfirmBooking = async (id, paymentStatus) => {
    try {
      await api.put(`/bookings/${id}/confirm`, { paymentStatus });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Error confirming booking");
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Cancel this user's booking request?")) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted text-sm">Loading admin panel...</p>
        </div>
      </div>
    );

  const totalRevenue = bookings.reduce(
    (sum, b) =>
      b.paymentStatus === "paid" && b.status === "confirmed"
        ? sum + b.amount
        : sum,
    0,
  );
  const paidClients = new Set(
    bookings
      .filter((b) => b.paymentStatus === "paid" && b.status === "confirmed")
      .map((b) => b.userId?._id),
  ).size;
  const pendingRequests = bookings.filter((b) => b.status === "pending").length;

  const inputClass = "w-full bg-bg-surface/50 border border-border-color text-text-primary placeholder-text-muted/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-300 text-sm";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Admin Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-bg-card/40 via-surface/30 to-bg-card/40 border border-white/10 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left backdrop-blur-xl"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1 font-heading">
              Admin Dashboard
            </h1>
            <p className="text-text-muted text-sm">
              Manage events and manually confirm bookings.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowEventForm(!showEventForm)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 flex items-center gap-2 text-sm"
          >
            <FaPlus /> {showEventForm ? "Cancel Creation" : "+ Create New Event"}
          </motion.button>
        </motion.div>

        {/* ===== Stats Cards ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.4 }}
            className="bg-bg-card/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl hover:border-primary/30 transition-all duration-300"
          >
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">
                Total Revenue
              </p>
              <h3 className="text-3xl font-black text-success">
                ₹{totalRevenue}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center text-success text-xl">
              <FaDollarSign />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-bg-card/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl hover:border-primary/30 transition-all duration-300"
          >
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">
                Paid Clients
              </p>
              <h3 className="text-3xl font-black text-primary">{paidClients}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-xl">
              <FaUsers />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-bg-card/40 border border-white/10 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl hover:border-primary/30 transition-all duration-300"
          >
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">
                Pending Requests
              </p>
              <h3 className="text-3xl font-black text-accent">
                {pendingRequests}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-xl">
              <FaClock />
            </div>
          </motion.div>
        </motion.div>

        {/* ===== Create Event Form ===== */}
        {showEventForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-card/40 border border-white/10 rounded-3xl p-8 mb-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-text-primary mb-6 font-heading">
              Create New Event
            </h2>
            <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="text"
                  placeholder="Event Title"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="text"
                  placeholder="Category (e.g., Tech, Music)"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="date"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <FaMapMarkedAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="text"
                  placeholder="Location"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="number"
                  placeholder="Total Seats"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.totalSeats}
                  onChange={(e) =>
                    setFormData({ ...formData, totalSeats: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  required
                  type="number"
                  placeholder="Ticket Price (0 for free)"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.ticketPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, ticketPrice: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2 relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50 text-sm z-10" />
                <input
                  type="text"
                  placeholder="Image URL (Provide direct link to an image)"
                  className={inputClass}
                  style={{ paddingLeft: "40px" }}
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2 relative">
                <FaAlignLeft className="absolute left-4 top-4 text-text-muted/50 text-sm z-10" />
                <textarea
                  required
                  placeholder="Event Description"
                  className={inputClass}
                  style={{ paddingLeft: "40px", minHeight: "128px" }}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Publish Event
              </button>
            </form>
          </motion.div>
        )}

        {/* ===== Events and Bookings Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-6 font-heading flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold border border-primary/30">
                {events.length}
              </span>
              All Events
            </h2>
            <div className="bg-bg-card/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
              {events.length === 0 ? (
                <p className="p-8 text-text-muted text-center">
                  No events created yet.
                </p>
              ) : (
                <div className="divide-y divide-border-color/30 max-h-[600px] overflow-y-auto">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-bg-surface/30 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-text-primary mb-1 font-heading leading-tight truncate">
                          {event.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${event.availableSeats > 0 ? "bg-success" : "bg-error"}`}
                            ></span>
                            {event.availableSeats}/{event.totalSeats} seats
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="w-full sm:w-auto text-error hover:bg-error/10 border border-error/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0"
                      >
                        <FaTrash className="inline mr-1" /> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Bookings Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-6 font-heading flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-sm font-bold border border-accent/30">
                {bookings.length}
              </span>
              Booking Requests
            </h2>
            <div className="bg-bg-card/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
              {bookings.length === 0 ? (
                <p className="p-8 text-text-muted text-center">
                  No bookings yet.
                </p>
              ) : (
                <div className="divide-y divide-border-color/30 max-h-[600px] overflow-y-auto">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className={`p-5 hover:bg-bg-surface/30 transition border-l-4 ${
                        booking.status === "pending"
                          ? "border-l-accent"
                          : booking.status === "confirmed"
                          ? "border-l-success"
                          : "border-l-error"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-text-primary font-heading leading-tight">
                          {booking.eventId?.title || "Deleted Event"}
                        </h4>
                        <div className="flex flex-col gap-1 items-end shrink-0 ml-4">
                          <span
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                              booking.status === "confirmed"
                                ? "bg-success/10 text-success border border-success/30"
                                : booking.status === "cancelled"
                                ? "bg-error/10 text-error border border-error/30"
                                : "bg-accent/10 text-accent border border-accent/30"
                            }`}
                          >
                            {booking.status}
                          </span>
                          {booking.status !== "cancelled" && (
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                                booking.paymentStatus === "paid"
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "bg-bg-surface text-text-muted border border-border-color"
                              }`}
                            >
                              {booking.paymentStatus.replace("_", " ")}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="bg-bg-surface/30 rounded-xl p-3 mb-3 border border-border-color/30 text-sm space-y-1.5">
                        <p className="text-text-muted">
                          <span className="font-medium text-text-muted/60 uppercase text-xs tracking-wider mr-2">
                            User:
                          </span>
                          <span className="font-semibold text-text-primary">
                            {booking.userId?.name}
                          </span>
                          <span className="text-text-muted/60 ml-1">
                            ({booking.userId?.email})
                          </span>
                        </p>
                        <p className="text-text-muted">
                          <span className="font-medium text-text-muted/60 uppercase text-xs tracking-wider mr-2">
                            Amount:
                          </span>
                          <span
                            className={`font-semibold ${booking.amount === 0 ? "text-success" : "text-text-primary"}`}
                          >
                            {booking.amount === 0 ? "Free" : `₹${booking.amount}`}
                          </span>
                        </p>
                        <p className="text-text-muted">
                          <span className="font-medium text-text-muted/60 uppercase text-xs tracking-wider mr-2">
                            Date:
                          </span>
                          <span>
                            {new Date(booking.bookedAt).toLocaleString()}
                          </span>
                        </p>
                        {booking.eventId && (
                          <p className="text-text-muted pt-2 border-t border-border-color/30">
                            <span className="font-medium text-text-muted/60 uppercase text-xs tracking-wider mr-2">
                              Seats:
                            </span>
                            <span
                              className={`font-semibold ${booking.eventId.availableSeats > 0 ? "text-success" : "text-error"}`}
                            >
                              {booking.eventId.availableSeats}
                            </span>{" "}
                            remaining of {booking.eventId.totalSeats}
                          </p>
                        )}
                      </div>

                      {booking.status === "pending" && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleConfirmBooking(booking._id, "paid")
                            }
                            className="flex-1 min-w-[100px] bg-success/10 hover:bg-success hover:text-white text-success border border-success/30 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300"
                          >
                            <FaCheck className="inline mr-1" /> ✓ Approve as Paid
                          </button>
                          <button
                            onClick={() =>
                              handleConfirmBooking(booking._id, "not_paid")
                            }
                            className="flex-1 min-w-[100px] bg-bg-surface hover:bg-bg-card text-text-muted hover:text-text-primary border border-border-color text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300"
                          >
                            <FaCheck className="inline mr-1" /> ✓ Approve (Not Paid)
                          </button>
                            <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="w-[80px] bg-error/10 hover:bg-error hover:text-white text-error border border-error/30 text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-300"
                          >
                            <FaTimes className="inline mr-1" /> ✕ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
