import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  Briefcase, Tag, HelpCircle, Phone } from "lucide-react";

export function SiteHeader() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isScrolled] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Briefcase },
    { href: "/#pricing", label: "Pricing", icon: Tag },
    { href: "/#faq", label: "FAQ", icon: HelpCircle },
    { href: "/#contact-us", label: "Contact Us", icon: Phone },
  ];


  return (
    <motion.header
      className="sticky top-0 z-50 p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="relative overflow-hidden rounded-full"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Glassmorphic Background */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-[#A68A64]/30 via-[#A68A64]/20 to-[#A68A64]/30 border border-white/20 rounded-full"
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: isScrolled ? 0.95 : 0.8,
              backdropFilter: isScrolled ? "blur(20px)" : "blur(15px)"
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated Glass Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
            }}
          />

          {/* Main Content */}
          <div className="relative flex h-14 items-center justify-between px-6">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <a href="/" className="flex items-center gap-1.9">
                <motion.img
                  src="inkloop-heading.png"
                  alt="Inkloop logo"
                  className="w-21 filter drop-shadow-sm"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 text-sm text-black font-semibold md:flex">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  className="relative"
                  // @ts-expect-error – this prop is missing in the type but exists at runtime
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Hover Background */}
                  <AnimatePresence>
                    {hoveredLink === index && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                        layoutId="navHover"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <a
                    href={link.href}
                    className="relative z-10 px-4 py-2 hover:text-black/80 transition-colors flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        // rotate: hoveredLink === index ? 360 : 360+,
                        scale: hoveredLink === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <link.icon className="h-4 w-4" />
                    </motion.div>
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>



            {/* Mobile Nav */}
            <div className="md:hidden">


    
                 <motion.div
                 
                  className="relative"
                   // @ts-expect-error – this prop is missing in the type but exists at runtime
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Hover Background */}
                  <a
                    href="/#contact-us"
                    className="relative z-10 px-4 py-2 text-black/80 transition-colors flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        // rotate: hoveredLink === index ? 360 : 360+,
                        scale: hoveredLink === 1 ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Phone className="h-4 w-4" />
                    </motion.div>
                    Contact Us
                  </a>
                </motion.div>
      



            </div>
          </div>

          {/* Bottom Glow Effect */}
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#A68A64]/30 to-transparent blur-sm"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}