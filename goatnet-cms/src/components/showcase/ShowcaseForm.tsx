import { useState, useEffect, type FormEvent } from "react";
import { TabSwitcher } from "../showcase/TabSwitcher";
import { PosterPreview } from "../showcase/PosterPreview";
import type { Attraction } from "../../types";

interface Props {
  mode: "create" | "edit";
  initialData?: Attraction;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (formData: {
    title: string;
    description: string;
    image: File | string;
    videoUrl: string;
    type: string;
    channels: string[];
    showOnLanding: boolean;
    landingOrder?: number;
    studioId: string;
  }) => void;
}

export default function ShowcaseForm({
  mode,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [imageField, setImageField] = useState<File | string>(
    initialData?.imageUrl || ""
  );
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [type, setType] = useState(initialData?.type || "");
  const [channels, setChannels] = useState<string[]>(
    initialData?.channels || []
  );
  const [showOnLanding, setShowOnLanding] = useState(
    initialData?.showOnLanding ?? false
  );
  const [landingOrder, setLandingOrder] = useState<number | undefined>(
    initialData?.landingOrder
  );
  const [studioId, setStudioId] = useState(initialData?.studioId || "");

  // Preview URLs
  const [localImagePreview, setLocalImagePreview] = useState<string>(
    initialData?.imageUrl || ""
  );

  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");

  useEffect(() => {
    setLocalImagePreview(initialData?.imageUrl || "");
    setVideoUrl(initialData?.videoUrl || "");
    setShowOnLanding(initialData?.showOnLanding ?? false);
    setLandingOrder(initialData?.landingOrder);
    setStudioId(initialData?.studioId || "");
  }, [initialData]);

  const allTypes = ["documentary", "trailer", "interview", "highlight"];
  const allChannels = ["sports", "documentary", "history", "motivation"];

  function toggleChannel(ch: string) {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      e.target.value = "";
      return;
    }
    const url = URL.createObjectURL(file);
    setImageField(file);
    setLocalImagePreview(url);
  }

  // Form submit
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      image: imageField,
      videoUrl,
      type,
      channels,
      showOnLanding,
      landingOrder,
      studioId,
    });
  }

  return (
    <div className="flex flex-col h-full">
      <TabSwitcher
        tabs={[
          { id: "info", label: "Information" },
          { id: "preview", label: "Preview" },
        ]}
        activeTab={activeTab}
        onChange={(id: string) => setActiveTab(id as "info" | "preview")}
      />

      <div className="p-6 flex-1 overflow-y-auto">
        {activeTab === "info" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-white/80 mb-1">
                  Poster Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="
                    mt-1 block w-full text-white/60
                    file:mr-4 file:px-4 file:py-2
                    file:bg-white/10 file:border file:border-white/30
                    file:rounded-lg file:text-white hover:file:bg-white/20
                    focus:outline-none
                  "
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Video Embed URL
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://www.youtube.com/embed/…"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="" disabled>
                  Select type…
                </option>
                {allTypes.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Channels
              </label>
              <div className="flex flex-wrap gap-2">
                {allChannels.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => toggleChannel(ch)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      channels.includes(ch)
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {ch.charAt(0).toUpperCase() + ch.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnLanding}
                onChange={(e) => setShowOnLanding(e.target.checked)}
                className="h-4 w-4 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-purple-500"
              />
              <label className="text-sm text-white/80">
                Show on Landing Carousel
              </label>
            </div>

            {showOnLanding && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Landing Order
                </label>
                <input
                  type="number"
                  value={landingOrder ?? ""}
                  onChange={(e) =>
                    setLandingOrder(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                  className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter integer order"
                  required
                />
              </div>
            )}

            <div className="hidden">
              <input
                type="text"
                value={studioId}
                onChange={(e) => setStudioId(e.target.value)}
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
                disabled={isSubmitting}
                className={`px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold rounded-lg transition ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? mode === "create"
                    ? "Creating…"
                    : "Saving…"
                  : mode === "create"
                  ? "Create"
                  : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 space-y-4">
            <PosterPreview imageUrl={localImagePreview} title={title} />
            {videoUrl && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Video Preview
                </label>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={videoUrl}
                    title={title}
                    allowFullScreen
                    className="rounded-lg w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
