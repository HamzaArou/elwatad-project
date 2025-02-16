
import { memo } from "react";

interface GalleryItemProps {
  id: string;
  url: string;
  type: 'image' | 'video';
  onClick?: (e: React.MouseEvent, url: string) => void;
  className?: string;
}

const GalleryItem = memo(({ id, url, type, onClick, className = "" }: GalleryItemProps) => {
  return (
    <div 
      className={`w-full h-full flex items-center justify-center bg-black/5 ${className}`}
      onClick={(e) => onClick?.(e, url)}
    >
      {type === 'video' ? (
        <video
          src={url}
          className="w-full h-full object-contain"
          controls
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={url}
          alt=""
          className="w-full h-full object-contain"
          loading="eager"
        />
      )}
    </div>
  );
});

GalleryItem.displayName = 'GalleryItem';
export default GalleryItem;
