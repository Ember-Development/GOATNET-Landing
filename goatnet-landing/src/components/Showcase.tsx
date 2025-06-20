import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import badge from "../assets/images/Goatnet_Icon_White.png";
import waves from "../assets/images/waves.png";
import erik from "../assets/images/eric.jpg";
import three from "../assets/images/three-minutes.png";
import virgina from "../assets/images/virginia.png";
import marshall from "../assets/images/marshall-poster.jpg";
import Bo from "../assets/images/bo-2.png";
import Bazuca from "../assets/images/bazucabros.png";
import Phung from "../assets/images/phung.jpg";

// Helper to extract YouTube ID
// Helper to extract YouTube ID from watch, youtu.be, or shorts URLs
function getYouTubeID(url: string) {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&/]+)/; // capture everything up to ? & or slash
  const match = url.match(regExp);
  return match ? match[1] : undefined;
}

type Item = {
  id: number;
  title: string;
  image: string;
  caption: string;
  video: string;
  type: string;
  channel: string[];
};

const items: Item[] = [
  {
    id: 1,
    title: "How The Waves Were Won",
    image: waves,
    caption:
      "NJ lifeguards compete for history in a legendary summer showdown. Experience the ocean, grit and glory behind the Harvey Cedars Beach Patrol's pursuit of a record-breaking seventh straight LBI Lifeguard Championship on Long Beach Island, NJ",
    video: "https://www.youtube.com/watch?v=az5TRfOdgQ8",
    type: "documentary",
    channel: [],
  },
  {
    id: 2,
    title: "The Marshalls",
    image: marshall,
    caption:
      "The inspiring story of the Marshall’s Baseball Program in Utah—one of the most impactful and influential amateur baseball organizations in America. From its roots as a regional travel team to a national proving ground, the Marshalls have helped shape the careers of some of the game's brightest stars, including Bryce Harper and Kris Bryant. But this isn’t just a story of past greatness—it’s about the present and future. Through exclusive behind-the-scenes access, the film follows the current generation of players chasing their dreams, guided by the same values of discipline, grit, and brotherhood that built the program’s reputation.",
    video: "https://www.youtube.com/watch?v=AitwYmf8g7s&t=5s",
    type: "documentary",
    channel: [],
  },
  {
    id: 3,
    title: "From The Jump",
    image: erik,
    caption:
      "Get to know the man behind the visor beyond the records and rushing titles. From falling in love with football on Texas fields to navigating family, faith, and the pain of losing his father, Dickerson shares his journey with honesty and heart. This is a story about purpose, promise, and the power of building something greater.",
    video: "https://www.youtube.com/watch?v=4ORfQO1b70Y",
    type: "trailer",
    channel: [],
  },
  {
    id: 4,
    title: "Rad Grandpa",
    image: Bo,
    caption:
      "Step inside the world of Bo Jackson like never before—beyond the highlight reels and legendary moments. In this intimate and powerful interview, Bo opens up about the heart behind his state-of-the-art youth facilities, his humble beginnings, and the life lessons he passes on to the next generation. From helping bury victims of tragedy to sharing deeply personal stories about his mother, spirituality, and family, Bo reflects on a life of resilience, purpose, and legacy. This is a portrait of the man behind the myth—grounded, giving, and quietly great.",
    video: "https://www.youtube.com/watch?v=nw5jCitcsV0",
    type: "interview",
    channel: [],
  },
  {
    id: 5,
    title: "Three Minutes From Home",
    image: three,
    caption:
      "The powerful true story of Jose Miqueo—an elite baseball prospect whose life changed in an instant. After a devastating car accident left him in a coma, doctors doubted he'd survive, let alone walk again. But Jose defied the odds. This is a story of faith, family, and an unbreakable will to return—not just to the game, but to a life of purpose.",
    video: "https://www.youtube.com/watch?v=NHPjAVvWTLg&t=4s",
    type: "trailer",
    channel: [],
  },
  {
    id: 6,
    title: "Choose Hoos",
    image: virgina,
    caption:
      "Go beyond the scoreboard and inside one of college baseball’s premier programs in their annual quest for Omaha.",
    video: "https://www.youtube.com/watch?v=EnGyBF6GS-Y",
    type: "trailer",
    channel: [],
  },
  {
    id: 7,
    title: "Bazuca Bros",
    image: Bazuca,
    caption:
      "Charisma, swagger, and knockout power—Hendri & Euri Cedeno Martinez are rewriting the boxing script. Go behind the scenes with the team that fuels their rise—from trainers to day-ones—and witness the grind, the glory, and the brotherhood driving their path to greatness",
    video: "https://www.youtube.com/watch?v=xboEtOLV9RQ",
    type: "trailer",
    channel: [],
  },
  {
    id: 8,
    title: "Team Phung",
    image: Phung,
    caption:
      "Amelie & Alexa Phung, not just sisters, but part of a bright future for women’s golf. More than that, the Phungs are members of a delightful family, driven to excel on and off the course and personable in precisely the ways you’d want. Young people, making their way, pursuing dreams purposefully and having fun in the process.",
    video: "https://youtube.com/shorts/s3eaElShiW0",
    type: "trailer",
    channel: [],
  },
];

const formattedItems = items.map((item) => {
  const displayTitle =
    item.title === "How The Waves Were Won"
      ? "How The Waves\nWere Won"
      : item.title === "Three Minutes From Home"
      ? "Three Minutes\nFrom Home"
      : item.title;

  return { ...item, displayTitle };
});

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "tween", duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    const amount = c.offsetWidth * 0.8;
    c.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="relative bg-black py-5 md:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Attractions
          </h2>
          <div className="w-12 sm:w-20 h-1 bg-purple-500 mt-2 rounded-full" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-12"
        >
          What are attractions? Content, products and experiences you offer or
          endorse, the things to which people in your network are drawn.
        </motion.p>

        {/* Carousel with arrows */}
        <div className="relative">
          {/* Mobile arrow */}
          <button
            onClick={() => scroll("left")}
            className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-black/60"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          {/* Desktop arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Mobile arrow */}
          <button
            onClick={() => scroll("right")}
            className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-black/60"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          {/* Desktop arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div
            ref={containerRef}
            className="flex space-x-4 sm:space-x-8 overflow-x-auto snap-x snap-mandatory scroll-hide py-2"
          >
            {formattedItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="
                  relative snap-center
                  min-w-[180px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[300px]
                  rounded-lg overflow-hidden cursor-pointer
                "
                onClick={() => {
                  setModalItem(item);
                  setPlayVideo(false);
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Taller on mobile, original ratio on sm+ */}
                <div className="w-full relative pb-[170%] sm:pb-[170%] bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
                  />
                </div>

                <div className="mt-1 sm:mt-2 text-center">
                  <span className="inline-block text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-semibold uppercase whitespace-pre-line text-center">
                    {item.displayTitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {modalItem && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="
                  relative w-full max-w-md sm:max-w-2xl
                  h-[70vh] sm:h-[80vh]
                  rounded-3xl overflow-hidden bg-cover bg-center
                "
                style={{ backgroundImage: `url(${modalItem.image})` }}
                variants={modalVariants}
              >
                <div className="absolute inset-0 bg-black/60" />

                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                  onClick={() => setModalItem(null)}
                >
                  <X size={28} />
                </button>

                {!playVideo && (
                  <motion.div
                    key="modalContent"
                    className="absolute bottom-0 w-full p-4 sm:p-6 text-white z-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1, transition: { duration: 0.8 } }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                  >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                      {modalItem.title}
                    </h1>
                    <div className="flex items-center gap-2 mb-4 sm:mb-5">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">
                        {modalItem.type}
                      </span>
                    </div>
                    <p className="text-gray-100 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-4 sm:line-clamp-none">
                      {modalItem.caption}
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-1 sm:py-2 font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-sm sm:text-base"
                        onClick={() => setPlayVideo(true)}
                      >
                        <PlayCircle className="w-5 h-5" /> Play
                      </button>
                      <img
                        src={badge}
                        alt="badge goat"
                        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 opacity-80 pointer-events-none"
                      />
                    </div>
                  </motion.div>
                )}

                {playVideo && (
                  <div className="absolute inset-0 bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeID(
                        modalItem.video
                      )}?autoplay=1&controls=1`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
