import type { Partner } from "../../types";

export function PartnerPreview({ name, imageUrl, link }: Partner) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-48 sm:w-56 lg:w-64 flex flex-col items-center"
    >
      <div className="snap-start flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 sm:p-6 hover:scale-105 transition-transform min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
        <img
          src={imageUrl}
          alt={name}
          className="h-16 sm:h-20 object-contain mb-3 sm:mb-4 rounded-md"
        />
      </div>
      <span className="mt-3 text-white font-semibold text-center text-sm">
        {name}
      </span>
    </a>
  );
}
