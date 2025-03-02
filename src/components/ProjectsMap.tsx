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
      return data as Project[];
    },
  });

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initializeMap = () => {
      try {
        const map = L.map(mapContainer.current, {
          center: [21.4225, 39.8256], // Makkah coordinates
          zoom: 11,
          zoomControl: true,
          minZoom: 10,
          maxZoom: 18,
        });

        mapInstance.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        const customIcon = L.icon({
          iconUrl: '/lovable-uploads/f4db9871-8689-4fc8-be39-f46dfdcd8609.png',
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -45],
        });

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        const allLocations = [...projects, ...FIXED_LOCATIONS].filter(loc => loc.lat && loc.lng);
        
        allLocations.forEach(location => {
          const marker = L.marker([location.lat!, location.lng!], { icon: customIcon })
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
        });

        if (allLocations.length > 0) {
          const bounds = L.latLngBounds(allLocations.map(loc => [loc.lat!, loc.lng!]));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    setTimeout(initializeMap, 100);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markersRef.current = [];
      }
    };
  }, [projects]);

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden relative">
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
