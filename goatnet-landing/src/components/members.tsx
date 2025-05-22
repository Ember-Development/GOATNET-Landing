import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export type Member = {
  id: string;
  name: string;
  image: string;
  link?: string;
};

// Animation variant for headings
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
  { id: "p1", name: "Dinn Mann", image: dinnImg },
  { id: "p2", name: "Darnell McDonald", image: darnImg },
  { id: "p3", name: "Dusty Baker", image: dustyImg },
  { id: "p4", name: "Jennifer Ford", image: jenImg },
  { id: "p5", name: "Kevin Davidson", image: kevinImg },
  { id: "p6", name: "Adam Jones", image: adamImg },
  { id: "p7", name: "Annie Cross-Codron", image: annieImg },
  { id: "p8", name: "Dillion Kelly", image: dillionImg },
  { id: "p9", name: "Lexie Shaver", image: lexieImg },
];

export default function Members() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollBy({
      left: dir === "left" ? -c.offsetWidth * 0.8 : c.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="credentials"
      className="relative bg-black py-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Credentials
          </h2>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition">
            Join Waitlist
          </button>
        </motion.div>
        <motion.p variants={item} className="text-gray-300 mb-12">
          Goatnet has Guest, Select & Goat memberships with tiered status.
          Public launch coming soon. Sign up and stay in the loop for key
          milestones.
        </motion.p>

        <div className="relative mb-24">
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
                className="relative min-w-[200px] lg:min-w-[240px] snap-start rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          id="partners"
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center justify-between"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Partners
          </h2>
          <button className="px-6 py-2 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition">
            Contact Us
          </button>
        </motion.div>
        <motion.p variants={item} className="text-gray-300 mb-12">
          We offer flexible models based on goals and needs, including
          shared-cost approaches with buy-in strategies involving sponsors,
          boosters and external networks.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {orgs.map((m) => (
            <a
              key={m.id}
              href={m.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 hover:scale-105 transition-transform"
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-20 object-contain mb-4"
              />
              <span className="text-white font-semibold text-center">
                {m.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
