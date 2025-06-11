interface PosterPreviewProps {
  imageUrl: string;
  title: string;
}

export function PosterPreview({ imageUrl, title }: PosterPreviewProps) {
  return (
    <div className="space-y-2">
      <div className="w-full relative pb-[170%] bg-gray-800 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Poster preview
          </div>
        )}
      </div>
      {title && (
        <div className="mt-1 text-center">
          <span className="inline-block text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 uppercase">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
