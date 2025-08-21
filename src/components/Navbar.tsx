"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "@/assets/moghul-foods-logo.png"; // adjust path

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "hero", offset: -80 },
    { name: "Partners", to: "about", offset: -80 },
    { name: "Coverage", to: "coverage", offset: -80 },
    { name: "Services", to: "services", offset: -80 },
    { name: "Contact", to: "contact", offset: -80 },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? "bg-white shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <ScrollLink
          to="hero"
          smooth={true}
          duration={500}
          offset={-80}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src={logo} alt="Moghul Foods Logo" width={40} height={40} />
          <span
            className={`font-bold text-lg transition-colors duration-300 font-[cursive] ${
                scrolled ? "text-gray-800" : "text-white"
            }`}
            >
            Moghul Foods
            </span>
        </ScrollLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
            <ScrollLink
            key={link.name}
            to={link.to}
            smooth={true}
            duration={500}
            offset={link.offset}
            className={`transition cursor-pointer ${
                scrolled
                ? "text-gray-700 hover:text-yellow-500"
                : "text-white hover:text-yellow-300"
            }`}
            >
            {link.name}
            </ScrollLink>
        ))}
        </div>


        {/* Mobile Menu Button */}
        <div className="md:hidden">
        <button onClick={() => setMenuOpen(true)}>
            <FiMenu
            size={26}
            className={scrolled ? "text-gray-800" : "text-white"}
            />
        </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)}>
                <FiX size={26} className="text-gray-800" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={link.offset}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-800 text-lg hover:text-yellow-500 transition cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
