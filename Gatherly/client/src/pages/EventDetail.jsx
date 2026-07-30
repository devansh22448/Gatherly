import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave, FaArrowLeft, FaShareAlt, FaTicketAlt } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-bg-primary">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin animation-delay-500"></div>
                <div className="absolute inset-4 rounded-full border-b-2 border-accent animate-spin animation-delay-1000"></div>
                <FaTicketAlt className="absolute inset-0 m-auto text-3xl text-primary animate-pulse" />
            </div>
        </div>
    );

    if (error && !event) return (
        <div className="flex items-center justify-center min-h-[60vh] bg-bg-primary">
            <div className="text-center">
                <p className="text-error text-2xl font-black font-heading mb-4">{error || 'Event not found'}</p>
                <button onClick={() => navigate('/events')} className="px-6 py-2 rounded-full glass-panel text-text-primary hover:text-primary transition-all text-sm font-bold">← Back to events</button>
            </div>
        </div>
    );

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="min-h-screen bg-bg-primary pt-20 md:pt-24 relative overflow-hidden">
            {/* Cinematic Backdrop */}
            <div className="absolute inset-0 z-0 h-[60vh] lg:h-[80vh] overflow-hidden">
                {event.image ? (
                    <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src={event.image} 
                        alt="Backdrop" 
                        className="w-full h-full object-cover blur-sm" 
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl"></div>
                )}
                {/* Gradient fade to bg-primary */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                
                {/* Top Nav Action */}
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all mb-8 text-sm font-semibold border border-white/10 w-fit"
                >
                    <FaArrowLeft /> Directory
                </button>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
                    
                    {/* Left Panel: Event Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 w-full"
                    >
                        {/* Featured Image */}
                        <div className="w-full h-64 sm:h-80 md:h-[400px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative mb-10 group">
                            {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-text-muted/30 text-7xl font-black uppercase tracking-widest">
                                    {event.category}
                                </div>
                            )}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none"></div>
                        </div>

                        {/* Title and Category */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                                    {event.category}
                                </span>
                                {event.availableSeats < 10 && event.availableSeats > 0 && (
                                    <span className="bg-accent/20 text-accent border border-accent/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md animate-pulse">
                                        Almost Full
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white font-heading leading-tight mb-6">
                                {event.title}
                            </h1>
                            <p className="text-text-muted text-lg md:text-xl font-light leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="glass-panel p-5 rounded-3xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <FaCalendarAlt className="text-primary text-xl" />
                                </div>
                                <div>
                                    <p className="text-text-muted/70 text-xs font-bold uppercase tracking-widest mb-1">Date & Time</p>
                                    <p className="text-white font-semibold text-sm">
                                        {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="glass-panel p-5 rounded-3xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                                    <FaMapMarkerAlt className="text-secondary text-xl" />
                                </div>
                                <div>
                                    <p className="text-text-muted/70 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                                    <p className="text-white font-semibold text-sm truncate pr-2">{event.location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel: Holographic Ticket (Booking) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-32"
                    >
                        <div className="relative group perspective">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            
                            {/* Ticket Container */}
                            <div className="relative bg-bg-card/60 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                {/* Ticket Header Pattern */}
                                <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary"></div>
                                
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-black text-white font-heading tracking-wide">ADMIT ONE</h3>
                                        <FaTicketAlt className="text-primary/50 text-2xl" />
                                    </div>

                                    <div className="space-y-6 mb-8 relative">
                                        <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                            <div>
                                                <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                                                <div className="flex items-center gap-2">
                                                    <FaMoneyBillWave className="text-primary" />
                                                    <span className="text-white text-3xl font-black">
                                                        {event.ticketPrice === 0 ? <span className="text-success text-2xl">FREE</span> : `₹${event.ticketPrice}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                            <div>
                                                <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">Availability</p>
                                                <div className="flex items-center gap-2">
                                                    <FaChair className="text-primary" />
                                                    <span className={`text-xl font-black ${event.availableSeats < 10 ? 'text-accent' : 'text-white'}`}>
                                                        {event.availableSeats} / {event.totalSeats}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perforation Line */}
                                        <div className="absolute -left-12 top-1/2 w-[120%] border-t-2 border-dashed border-white/10"></div>
                                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-primary rounded-full border-r border-white/20"></div>
                                        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-bg-primary rounded-full border-l border-white/20"></div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-8">
                                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                                            <div 
                                                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* OTP Section */}
                                    {showOTP && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mb-6 overflow-hidden"
                                        >
                                            <p className="text-center text-xs font-bold text-primary uppercase tracking-widest mb-3">Verification Required</p>
                                            <input 
                                                type="text" 
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                maxLength={6}
                                                className="w-full bg-black/30 border border-white/10 text-white placeholder-white/30 rounded-2xl px-4 py-4 text-center text-2xl font-black tracking-[0.5em] focus:ring-2 focus:ring-primary focus:border-primary/50 outline-none transition-all"
                                            />
                                        </motion.div>
                                    )}

                                    {/* Action Button */}
                                    <button 
                                        onClick={handleBooking}
                                        disabled={isSoldOut || bookingLoading || (showOTP && otp.length < 6)}
                                        className={`w-full py-4 rounded-2xl font-black text-lg uppercase tracking-wider transition-all duration-300 relative overflow-hidden group ${
                                            isSoldOut || (successMsg && !showOTP)
                                                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
                                                : 'bg-white text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                                        }`}
                                    >
                                        {/* Button Hover effect */}
                                        {!(isSoldOut || (successMsg && !showOTP)) && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                                        )}
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {bookingLoading ? (
                                                <><div className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin"></div> Processing...</>
                                            ) : showOTP ? (
                                                'Verify & Claim'
                                            ) : (successMsg && !showOTP) ? (
                                                'Ticket Requested'
                                            ) : isSoldOut ? (
                                                'Sold Out'
                                            ) : (
                                                'Claim Ticket'
                                            )}
                                        </span>
                                    </button>

                                    {/* Messages */}
                                    {error && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-error/10 border border-error/30 rounded-xl text-error text-xs font-bold text-center">
                                            {error}
                                        </motion.div>
                                    )}
                                    {successMsg && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-success/10 border border-success/30 rounded-xl text-success text-xs font-bold text-center">
                                            {successMsg}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

