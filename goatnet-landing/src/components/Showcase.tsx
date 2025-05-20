import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  link: string;
};

const items: Item[] = [
  {
    id: 1,
    title: "GOAT Time with Bo Jackson",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/658ef42e2ab956b00d0954e4_Screenshot%202023-12-29%20at%2011.30.20%E2%80%AFAM-p-500.png",
    video: "https://www.youtube.com/watch?v=nw5jCitcsV0",
    link: "https://www.youtube.com/watch?v=nw5jCitcsV0&t=2s",
  },
  {
    id: 2,
    title: "Dusty's Life Lessons",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/651593dcceda465d5fdd04b7_Screen%20Shot%202023-09-28%20at%2010.55.10%20AM-p-500.png",
    video: "https://www.youtube.com/watch?v=cgH-5Q-CaAc",
    link: "https://www.youtube.com/watch?v=cgH-5Q-CaAc&t=1s",
  },
  {
    id: 3,
    title: "Meet the Marshalls",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/651ae3bc72ddd0c6927d2953_Screen%20Shot%202023-10-02%20at%2011.36.43%20AM-p-500.png",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    link: "#",
  },
  {
    id: 4,
    title: "The Making of Ball Game",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/6515b7a83421e40a15d657c0_Screen%20Shot%202023-09-28%20at%201.27.47%20PM-p-500.png",
    video: "https://www.youtube.com/watch?v=F40GCqDG5dY",
    link: "https://www.youtube.com/watch?v=F40GCqDG5dY",
  },
  {
    id: 5,
    title: "Cedeño Bros: Faith & Fists",
    image:
      "https://cdn.prod.website-files.com/633efad2155ea72d199428e9/68065ab85822bf3c3e6059a4_Screenshot%202025-04-21%20at%2010.26.28%E2%80%AFAM.png",
    video: "https://www.youtube.com/watch?v=-PKkC5m-mAY",
    link: "https://www.youtube.com/watch?v=-PKkC5m-mAY&t=1s",
  },
];

function CarouselItem({ item }: { item: Item }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeID(item.video);

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="relative min-w-[200px] md:min-w-[240px] lg:min-w-[280px] snap-start overflow-hidden rounded-lg shadow-lg group"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-40 object-cover"
      />

      {videoId && (
        <iframe
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${
            playing ? 1 : 0
          }&controls=0&loop=1&playlist=${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />
      )}

      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 bg-opacity-30 backdrop-blur-lg border border-purple-400 shadow-lg overflow-hidden">
          <span className="text-white font-bold text-sm font-['Inter',sans-serif] drop-shadow-lg">
            {item.title}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);

  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    const amount = c.offsetWidth * 0.8;
    c.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative bg-black py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white font-['Inter',sans-serif] mb-2">
          Discover Greatness
        </h2>
        <p className="text-gray-400 font-['Inter',sans-serif] mb-8">
          A taste of what's waiting inside.
        </p>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <motion.div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto scroll-hide snap-x snap-mandatory"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="show"
          >
            {items.map((item) => (
              <CarouselItem key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
