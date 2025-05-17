import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold font-['Inter',sans-serif] text-white"
        >
          Greatness isn’t a destination. It’s a journey.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 font-['Inter',sans-serif]"
        >
          Whether you’re an organization or an individual, your story is
          powerful and a key to ascending effectively.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
            }}
            className="group relative inline-flex items-center px-8 py-3 font-semibold font-['Inter',sans-serif] text-sm uppercase tracking-wide text-white rounded-full bg-transparent border border-gray-500 transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-purple-600/40"
          >
            Introduce Yourself
            <span
              className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(147,51,234,0.6), transparent 70%)",
              }}
            />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
            }}
            className="inline-flex items-center px-8 py-3 font-semibold font-['Inter',sans-serif] text-sm uppercase tracking-wide text-gray-300 rounded-full border border-gray-600 transition hover:text-white hover:border-white focus:outline-none focus:ring-4 focus:ring-gray-600/40"
          >
            Learn About CRDNTL
          </motion.button>
        </div>
      </div>
    </section>
  );
}
