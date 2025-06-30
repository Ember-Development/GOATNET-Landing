interface ParagraphItemProps {
  text: string;
  index: number;
  originalText: string;
  onLocalChange: (index: number, newText: string) => void;
  onSave: (index: number, newText: string) => void;
  onClear: (index: number) => void;
  onRemove: (index: number) => void;
}

export function ParagraphItem({
  text,
  index,
  originalText,
  onLocalChange,
  onSave,
  onClear,
  onRemove,
}: ParagraphItemProps) {
  return (
    <div className="space-y-2 border border-white/20 rounded-lg p-4">
      <textarea
        value={text}
        onChange={(e) => onLocalChange(index, e.target.value)}
        rows={4}
        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={`Paragraph ${index + 1}`}
        required
      />

      <div className="flex gap-4 text-sm">
        {text !== originalText && (
          <button
            type="button"
            onClick={() => onSave(index, text)}
            className="text-green-400 hover:text-green-200"
          >
            Save
          </button>
        )}
        {text !== originalText && (
          <button
            type="button"
            onClick={() => onClear(index)}
            className="text-purple-400 hover:text-purple-200"
          >
            Revert
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-400 hover:text-red-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
