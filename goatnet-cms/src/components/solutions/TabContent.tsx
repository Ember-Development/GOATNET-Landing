import type { SolutionItem, SolutionTab } from "../../types";
import ItemCard from "./ItemCard";

interface TabContentProps {
  tab: SolutionTab;
  onEditItem: (item: SolutionItem) => void;
  onDeleteItem: (itemId: SolutionItem) => void;
  onOpenCreateItem: (tabId: number) => void;
}

export default function TabContent({
  tab,
  onEditItem,
  onDeleteItem,
  onOpenCreateItem,
}: TabContentProps) {
  const items = tab.items ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isEditing={false}
          onEdit={onEditItem}
          onDelete={() => onDeleteItem(item)}
        />
      ))}

      {/* + Add Item card */}
      <div
        onClick={() => onOpenCreateItem(tab.id)}
        className="flex items-center justify-center bg-gray-800 border border-white/20 rounded-2xl cursor-pointer hover:bg-white/10 transition"
      >
        <span className="text-white/60 text-xl">+ Add Item</span>
      </div>
    </div>
  );
}
