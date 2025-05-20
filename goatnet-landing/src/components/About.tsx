import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Zap } from "lucide-react";
import Marshall from "../assets/images/marshall.jpg";
import Virginia from "../assets/images/virginia.jpg";
import Harvery from "../assets/images/harvery.webp";
import { Link } from "react-router-dom";

// Staggered container + items (only animates children)
const container = {
  hidden: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Showcase projects
const stories = [
  {
    image: Marshall,
    title: "Utah Marshall",
    caption: "They told our story like no one else ever has.",
    link: "https://www.youtube.com/watch?v=AitwYmf8g7s&t=5s",
  },
  {
    image: Virginia,
    title: "University of Virginia Baseball",
    caption:
      "Goatnet helped us expand our story and spotlight the athletes behind the wins.",
    link: "https://www.youtube.com/watch?v=7hhP25NCf2Y",
  },
  {
    image: Harvery,
    title: "Harvey Cedars Beach Patrol",
    caption: "They captured more than a race — they told our legacy.",
    link: "https://www.pbs.org/video/how-the-waves-were-won-zjrtb2/",
  },
];

export default function About() {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Observe visibility once
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          controls.start("show");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [controls]);

  // Auto-rotate carousel when not paused
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(
      () => setCurrent((i) => (i + 1) % stories.length),
      5000
    );
    return () => clearInterval(interval);
  }, [paused]);

  // Simple fade variants
  const carouselVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section id="about" ref={ref} className="relative bg-black overflow-hidden">
      {/* subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

      {/* motion wrapper for content only */}
      <motion.div
        className="relative max-w-7xl mx-auto px-8 py-2 md:py-20 grid md:grid-cols-2 gap-y-12 gap-x-28 items-center"
        initial="hidden"
        animate={controls}
        variants={container}
      >
        {/* Left side: copy + bullets */}
        <div>
          <motion.div variants={item} className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold font-['Inter',sans-serif] text-white">
              About Us
            </h2>
            <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
          </motion.div>

          <motion.p
            variants={item}
            className="text-gray-300 font-['Inter',sans-serif] mb-4"
          >
            GOATNET was born from a bold realization:
          </motion.p>
          <motion.p
            variants={item}
            className="text-gray-400 font-['Inter',sans-serif] mb-6"
          >
            Rooted in storytelling, we exist to provide value for organizations
            and individuals in the pursuit of greatness. Goatnet is a media and
            technology solution for production, distribution, and community
            engagement. We focus on content that drives results.
          </motion.p>
          <motion.p
            variants={item}
            className="text-gray-400 font-['Inter',sans-serif] mb-8"
          >
            We provide scalable social and streaming solutions with A.I.
            production advantages, creator tools, integrated agency services and
            flexible distribution. We serve three targeted groups: Aspiring,
            trending and legacy greats and those who support them. Everything we
            do is collaborative, providing opportunities for your social media
            and marketing teams to thrive.
          </motion.p>
          <motion.p
            variants={item}
            className="text-gray-400 font-['Inter',sans-serif] mb-12"
          >
            Join the family.
          </motion.p>

          {/* Icon‑led bullets */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-purple-500" />
              <span className="text-white font-['Inter',sans-serif] font-medium">
                Stories That Inspire.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-500" />
              <span className="text-white font-['Inter',sans-serif] font-medium">
                Organizations & Creators.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-500" />
              <span className="text-white font-['Inter',sans-serif] font-medium">
                Breakthrough Moments.
              </span>
            </div>

            {/* Learn More button */}
            <motion.div variants={item} className="mt-8">
              <Link to="/about" className="inline-block">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="group relative inline-flex items-center px-8 py-2 font-semibold font-['Inter',sans-serif] text-sm uppercase tracking-wide text-white rounded-full bg-transparent border border-gray-500 transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-purple-600/40"
                >
                  Learn More
                  <span
                    className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(147,51,234,0.6), transparent 70%)",
                    }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side: carousel full width */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.a
              key={current}
              href={stories[current].link}
              target="_blank"
              rel="noopener noreferrer"
              variants={carouselVariants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="block w-full rounded-xl overflow-hidden shadow-lg cursor-pointer relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <img
                src={stories[current].image}
                alt={stories[current].title}
                className="w-full h-64 object-cover"
              />
              {/* caption */}
              <div className="p-4">
                <h3 className="text-white font-semibold font-['Inter',sans-serif] text-xl mb-2">
                  {stories[current].title}
                </h3>
                <p className="text-gray-400 font-['Inter',sans-serif] text-sm">
                  - {stories[current].caption}
                </p>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* decorative wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg className="block w-full h-8" viewBox="0 0 1440 320">
          <path
            fill="#000"
            fillOpacity="0.6"
            d="M0,224L80,197.3C160,171,320,117,480,122.7C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
