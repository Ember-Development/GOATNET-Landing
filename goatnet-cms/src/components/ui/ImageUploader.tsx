import React, { useState, useEffect } from "react";

interface ImageUploaderProps {
  initialUrl?: string;
  onChange: (fileOrUrl: File | string) => void;
}

export default function ImageUploader({
  initialUrl = "",
  onChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(initialUrl);

  // If the parent passes a new initialUrl, update preview
  useEffect(() => {
    setPreview(initialUrl);
  }, [initialUrl]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
  }

  return (
    <div className="space-y-2">
      <div className="w-full h-60 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500">Poster preview</span>
        )}
      </div>

      <label className="block">
        <span className="text-sm font-medium text-white/80">
          Upload Poster Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-white/60 file:mr-4 file:py-2 file:px-4 file:bg-white/10 file:border file:border-white/30 file:rounded-lg file:text-white hover:file:bg-white/20"
        />
      </label>
    </div>
  );
}
