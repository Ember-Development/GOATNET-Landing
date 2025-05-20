import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProfileImg from "../assets/images/goatnet.jpeg";
import AvatarImg from "../assets/images/dinn.png";
import CredentialImg from "../assets/images/crdntl.png";
import {
  Trophy,
  User,
  Link2,
  Share2,
  Users,
  Zap,
  BarChart2,
  ShoppingCart,
  Gift,
  ChevronUp,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CrdntlPage() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const perks = [
    {
      icon: Trophy,
      text: "GOAT POD Interview w/ customized social and long-form assets",
    },
    { icon: User, text: "Your choice of Avatars" },
    {
      icon: Link2,
      text: "Connect approved social accounts and preexisting content",
    },
    { icon: Share2, text: "See & Share Great Content" },
    { icon: Users, text: "G-List Channels & Members" },
    { icon: Zap, text: "Participate in an Attraction" },
    { icon: BarChart2, text: "Add “By The Numbers” data" },
    { icon: ShoppingCart, text: "Set up shop on SuperGoods" },
    { icon: Gift, text: "Experiences & Partner Discounts" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <section className="relative h-screen flex items-center justify-center">
        <img
          src={ProfileImg}
          alt="CRDNTL vibe"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          className="relative text-center px-4"
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Inter',sans-serif] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              The CRDNTL
            </span>
          </h1>
          <p className="text-lg md:text-xl font-['Inter',sans-serif] max-w-2xl mx-auto">
            Your ultimate command post for media & brand development. Now in
            BETA, launching early 2025.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-6 py-3 font-['Inter',sans-serif] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold uppercase transition-transform hover:scale-105"
          >
            Back to Home
          </Link>
        </motion.div>
      </section>

      {/* Intro Copy Styled */}
      <section className="py-12 px-6 md:px-12">
        <motion.div
          className="max-w-3xl mx-auto border-l-4 border-purple-500  pl-6 space-y-6 italic font-['Inter',sans-serif] text-gray-200"
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <p>
            In setting the foundation for a Greatness-themed ecosystem, we were
            fully aware that the best role models in the world aren’t
            necessarily famous.
          </p>
          <p>
            So we didn’t design profiles like any others. We aimed higher,
            inventing the CRDNTL – showcasing stories & attributes of every
            verified Goatnet member & guest.
          </p>
          <p>
            Household names? They’re everyday GOATs & GOATs next door, united in
            greatness shared & in the making.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={fadeIn} className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-xl">
              <img
                src={AvatarImg}
                alt="Custom Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold font-['Inter',sans-serif]">
              Customizable Avatar
            </h3>
            <p className="mt-2 text-center text-gray-300 font-['Inter',sans-serif]">
              Make your mark with a bespoke profile image.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col items-center">
            <div className="w-72 h-48 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={CredentialImg}
                alt="Credential Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold font-['Inter',sans-serif]">
              Verified CRDNTL Card
            </h3>
            <p className="mt-2 text-center text-gray-300 font-['Inter',sans-serif]">
              Your official Goatnet credential—trusted and shareable.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-['Inter',sans-serif] font-extrabold gradient-text text-center mb-8">
          Perks of CRDNTL Membership
        </h2>
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {perks.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              className="flex flex-col p-6 bg-gray-700/50 backdrop-blur-md rounded-2xl hover:bg-gray-700/60 transition-all"
              variants={fadeIn}
            >
              <Icon className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-base font-medium text-white leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {showTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg hover:scale-110 focus:outline-none"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
