
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
  const areaRef = useRef<L.Circle | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  useEffect(() => {
    if (!mapContainer.current || !lat || !lng) return;

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      const map = L.map(mapContainer.current, {
        center: [lat, lng],
        zoom: 14, // Slightly zoomed out to show the area
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0xThwp5hzLtXF2Nvi1LZ&language=ar', {
        attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        maxZoom: 18,
      }).addTo(map);

      mapInstance.current = map;

      // Create a circular area around the coordinates
      // Radius is in meters - 500m is roughly a neighborhood/small district size
      const areaOptions = {
        color: '#000000',
        fillColor: '#B69665',
        fillOpacity: 0.4,
        weight: 2,
      };
      
      const area = L.circle([lat, lng], {
        radius: 500, // 500 meters radius
        ...areaOptions
      }).addTo(map);
      
      areaRef.current = area;

      // Add a tooltip with the district name that appears when hovering over the area
      const tooltipContent = document.createElement('div');
      tooltipContent.className = 'area-tooltip';
      tooltipContent.innerHTML = `
        <div style="direction: rtl; text-align: right; font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <p style="font-size: 1rem; margin: 0; font-weight: bold;">${location}</p>
        </div>
      `;
      area.bindTooltip(tooltipContent, { 
        direction: 'top',
        permanent: false,
        className: 'leaflet-tooltip-custom'
      });
      
      // Add label for the area that's always visible
      const divIcon = L.divIcon({
        className: 'area-label-icon',
        html: `<div class="area-label">${location}</div>`,
        iconSize: [120, 40],
        iconAnchor: [60, 20]
      });
      
      L.marker([lat, lng], { 
        icon: divIcon, 
        interactive: false, 
        zIndexOffset: 1000 
      }).addTo(map);
    } else {
      // Update existing map view
      mapInstance.current.setView([lat, lng], 14);
      if (areaRef.current) {
        areaRef.current.setLatLng([lat, lng]);
      }
    }

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        areaRef.current = null;
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
        .area-label-icon {
          background: none;
          border: none;
        }
        .area-label {
          white-space: nowrap;
          color: #000;
          font-weight: bold;
          font-size: 14px;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 4px 8px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          direction: rtl;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
        }
        .leaflet-tooltip-custom {
          background-color: white;
          border: 1px solid #B69665;
          border-radius: 4px;
          padding: 5px 10px;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          direction: rtl;
        }
      `}</style>
    </div>
  );
}
