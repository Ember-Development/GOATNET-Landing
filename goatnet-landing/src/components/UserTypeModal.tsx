import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export type UserInfo = {
  userType: " a individual" | "an organization" | "a supporter";
  name: string;
  email: string;
  organization?: string;
  newsletter: boolean;
};

export default function UserTypeModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserInfo) => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserInfo>({
    userType: "a supporter",
    name: "",
    email: "",
    newsletter: false,
  });

  const next = () => setStep((s) => Math.min(2, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const change = (field: keyof UserInfo, value: any) =>
    setData((d) => ({ ...d, [field]: value }));

  const steps = [
    /* 0: select type */
    <div className="space-y-8 text-center px-6">
      <h2 className="text-2xl font-bold text-white">I am…</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([" a individual", "an organization", "a supporter"] as const).map(
          (t) => (
            <button
              key={t}
              onClick={() => change("userType", t)}
              className={`px-4 py-3 rounded-lg border-2 text-white transition ${
                data.userType === t
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-white/20 hover:border-purple-400"
              }`}
            >
              {t.charAt(0) + t.slice(1)}
            </button>
          )
        )}
      </div>
      <button
        onClick={next}
        className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition"
      >
        Next
      </button>
    </div>,

    /* 1: details */
    <div className="space-y-4 px-6">
      <h2 className="text-2xl font-bold text-white text-center">
        Tell us about yourself
      </h2>
      <input
        type="text"
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => change("name", e.target.value)}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      {data.userType === "an organization" && (
        <input
          type="text"
          placeholder="Organization Name"
          value={data.organization ?? ""}
          onChange={(e) => change("organization", e.target.value)}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}
      <input
        type="email"
        placeholder="Email Address"
        value={data.email}
        onChange={(e) => change("email", e.target.value)}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <label className="inline-flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={data.newsletter}
          onChange={(e) => change("newsletter", e.target.checked)}
          className="h-5 w-5 text-purple-500 bg-white/10 border border-white/20 rounded focus:ring-purple-500"
        />
        Join our newsletter
      </label>
      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          className="text-gray-300 hover:text-white transition"
        >
          ← Back
        </button>
        <button
          onClick={next}
          disabled={!data.name || !data.email}
          className={`px-6 py-2 rounded-full text-white transition ${
            data.name && data.email
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>,

    /* 2: confirmation */
    <div className="space-y-6 text-center px-6">
      <CheckCircle className="mx-auto w-12 h-12 text-green-400" />
      <h2 className="text-2xl font-bold text-white">All set!</h2>
      <p className="text-gray-300">
        You’ll hear from us soon. Thanks for joining Goatnet!
      </p>
      <button
        onClick={() => {
          onSubmit(data);
          onClose();
          setStep(0);
          setData({
            userType: "a supporter",
            name: "",
            email: "",
            newsletter: false,
          });
        }}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90 transition"
      >
        Finish
      </button>
    </div>,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-opacity-80 backdrop-blur-lg border border-white/10 rounded-3xl max-w-lg md:max-w-2xl lg:max-w-2xl w-full overflow-hidden shadow-2xl ring-1 ring-white/20"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* top accent stripe */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600" />

            {/* close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* step content */}
            <div className="pt-10 pb-8">{steps[step]}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
