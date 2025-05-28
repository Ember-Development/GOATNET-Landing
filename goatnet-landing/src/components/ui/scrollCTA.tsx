import { motion } from "framer-motion";
import Goat from "../../assets/images/goat.png";

const container = {
  hidden: { opacity: 0, y: -15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0 },
};

export default function ScrollCTA() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="hidden md:block fixed top-[1px] left-0 w-full z-40 bg-black/60 backdrop-blur-md px-2 md:px-4 py-2 shadow"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-4 w-full">
        {/* Logo + Message */}
        <motion.div
          variants={item}
          className="flex items-center flex-1 gap-6 text-center md:text-left"
        >
          <img
            src={Goat}
            alt="GOATNET Logo"
            width={150}
            className="h-6 md:h-6 mr-2"
          />
          <div>
            <p className="text-xs md:text-sm text-neutral-300">
              Subscribe for the latest updates.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={item}
          className="flex items-center bg-[#131314] border border-neutral-600 rounded-full overflow-hidden px-2 py-1 w-full max-w-sm"
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-xs"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 rounded-full text-white italic font-medium uppercase text-xs tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
