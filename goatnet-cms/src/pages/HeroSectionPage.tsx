import { useState, type FormEvent } from "react";
import { useHeroSection } from "../hooks/useHeroSection";
import { TabButton } from "../components/ui/TabButton";
import { DesktopTab } from "../components/hero/DesktopTab";
import { MobileTab } from "../components/hero/MobileTab";

export default function HeroSectionPage() {
  const {
    hero,
    desktopUrl,
    setDesktopUrl,
    desktopFile,
    setDesktopFile,
    mobileUrl,
    setMobileUrl,
    mobileFile,
    setMobileFile,
    originalDesktopUrl,
    originalMobileUrl,
    loading,
    saving,
    saveChanges,
  } = useHeroSection();

  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveChanges();
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <span className="text-white/70">Loading…</span>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="text-center text-red-400">No Hero section found.</div>
    );
  }

  return (
    <div>
      <nav className="flex border-b border-white/20">
        <TabButton
          isActive={activeTab === "desktop"}
          onClick={() => setActiveTab("desktop")}
        >
          Desktop
        </TabButton>
        <TabButton
          isActive={activeTab === "mobile"}
          onClick={() => setActiveTab("mobile")}
        >
          Mobile
        </TabButton>
      </nav>

      <div className="p-8 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {activeTab === "desktop" && (
            <DesktopTab
              desktopVideoUrl={desktopUrl}
              setDesktopVideoUrl={setDesktopUrl}
              desktopFile={desktopFile}
              setDesktopFile={setDesktopFile}
              originalDesktopUrl={originalDesktopUrl}
            />
          )}

          {activeTab === "mobile" && (
            <MobileTab
              mobileVideoUrl={mobileUrl}
              setMobileVideoUrl={setMobileUrl}
              mobileFile={mobileFile}
              setMobileFile={setMobileFile}
              originalMobileUrl={originalMobileUrl}
            />
          )}

          <button
            type="submit"
            disabled={saving}
            className={`
              w-full flex justify-center items-center gap-2
              ${saving ? "opacity-60 cursor-not-allowed" : ""}
              bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90
              text-white font-semibold py-3 rounded-lg transition
            `}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
