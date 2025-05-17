import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Zap, ShoppingBag, Users } from "lucide-react";
import GoatNet from "../assets/images/goatnet.jpeg";

const tabs = ["Storytelling", "Innovation", "Community"] as const;
type Tab = (typeof tabs)[number];

const solutionsData: Record<
  Tab,
  { title: string; desc: string; icon: JSX.Element }[]
> = {
  Storytelling: [
    {
      title: "Watch Originals",
      desc: "Discover series, shorts, and films made to inspire.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Fuel Future Greatness",
      desc: "Your support powers grassroots stories, training, and breakthrough moments.",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "Shop Merch",
      desc: "Rep athletes, teams, and stories that inspire you.",
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
    },
    {
      title: "Join the Community",
      desc: "Go beyond fandom. Share stories, fuel futures, and be part of something that matters.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
  ],
  Innovation: [
    {
      title: "Tech Stack Management",
      desc: "From CMS to hosting, we manage your entire digital infrastructure.",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "Website Creation & Updates",
      desc: "Design, build, and maintain custom websites from scratch or refresh.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Analytics & Insights",
      desc: "Audit your site to identify key improvements and performance boosts.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Centralized Content Platform",
      desc: "Branded CMS to organize, manage, and distribute media across channels.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Tech Consultation & Support",
      desc: "Strategize and build your future‑proof digital presence with expert guidance.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
  ],
  Community: [
    {
      title: "Athlete & Brand Development",
      desc: "Build identity, voice, and visibility through narrative.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Digital Command Post",
      desc: "A central platform for publishing content across channels.",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "Original Content",
      desc: "Short and long‑form video tailored to your audience.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Community & Event Coverage",
      desc: "From live events to grassroots activations, share moments that support growth.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Sponsor & Donor Outreach",
      desc: "Strategic outreach designed to attract partners, new revenue, and business community allies.",
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
    },
  ],
};

// Motion variants
const containerVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Solutions() {
  const [activeTab, setActiveTab] = useState<Tab>("Storytelling");
  const contentList = solutionsData[activeTab] || [];

  return (
    <section className="relative bg-gradient-to-b from-black via-black/90 to-black py-16 overflow-hidden">
      {/* Decorative background image, full height on the right */}
      <img
        src={GoatNet}
        alt=""
        className="absolute top-0 right-0 h-full w-full object-cover opacity-40 pointer-events-none"
      />

      {/* Main content, above the image */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-bold font-['Inter',sans-serif] text-white mb-4"
        >
          Why GOATNET?{" "}
          <span className="font-normal font-['Inter',sans-serif] text-gray-300">
            What we offer you.
          </span>
        </motion.h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 mt-8">
          {tabs.map((tab) =>
            tab === activeTab ? (
              <div key={tab} className="relative group">
                <div
                  className="absolute inset-0 rounded-full blur-[5px] opacity-80 group-hover:opacity-100 transition"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                  }}
                />
                <button
                  onClick={() => setActiveTab(tab)}
                  className="relative font-['Inter',sans-serif] z-10 px-6 py-2 rounded-full text-white font-bold uppercase text-sm bg-[#0b0a0b] transition-transform group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                    backgroundClip: "padding-box",
                  }}
                >
                  {tab}
                </button>
              </div>
            ) : (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="group relative inline-flex items-center px-8 py-2 font-semibold text-sm uppercase tracking-wide text-white rounded-full bg-transparent border border-gray-500 transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-purple-600/40"
              >
                {tab}
                <span
                  className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(147,51,234,0.6), transparent 70%)",
                  }}
                />
              </button>
            )
          )}
        </div>

        <p className="text-gray-400 font-['Inter',sans-serif] text-xl mb-2 max-w-prose leading-relaxed">
          {activeTab === "Storytelling" && "Storytelling - Fuel the movement"}
          {activeTab === "Innovation" && "Innovation - Command the message"}
          {activeTab === "Community" && "Comunity - Create with Impact"}
        </p>

        {/* Subtitle */}
        <p className="text-gray-300 font-['Inter',sans-serif] mb-6 max-w-dvw leading-relaxed">
          {activeTab === "Storytelling" &&
            "Goatnet isn’t just for teams and creators—it’s a destination for fans who believe in something bigger. Watch original films and athlete-driven content that capture the pursuit of greatness. Support rising voices and community programs. Shop exclusive merch that helps fund athletes and grassroots programs. And connect with others who are building greatness from the ground up."}
          {activeTab === "Innovation" &&
            "We go beyond content—we manage the full tech stack that powers it. From building and updating websites to giving you a custom platform  distribution, we centralize your media, simplify workflows, and deliver full-spectrum analytics. Whether you're launching a campaign or leveling up your entire digital footprint, we help you move fast, look sharp, and stay ahead."}
          {activeTab === "Community" &&
            "We co-create highlight reels, branded spots, mini-docs, and athlete-driven narratives—partnering with teams, creators, and brands from concept and storyboarding through production and post. By weaving authentic athlete interviews, dynamic B-roll, we deliver content that recruits talent, inspires fans, and performs across every platform tailored to your mission."}
        </p>

        {/* Glassmorphic Cards Grid */}
        <motion.div
          key={activeTab}
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contentList.map(({ title, desc, icon }) => (
            <motion.div
              key={title}
              variants={itemVar}
              className="relative p-6 rounded-2xl transition-transform transform hover:scale-105
                         bg-white/10 backdrop-blur-3xl backdrop-saturate-150
                         border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.37)]"
              tabIndex={0}
            >
              <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-xl font-semibold font-['Inter',sans-serif] text-white drop-shadow-md">
                  {title}
                </h3>
              </div>
              <p className="text-gray-200 font-['Inter',sans-serif] leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
          {contentList.length === 0 && (
            <div className="col-span-full text-white text-center font-['Inter',sans-serif] py-8">
              No solutions found for "{activeTab}".
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
