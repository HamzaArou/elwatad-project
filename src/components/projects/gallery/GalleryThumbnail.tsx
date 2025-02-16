
import { memo } from "react";

interface GalleryThumbnailProps {
  id: string;
  url: string;
  type: 'image' | 'video';
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const GalleryThumbnail = memo(({ id, url, type, isActive, onClick }: GalleryThumbnailProps) => {
  return (
    <div
      onClick={onClick}
      className={`keen-slider__slide cursor-pointer ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
    >
      {type === 'video' ? (
        <div className="aspect-video bg-gray-100 relative">
          <video
            src={url}
            className="w-full h-full object-cover"
            preload="none"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
          </div>
        </div>
      ) : (
        <img
          src={url}
          alt=""
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
});

GalleryThumbnail.displayName = 'GalleryThumbnail';
export default GalleryThumbnail;
