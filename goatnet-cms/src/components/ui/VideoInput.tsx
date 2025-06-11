import { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { heroApi } from "../../utils/api";

interface VideoInputProps {
  label: string;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  originalUrl: string;
  fileInputId: string;
  placeholder: string;
}

export function VideoInput({
  label,
  videoUrl,
  setVideoUrl,
  originalUrl,
  fileInputId,
  placeholder,
}: VideoInputProps) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "video/mp4") {
      toast.error("Please upload an MP4 file.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const data = await heroApi.uploadFile(file);
      setVideoUrl(data.url);
      toast.success(`${label} video uploaded!`);
    } catch (err: any) {
      toast.error("Upload error: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const hasChanged = videoUrl !== originalUrl;

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-full">
        <label
          htmlFor={`${fileInputId}Url`}
          className="block text-sm font-medium text-white/80 mb-1"
        >
          {label} Video URL
        </label>
        <input
          id={`${fileInputId}Url`}
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={placeholder}
          required
        />
        {hasChanged && (
          <button
            type="button"
            onClick={() => setVideoUrl(originalUrl)}
            className="mt-2 text-sm text-purple-400 hover:text-purple-200"
          >
            Clear to original
          </button>
        )}
      </div>

      <div>
        <label
          htmlFor={fileInputId}
          className="block text-sm font-medium text-white/80 mb-1"
        >
          Or Upload {label} MP4
        </label>
        <input
          id={fileInputId}
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          disabled={uploading}
          className="
            block w-full text-white/60
            file:mr-4 file:px-4 file:py-2
            file:bg-white/10 file:border file:border-white/30
            file:rounded-lg file:text-white hover:file:bg-white/20
            focus:outline-none
          "
        />
        {uploading && <p className="text-sm text-white/60 mt-1">Uploading…</p>}
      </div>
    </div>
  );
}
