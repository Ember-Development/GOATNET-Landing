import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCredentials, type Credential } from "../hooks/useCredentials";
import { usePartners, type PartnerItem } from "../hooks/usePartners";
import { CredentialPreview } from "../components/ui/CredentialCard";
import Skeleton from "./ui/skelton";

interface MemberProps {
  onOpenModal: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Members({ onOpenModal }: MemberProps) {
  const peopleRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  // Fetch credentials
  const {
    data: credentialsData,
    loading: credsLoading,
    error: credsError,
  } = useCredentials();

  // Fetch partners
  const {
    data: partnersData,
    loading: partnersLoading,
    error: partnersError,
  } = usePartners();

  // Scroll helper
  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: "left" | "right"
  ) => {
    const container = ref.current;
    if (!container) return;
    container.scrollBy({
      left:
        dir === "left"
          ? -container.offsetWidth * 0.8
          : container.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  let credentials: Credential[] = [];
  if (credentialsData) {
    credentials = credentialsData;
  }

  // partners to show (sorted by `order`)
  let partners: PartnerItem[] = [];
  if (partnersData) {
    partners = partnersData.slice().sort((a, b) => {
      const aOrder = a.order ?? Number.POSITIVE_INFINITY;
      const bOrder = b.order ?? Number.POSITIVE_INFINITY;
      return aOrder - bOrder;
    });
  }

  return (
    <section
      id="credentials"
      className="relative bg-black py-10 md:py-15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mb-4 sm:mb-6 flex items-center justify-between"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Credentials
          </h2>
          <button
            onClick={onOpenModal}
            className="px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-sm sm:text-base text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            Join Waitlist
          </button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base"
        >
          Goatnet has Guest, Select & Goat memberships with tiered status.
          Public launch coming soon. Sign up and stay in the loop for key
          milestones.
        </motion.p>

        {/* ════ CREDENTIALS CAROUSEL ════ */}
        {credsLoading ? (
          <div className="relative mb-12 sm:mb-24">
            <div className="flex space-x-3 sm:space-x-4 overflow-hidden py-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="min-w-[140px] sm:min-w-[200px]">
                  <Skeleton height="h-32 sm:h-40 w-full rounded-lg" />
                  <Skeleton height="h-4 w-3/4 mx-auto mt-2" />
                </div>
              ))}
            </div>
          </div>
        ) : credsError ? (
          <div className="py-10 flex justify-center">
            <span className="text-red-400">{credsError}</span>
          </div>
        ) : credentials.length === 0 ? (
          <div className="py-10 flex justify-center">
            <span className="text-gray-400">No credentials to show.</span>
          </div>
        ) : (
          <div className="relative mb-12 sm:mb-24">
            <button
              onClick={() => scroll(peopleRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={() => scroll(peopleRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div
              ref={peopleRef}
              className="flex space-x-3 sm:space-x-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2"
            >
              {credentials.map((c) => {
                const fullImageUrl = c.imageUrl?.startsWith("http")
                  ? c.imageUrl
                  : `${import.meta.env.VITE_API_IMAGE_URL}${c.imageUrl}`;

                return (
                  <CredentialPreview
                    key={c.id}
                    name={c.name ?? "Unknown"}
                    imageUrl={fullImageUrl}
                    link={c.link ?? undefined}
                    className="bg-white/10 backdrop-blur-lg border border-white/20"
                  />
                );
              })}
            </div>
          </div>
        )}

        <motion.div
          id="partners"
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mb-4 sm:mb-6 flex items-center justify-between"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Partners
          </h2>
          <a
            href="mailto:people@goatnet.com?subject=Partnership Inquiry&body=Hi Goatnet team,"
            className="px-4 py-1 sm:px-6 sm:py-2 border border-white/30 text-sm sm:text-base text-white font-semibold rounded-full hover:bg-white/10 transition"
          >
            Contact Us
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base"
        >
          We offer flexible models based on goals and needs, including
          shared-cost approaches with buy-in strategies involving sponsors,
          boosters and external networks.
        </motion.p>

        {/* ════ PARTNERS CAROUSEL ════ */}
        {partnersLoading ? (
          <div className="relative mb-12 sm:mb-24">
            <div className="flex space-x-3 sm:space-x-4 overflow-hidden py-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="snap-start flex flex-col items-center min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]"
                >
                  <Skeleton height="h-16 sm:h-20 w-full rounded-md mb-3 sm:mb-4" />
                  <Skeleton height="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ) : partnersError ? (
          <div className="py-10 flex justify-center">
            <span className="text-red-400">{partnersError}</span>
          </div>
        ) : partners.length === 0 ? (
          <div className="py-10 flex justify-center">
            <span className="text-gray-400">No partners to show.</span>
          </div>
        ) : (
          <div className="relative mb-12 sm:mb-24">
            <button
              onClick={() => scroll(partnersRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={() => scroll(partnersRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div
              ref={partnersRef}
              className="flex space-x-3 sm:space-x-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2"
            >
              {partners.map((p) => {
                const fullImageUrl = p.imageUrl?.startsWith("http")
                  ? p.imageUrl
                  : `${import.meta.env.VITE_API_IMAGE_URL}${p.imageUrl}`;

                return (
                  <a
                    key={p.id}
                    href={p.link ?? "#"}
                    target={p.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="snap-start flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 sm:p-6 hover:scale-105 transition-transform min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]"
                  >
                    {fullImageUrl ? (
                      <img
                        src={fullImageUrl}
                        alt={p.name}
                        className="h-16 sm:h-20 object-contain mb-3 sm:mb-4 rounded-md"
                      />
                    ) : (
                      <div className="w-full h-16 sm:h-20 bg-gray-700 flex items-center justify-center rounded-md mb-3 sm:mb-4">
                        <span className="text-gray-300 text-sm text-center px-2">
                          {p.name}
                        </span>
                      </div>
                    )}
                    <span className="mt-3 text-white font-semibold text-center text-sm">
                      {p.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
