import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react";

// Image imports
import dinnImg from "../assets/images/dinn.png";
import darnImg from "../assets/images/darn.png";
import dustyImg from "../assets/images/dusty.png";
import jenImg from "../assets/images/jen.png";
import kevinImg from "../assets/images/kevin.png";
import adamImg from "../assets/images/adam.png";
import annieImg from "../assets/images/annie.png";
import dillionImg from "../assets/images/dillion.png";
import lexieImg from "../assets/images/lexie.png";
import HBCU from "../assets/images/hbcu.png";

type Member = {
  id: string;
  name: string;
  image: string;
  videoUrl?: string;
  link?: string;
};

// Animation variant for headings
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Data arrays
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
  { id: "p4", name: "Jennifer Ford", image: jenImg },
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
  { id: "p7", name: "Annie Cross-Codron", image: annieImg },
  { id: "p8", name: "Dillion Kelly", image: dillionImg },
  { id: "p9", name: "Lexie Shaver", image: lexieImg },
];

export default function Members() {
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll People carousel
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      containerRef.current?.scrollBy({
        left: containerRef.current.offsetWidth * 0.8,
        behavior: "smooth",
      });
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollBy({
      left: dir === "left" ? -c.offsetWidth * 0.8 : c.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  const toEmbedUrl = (url: string) => {
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };

  const [modalItem, setModalItem] = useState<Member | null>(null);

  return (
    <section
      id="community"
      ref={ref}
      className="relative bg-black py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Credentials
          </h2>
          <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
        </motion.div>
        <motion.p variants={item} className="text-gray-300 mb-12">
          Goatnet has Guest, Select & Goat memberships with tiered status.
          Public launch coming soon. Sign up and stay in the loop for key
          milestones.
        </motion.p>

        {/* People Carousel */}
        <div
          className="relative mb-24"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
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
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Partners
          </h2>
          <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
        </motion.div>
        <motion.p variants={item} className="text-gray-300 mb-12">
          We offer flexible models based on goals and needs, including
          shared-cost approaches with buy-in strategies involving sponsors,
          boosters and external networks.
        </motion.p>

        {/* Organizations Marquee */}
        <div className="overflow-hidden mb-12">
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
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalItem?.videoUrl && (
          <motion.div
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
                    modalItem.videoUrl
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
