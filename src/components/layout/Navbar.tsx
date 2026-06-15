"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
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

  const navLinks = [
    { name: "Events", href: "#events" },
    { name: "Welfare", href: "#welfare" },
    { name: "Spotlight", href: "#spotlight" },
    { name: "Executives", href: "#executives" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/85 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-sky-400/30 group-hover:border-sky-400 transition-colors bg-slate-900 flex-shrink-0">
              <Image
                src="/LSCA-LOGO.jpg"
                alt="LSCA Logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-white tracking-tight leading-none text-base md:text-lg">
                LASUSTECH
              </span>
              <span className="text-[10px] text-sky-400 font-medium tracking-[0.2em] uppercase mt-0.5 leading-none">
                Student Assembly
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-sky-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Admin Access CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-sky-500 hover:text-white text-sky-200 border border-white/10 hover:border-sky-400 text-xs px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm"
            >
              Admin Portal
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 pt-20 pb-6 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 z-40 px-4 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white text-base font-semibold py-2 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between bg-sky-500 text-white text-sm font-bold p-3 rounded-xl shadow-md hover:bg-sky-600 mt-4 transition-colors"
              >
                Admin Portal
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
