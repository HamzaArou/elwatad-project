import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Project {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
}

const FIXED_LOCATIONS = [
  { lat: 21.328682, lng: 39.682289, name: 'مشروع الفيصل الأول', location: 'مكة المكرمة' },
  { lat: 21.335788, lng: 39.695381, name: 'مشروع الفيصل الثاني', location: 'مكة المكرمة' },
  { lat: 21.335814, lng: 39.684551, name: 'مشروع الفيصل الثالث', location: 'مكة المكرمة' },
  { lat: 21.373072, lng: 39.797595, name: 'مشروع الفيصل الرابع', location: 'مكة المكرمة' },
  { lat: 21.332211, lng: 39.681780, name: 'مشروع الفيصل الخامس', location: 'مكة المكرمة' },
  { lat: 21.317950, lng: 39.686954, name: 'مشروع الفيصل السادس', location: 'مكة المكرمة' },
  { lat: 21.335327, lng: 39.688751, name: 'مشروع الفيصل السابع', location: 'مكة المكرمة' },
  { lat: 21.325750, lng: 39.681556, name: 'مشروع الفيصل الثامن', location: 'مكة المكرمة' },
  { lat: 21.325742, lng: 39.681553, name: 'مشروع الفيصل التاسع', location: 'مكة المكرمة' },
  { lat: 21.328977, lng: 39.699720, name: 'مشروع الفيصل العاشر', location: 'مكة المكرمة' },
  { lat: 21.328972, lng: 39.699722, name: 'مشروع الفيصل الحادي عشر', location: 'مكة المكرمة' },
  { lat: 21.346907, lng: 39.767688, name: 'مشروع الفيصل الثاني عشر', location: 'مكة المكرمة' },
  { lat: 21.379658, lng: 39.765661, name: 'مشروع الفيصل الثالث عشر', location: 'مكة المكرمة' },
  { lat: 21.328056, lng: 39.674820, name: 'مشروع الفيصل الرابع عشر', location: 'مكة المكرمة' },
  { lat: 21.330151, lng: 39.696473, name: 'مشروع الفيصل الخامس عشر', location: 'مكة المكرمة' },
  { lat: 21.335788, lng: 39.695381, name: 'مشروع الفيصل السادس عشر', location: 'مكة المكرمة' },
];

const ProjectsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, location, lat, lng');
      
      if (error) throw error;
      console.log('Fetched projects:', data);
      return data as Project[];
    },
  });

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initializeMap = () => {
      // Create custom icon for markers with updated pin design
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

      try {
        const map = L.map(mapContainer.current, {
          center: [21.4225, 39.8256], // Makkah coordinates
          zoom: 11,
          zoomControl: true,
          minZoom: 10,
          maxZoom: 18,
        });

        mapInstance.current = map;

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0xThwp5hzLtXF2Nvi1LZ&language=ar', {
          attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map);

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add markers for database projects
        projects.forEach(project => {
          if (project.lat && project.lng) {
            addMarker(map, project, customIcon);
          }
        });

        // Add markers for fixed locations
        FIXED_LOCATIONS.forEach(location => {
          addMarker(map, location, customIcon);
        });

        // Create bounds from all valid coordinates
        const validCoordinates = [...projects, ...FIXED_LOCATIONS]
          .filter(loc => loc.lat && loc.lng)
          .map(loc => [loc.lat!, loc.lng!]);

        if (validCoordinates.length > 0) {
          const bounds = L.latLngBounds(validCoordinates as [number, number][]);
          map.fitBounds(bounds, { padding: [50, 50] });
        }

        // Add custom CSS
        const style = document.createElement('style');
        style.textContent = `
          .leaflet-tile-container img {
            font-size: 16px !important;
          }
          .leaflet-popup-content {
            font-size: 18px !important;
          }
          .leaflet-container {
            font: 16px/1.5 "IBM Plex Sans Arabic", sans-serif !important;
          }
          .leaflet-marker-icon {
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Initialize map with a small delay to ensure container is ready
    setTimeout(initializeMap, 100);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markersRef.current = [];
      }
    };
  }, [projects]);

  const addMarker = (map: L.Map, location: any, icon: L.Icon) => {
    try {
      const marker = L.marker([location.lat, location.lng], { icon })
        .addTo(map);

      const popupContent = document.createElement('div');
      popupContent.className = 'rtl-popup';
      popupContent.innerHTML = `
        <div style="direction: rtl; text-align: right; font-family: 'IBM Plex Sans Arabic', sans-serif;">
          <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 0.25rem; color: #1a1a1a;">${location.name}</h3>
          <p style="font-size: 1rem; color: #4a5568;">المنطقة: ${location.location}</p>
          <p style="font-size: 0.875rem; color: #718096;">الإحداثيات: ${location.lat}, ${location.lng}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
      
      console.log(`Added marker for location:`, location);
    } catch (error) {
      console.error('Error adding marker:', error);
    }
  };

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      <style>{`
        .rtl-popup .leaflet-popup-content {
          direction: rtl;
          text-align: right;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
        }
        .leaflet-container {
          font: 16px/1.5 "IBM Plex Sans Arabic", sans-serif !important;
        }
        .leaflet-marker-icon {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
      `}</style>
    </div>
  );
};

export default ProjectsMap;