import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Goat from "../assets/images/goat.png";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "showcase", label: "Showcase" },
  { id: "solutions", label: "Solutions" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  // 1) Hide‑on‑scroll & shrink on scroll + progress bar
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setShow(y < lastScrollY.current || y < 100);
      lastScrollY.current = y;

      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2) Scroll‑spy with IntersectionObserver for underline
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleMenu = () => setIsOpen((o) => !o);
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Gradient scroll‐progress bar */}
      <div className="fixed top-0 left-0 h-1 w-full z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`
          fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md
          transform transition-all duration-300
          ${scrolled ? "py-2" : "py-4"}
          ${show ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-screen mx-[4rem] flex items-center justify-between relative">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-10">
            {/* 4) Logo reveal + micro‑interaction */}
            <motion.img
              src={Goat}
              alt="GOATNET Logo"
              className="w-32 h-12 object-contain"
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            />

            <nav className="hidden md:flex gap-6 font-medium text-sm">
              {NAV_ITEMS.map(({ id, label }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="relative py-1 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  {/* Base text-white, then purple on hover */}
                  <span className="text-white transition-colors duration-200 group-hover:text-purple-400">
                    {label}
                  </span>

                  {/* Scroll‑spy underline */}
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-400"
                    style={{
                      width: activeSection === id ? "100%" : "0",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Join Waitlist (desktop) */}
          <div className="hidden md:block">
            <div className="relative ml-3 group">
              <div
                className="absolute inset-0 z-0 rounded-full blur-[5px] opacity-80 group-hover:opacity-100 transition"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                }}
              />
              <button
                type="submit"
                className="relative z-10 px-6 py-2 rounded-full text-white font-bold italic uppercase text-sm leading-none bg-[#0b0a0b] transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                  backgroundClip: "padding-box",
                }}
                onClick={() => scrollToSection("waitlist")}
              >
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Mobile toggle with ripple */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-white relative overflow-hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            {/* 7) Ripple effect */}
            <motion.span
              className="absolute inset-0 bg-white opacity-20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* 6) Liquid wave SVG at bottom of navbar */}
        <svg
          className="absolute bottom-0 w-full h-6"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000"
            fillOpacity="0.6"
            d="M0,96L80,106.7C160,117,320,139,480,128C640,117,800,75,960,80C1120,85,1280,139,1360,165.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-4 text-white font-medium"
          >
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToSection(id)}>
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("waitlist")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 hover:shadow-[0_0_10px_rgba(147,51,234,0.7)]"
            >
              Join Waitlist
            </button>
          </motion.nav>
        )}
      </header>
    </>
  );
}
