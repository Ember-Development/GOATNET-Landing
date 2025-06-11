import type { SolutionItem } from "../../types";

interface ItemCardProps {
  item: SolutionItem;
  isEditing: boolean;
  onEdit: (item: SolutionItem) => void;
  onDelete: (itemId: number) => void;
  children?: React.ReactNode;
}

export default function ItemCard({
  item,
  isEditing,
  onEdit,
  onDelete,
  children,
}: ItemCardProps) {
  return (
    <div className="relative bg-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl group">
      {isEditing ? (
        // The parent SolutionsPage will render <ItemForm> in place of children
        <>{children}</>
      ) : (
        <>
          <h4 className="text-lg font-medium text-white">{item.title}</h4>
          <p className="text-purple-400 text-sm mt-1">{item.tag}</p>
          <p className="text-white/70 mt-4 text-sm">{item.description}</p>

          {/* Hover‐only controls */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => onEdit(item)}
              className="mr-2 p-1 bg-white/10 hover:bg-white/20 text-white rounded-md"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              🗑
            </button>
          </div>
        </>
      )}
    </div>
  );
}
