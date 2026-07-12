"use client";

import React, { useState, useEffect } from "react";
import InteractiveLogo from "../ui/InteractiveLogo";
import GradientButton from "../ui/GradientButton";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Lock app to dark mode
    document.documentElement.classList.add("dark");

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "AI HR", href: "#ai-hr" },
    { label: "Modules", href: "#modules" },
    { label: "Showcase", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 shadow-sm"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <InteractiveLogo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/5 px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-foreground/80 hover:text-gulal-rose transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <GradientButton variant="secondary" onClick={handleCTAClick}>
              Book Demo
            </GradientButton>
            <GradientButton variant="primary" className="flex gap-1 items-center" onClick={handleCTAClick}>
              Start Free Trial <ArrowUpRight className="w-4 h-4" />
            </GradientButton>
          </div>

          {/* Mobile Actions Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground shadow-sm"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] z-40 bg-bg-dark/95 backdrop-blur-lg flex flex-col p-6 gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-foreground/95 hover:text-gulal-rose border-b border-zinc-800 pb-3"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-auto mb-12">
              <GradientButton variant="secondary" className="w-full" onClick={handleCTAClick}>
                Book Demo
              </GradientButton>
              <GradientButton variant="primary" className="w-full flex justify-center gap-2" onClick={handleCTAClick}>
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
