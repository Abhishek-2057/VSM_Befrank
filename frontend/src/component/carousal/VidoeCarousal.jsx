import React, { useState } from 'react';

// --- New SVG Play Icon to match the image ---
const PlayIcon = () => (
  <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,16.5v-9l7,4.5L9.5,16.5z"></path>
  </svg>
);


// --- YouTube Player Component (Modal) using iframe ---
const YouTubePlayer = ({ videoId, onClose }) => {
  if (!videoId) return null;
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div 
      className="fixed inset-0  bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl aspect-video" 
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={videoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-black rounded-full h-9 w-9 flex items-center justify-center text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};


// --- Main Video Carousel Component ---
const VideoCarousel = () => {
  // --- State Management ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // --- Helper to get YouTube Video ID and Thumbnail ---
  const getYoutubeData = (url) => {
    if (!url) return { id: null, thumbnailUrl: null };
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return {
      id: videoId,
      thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 'https://placehold.co/872x474/cccccc/222222?text=Invalid+Link',
    };
  };

  // --- YouTube Video Links ---
  const videos = [
    // { id: 1, url: 'https://youtu.be/xSjqfdAFpC0' },
    // { id: 2, url: 'https://youtu.be/xSjqfdAFpC0' },
    { id: 3, url: 'https://youtu.be/xSjqfdAFpC0' },
    // { id: 4, url: 'https://www.youtube.com/watch?v=Y_plhk1FUQA' },
    // { id: 5, url: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8' },
  ];
  
  // --- Event Handlers ---
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  
  const handlePlayClick = (e, videoId) => {
    e.stopPropagation();
    setPlayingVideoId(videoId);
  };
  
  const handleClosePlayer = () => {
    setPlayingVideoId(null);
  };

  // --- Render Logic ---
  return (
    <section className="bg-gray-100 py-8 md:py-10 font-sans w-full overflow-x-clip">
      <div className="relative h-[200px] md:h-[300px] lg:h-[380px] flex items-center justify-center">
        {videos.map((video, index) => {
          const { id: videoId, thumbnailUrl } = getYoutubeData(video.url);
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + videos.length) % videos.length;
          const isNext = index === (currentIndex + 1) % videos.length;

          let zIndex = 'z-0';
          let transformClass = 'transform scale-50 opacity-0'; // Hidden by default

          if (isActive) {
            zIndex = 'z-20';
            transformClass = 'transform scale-100 opacity-100';
          } else if (isPrev) {
            zIndex = 'z-10';
            transformClass = 'transform scale-100 opacity-50 -translate-x-[70%] md:-translate-x-[95%]';
          } else if (isNext) {
            zIndex = 'z-10';
            transformClass = 'transform scale-100 opacity-50 translate-x-[70%] md:translate-x-[95%]';
          }
          
          const containerSize = isActive 
            ? 'w-10/12 md:w-[700px] h-full'   
            : 'w-9/12 md:w-[560px] h-5/6';   


          return (
            <div
              key={video.id}
              className={`absolute transition-all duration-500 ease-in-out ${zIndex} ${transformClass} ${containerSize}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="relative cursor-pointer group w-full h-full">
                <img 
                  src={thumbnailUrl} 
                  alt={`Video thumbnail ${video.id}`}
                  className="rounded-2xl shadow-lg object-cover w-full h-full"
                />
                {isActive && (
                   <div 
                    className="absolute inset-0 bg-black bg-opacity-70 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handlePlayClick(e, videoId)}
                   >
                    <PlayIcon />
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {playingVideoId && <YouTubePlayer videoId={playingVideoId} onClose={handleClosePlayer} />}
    </section>
  );
};

export default VideoCarousel;

