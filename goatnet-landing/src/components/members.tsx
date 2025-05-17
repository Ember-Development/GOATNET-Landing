// src/components/Members.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";

// Image imports
import dinnImg from "../assets/images/dinn.PNG";
import darnImg from "../assets/images/darn.PNG";
import dustyImg from "../assets/images/dusty.PNG";
import jenImg from "../assets/images/jen.PNG";
import kevinImg from "../assets/images/Kevin.PNG";
import adamImg from "../assets/images/Adam.PNG";
import annieImg from "../assets/images/Annie.PNG";
import dillionImg from "../assets/images/Dillion.PNG";
import lexieImg from "../assets/images/Lexie.PNG";
import HBCU from "../assets/images/hbcu.png";

type Member = {
  id: string;
  name: string;
  image: string;
  // only one of these will be set per member
  videoUrl?: string;
  link?: string;
};

// Animation variant for headings
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Organizations now use `link` instead of videoUrl
const orgs: Member[] = [
  {
    id: "org1",
    name: "MGF Marshalls Baseball",
    image:
      "https://static.wixstatic.com/media/69e627_4b0475a463f2442d93e51aa6b325be4f~mv2.png",
    link: "https://www.mgfmarshalls.com",
  },
  {
    id: "org2",
    name: "Rise 2 Greatness Foundation",
    image:
      "https://rise2greatness.org/wp-content/uploads/2022/05/Rise-2-Greatness-PG-Cares-1024x1024-1.png",
    link: "https://rise2greatness.org",
  },
  {
    id: "org3",
    name: "Metropolitan Oval Academy",
    image:
      "https://metropolitanoval.org/wp-content/uploads/2019/03/Met-Oval-White-Trans1k.png",
    link: "https://metropolitanoval.org",
  },
  {
    id: "org4",
    name: "HBCU Icon Exchange",
    image: HBCU,
    link: "https://hbcuiconexchange.org",
  },
];

const people: Member[] = [
  {
    id: "p1",
    name: "Dinn Mann",
    image: dinnImg,
    videoUrl: "https://www.youtube.com/watch?v=yJr6tbInO4g",
  },
  {
    id: "p2",
    name: "Darnell McDonald",
    image: darnImg,
    videoUrl: "https://www.youtube.com/watch?v=VLvrR6d5kOw",
  },
  {
    id: "p3",
    name: "Dusty Baker",
    image: dustyImg,
    videoUrl: "https://www.youtube.com/watch?v=X0a3LMAWMnw",
  },
  { id: "p4", name: "Jennifer Ford", image: jenImg, videoUrl: "" },
  {
    id: "p5",
    name: "Kevin Davidson",
    image: kevinImg,
    videoUrl: "https://www.youtube.com/watch?v=ckM3pG5Yor4",
  },
  {
    id: "p6",
    name: "Adam Jones",
    image: adamImg,
    videoUrl: "https://www.youtube.com/watch?v=nXr5FFSIuL8",
  },
  { id: "p7", name: "Annie Cross-Codron", image: annieImg, videoUrl: "" },
  { id: "p8", name: "Dillion Kelly", image: dillionImg, videoUrl: "" },
  { id: "p9", name: "Lexie Shaver", image: lexieImg, videoUrl: "" },
];

export default function Members() {
  const tabs = ["People", "Organizations"] as const;
  type Tab = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<Tab>("People");

  // People carousel refs & state
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll People every 5s
  useEffect(() => {
    if (activeTab !== "People" || paused) return;
    const id = setInterval(() => {
      containerRef.current?.scrollBy({
        left: containerRef.current.offsetWidth * 0.8,
        behavior: "smooth",
      });
    }, 5000);
    return () => clearInterval(id);
  }, [activeTab, paused]);

  // Snap back when tab changes
  useEffect(() => {
    containerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [activeTab]);

  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollBy({
      left: dir === "left" ? -c.offsetWidth * 0.8 : c.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  // Video modal state
  const [modalItem, setModalItem] = useState<Member | null>(null);
  const toEmbedUrl = (url: string) => {
    if (url.includes("/embed/")) return url;
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  return (
    <section className="relative bg-black py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div variants={item} className="mb-6">
          <h2 className="text-4xl md:text-5xl font-bold font-['Inter',sans-serif] text-white">
            Community
          </h2>
          <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
        </motion.div>
        <motion.p
          variants={item}
          className="text-gray-300 font-['Inter',sans-serif] mb-12"
        >
          Find out who's already on GOATNET.
        </motion.p>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-8">
          {tabs.map((t) =>
            t === activeTab ? (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold font-['Inter',sans-serif] uppercase text-sm shadow-lg"
              >
                {t}
              </button>
            ) : (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="px-4 py-1 rounded-full border border-white border-opacity-20 font-semibold font-['Inter',sans-serif] text-white text-opacity-60 hover:text-opacity-100 transition"
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* People Carousel */}
          {activeTab === "People" && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div
                ref={containerRef}
                className="flex space-x-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
              >
                {people.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setModalItem(m)}
                    className="relative min-w-[200px] lg:min-w-[240px] snap-start rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                    {m.videoUrl && (
                      <div className="absolute inset-0 bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Organizations continuous marquee */}
          {activeTab === "Organizations" && (
            <div className="overflow-hidden">
              {/* duplicate the array so it wraps seamlessly */}
              <div className="flex animate-marquee">
                {[...orgs, ...orgs].map((m, i) => (
                  <a
                    key={`${m.id}-${i}`}
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center mt-2"
                    style={{ minWidth: "150px" }}
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-20 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalItem && modalItem.videoUrl && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-xl mx-4 bg-black rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`${toEmbedUrl(
                    modalItem.videoUrl!
                  )}?autoplay=1&controls=1`}
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
