import React, { useState, useEffect } from "react";

interface ItemFormProps {
  mode: "create" | "edit";
  initialTitle?: string;
  initialTag?: string;
  initialDescription?: string;
  onCancel: () => void;
  onSubmit: (title: string, tag: string, description: string) => void;
  isSubmitting: boolean;
}

export default function ItemForm({
  mode,
  initialTitle = "",
  initialTag = "",
  initialDescription = "",
  onCancel,
  onSubmit,
  isSubmitting,
}: ItemFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [tag, setTag] = useState(initialTag);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setTitle(initialTitle);
    setTag(initialTag);
    setDescription(initialDescription);
  }, [initialTitle, initialTag, initialDescription]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(title.trim(), tag.trim(), description.trim());
      }}
      className="space-y-6 p-6"
    >
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Tag
        </label>
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className={`px-4 py-2 bg-gradient-to-r ${
            mode === "create"
              ? "from-green-600 to-green-500"
              : "from-purple-600 to-indigo-600"
          } text-white font-semibold rounded-lg transition ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating…"
              : "Saving…"
            : mode === "create"
            ? "Create Item"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
