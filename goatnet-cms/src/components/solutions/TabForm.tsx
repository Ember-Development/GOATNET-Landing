import { useState, useEffect } from "react";

interface TabFormProps {
  mode: "create" | "edit";
  initialName?: string;
  initialTagline?: string;
  onCancel: () => void;
  onSubmit: (name: string, tagline: string) => void;
  isSubmitting: boolean;
}

export default function TabForm({
  mode,
  initialName = "",
  initialTagline = "",
  onCancel,
  onSubmit,
  isSubmitting,
}: TabFormProps) {
  const [name, setName] = useState(initialName);
  const [tagline, setTagline] = useState(initialTagline);

  useEffect(() => {
    setName(initialName);
    setTagline(initialTagline);
  }, [initialName, initialTagline]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name.trim(), tagline.trim());
      }}
      className="space-y-6 p-6"
    >
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Tab Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Tagline
        </label>
        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          required
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white/60 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg transition ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating…"
              : "Saving…"
            : mode === "create"
            ? "Create Tab"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
