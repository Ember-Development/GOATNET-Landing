import type { ChangeEvent } from "react";
import { VideoPreview } from "../ui/VideoPreview";

interface MobileTabProps {
  mobileVideoUrl: string;
  setMobileVideoUrl: (url: string) => void;
  mobileFile: File | null;
  setMobileFile: (file: File | null) => void;
  originalMobileUrl: string;
}

export function MobileTab({
  mobileVideoUrl,
  setMobileVideoUrl,
  mobileFile,
  setMobileFile,
  originalMobileUrl,
}: MobileTabProps) {
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file");
      e.target.value = "";
      return;
    }

    // If they pick a file, clear the URL textbox
    setMobileFile(file);
    setMobileVideoUrl("");
  }

  function handleUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setMobileVideoUrl(e.target.value);
    if (mobileFile) {
      setMobileFile(null);
    }
  }

  let previewSrc: string | null = null;
  const previewTitle = "Mobile Video";

  if (mobileFile) {
    previewSrc = URL.createObjectURL(mobileFile);
  } else if (mobileVideoUrl.trim()) {
    previewSrc = mobileVideoUrl.trim();
  } else if (originalMobileUrl) {
    previewSrc = originalMobileUrl;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="mobileVideoUrl" className="block text-white/80">
          Paste or type a video URL (e.g. YouTube embed):
        </label>
        <input
          id="mobileVideoUrl"
          type="text"
          value={mobileVideoUrl}
          onChange={handleUrlChange}
          placeholder="https://www.youtube.com/embed/…"
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="mobileFile" className="block text-white/80">
          Or upload a mobile video file:
        </label>
        <input
          id="mobileFile"
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

      {previewSrc && (
        <VideoPreview
          src={previewSrc}
          title={previewTitle}
          containerClassName="mx-auto w-[360px] h-[640px] bg-black rounded-lg overflow-hidden"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
