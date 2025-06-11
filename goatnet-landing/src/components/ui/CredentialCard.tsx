import { BadgeCheck } from "lucide-react";
import Card from "../../assets/images/card.png";

export interface CredentialPreviewProps {
  name: string;
  imageUrl: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

export function CredentialPreview({
  name,
  imageUrl,
  link,
  onClick,
  className = "",
}: CredentialPreviewProps) {
  const Inner = (
    <div
      className={`
        relative
        snap-start
        rounded-xl
        overflow-hidden
        shadow-lg
        min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]
        aspect-[3/4]
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div
          className="
            backdrop-blur-sm
            rounded-full
            px-3 py-1
            flex items-center gap-2
          "
        >
          <span className="text-white text-sm font-semibold whitespace-nowrap">
            {name}
          </span>
          <BadgeCheck className="w-5 h-5 text-white flex-shrink-0" />
        </div>
      </div>

      <div className="absolute bottom-13 left-1 flex items-center gap-2">
        <img src={Card} alt="goat card" height={60} width={60} />
      </div>
    </div>
  );

  if (onClick) {
    return Inner;
  }

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {Inner}
      </a>
    );
  }

  return Inner;
}
