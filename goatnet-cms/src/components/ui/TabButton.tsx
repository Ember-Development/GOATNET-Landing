interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-center font-medium ${
        isActive
          ? "border-b-2 border-purple-500 text-white"
          : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
