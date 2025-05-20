// src/layout.tsx/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Goat from "../assets/images/goat.png";
import ScrollCTA from "../components/ui/scrollCTA";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "showcase", label: "Showcase" },
  { id: "solutions", label: "Solutions" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const isScrolled = y > 50;
      const isShowing = y < lastScrollY.current || y < 100;
      setScrolled(isScrolled);
      setShow(isShowing);
      lastScrollY.current = y;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 w-full z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navbar */}
      <header
        className={`
          fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md
          transform transition-all duration-300
          ${scrolled ? "py-2" : "py-4"}
          ${show ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-screen mx-[2rem] md:mx-[4rem] flex items-center justify-between">
          <div className="flex items-center gap-10">
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
                  <span className="text-white group-hover:text-purple-400 transition">
                    {label}
                  </span>
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-400"
                    style={{ width: activeSection === id ? "100%" : "0" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Join Waitlist */}
          <div className="hidden md:block">
            <div className="relative ml-3 group">
              <div
                className="absolute inset-0 rounded-full blur-[5px] opacity-80 group-hover:opacity-100 transition"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                }}
              />
              <button
                onClick={onOpenModal}
                className="relative z-10 px-6 py-2 rounded-full text-white font-bold italic uppercase text-sm bg-[#0b0a0b] transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                }}
              >
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 relative overflow-hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <motion.span
              className="absolute inset-0 opacity-20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Liquid Wave */}
        <svg className="absolute bottom-0 w-full h-6" viewBox="0 0 1440 320">
          <path
            fill="#000"
            fillOpacity="0.6"
            d="M0,96L80,106.7C160,117,320,139,...Z"
          />
        </svg>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col gap-4 text-white font-['Inter',sans-serif] font-medium"
          >
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToSection(id)}>
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenModal();
                setIsOpen(false);
              }}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 font-['Inter',sans-serif] rounded-full text-sm"
            >
              Join Waitlist
            </button>
          </motion.nav>
        )}
      </header>

      {/* Scroll CTA */}
      {!show && scrolled && <ScrollCTA />}
    </>
  );
}
