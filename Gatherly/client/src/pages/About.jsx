import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaEye,
  FaShieldAlt,
  FaUsers,
  FaCalendarCheck,
  FaChartLine,
  FaGraduationCap,
  FaArrowRight,
  FaHeart,
  FaTicketAlt,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { label: "Active Students", value: "50,000+", icon: "🎓" },
    { label: "Campus Events Hosted", value: "1,200+", icon: "🎪" },
    { label: "Partner Universities", value: "100+", icon: "🏛️" },
    { label: "Satisfaction Rate", value: "99.9%", icon: "⭐" },
  ];

  const features = [
    {
      icon: <FaCalendarCheck className="text-primary text-2xl" />,
      title: "Instant Event Discovery",
      description:
        "Filter through hackathons, cultural festivals, academic seminars, and sports tournaments in real-time.",
    },
    {
      icon: <FaShieldAlt className="text-primary text-2xl" />,
      title: "Secure 2FA Verification",
      description:
        "Enterprise-grade security using two-factor OTP verification for effortless ticket confirmations.",
    },
    {
      icon: <FaUsers className="text-primary text-2xl" />,
      title: "Campus Community First",
      description:
        "Empowering student clubs, societies, and campus organizers to publish and manage events effortlessly.",
    },
    {
      icon: <FaChartLine className="text-primary text-2xl" />,
      title: "Organizer Dashboard",
      description:
        "Comprehensive analytics for event managers to track seat allocations, attendee check-ins, and ticket revenue.",
    },
  ];

  const whyGatherly = [
    {
      number: "01",
      title: "Built for Modern Campuses",
      desc: "Designed specifically to bridge student engagement with campus organizers and university events.",
    },
    {
      number: "02",
      title: "Zero-Friction Ticketing",
      desc: "Book free or paid event tickets in seconds with instant digital confirmation sent to your email.",
    },
    {
      number: "03",
      title: "Real-Time Availability",
      desc: "Track live seat availability so you never miss out on high-demand fests or limited-capacity workshops.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-20 pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 px-4">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <FaTicketAlt className="text-primary" />
            About Gatherly
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight font-heading"
          >
            Reimagining How Campuses{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Gather & Connect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            Gatherly is the premier campus event platform designed to bring students, educators, creators, and organizers together under one seamless digital roof.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-bg-card border border-border-color p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaRocket />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-text-primary">
              Our Mission
            </h2>
            <p className="text-text-muted leading-relaxed text-base">
              To empower campus communities by eliminating friction in event creation, ticket distribution, and student participation. We build tools that inspire connection, foster innovation, and make campus life vibrant.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-bg-card border border-border-color p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-secondary/50 transition-all duration-300 shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaEye />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-text-primary">
              Our Vision
            </h2>
            <p className="text-text-muted leading-relaxed text-base">
              To become the global standard for campus event management, enabling every college student to discover life-changing workshops, build lifelong friendships, and create memories that transcend graduation day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern Statistics Bar */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-bg-card via-bg-surface to-bg-card border border-border-color rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl md:text-5xl font-black font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Gatherly Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Why Choose Gatherly
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Everything you need for an unforgettable campus event experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyGatherly.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-bg-card/60 border border-border-color p-8 rounded-3xl hover:border-primary/40 transition-all duration-300 relative group"
            >
              <div className="text-4xl font-black font-heading text-primary/30 group-hover:text-primary transition-colors mb-4">
                {item.number}
              </div>
              <h3 className="text-xl font-bold font-heading text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Powerful Platform Features
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Built with modern technology to ensure reliability, security, and delightful design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-bg-card border border-border-color p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">{feat.icon}</div>
                <h3 className="text-lg font-bold font-heading text-text-primary mb-2">
                  {feat.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campus Community Showcase */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-bg-surface border border-border-color rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                <FaGraduationCap className="text-sm" /> Campus Community
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
                Loved by Students & Clubs Worldwide
              </h2>
              <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                From technical codefests and robotics expos to cultural dance nights and sports leagues, Gatherly powers campus life across top universities.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-text-primary">
                <div className="flex items-center gap-1.5 text-accent">
                  <FaHeart /> 100% Student Approved
                </div>
                <span>•</span>
                <div>Instant Email Notifications</div>
              </div>
            </div>
            <div className="bg-bg-card border border-border-color/80 p-6 rounded-2xl space-y-4">
              <div className="bg-bg-surface p-4 rounded-xl border border-border-color/60 text-xs space-y-2">
                <p className="text-text-primary font-semibold">"Gatherly made hosting our annual Hackathon so smooth. Booking confirmations were instant!"</p>
                <p className="text-text-muted">— Campus Tech Club Lead</p>
              </div>
              <div className="bg-bg-surface p-4 rounded-xl border border-border-color/60 text-xs space-y-2">
                <p className="text-text-primary font-semibold">"Finding workshops and cultural night tickets on campus has never been easier."</p>
                <p className="text-text-muted">— Computer Science Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 p-10 md:p-16 rounded-3xl text-center relative overflow-hidden shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-black font-heading text-text-primary mb-4">
            Ready to Join the Fun?
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-8">
            Discover upcoming hackathons, workshops, and concerts on your campus right now.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
          >
            Explore All Events <FaArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
