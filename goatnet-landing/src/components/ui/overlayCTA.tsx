import { motion } from "framer-motion";
import GoatCard from "../../assets/images/goatcard.png";

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function OverlayCTA() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="absolute bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md px-4 md:px-8 py-6"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-6 gap-x-12 w-full">
        {/* Logo */}
        <motion.div variants={item} className="flex-shrink-0">
          <img
            src={GoatCard}
            alt="GOATNET Logo"
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        {/* Text Block */}
        <motion.div
          variants={item}
          className="flex-1 text-center md:text-left space-y-1"
        >
          <h1 className="text-2xl md:text-4xl font-bold font-['Inter',sans-serif] text-neutral-200 uppercase ">
            Welcome to Goatnet
          </h1>
          <p className="text-base font-['Inter',sans-serif] text-neutral-300 max-w-md">
            Where the pursuit of greatness finds its home.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={item}
          className="flex items-center bg-[#131314] border border-neutral-500 rounded-full overflow-hidden px-4 py-2 w-full max-w-lg shadow-md"
        >
          {/* Email Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.877 1.778l-7.5 5.625a2.25 2.25 0 01-2.646 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75"
            />
          </svg>

          {/* Input */}
          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 bg-transparent text-white font-['inter'] placeholder-gray-400 focus:outline-none"
          />

          {/* Button with glow */}
          <div className="relative ml-3 group">
            {/* Glow Layer */}
            <div
              className="absolute inset-0 z-0 rounded-full blur-[5px] opacity-80 group-hover:opacity-100 transition"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
              }}
            ></div>

            {/* Button */}
            <button
              type="submit"
              className="relative z-10 px-6 py-2 rounded-full text-white font-bold font-['inter'] italic uppercase text-sm leading-none bg-[#0b0a0b] transition-transform group-hover:scale-105"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 0 0, #00bdf3, #2b66bc 24%, #2b45a3 51%, #6928c5 74%, #9200cb)",
                backgroundClip: "padding-box",
              }}
            >
              Subscribe
            </button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
