// src/components/showcase/ShowcaseGrid.tsx
import ShowcaseItemCard from "./ShowcaseItemCard";
import type { Attraction } from "../../types";

interface Props {
  items: Attraction[];
  onEdit: (item: Attraction) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export default function ShowcaseGrid({
  items,
  onEdit,
  onDelete,
  onAddNew,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pb-12">
      <div
        onClick={onAddNew}
        className="flex w-3/4 h-[88%] items-center justify-center cursor-pointer bg-white/5 border-2 border-dashed border-white/20 hover:border-white/40 rounded-lg transition-all
                  duration-200 group hover:bg-white/10"
      >
        <div className="text-center">
          <div className="text-4xl text-white/40 group-hover:text-white/60 transition-colors duration-200 mb-2">
            +
          </div>
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-200">
            Add Showcase
          </p>
        </div>
      </div>
      {items.map((item) => (
        <ShowcaseItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {/* “+ Add New” card */}
    </div>
  );
}
