import { motion } from "framer-motion";
import OverlayCTA from "./ui/overlayCTA";
import { useHeroSection } from "../hooks/useHero";

export default function Hero() {
  const { hero } = useHeroSection();

  // Video URL
  const base = import.meta.env.VITE_API_IMAGE_URL;
  const desktopSrc =
    hero && hero.desktopVideoUrl
      ? hero.desktopVideoUrl.startsWith("http")
        ? hero.desktopVideoUrl
        : `${base}${hero.desktopVideoUrl}`
      : "";
  const mobileSrc =
    hero && hero.mobileVideoUrl
      ? hero.mobileVideoUrl.startsWith("http")
        ? hero.mobileVideoUrl
        : `${base}${hero.mobileVideoUrl}`
      : "";

  if (!hero) {
    return null;
  }

  return (
    <section className="relative w-screen overflow-hidden bg-black text-white flex items-center justify-center">
      <div className="h-[100vh] w-full aspect-[1/1] md:aspect-[5/4] relative">
        {/* Desktop Video */}
        <motion.video
          src={desktopSrc}
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="hidden md:block w-full h-full object-cover"
        />

        {/* Mobile Video */}
        <motion.video
          src={mobileSrc}
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="block md:hidden w-full h-full object-cover"
        />
      </div>

      {/* Ambient Gradient Glow */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-700/20 via-blue-500/10 to-transparent animate-pulse pointer-events-none" />

      {/* Overlay CTA */}
      <OverlayCTA />
    </section>
  );
}
