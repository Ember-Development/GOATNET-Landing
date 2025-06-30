import type { SolutionTab } from "../../types";

interface TabRowProps {
  tabs: SolutionTab[];
  activeTabId: number | null;
  loading: boolean;
  onSelect: (tabId: number) => void;
  onOpenCreateTab: () => void;
  onDeleteTab: (tab: SolutionTab) => void;
}

export default function TabRow({
  tabs,
  activeTabId,
  loading,
  onSelect,
  onOpenCreateTab,
}: TabRowProps) {
  if (loading) {
    return (
      <div className="sticky top-0 z-10 px-6 py-4">
        <span className="text-white/60">Loading tabs…</span>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 px-6 py-4 overflow-x-auto whitespace-nowrap border-b border-white/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`inline-block px-4 py-2 mr-2 rounded-full font-medium transition ${
            activeTabId === tab.id
              ? "bg-white/20 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          }`}
        >
          {tab.name}
        </button>
      ))}
      <button
        onClick={onOpenCreateTab}
        className="inline-block px-4 py-2 mr-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
      >
        + Add Tab
      </button>
    </div>
  );
}
