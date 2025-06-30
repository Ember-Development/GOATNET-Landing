interface TabSwitcherProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-white/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex-1 py-3 text-center font-medium transition
            ${
              activeTab === tab.id
                ? "border-b-2 border-purple-500 text-white"
                : "text-white/60 hover:text-white"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
