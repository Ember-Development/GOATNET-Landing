import type { Attraction } from "../../types";
const API_URL = import.meta.env.VITE_API_IMAGE_URL;

interface Props {
  item: Attraction;
  onEdit: (item: Attraction) => void;
  onDelete: (id: string) => void;
}

export default function ShowcaseItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <div className="group space-y-2">
      <div className="w-3/4 relative pb-[100%] bg-white/10 rounded-lg overflow-hidden shadow-lg">
        <img
          src={`${API_URL}${item.imageUrl}`}
          alt={item.title}
          className="absolute inset-0 w-full h-[100%] object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex space-x-2 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full text-white transition-colors"
            title="Delete"
          >
            🗑
          </button>
        </div>

        {item.description && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white/90 text-sm line-clamp-3">
              {item.description}
            </p>
          </div>
        )}
      </div>

      <div className="text-start space-y-1">
        <span className="inline-block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 uppercase tracking-wide">
          {item.title}
        </span>
        {item.type && (
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            {item.type}
          </p>
        )}
      </div>
    </div>
  );
}
