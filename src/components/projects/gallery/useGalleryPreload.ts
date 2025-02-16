
import { useCallback, useRef, useEffect } from "react";
import { GalleryItem } from "../ProjectGallery";

export const useGalleryPreload = (galleryMedia: GalleryItem[]) => {
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((url: string) => {
    if (!url || url.endsWith('.mp4') || preloadedImages.current.has(url)) {
      return;
    }

    const img = new Image();
    img.src = url;
    preloadedImages.current.add(url);
  }, []);

  useEffect(() => {
    if (galleryMedia.length > 0) {
      const initialPreloadCount = Math.min(3, galleryMedia.length);
      for (let i = 0; i < initialPreloadCount; i++) {
        if (galleryMedia[i].type === 'image') {
          preloadImage(galleryMedia[i].url);
        }
      }
    }
  }, [galleryMedia, preloadImage]);

  return { preloadImage };
};
