import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Briefcase, Tag, HelpCircle, Phone } from "lucide-react";

export function SiteHeader() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Briefcase },
    { href: "/#pricing", label: "Pricing", icon: Tag },
    { href: "/#faq", label: "FAQ", icon: HelpCircle },
    { href: "/#contact-us", label: "Contact Us", icon: Phone },
  ];

  // Simulate scroll effect (you can connect this to actual scroll events)
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

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
                        rotate: hoveredLink === index ? 360 : 0,
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

            {/* CTA Button */}
            <div className="hidden md:flex">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="relative overflow-hidden bg-[#0CBCC4] text-black rounded-2xl px-6 py-2.5 hover:bg-[#0CBCC4]/80 transition-all shadow-lg border border-white/30 backdrop-blur-sm">
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                  <a href="https://join.inkloop.app" target="_blank" rel="noopener noreferrer" className="relative z-10">
                    Join Waitlist
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20"
                    >
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="bg-[#EEDFC5]/80 backdrop-blur-xl text-black w-64 border-l border-white/20"
                >
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 flex items-center gap-2 border-b border-white/20">
                      <motion.img
                        src="/inkloop-heading.png"
                        alt="Inkloop"
                        className="w-18 filter drop-shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <nav className="flex flex-col gap-1 mt-2">
                      {links.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                        >
                          <a
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200"
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.3 }}
                            >
                              <link.icon className="h-4 w-4" />
                            </motion.div>
                            <span>{link.label}</span>
                          </a>
                        </motion.div>
                      ))}
                    </nav>

                    <motion.div 
                      className="mt-auto border-t border-white/20 p-4"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-[#0CBCC4]/90 backdrop-blur-sm text-black shadow-lg border border-white/30 hover:bg-[#0CBCC4] transition-all">
                          <a href="https://join.inkloop.app" target="_blank" rel="noopener noreferrer">
                            Join Waitlist
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </SheetContent>
              </Sheet>
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