import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Helper to extract YouTube ID
function getYouTubeID(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : undefined;
}

type Item = {
  id: number;
  title: string;
  image: string;
  video: string;
  year: string;
  rating: string;
  type: string;
  genres: string[];
};

const items: Item[] = [
  {
    id: 1,
    title: "GOAT Time with Bo Jackson",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/658ef42e2ab956b00d0954e4_Screenshot%202023-12-29%20at%2011.30.20%E2%80%AFAM-p-500.png",
    video: "https://www.youtube.com/watch?v=nw5jCitcsV0",
    year: "",
    rating: "",
    type: "",
    genres: [],
  },
  {
    id: 2,
    title: "Dusty's Life Lessons",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/651593dcceda465d5fdd04b7_Screen%20Shot%202023-09-28%20at%2010.55.10%20AM-p-500.png",
    video: "https://www.youtube.com/watch?v=cgH-5Q-CaAc",
    year: "",
    rating: "",
    type: "",
    genres: [],
  },
  {
    id: 3,
    title: "Meet the Marshalls",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/651ae3bc72ddd0c6927d2953_Screen%20Shot%202023-10-02%20at%2011.36.43%20AM-p-500.png",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    year: "",
    rating: "",
    type: "",
    genres: [],
  },
  {
    id: 4,
    title: "The Making of Ball Game",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/6515b7a83421e40a15d657c0_Screen%20Shot%202023-09-28%20at%201.27.47%20PM-p-500.png",
    video: "https://www.youtube.com/watch?v=F40GCqDG5dY",
    year: "",
    rating: "",
    type: "",
    genres: [],
  },
  {
    id: 5,
    title: "Cedeño Bros: Faith & Fists",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/68065ab85822bf3c3e6059a4_Screenshot%202025-04-21%20at%2010.26.28%E2%80%AFAM.png",
    video: "https://www.youtube.com/watch?v=-PKkC5m-mAY",
    year: "",
    rating: "",
    type: "",
    genres: [],
  },
];

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
    <section id="showcase" className="relative bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Discover Greatness
        </h2>
        <p className="text-gray-400 mb-8">A taste of what's waiting inside.</p>

        {/* Carousel with arrows */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div
            ref={containerRef}
            className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scroll-hide"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="relative snap-center min-w-[280px] md:min-w-[320px] lg:min-w-[360px] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setModalItem(item);
                  setPlayVideo(false);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <div className="mt-2 text-center">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-semibold uppercase">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal uses Netflix style */}
        <AnimatePresence>
          {modalItem && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="relative bg-black rounded-3xl overflow-hidden max-w-4xl w-full"
                variants={modalVariants}
              >
                {/* Top image with gradient overlay */}
                <div className="relative w-full h-0 pb-[56.25%]">
                  <img
                    src={modalItem.image}
                    alt={modalItem.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Close button */}
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                  onClick={() => setModalItem(null)}
                >
                  <X size={28} />
                </button>

                {/* Content area */}
                <div className="p-8 text-white">
                  {/* Title */}
                  <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                    {modalItem.title}
                  </h1>
                  {/* Metadata row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2 py-1 bg-white/20 rounded text-xs">
                      {modalItem.year}
                    </span>
                    <span className="px-2 py-1 bg-white/20 rounded text-xs">
                      {modalItem.rating}
                    </span>
                    <span className="px-2 py-1 bg-white/20 rounded text-xs">
                      {modalItem.type}
                    </span>
                    {modalItem.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-1 bg-white/20 rounded text-xs"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  {/* Description */}
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    When a gripping narrative unfolds, you’re pulled into its
                    world. Experience drama, action, and intensifying thrills as
                    our heroes navigate unseen challenges.
                  </p>
                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold"
                      onClick={() => setPlayVideo(true)}
                    >
                      <PlayCircle className="w-5 h-5" /> Play
                    </button>
                    <button className="px-4 py-2 border border-white/30 rounded text-white hover:border-white">
                      More Info
                    </button>
                  </div>
                </div>

                {/* Video iframe overlay */}
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
