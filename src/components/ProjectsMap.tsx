
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

interface ProjectsMapProps {
  specificLocation?: { lat: number; lng: number; name: string; location: string };
}

const ProjectsMap = ({ specificLocation }: ProjectsMapProps) => {
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
    // Ensure the map container is in the DOM and no map is already initialized
    if (!mapContainer.current) {
      console.error("Map container not found in DOM");
      return;
    }
    
    if (mapInstance.current) {
      console.log("Map already initialized, removing old instance");
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    // Add a small delay to ensure the DOM is fully rendered
    const initializeMapTimer = setTimeout(() => {
      try {
        console.log("Initializing map...");
        
        // Create the map instance
        const map = L.map(mapContainer.current!, {
          center: [21.4225, 39.8256], // Makkah coordinates
          zoom: 11,
          zoomControl: true,
          minZoom: 8,
          maxZoom: 18,
        });

        console.log("Map created successfully");
        mapInstance.current = map;

        // Add the tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        console.log("Tile layer added");

        // Create custom icon for markers
        const customIcon = L.icon({
          iconUrl: '/lovable-uploads/f4db9871-8689-4fc8-be39-f46dfdcd8609.png',
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -45],
        });

        // Clear any existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Determine which locations to show
        let allLocations: any[] = [];
        
        if (specificLocation && specificLocation.lat && specificLocation.lng) {
          console.log("Adding specific location to map:", specificLocation);
          allLocations = [specificLocation];
        } else {
          console.log("Adding all projects and fixed locations to map");
          allLocations = [...projects, ...FIXED_LOCATIONS].filter(loc => loc.lat && loc.lng);
        }
        
        console.log("Locations to show on map:", allLocations.length);
        
        // Add markers for each location
        allLocations.forEach(location => {
          if (!location.lat || !location.lng) {
            console.warn("Location missing coordinates:", location);
            return;
          }
          
          try {
            const marker = L.marker([location.lat, location.lng], { icon: customIcon })
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
          } catch (err) {
            console.error("Error adding marker:", err);
          }
        });

        // Fit bounds if we have locations
        if (allLocations.length > 0) {
          try {
            const bounds = L.latLngBounds(allLocations.map(loc => [loc.lat, loc.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
            console.log("Map bounds set");
          } catch (err) {
            console.error("Error setting map bounds:", err);
          }
        }
        
        // Force a redraw of the map
        setTimeout(() => {
          map.invalidateSize();
          console.log("Map size invalidated for redraw");
        }, 100);
        
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 300); // Delay of 300ms to ensure the DOM is ready

    // Clean up function
    return () => {
      clearTimeout(initializeMapTimer);
      if (mapInstance.current) {
        console.log("Cleaning up map instance");
        mapInstance.current.remove();
        mapInstance.current = null;
        markersRef.current = [];
      }
    };
  }, [projects, specificLocation]); // Re-run when projects or specificLocation changes

  return (
    <div className="h-[600px] w-full rounded-2xl overflow-hidden relative border border-gray-300 shadow-md">
      <div ref={mapContainer} className="w-full h-full bg-gray-100" />
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
