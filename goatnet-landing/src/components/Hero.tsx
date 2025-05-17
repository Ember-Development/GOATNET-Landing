import { motion } from "framer-motion";
import heroVideo from "../assets/videos/goatvideo.mp4";
import OverlayCTA from "./ui/overlayCTA";

export default function Hero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Animated Background Video */}
      <motion.video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Ambient Gradient Glow Layer */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-700/20 via-blue-500/10 to-transparent animate-pulse pointer-events-none" />

      {/* Overlay Content */}
      <OverlayCTA />
    </section>
  );
}
