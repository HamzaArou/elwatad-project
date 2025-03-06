import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import GalleryItem from "./gallery/GalleryItem";
import GalleryThumbnail from "./gallery/GalleryThumbnail";
import NavigationButton from "./gallery/NavigationButton";
import { useGalleryPreload } from "./gallery/useGalleryPreload";
export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  content_type: string;
}
interface ProjectGalleryProps {
  gallery?: GalleryItem[];
  onImageClick?: (mediaUrl: string) => void;
}
export default function ProjectGallery({
  gallery = [],
  onImageClick
}: ProjectGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const galleryMedia = gallery.filter(item => item.content_type === 'gallery');
  const {
    preloadImage
  } = useGalleryPreload(galleryMedia);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      const currentIndex = slider.track.details.rel;
      const nextIndex = (currentIndex + 1) % galleryMedia.length;
      const prevIndex = (currentIndex - 1 + galleryMedia.length) % galleryMedia.length;
      preloadImage(galleryMedia[nextIndex].url);
      preloadImage(galleryMedia[prevIndex].url);
    },
    created() {
      setLoaded(true);
    }
  });
  const [thumbnailRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 6,
      spacing: 10
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 5
        }
      },
      "(max-width: 480px)": {
        slides: {
          perView: 3,
          spacing: 5
        }
      }
    }
  });
  if (!galleryMedia || galleryMedia.length === 0) {
    return <div className="text-center py-8">
        <p className="text-gray-500">لا توجد وسائط متاحة</p>
      </div>;
  }
  const handleImageClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (onImageClick) {
      onImageClick(url);
    }
  };
  const handleSlideChange = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    instanceRef.current?.moveToIdx(idx);
  };
  return <section className="py-0">
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto bg-gray-100 rounded-xl overflow-hidden">
          <div ref={sliderRef} className="keen-slider h-[500px]">
            {galleryMedia.map(media => <div key={media.id} className="keen-slider__slide cursor-pointer">
                <GalleryItem {...media} onClick={handleImageClick} />
              </div>)}
          </div>

          {loaded && <>
              <NavigationButton direction="prev" onClick={e => {
            e.stopPropagation();
            instanceRef.current?.prev();
          }} />
              <NavigationButton direction="next" onClick={e => {
            e.stopPropagation();
            instanceRef.current?.next();
          }} />
            </>}
        </div>

        <div className="max-w-5xl mx-auto mt-4">
          <div ref={thumbnailRef} className="keen-slider">
            {galleryMedia.map((media, idx) => <GalleryThumbnail key={media.id} {...media} isActive={currentSlide === idx} onClick={e => handleSlideChange(e, idx)} />)}
          </div>
        </div>
      </div>
    </section>;
}