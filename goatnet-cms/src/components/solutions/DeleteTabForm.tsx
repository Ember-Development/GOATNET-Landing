import type { SolutionTab } from "../../types";

interface DeleteTabFormProps {
  tab: SolutionTab;
  onCancel: () => void;
  onConfirm: (tabId: number) => Promise<void>;
  isDeleting: boolean;
}

export default function DeleteTabForm({
  tab,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteTabFormProps) {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-white">
        Delete Tab "{tab.name}"?
      </h2>
      <p className="text-white/70">
        Are you sure you want to permanently delete this tab and all its items?
        This action cannot be undone.
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
          onClick={() => onConfirm(tab.id)}
          disabled={isDeleting}
          className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition ${
            isDeleting ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isDeleting ? "Deleting…" : "Delete Tab"}
        </button>
      </div>
    </div>
  );
}
