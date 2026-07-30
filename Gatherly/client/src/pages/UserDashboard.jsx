import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTicketAlt, FaTimesCircle, FaUser, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking request?")) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || "Error cancelling booking");
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin animation-delay-500"></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-accent animate-spin animation-delay-1000"></div>
      </div>
    </div>
  );

  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="mesh-bg-blob bg-primary/10 w-[500px] h-[500px] top-[-10%] right-[-10%] mix-blend-screen" />
        <div className="mesh-bg-blob bg-accent/10 w-[400px] h-[400px] bottom-[10%] left-[-10%] mix-blend-screen animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* User Profile & Stats Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2rem] p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-20 h-20 rounded-full bg-bg-card flex items-center justify-center text-primary text-3xl font-black font-heading border border-white/10 shadow-xl">
                {user?.name?.charAt(0)?.toUpperCase() || <FaUser />}
              </div>
            </div>
            <div className="flex-1 mt-2">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 font-heading tracking-wide">
                Welcome back, {user?.name}!
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-text-muted text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                </span>
                Digital Wallet Active
              </div>
            </div>
          </div>

          {/* Gamified Stats */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-md">
              <div className="text-3xl font-black text-primary mb-1">{confirmedCount}</div>
              <div className="text-xs text-text-muted font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <FaCheckCircle /> Confirmed
              </div>
            </div>
            <div className="flex-1 md:flex-none bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center backdrop-blur-md">
              <div className="text-3xl font-black text-accent mb-1">{pendingCount}</div>
              <div className="text-xs text-text-muted font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <FaCalendarCheck /> Pending
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tickets Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white font-heading flex items-center gap-3">
            <FaTicketAlt className="text-primary" /> My Passes
          </h2>
        </div>

        {/* Digital Wallet Grid */}
        {bookings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-panel border-dashed border-2 border-white/20 rounded-[2rem] p-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FaTicketAlt className="text-white/20 text-4xl" />
            </div>
            <h3 className="text-2xl font-black text-white font-heading mb-4">Your Wallet is Empty</h3>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              You haven't claimed any tickets yet. Browse upcoming events and fill up your digital wallet!
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-white text-bg-primary hover:scale-105 font-black py-4 px-8 rounded-2xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
            >
              Explore Events →
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden" animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="relative group perspective"
              >
                {/* Glow behind ticket */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
                
                {/* Ticket Body */}
                <div className="relative bg-bg-card/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  
                  {/* Ticket Header Color Bar based on status */}
                  <div className={`h-2 w-full ${
                    booking.status === "confirmed" ? "bg-success" : booking.status === "cancelled" ? "bg-error" : "bg-accent"
                  }`}></div>

                  <div className="p-6 md:p-8 flex-grow">
                    {booking.eventId ? (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-xl font-black text-white font-heading leading-snug flex-1 pr-4 line-clamp-2">
                            {booking.eventId.title}
                          </h3>
                          <span className={`shrink-0 px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest backdrop-blur-md ${
                            booking.status === "confirmed" ? "bg-success/20 text-success border border-success/30" : 
                            booking.status === "cancelled" ? "bg-error/20 text-error border border-error/30" : 
                            "bg-accent/20 text-accent border border-accent/30 animate-pulse"
                          }`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="space-y-4 relative z-10">
                          <div className="flex justify-between items-end border-b border-white/5 pb-3">
                            <span className="text-text-muted/60 text-xs font-bold uppercase tracking-widest">Date</span>
                            <span className="text-white font-semibold text-sm">
                              {new Date(booking.eventId.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-end border-b border-white/5 pb-3">
                            <span className="text-text-muted/60 text-xs font-bold uppercase tracking-widest">Price</span>
                            <span className={`font-black text-sm ${booking.amount === 0 ? "text-success" : "text-white"}`}>
                              {booking.amount === 0 ? "FREE" : `₹${booking.amount}`}
                            </span>
                          </div>

                          <div className="flex justify-between items-end pb-1">
                            <span className="text-text-muted/60 text-xs font-bold uppercase tracking-widest">Payment</span>
                            {booking.status !== "cancelled" ? (
                              <span className={`text-xs font-bold uppercase tracking-widest ${
                                booking.paymentStatus === "paid" ? "text-primary" : "text-text-muted"
                              }`}>
                                {booking.paymentStatus.replace("_", " ")}
                              </span>
                            ) : (
                              <span className="text-error/60 text-xs font-bold uppercase tracking-widest">N/A</span>
                            )}
                          </div>
                        </div>

                        {/* Barcode Decorative element */}
                        <div className="mt-8 pt-4 border-t border-dashed border-white/20 flex justify-center opacity-30">
                           <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,transparent_2px,transparent_4px)]"></div>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center py-8">
                        <FaTimesCircle className="text-error/50 text-4xl mb-3" />
                        <p className="text-text-muted font-medium text-sm">Event Unavailable</p>
                      </div>
                    )}
                  </div>

                  {/* Cutouts for ticket effect */}
                  <div className="absolute left-[-12px] top-[75%] w-6 h-6 bg-bg-primary rounded-full border-r border-white/10 z-20"></div>
                  <div className="absolute right-[-12px] top-[75%] w-6 h-6 bg-bg-primary rounded-full border-l border-white/10 z-20"></div>

                  {/* Action Footer */}
                  <div className="p-4 bg-white/5 border-t border-dashed border-white/10 flex justify-between items-center z-10">
                    {booking.eventId && booking.status !== "cancelled" ? (
                      <>
                        <Link
                          to={`/events/${booking.eventId._id}`}
                          className="text-white hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          View Details →
                        </Link>
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="text-error/80 hover:text-error font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          <FaTimesCircle /> Cancel
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center text-error/60 text-xs font-bold uppercase tracking-widest">
                        Booking Cancelled
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
