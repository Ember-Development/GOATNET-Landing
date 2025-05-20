import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import backgroundVideo from "../assets/videos/goatvideo.mp4";

const sections = [
  {
    heading: "A Name Born from Realization",
    text: `GOATNET got its name after a great realization. We initially dreamed up a sports movie network — the first of its kind — but quickly saw that true greatness lives in the human stories between the whistles.`,
  },
  {
    heading: "Beyond Live Action",
    text: `All existing sports channels revolve around live games and highlights. Everything else is shoulder programming: human interest pieces treated as filler, not the main event.`,
  },
  {
    heading: "The Feature Gap",
    text: `Over the last two decades, “feature” stories became scarce and scattered. Newspapers and magazines faded, and creativity in sports coverage was deprioritized.`,
  },
  {
    heading: "A Call from Marketers",
    text: `Brands loved aligning with sports, but marketers craved something unique — content they could truly call their own, beyond just game day.`,
  },
  {
    heading: "Reimagining Content Curation",
    text: `We brainstormed licensing classics — Rocky, Miracle, Cool Runnings — but realized that repackaging old favorites isn’t enough. Fresh storytelling was the real answer.`,
  },
  {
    heading: "Our Epiphany",
    text: `Social media shortens attention spans; movies and documentaries take years. We needed a new genre: "greatness." Everyday GOATs, sharing their journeys in bite-sized, inspiring narratives.`,
  },
  {
    heading: "Defining the Niche",
    text: `It isn’t about sports. It’s about the pursuit of excellence. We built a command post for creators of great content, not a traditional network.`,
  },
  {
    heading: "Platform for Opportunities",
    text: `GOATNET isn’t just a network — it’s a community. A place where great work is celebrated, stories are chronicled, and supporters align with ambassadors of greatness.`,
  },
  {
    heading: "Join the Movement",
    text: `With the support of visionary investors and a shared vision, we’re making GOATNET together. The journey of greatness is the greatest story of all.`,
  },
];

export default function AboutUsPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const scrollToSection = (index: number) => {
    const el = document.getElementById(`section-${index}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black/70 z-10" />

      <motion.div style={{ opacity }} className="fixed top-6 left-6 z-20">
        <Link
          to="/"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-['Inter',sans-serif] font-semibold hover:scale-105 transition"
        >
          Back Home
        </Link>
      </motion.div>

      <div className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
        {sections.map((sec, idx) => (
          <motion.section
            key={idx}
            id={`section-${idx}`}
            className="snap-start h-screen flex flex-col items-center justify-center text-center px-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white font-['Inter',sans-serif] mb-4 gradient-text">
              {sec.heading}
            </h2>
            <p className="max-w-3xl text-xl md:text-2xl text-gray-300 font-['Inter',sans-serif] leading-relaxed">
              {sec.text}
            </p>

            <button
              onClick={() =>
                idx < sections.length - 1
                  ? scrollToSection(idx + 1)
                  : scrollToSection(0)
              }
              className="mt-8 animate-bounce focus:outline-none"
              aria-label={
                idx < sections.length - 1 ? "Next section" : "Back to top"
              }
            >
              {idx < sections.length - 1 ? (
                <ChevronDown className="w-8 h-8 text-gray-400" />
              ) : (
                <ChevronUp className="w-8 h-8 text-gray-400" />
              )}
            </button>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
