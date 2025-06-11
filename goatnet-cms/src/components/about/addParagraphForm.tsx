import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

interface AddParagraphFormProps {
  onAdd: (text: string) => void;
  onCancel: () => void;
}

export function AddParagraphForm({ onAdd, onCancel }: AddParagraphFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      toast.error("Paragraph cannot be empty");
      return;
    }
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="newParagraphDrawer"
          className="block text-sm font-medium text-white/80 mb-1"
        >
          Paragraph Text
        </label>
        <textarea
          id="newParagraphDrawer"
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          rows={6}
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your new paragraph here…"
          required
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
          className="px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold rounded-lg transition"
        >
          Add Paragraph
        </button>
      </div>
    </form>
  );
}
