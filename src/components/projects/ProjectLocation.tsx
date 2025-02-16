
import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ProjectLocationProps {
  location: string;
  lat?: number | null;
  lng?: number | null;
}

export default function ProjectLocation({ location, lat, lng }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  useEffect(() => {
    if (!mapContainer.current || !lat || !lng) return;

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      const map = L.map(mapContainer.current, {
        center: [lat, lng],
        zoom: 15,
        scrollWheelZoom: false
      });

      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0xThwp5hzLtXF2Nvi1LZ&language=ar', {
        attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        maxZoom: 18,
      }).addTo(map);

      mapInstance.current = map;

      // Create custom icon
      const customIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30c0-11.046-8.954-20-20-20z" fill="#000000"/>
            <path d="M20 4C10.059 4 2 12.059 2 22c0 13 18 26 18 26s18-13 18-26c0-9.941-8.059-18-18-18z" fill="#606060"/>
            <circle cx="20" cy="20" r="12" fill="white"/>
            <image 
              href="/lovable-uploads/f4db9871-8689-4fc8-be39-f46dfdcd8609.png" 
              x="8" 
              y="8" 
              width="24" 
              height="24" 
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        `),
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -45],
      });

      // Add marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      markerRef.current = marker;

      // Add popup with location name
      const popupContent = document.createElement('div');
      popupContent.className = 'rtl-popup';
      popupContent.innerHTML = `
        <div style="direction: rtl; text-align: right; font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <p style="font-size: 1rem; margin: 0;">${location}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
    } else {
      // Update existing map view
      mapInstance.current.setView([lat, lng], 15);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerRef.current = null;
      }
    };
  }, [lat, lng, location]);

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
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
        {(!lat || !lng) ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            لم يتم تحديد موقع المشروع على الخريطة
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>
      <style>{`
        .rtl-popup .leaflet-popup-content {
          direction: rtl;
          text-align: right;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          margin: 0.5rem;
        }
        .leaflet-container {
          font: 16px/1.5 "IBM Plex Sans Arabic", sans-serif !important;
        }
      `}</style>
    </div>
  );
}
