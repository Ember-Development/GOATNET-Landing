interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <aside className="fixed top-0 right-0 h-full w-[400px] bg-white/5 backdrop-blur-2xl border-l border-white/20 z-30 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/20">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white">
          ✕
        </button>
      </header>
      <div className="p-6 flex-1 overflow-y-auto">{children}</div>
    </aside>
  );
}
