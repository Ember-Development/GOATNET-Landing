import { useState, type JSX } from "react";
import GoatLogoVideo from "../assets/videos/goatanimation.mov";
import { PlayCircle, Zap, ShoppingBag, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = ["Storytelling", "Innovation", "Community"] as const;
type Tab = (typeof tabs)[number];

interface SolutionItem {
  title: string;
  tag: string;
  desc: string;
  icon: JSX.Element;
}

const solutionsData: Record<Tab, SolutionItem[]> = {
  Storytelling: [
    {
      title: "Narrative",
      tag: "Your Legacy in Motion",
      desc: "Because storytelling is about how it started, how it’s going, what’s in store AND how it’s received. We help you convey narratives that are relevant, capturing pivotal highlights and framing desired updates and ambitions. You’re the interviewee, as are sources you recommend. Assets are organized. Your network forms & grows as you choose.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Social Media",
      tag: "Keep Creative Control",
      desc: "Your existing channels, amplified. Goatnet complements your social media accounts, welcoming the exporting and distribution of content. Whether it’s a single post or a robust catalog, you stay in creative control — building a premium digital footprint and a preferred, first-class search result.",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Newsletter",
      tag: "Stay Connected",
      desc: "Tailored. Opted-in. Consistently engaging. Goatnet’s newsletter tools help you keep your audience informed — whether you're operating solo or as part of a business or team — through curated updates, announcements, and stories worth telling that include calls to action and valuable impressions.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Studio & IP",
      tag: "Your Virtual Director’s Chair",
      desc: "Shape stories with intuitive studio tools. Edit videos, refine graphics, adjust backgrounds, choose soundtracks — and control how, where and when your voice is heard. Podcasts. Pilots. Films. Written works. Goatnet is a launching pad for original IP. Not just finished works, but seeding additional upside.",
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
    },
  ],
  Innovation: [
    {
      title: "Command Post",
      tag: "Your Credential",
      desc: "Profiles are passé. We provide a Credential, a dashboard & overview that’s purposeful & dynamic. Goatnet’s Credential is your interactive digital HQ — a place to showcase work, signal achievements, and share your narrative in a living, breathing format. Showcase attributes, highlights AND interests.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Tech Stack",
      tag: "Adaptive & Custom",
      desc: "In a rapidly evolving tech landscape, Goatnet keeps its enterprise members on the cutting edge. Our adaptive and responsive infrastructure is designed to evolve with emerging technologies. Built for performance and affordable flexibility, leveraging reputable A.I. and community building solutions.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "A.I. Tools & Data",
      tag: "AI-Powered Insights",
      desc: "With advanced A.I. and a dynamic production array, you’re equipped to serve up highlights, emphasize your why and engage visitors with a clear picture. Thoughtful data collection and a professional hub make your content comprehensive and impressive. Stay ahead — and send the best message.",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Web Devlopment",
      tag: "Build & Maintain Online",
      desc: "From custom website development to ongoing maintenance, your online presence is strategically mapped and consistently optimized, through both internal and preferred subcontractor offerings. Custom-site development? Great! We build, QA and offer dependable resources for assigned updates.",
      icon: <ShoppingBag className="w-6 h-6 text-purple-400" />,
    },
  ],
  Community: [
    {
      title: "Activations & Pipeline",
      tag: "Elevated Experiences",
      desc: "Whether you're having a content premiere, a camp or fundraising event, Goatnet gives you a way to elevate the experience and leave lasting impressions. Goatnet’s onboarding and metadata-driven activations prioritize a network effect — amplifying reach, relevance and appreciation.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Commerce",
      tag: "Create. Sell. Grow",
      desc: "Turn passion into profit with Goatnet’s built-in commerce tools. Create and sell your own or affiliated products, promote subscriptions, and land brand-aligned sponsorship and affiliate deals that are true to how you’re wired. Furthermore, benefit from the advantages of partner discounts.",
      icon: <PlayCircle className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Empowerment",
      tag: "Goat Giving",
      desc: "Leverage your influence to promote causes that matter. Goatnet encourages giving back, making it easy to enlighten your network about philanthropic initiatives. With great alignments, Goatnet introduces members to existing foundations that are delighted to collaborate and increase advocacy.",
      icon: <Users className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Gatekeeper",
      tag: "Goodbye, Bots",
      desc: "Designed to keep bots and trolls at bay, Goatnet serves as a true gatekeeper, requiring a bot-free environment where trolls lose and quality interactions win. On Goatnet, courtesy is in and toxicity is shown the door. Liking or following is so yesterday. We’d rather herd data than enable angst.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
    },
  ],
};

export default function SolutionsProcess() {
  const [activeTab, setActiveTab] = useState<Tab>("Storytelling");
  const items = solutionsData[activeTab].slice(0, 4);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];

  return (
    <section id="solutions" className="relative py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-22">
        {/* Left: Tabs + 2x2 card grid (50% width) */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedIndex(0);
                }}
                className={`relative text-sm md:text-2xl font-semibold pb-1 ${
                  activeTab === tab ? "text-white" : "text-gray-400"
                }`}
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

          <p className="text-gray-300 font-['Inter',sans-serif] mb-6 max-w-dvw leading-relaxed">
            {activeTab === "Storytelling" &&
              "Share your why & celebrate others like never before. Set the tone, timeless and relevant, on your journey"}
            {activeTab === "Innovation" &&
              "Your online presence should impress. As tech evolves, advancing with it is essential"}
            {activeTab === "Community" &&
              "This is a filtered place, located above the noise. Point is, prioritize greatness & do so considerately "}
          </p>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
            {items.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setSelectedIndex(idx)}
                className={`w-full flex flex-col items-start gap-1 sm:gap-2 p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:outline-none transition ${
                  selectedIndex === idx
                    ? "ring-2 ring-purple-500"
                    : "hover:ring-2 hover:ring-purple-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400">{item.icon}</div>
                  <h3 className="font-semibold text-xs md:text-sm text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-[10px] md:text-xs mt-1">
                  {item.tag}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Only selected solution with video background */}
        <div className="w-full lg:w-1/2 space-y-4 relative h-full">
          {/* Looping video fills background of right pane */}
          <video
            src={GoatLogoVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-100 z-0"
          />

          <div className="relative z-10 pl-4 border-l-2 border-purple-400 bg-black/60 backdrop-blur-[2px] p-4 rounded-lg h-full">
            <p className="text-gray-300 text-xl mb-2">{activeTab} Solutions</p>
            <motion.div
              key={selected.title}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                {selected.title}
              </h3>
              <p className="text-gray-400 text-lg">{selected.desc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
