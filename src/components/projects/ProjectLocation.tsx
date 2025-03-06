
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ProjectLocationProps {
  location: string;
  lat?: number | null;
  lng?: number | null;
  postalCode?: string | null;
}

export default function ProjectLocation({ location, lat, lng, postalCode }: ProjectLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Google Maps URL for external navigation
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  useEffect(() => {
    console.log("ProjectLocation mounted with coordinates:", { lat, lng, postalCode });
    
    // Wait for the DOM to be fully rendered
    const initTimer = setTimeout(() => {
      initializeMap();
    }, 500);
    
    return () => {
      clearTimeout(initTimer);
      if (leafletMap.current) {
        console.log("Cleaning up map on unmount");
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  // Initialize the map
  const initializeMap = () => {
    if (!mapRef.current) {
      console.error("Map container not available");
      setError("تعذر تحميل الخريطة - الرجاء المحاولة مرة أخرى");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Initializing map...");
      setIsLoading(true);

      // Default coordinates (Mecca)
      let mapCenter: [number, number] = [21.422510, 39.826168];
      
      // Use provided coordinates if available
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        console.log("Using provided coordinates:", lat, lng);
        mapCenter = [lat, lng];
      } else {
        console.log("Using default coordinates");
      }

      // Clean up any existing map instance
      if (leafletMap.current) {
        leafletMap.current.remove();
      }

      // Initialize Leaflet map
      leafletMap.current = L.map(mapRef.current, {
        center: mapCenter,
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: true
      });

      // Add OpenStreetMap tile layer (more reliable than other providers)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(leafletMap.current);

      // Create custom marker icon
      const markerIcon = L.divIcon({
        className: 'location-marker',
        html: `<div class="marker-pin"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#B69665" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      // Add marker at the location
      const marker = L.marker(mapCenter, { icon: markerIcon })
        .addTo(leafletMap.current)
        .bindPopup(`<div style="text-align: center; direction: rtl;">${location || 'الموقع'}</div>`)
        .openPopup();

      console.log("Map initialized successfully");
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("حدث خطأ أثناء تحميل الخريطة");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">الموقع</h3>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <MapPin className="h-4 w-4" />
          فتح في خريطة جوجل
        </a>
      </div>
      <p className="text-gray-600 mb-4">{location}</p>
      
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-500 z-10">
            {error}
          </div>
        )}
        
        <div ref={mapRef} className="w-full h-full" />
      </div>
      
      <style>{`
        .location-marker {
          background: transparent;
          border: none;
        }
        .marker-pin {
          animation: pulse 1.5s infinite ease-in-out;
          transform-origin: center bottom;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .leaflet-container {
          font: 16px/1.5 "IBM Plex Sans Arabic", sans-serif !important;
        }
      `}</style>
    </div>
  );
}
