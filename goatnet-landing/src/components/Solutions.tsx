import { useState, useRef, useLayoutEffect, type JSX } from "react";
import GoatLogoImg from "../assets/images/Goatnet_Icon_White.png"; // import Goat logo image
import { PlayCircle, Zap, ShoppingBag, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = ["Storytelling", "Innovation", "Community"] as const;
type Tab = (typeof tabs)[number];
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface SolutionItem {
  title: string;
  desc: string;
  icon: JSX.Element;
}

const solutionsData: Record<Tab, SolutionItem[]> = {
  Storytelling: [
    {
      title: "Social",
      desc: "Link existing accounts, distribute Goatnet posts whenever desired & own your catalog.",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Narrative",
      desc: "You’re the interviewee, assets are gathered. Your network forms & grows as you choose",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Studio",
      desc: "Feature content in varied forms, direct edits, keep creative control.",
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Newsletter",
      desc: "Opted-in correspondence, from individuals or groups.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Intellectual Property",
      desc: "Consume, make or appear in: Podcasts, documentaries, series, films, publications.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
  ],
  Innovation: [
    {
      title: "Command Post",
      desc: "Profiles are passé. We provide a Credential, a dashboard & overview that’s purposeful & dynamic.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "A.I. Tools",
      desc: "Thoughtful A.I. integrations, production array showcases attributes, highlights AND interests.",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Tech Stack",
      desc: "Adaptive infrastructure for vital details & functionality.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Websites & Maintenance",
      desc: "Custom-site development? Great! We build, QA & update",
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
    },
  ],
  Community: [
    {
      title: "Activations",
      desc: "Camps, fundraisers, competitions, premieres: Experience the upside of Goatnet-infused events.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Pipeline",
      desc: "Authentic onboarding & metadata connect dots, accentuating kinship, impact & brand appreciation.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Commerce",
      desc: "Create, sell or buy: Get paid & get deals!",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Empowerment",
      desc: "Influence in action: Promote giving back.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Gatekeeper",
      desc: "G-List is how we roll: Hard pass, bots & trolls.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
  ],
};

const tabDescriptions: Record<Tab, string> = {
  Storytelling:
    "Tell your story with precision and creativity, leveraging your network and assets to fuel engagement.",
  Innovation:
    "Equip yourself with cutting-edge tools and infrastructure to stay ahead in a rapidly evolving digital landscape.",
  Community:
    "Build authentic connections through events, commerce, and empowerment-driven initiatives.",
};

export default function SolutionsProcess() {
  const [activeTab, setActiveTab] = useState<Tab>("Storytelling");
  const items = solutionsData[activeTab];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];
  const ref = useRef<HTMLElement>(null);

  // refs for cards and text underline
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useLayoutEffect(() => {
    const cardEl = cardRefs.current[selectedIndex];
    const textEl = textRef.current;
    const containerEl = containerRef.current;
    if (cardEl && textEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const textRect = textEl.getBoundingClientRect();
      const x1 = textRect.left + textRect.width / 2 - containerRect.left;
      const y1 = textRect.bottom - containerRect.top;
      const x2 = cardRect.left - containerRect.left;
      const y2 = cardRect.top + cardRect.height / 2 - containerRect.top;
      setLineCoords({ x1, y1, x2, y2 });
    }
  }, [selectedIndex, activeTab]);

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative py-20 bg-black text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

      {/* Center Goat Logo */}
      <img
        src={GoatLogoImg}
        alt="Goat Logo"
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none"
      />
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12"
      >
        {/* SVG connector line */}
        <svg className="absolute inset-0 pointer-events-none">
          <line
            x1={lineCoords.x1}
            y1={lineCoords.y1}
            x2={lineCoords.x2}
            y2={lineCoords.y2}
            stroke="#9f7aea"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>

        {/* Left: Tabs + Title + Dynamic Text */}
        <div className="col-span-1 lg:col-span-2 flex flex-col relative">
          <motion.div variants={item} className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold font-['Inter',sans-serif] text-white">
              Why GOATNET?
            </h2>
            <div className="w-20 h-1 bg-purple-500 mt-2 rounded-full" />
          </motion.div>
          <nav role="tablist" className="flex gap-8 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedIndex(0);
                }}
                className="relative font-semibold text-base text-gray-300 pb-2"
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-purple-400 to-blue-500 rounded"
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="relative inline-block mb-12" ref={textRef}>
            <p className="text-gray-300 max-w-3xl text-xl leading-relaxed">
              {tabDescriptions[activeTab]}
            </p>
          </div>

          <div className="relative inline-block" ref={textRef}>
            <h3 className="text-3xl font-semibold mb-2 inline-block">
              {selected.title}
            </h3>
          </div>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            {selected.desc}
          </p>
        </div>

        {/* Right: Glassmorphic cards list */}
        <div className="col-span-1 flex flex-col gap-6">
          {items.map((item, idx) => (
            <motion.button
              key={item.title}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => setSelectedIndex(idx)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`relative flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors ${
                {
                  true: "border-l-4 border-purple-400",
                  false:
                    "border-l-4 border-transparent hover:border-l-4 hover:border-purple-300",
                }[String(selectedIndex === idx)]
              }`}
            >
              <div className="text-purple-400">{item.icon}</div>
              <span className="font-semibold text-xl">
                {idx + 1}. {item.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
