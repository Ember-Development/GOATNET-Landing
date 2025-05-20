import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GoatCard from "../../assets/images/goatcard.png";

export default function OverlayCTA() {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const shouldShow = y < lastY.current || y < 100;
      setShow(shouldShow);
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md px-4 md:px-8 py-6"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-6 gap-x-12 w-full">
        {/* Logo */}
        <img
          src={GoatCard}
          alt="GOATNET Logo"
          className="w-24 h-24 object-contain"
        />

        {/* Text Block */}
        <div className="flex-1 text-center md:text-left space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold font-['Inter',sans-serif] text-neutral-200 uppercase">
            Welcome to Goatnet
          </h1>
          <p className="text-base text-neutral-300 font-['Inter',sans-serif] max-w-lg">
            Life is packed with great stories. We exist so they’ll last forever
          </p>
        </div>

        {/* Form */}
        <form className="flex items-center bg-[#131314] border border-neutral-500 rounded-full overflow-hidden px-4 py-2 w-full max-w-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.877 1.778l-7.5 5.625a2.25 2.25 0 01-2.646 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75"
            />
          </svg>
          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 bg-transparent font-['Inter',sans-serif] text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="relative ml-3 px-6 py-2 rounded-full text-white font-bold font-['Inter',sans-serif] italic uppercase text-sm leading-none bg-gradient-to-r from-blue-500 to-purple-600 transition-transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.div>
  );
}
