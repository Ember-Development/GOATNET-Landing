import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Helper to extract YouTube ID
function getYouTubeID(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : undefined;
}

// Showcase story for video embed
const story = {
  link: "https://www.youtube.com/watch?v=tGG_DmkDALQ",
};

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);

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

  const videoId = getYouTubeID(story.link);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-black overflow-hidden py-5 md:py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

      <motion.div
        className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold  text-white">
              About Us
            </h2>
            <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-300">
            GOATNET: Your go-to advantage in the new media game.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-400">
            Every awesome story starts with purpose. Ours is to serve
            organizations and individuals who share one: greatness.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-400">
            Goatnet provides scalable social and streaming solutions, leveraging
            AI production, creator tools, and integrated agency services to
            drive narratives that resonate.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-400">
            Join the family. Let’s Goat!
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="w-full rounded-xl overflow-hidden shadow-lg"
        >
          <div className="relative w-full h-0 pb-[56.25%]">
            {videoId && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
                title="Showcase Video"
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full overflow-hidden leading-none -mt-1">
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
