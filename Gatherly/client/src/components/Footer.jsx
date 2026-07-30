import React from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Events", path: "/events" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Workshops", path: "/events?category=Workshop" },
        { name: "Seminars", path: "/events?category=Seminar" },
        { name: "Cultural", path: "/events?category=Cultural" },
        { name: "Sports", path: "/events?category=Sports" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/contact" },
        { name: "Privacy Policy", path: "#" },
        { name: "Terms of Service", path: "#" },
        { name: "Security", path: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaGithub />, href: "#" },
    { icon: <FaDiscord />, href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative border-t border-border-color/50">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-primary pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-full h-full rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                    <FaTicketAlt className="text-lg" />
                  </div>
                </div>
                <span className="text-text-primary text-2xl font-black tracking-wide font-heading">
                  Gatherly
                </span>
              </Link>
              <p className="text-text-muted text-sm leading-relaxed">
                Discover exceptional events, connect with your campus community, and create unforgettable moments.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-bg-surface border border-border-color flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link Columns */}
            {footerLinks.map((column, idx) => (
              <motion.div key={column.title} variants={itemVariants} className="space-y-6">
                <h4 className="text-text-primary font-bold font-heading text-sm uppercase tracking-wider">
                  {column.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-text-muted hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter Column */}
           
          </div>

          {/* Bottom Bar */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-border-color/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted/60">
            <p>© {new Date().getFullYear()} Gatherly Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {socialLinks.slice(0, 3).map((social, idx) => (
                <Link key={idx} to={social.href} className="hover:text-primary transition-colors">
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
