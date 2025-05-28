import { motion } from "framer-motion";
import heroVideoDesktop from "../assets/videos/goatnetv2.mp4";
import heroVideoMobile from "../assets/videos/GoatnetVert.mp4";
import OverlayCTA from "./ui/overlayCTA";

export default function Hero() {
  return (
    <section className="relative w-screen overflow-hidden bg-black text-white flex items-center justify-center">
      <div className="h-[100vh] w-full aspect-[1/1] md:aspect-[5/4] relative">
        {/* Desktop Video */}
        <motion.video
          src={heroVideoDesktop}
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
          src={heroVideoMobile}
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
