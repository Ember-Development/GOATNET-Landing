interface SaveButtonProps {
  saving: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function SaveButton({
  saving,
  onClick,
  type = "submit",
}: SaveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={saving}
      className={`w-full flex justify-center items-center gap-2 ${
        saving ? "opacity-60 cursor-not-allowed" : ""
      } bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition`}
    >
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}
