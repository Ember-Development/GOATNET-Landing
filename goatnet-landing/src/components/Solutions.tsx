import { useRef, useState, type JSX } from "react";
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
      title: "Social",
      desc: "Link existing accounts, distribute Goatnet posts whenever desired & own your catalog.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Narrative",
      desc: "You’re the interviewee, assets are gathered, Your network forms & grows as you choose.",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "Studio",
      desc: "Feature content in varied forms, direct edits, keep creative control.",
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
    },
    {
      title: "Newsletter",
      desc: "Opted-in correspondence, from individuals or groups.",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Intellectual Property",
      desc: "Consume, make or appear in: Podcasts, documentaries, series, films, publications.",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
  ],
  Innovation: [
    {
      title: "Command Post",
      desc: "Profiles are passé. We provide a Credential, a dashboard & overview that’s purposeful & dynamic",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "A.I. & Creator Tools",
      desc: "Thoughtful A.I. integrations, production array showcases attributes, highlights AND interests",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Tech Stack",
      desc: "Adaptive infrastructure for vital details & functionality",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Websites & Maintenance",
      desc: "Custom-site development? Great! We build, QA & update",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
  ],
  Community: [
    {
      title: "Activations",
      desc: "Camps, fundraisers, competitions, premieres: Experience the upside of Goatnet-infused events",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Pipeline",
      desc: "Authentic onboarding & metadata connect dots, accentuating kinship, impact & brand appreciation ",
      icon: <Zap className="w-6 h-6 text-white" />,
    },
    {
      title: "Commerce",
      desc: "Create, sell or buy: Get paid & get deals!",
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Empowerment",
      desc: "Influence in action: Promote giving back",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      title: "Gatekeeper",
      desc: "G-List is how we roll: Hard pass, bots & trolls",
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
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative bg-gradient-to-b from-black via-black/90 to-black py-16 overflow-hidden"
    >
      {/* Decorative background image, full height on the right */}
      <img
        src={GoatNet}
        alt="Goat in the middle"
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
            Storytelling is your greatest marketing, Expensive & slow isn’t for
            everyone.
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
            "Share your why & celebrate others like never before. Set the tone, timeless and relevant, on your journey"}
          {activeTab === "Innovation" &&
            "Your online presence should impress. As tech evolves, advancing with it is essential"}
          {activeTab === "Community" &&
            "This is a filtered place, located above the noise. Point is, prioritize greatness & do so considerately "}
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
