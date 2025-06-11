import type { SolutionItem } from "../../types";

interface DeleteItemFormProps {
  item: SolutionItem;
  onCancel: () => void;
  onConfirm: (itemId: number) => Promise<void>;
  isDeleting: boolean;
}

export default function DeleteItemForm({
  item,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteItemFormProps) {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-white">
        Delete "{item.title}"?
      </h2>
      <p className="text-white/70">
        Are you sure you want to permanently delete this item? This action
        cannot be undone.
      </p>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white/60 hover:text-white"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(item.id)}
          disabled={isDeleting}
          className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition ${
            isDeleting ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isDeleting ? "Deleting…" : "Delete Item"}
        </button>
      </div>
    </div>
  );
}
