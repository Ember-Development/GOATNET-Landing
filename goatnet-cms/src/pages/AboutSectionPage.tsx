import { useState, type FormEvent } from "react";
import { useAboutSection } from "../hooks/useAboutSection";
import { TextInput } from "../components/ui/TextInput";
import { ParagraphItem } from "../components/ui/ParagraphItem";
import { YouTubePreview } from "../components/ui/YoutubePreview";
import { SaveButton } from "../components/ui/SaveButton";
import { Drawer } from "../components/Drawer";
import { AddParagraphForm } from "../components/about/addParagraphForm";

type DrawerMode = "createParagraph" | null;

export default function AboutSectionPage() {
  const {
    about,
    title,
    setTitle,
    paragraphs,
    youtubeUrl,
    setYoutubeUrl,
    originalTitle,
    originalParagraphs,
    originalYoutubeUrl,
    loading,
    saving,
    saveChanges,
    saveParagraph,
    removeParagraph,
    clearParagraph,
    updateParagraphLocally,
    addParagraph,
  } = useAboutSection();

  const [drawer, setDrawer] = useState<DrawerMode>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveChanges();
  };

  const handleAddParagraph = (text: string) => {
    addParagraph(text);
    setDrawer(null);
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <span className="text-white/70">Loading…</span>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="text-center text-red-400">No About section found.</div>
    );
  }

  return (
    <div className="flex h-full">
      <div
        className={`flex-1 transition-[margin] duration-300 ease-in-out ${
          drawer ? "mr-[400px]" : "mr-0"
        }`}
      >
        <div className="pb-12 space-y-8 max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-8 pb-12">
            <TextInput
              id="aboutTitle"
              label="Section Title"
              value={title}
              setValue={setTitle}
              originalValue={originalTitle}
              placeholder="About Us"
              required
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-white/80">
                  Paragraphs
                </h2>
                <button
                  type="button"
                  onClick={() => setDrawer("createParagraph")}
                  className="text-sm text-purple-400 hover:text-purple-200"
                >
                  + Add Paragraph
                </button>
              </div>

              {paragraphs.map((text, i) => (
                <ParagraphItem
                  key={i}
                  text={text}
                  index={i}
                  originalText={originalParagraphs[i] ?? ""}
                  onLocalChange={updateParagraphLocally}
                  onSave={saveParagraph}
                  onClear={clearParagraph}
                  onRemove={removeParagraph}
                />
              ))}
            </div>

            <div>
              <TextInput
                id="youtubeUrl"
                label="YouTube Embed URL"
                value={youtubeUrl}
                setValue={setYoutubeUrl}
                originalValue={originalYoutubeUrl}
                placeholder="https://www.youtube.com/watch?v=xxxxx"
                type="url"
              />
              <YouTubePreview url={youtubeUrl} />
            </div>

            <SaveButton saving={saving} />
          </form>
        </div>
      </div>

      <Drawer
        isOpen={drawer === "createParagraph"}
        onClose={() => setDrawer(null)}
        title="New Paragraph"
      >
        <AddParagraphForm
          onAdd={handleAddParagraph}
          onCancel={() => setDrawer(null)}
        />
      </Drawer>
    </div>
  );
}
