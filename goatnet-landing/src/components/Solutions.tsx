// src/components/Solutions.tsx
import { useState } from "react";
import GoatLogoVideo from "../assets/videos/goatanimation.mov";
import { Zap } from "lucide-react"; // Defaulting everything to Zap for now
import { motion } from "framer-motion";
import {
  useSolutions,
  type TabObjectFromServer,
  type ApiSolutionItemFromServer,
} from "../hooks/useSolutions";
import Skeleton from "./ui/skelton";

const tabs = ["Storytelling", "Innovation", "Community"] as const;
type Tab = (typeof tabs)[number];

// Since the API doesn’t send an "icon" property yet, we’ll default to <Zap /> here:
const defaultIcon = <Zap className="w-6 h-6 text-purple-400" />;

export default function SolutionsProcess() {
  // 1) Fetch the array of tab objects
  const { data, loading, error } = useSolutions();

  // 2) Track which tab is active (default to "Storytelling")
  const [activeTab, setActiveTab] = useState<Tab>("Storytelling");
  // 3) Track which item index is selected within that tab
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // 4) Loading state
  if (loading) {
    return (
      <section className="relative py-5 md:py-15 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Tabs Skeleton */}
            <div className="flex gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height="h-8 w-32" />
              ))}
            </div>

            {/* Tagline Skeleton */}
            <div className="space-y-2">
              <Skeleton height="h-4 w-full" />
              <Skeleton height="h-4 w-2/3" />
            </div>

            {/* Grid of cards Skeleton */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 md:p-6 space-y-3 bg-gray-800 rounded-xl animate-pulse"
                >
                  <Skeleton height="h-6 w-1/2" />
                  <Skeleton height="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Video + Overlay Skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-gray-800 animate-pulse">
              {/* Overlay text Skeleton */}
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 space-y-3">
                <Skeleton height="h-6 w-1/3" />
                <Skeleton height="h-8 w-2/3" />
                <Skeleton height="h-4 w-full" />
                <Skeleton height="h-4 w-4/5" />
                <Skeleton height="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 5) Error or no data state
  if (error || !data) {
    return (
      <section className="py-20 bg-black text-white flex justify-center items-center">
        <span className="text-lg text-red-400">
          {error || "No solutions data found."}
        </span>
      </section>
    );
  }

  // 6) Find the TabObjectFromServer whose `name` matches activeTab
  const currentTabObj: TabObjectFromServer | undefined = data.find(
    (tabObj) => tabObj.name === activeTab
  );

  // If we didn’t find a matching tab object in the response, fall back to an empty list
  const allItemsForTab: ApiSolutionItemFromServer[] =
    currentTabObj?.items || [];

  // Show up to 4 items at once
  const itemsToShow = allItemsForTab.slice(0, 4);

  // If itemsToShow is empty, selectedItem will be undefined
  const selectedItem: ApiSolutionItemFromServer | undefined =
    itemsToShow[selectedIndex];

  return (
    <section
      id="solutions"
      className="relative py-5 md:py-15 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-12 items-start">
        {/* ─────── LEFT COLUMN: Tabs + Grid of small cards ─────── */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          {/* Tab Buttons */}
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedIndex(0);
                }}
                className={`relative text-base md:text-2xl font-semibold pb-1 transition ${
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

          {/* Tab tagline (from currentTabObj.tagline, or fallback) */}
          <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-xl">
            {currentTabObj?.tagline ??
              {
                Storytelling:
                  "Share your why & celebrate others like never before. Set the tone, timeless and relevant, on your journey.",
                Innovation:
                  "Your online presence should impress. As tech evolves, advancing with it is essential.",
                Community:
                  "This is a filtered place, located above the noise. Point is, prioritize greatness & do so considerately.",
              }[activeTab]}
          </p>

          {/* Grid of up-to-4 solution “cards” */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {itemsToShow.map((item, idx) => (
              <motion.button
                key={item.title}
                onClick={() => setSelectedIndex(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={`w-full flex flex-col items-start gap-2 p-4 md:p-6 rounded-2xl border backdrop-blur-md transition ${
                  selectedIndex === idx
                    ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black shadow-lg shadow-purple-400/20 bg-white/10 border-white/30"
                    : "hover:ring-2 hover:ring-purple-300 bg-white/5 border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400">{defaultIcon}</div>
                  <h3 className="font-semibold text-sm md:text-base text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-xs md:text-sm">{item.tag}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ─────── RIGHT COLUMN: Video + Overlay + Description ─────── */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-2xl shadow-2xl border border-white/10">
            {/* 1) Video layer (same goat animation) */}
            <video
              src={GoatLogoVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 2) Gradient “reveal” layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-l from-black/20 via-black/50 to-black/80" />
            </div>

            {/* 3) Text content (animated when `selectedItem` changes) */}
            {selectedItem ? (
              <motion.div
                key={selectedItem.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-20 h-full flex flex-col justify-center p-6 md:p-8"
              >
                <p className="text-gray-300 text-lg md:text-xl mb-2">
                  {activeTab} Solutions
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {selectedItem.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {selectedItem.description}
                </p>
              </motion.div>
            ) : (
              <div className="relative z-20 h-full flex items-center justify-center p-6 md:p-8">
                <span className="text-gray-400">No item selected.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
