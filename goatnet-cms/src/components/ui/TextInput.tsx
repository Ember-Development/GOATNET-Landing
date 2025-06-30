interface TextInputProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  originalValue: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "url";
}

export function TextInput({
  id,
  label,
  value,
  setValue,
  originalValue,
  placeholder,
  required = false,
  type = "text",
}: TextInputProps) {
  const hasChanged = value !== originalValue;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-white/80 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
        required={required}
      />
      {hasChanged && (
        <button
          type="button"
          onClick={() => setValue(originalValue)}
          className="mt-2 text-sm text-purple-400 hover:text-purple-200"
        >
          Clear to original
        </button>
      )}
    </div>
  );
}
