const VideoPlayer = ({ url }: { url: string }) => {
  // Check if the URL is a YouTube link
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (link: string) => {
    let videoId = "";
    if (link.includes("youtu.be")) {
      videoId = link.split("/").pop()!;
    } else if (link.includes("youtube.com")) {
      const params = new URL(link).searchParams;
      videoId = params.get("v") || "";
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full h-full overflow-hidden shadow-lg border border-gray-700">
      {isYouTube ? (
        <iframe
          className="w-full h-full"
          src={getYouTubeEmbedUrl(url)}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video className="w-full h-full object-cover" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
