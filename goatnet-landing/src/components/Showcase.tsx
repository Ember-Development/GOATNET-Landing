// src/components/Showcase.tsx
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import badge from "../assets/images/Goatnet_Icon_White.png";
import {
  useAttractions,
  type AttractionFromServer,
} from "../hooks/useAttractions";
import Skeleton from "./ui/skelton";
const API_URL = import.meta.env.VITE_API_IMAGE_URL;

// Helper to extract YouTube ID from watch, youtu.be, or shorts URLs
function getYouTubeID(url: string) {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : undefined;
}

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalItem, setModalItem] = useState<AttractionFromServer | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  // Fetch showcase
  const { data, loading, error } = useAttractions();

  if (loading) {
    return (
      <section id="showcase" className="relative bg-black py-5 md:py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <Skeleton height="h-10 w-1/3 md:w-1/4" />
            <Skeleton height="h-1 w-12 sm:w-20 mt-2" />
          </div>

          <Skeleton height="h-4 w-full md:w-2/3 mb-6 sm:mb-12" />

          <div className="relative flex space-x-4 sm:space-x-8 overflow-hidden py-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-w-[180px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[300px]"
              >
                <div className="relative pb-[170%] bg-gray-800 animate-pulse rounded-lg overflow-hidden">
                  <Skeleton height="h-full w-full absolute inset-0" />
                </div>
                <Skeleton height="h-4 w-2/3 mt-2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3) error/no data message
  if (error || !data) {
    return (
      <section className="py-20 bg-black text-white flex justify-center items-center">
        <span className="text-lg text-red-400">
          {error || "No attractions data found."}
        </span>
      </section>
    );
  }

  // Filter to only those meant for the landing page, then sort by landingOrder
  const landingItems = data
    .filter((item) => item.showOnLanding)
    .sort((a, b) => {
      // If landingOrder is null or undefined, put it at the end
      const aOrder = a.landingOrder ?? Number.POSITIVE_INFINITY;
      const bOrder = b.landingOrder ?? Number.POSITIVE_INFINITY;
      return aOrder - bOrder;
    });

  if (landingItems.length === 0) {
    return (
      <section className="py-20 bg-black text-white text-center">
        <span>No attractions to show on the landing page.</span>
      </section>
    );
  }

  const items = landingItems.map((attr) => {
    const displayTitle =
      attr.title === "How The Waves Were Won"
        ? "How The Waves\nWere Won"
        : attr.title === "Three Minutes From Home"
        ? "Three Minutes\nFrom Home"
        : attr.title;

    return {
      ...attr,
      displayTitle,
      caption: attr.description ?? "",
      image: attr.imageUrl ?? "",
      video: attr.videoUrl ?? "",
    };
  });

  // Scrolling logic
  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    const amount = c.offsetWidth * 0.8;
    c.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

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
          <button
            onClick={() => scroll("left")}
            className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-black/60"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-black/60"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
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
            {items.map((item) => (
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
                  setModalItem(item as AttractionFromServer);
                  setPlayVideo(false);
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-full relative pb-[170%] sm:pb-[170%] bg-gray-800">
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
                  />
                </div>

                {/* Display title */}
                <div className="mt-1 sm:mt-2 text-center">
                  <span className="inline-block text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 font-semibold whitespace-pre-line text-center">
                    {item.displayTitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
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
                style={{
                  backgroundImage: `url(${API_URL}${modalItem.imageUrl})`,
                }}
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
                      {modalItem.type && (
                        <span className="px-2 py-1 bg-white/20 rounded text-xs">
                          {modalItem.type}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-100 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-4 sm:line-clamp-none">
                      {modalItem.description}
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

                {playVideo && modalItem.videoUrl && (
                  <div className="absolute inset-0 bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeID(
                        modalItem.videoUrl
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
