import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Member = {
  id: string;
  name: string;
  image: string;
  link?: string;
};

function fileNameToName(fn: string) {
  const name = fn.replace(/\.(png|jpe?g|svg)$/, "");
  return name
    .split(/[-_]/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const images = import.meta.glob("../assets/creds/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

const people: Member[] = Object.entries(images).map(([path, image]) => ({
  id: path.split("/").pop() || "",
  name: fileNameToName(path.split("/").pop() || ""),
  image: image as string,
}));

import HBCU from "../assets/images/hbcu.png";
import Harvey from "../assets/images/harvey.jpg";
import Health from "../assets/images/sport-health.png";
import player from "../assets/images/5TP.png";

interface MemberProps {
  onOpenModal: () => void;
}

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
  {
    id: "org5",
    name: "Harvey Cedars Beach Patrol",
    image: Harvey,
    link: "https://www.harveycedars.org/cn/webpage.cfm?tpid=14966",
  },
  {
    id: "org6",
    name: "Sports Health In The City",
    image: Health,
    link: "https://www.sportsandhealthnyc.org/",
  },
  {
    id: "org7",
    name: "Five Tool Player Development",
    image: player,
    link: "https://5tool.com/player-development/",
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Members({ onOpenModal }: MemberProps) {
  const peopleRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right"
  ) => {
    const container = ref.current;
    if (!container) return;
    container.scrollBy({
      left:
        dir === "left"
          ? -container.offsetWidth * 0.8
          : container.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="credentials"
      className="relative bg-black py-10 md:py-15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-4 sm:mb-6 flex items-center justify-between"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Credentials
          </h2>
          <button
            onClick={onOpenModal}
            className="px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-sm sm:text-base text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            Join Waitlist
          </button>
        </motion.div>

        <motion.p
          variants={item}
          className="text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base"
        >
          Goatnet has Guest, Select & Goat memberships with tiered status.
          Public launch coming soon. Sign up and stay in the loop for key
          milestones.
        </motion.p>

        {/* Credentials Carousel */}
        <div className="relative mb-12 sm:mb-24">
          <button
            onClick={() => scroll(peopleRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={() => scroll(peopleRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <div
            ref={peopleRef}
            className="flex space-x-3 sm:space-x-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2"
          >
            {people.map((m) => (
              <div
                key={m.id}
                className="relative snap-start rounded-xl overflow-hidden shadow-lg min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]"
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

        {/* Partners Header */}
        <motion.div
          id="partners"
          variants={item}
          initial="hidden"
          animate="show"
          className="mb-4 sm:mb-6 flex items-center justify-between"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Partners
          </h2>
          <a
            href="mailto:people@goatnet.com?subject=Partnership Inquiry&body=Hi Goatnet team,"
            className="px-4 py-1 sm:px-6 sm:py-2 border border-white/30 text-sm sm:text-base text-white font-semibold rounded-full hover:bg-white/10 transition"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base"
        >
          We offer flexible models based on goals and needs, including
          shared-cost approaches with buy-in strategies involving sponsors,
          boosters and external networks.
        </motion.p>

        {/* Partners Carousel */}
        <div className="relative mb-12 sm:mb-24">
          <button
            onClick={() => scroll(partnersRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={() => scroll(partnersRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <div
            ref={partnersRef}
            className="flex space-x-3 sm:space-x-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2"
          >
            {orgs.map((m) => (
              <a
                key={m.id}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-start flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 sm:p-6 hover:scale-105 transition-transform min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-16 sm:h-20 object-contain mb-3 sm:mb-4 rounded-md"
                />
                <span className="text-white font-semibold text-center text-sm sm:text-base">
                  {m.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
