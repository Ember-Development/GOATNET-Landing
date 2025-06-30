interface VideoPreviewProps {
  src: string;
  title: string;
  className?: string;
  containerClassName?: string;
}

export function VideoPreview({
  src,
  title,
  className = "w-full h-126 object-cover bg-gray-900",
  containerClassName = "bg-black rounded-lg overflow-hidden",
}: VideoPreviewProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium text-white/80 mb-1">Preview</h2>
      <div className={containerClassName}>
        <video src={src} controls className={className} />
      </div>
      <p className="text-sm text-white/60 text-center">{title}</p>
    </div>
  );
}
