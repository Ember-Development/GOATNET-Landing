import type { ChangeEvent } from "react";
import { VideoPreview } from "../ui/VideoPreview";

interface DesktopTabProps {
  desktopVideoUrl: string;
  setDesktopVideoUrl: (url: string) => void;
  desktopFile: File | null;
  setDesktopFile: (file: File | null) => void;
  originalDesktopUrl: string;
}

export function DesktopTab({
  desktopVideoUrl,
  setDesktopVideoUrl,
  desktopFile,
  setDesktopFile,
  originalDesktopUrl,
}: DesktopTabProps) {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file");
      e.target.value = "";
      return;
    }

    // If the user picks a file, clear out anything in the URL textbox
    setDesktopFile(file);
    setDesktopVideoUrl("");
  }

  function handleUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setDesktopVideoUrl(e.target.value);
    if (desktopFile) {
      setDesktopFile(null);
    }
  }

  // Determine what to preview:
  let previewSrc: string | null = null;
  const previewTitle = "Desktop Video";

  if (desktopFile) {
    previewSrc = URL.createObjectURL(desktopFile);
  } else if (desktopVideoUrl.trim()) {
    previewSrc = desktopVideoUrl.trim();
  } else if (originalDesktopUrl) {
    previewSrc = originalDesktopUrl;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="desktopUrl" className="block text-white/80">
          Paste or type a video URL (e.g. YouTube embed):
        </label>
        <input
          id="desktopUrl"
          type="text"
          value={desktopVideoUrl}
          onChange={handleUrlChange}
          placeholder="https://www.youtube.com/embed/…"
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="desktopFile" className="block text-white/80">
          Or upload a desktop video file:
        </label>
        <input
          id="desktopFile"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="
            mt-1 block w-full text-white/60
            file:mr-4 file:px-4 file:py-2
            file:bg-white/10 file:border file:border-white/30
            file:rounded-lg file:text-white hover:file:bg-white/20
            focus:outline-none
          "
        />
      </div>

      {previewSrc && <VideoPreview src={previewSrc} title={previewTitle} />}
    </div>
  );
}
