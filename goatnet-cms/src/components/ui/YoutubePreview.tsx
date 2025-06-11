interface YouTubePreviewProps {
  url: string;
}

export function YouTubePreview({ url }: YouTubePreviewProps) {
  function getYouTubeID(url: string) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : undefined;
  }

  const videoId = getYouTubeID(url);

  if (!videoId) {
    return (
      <p className="mt-2 text-sm text-white/60">
        Enter a valid YouTube URL to preview.
      </p>
    );
  }

  return (
    <div className="mt-4 bg-black rounded-lg overflow-hidden aspect-video">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        title="YouTube Preview"
      />
    </div>
  );
}
