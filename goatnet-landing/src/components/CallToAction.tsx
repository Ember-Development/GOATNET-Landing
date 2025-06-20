import { motion } from "framer-motion";
import { useRef } from "react";

interface CallToActionProps {
  onOpenModal: () => void;
}

export default function CallToAction({ onOpenModal }: CallToActionProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-black py-10 md:py-15 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Greatness isn’t a destination. It’s a journey.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400"
        >
          Whether you’re an organization or an individual, your story is
          powerful and a key to ascending effectively.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            onClick={onOpenModal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
            }}
            className="relative text-center md:inline-flex items-center px-8 py-3 font-semibold text-sm uppercase tracking-wide text-white rounded-full border border-gray-500 hover:border-white hover:bg-white/10 transition"
          >
            Check In
            <span
              className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(147,51,234,0.6), transparent 70%)",
              }}
            />
          </motion.button>

          {/* <MotionLink
            to="/crdntl"
            reloadDocument
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: "spring",
              stiffness: 300,
            }}
            className="inline-flex items-center px-8 py-3 font-semibold text-sm uppercase tracking-wide text-gray-300 rounded-full border border-gray-600 hover:text-white hover:border-white transition"
          >
            Learn About CRDNTL
          </MotionLink> */}
        </div>
      </div>
    </section>
  );
}
