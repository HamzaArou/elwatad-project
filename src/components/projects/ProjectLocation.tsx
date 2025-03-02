
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ProjectLocationProps {
  location: string;
  lat?: number | null;
  lng?: number | null;
}

// District polygons for common areas in Makkah
// These are simplified polygon coordinates for demonstration
const DISTRICT_POLYGONS: Record<string, { name: string; arabicName: string; coords: [number, number][] }> = {
  'منى': {
    name: 'Mina',
    arabicName: 'منى',
    coords: [
      [21.4133, 39.8782], [21.4153, 39.8810], [21.4173, 39.8834], 
      [21.4124, 39.8830], [21.4099, 39.8825], [21.4079, 39.8794],
      [21.4095, 39.8763], [21.4124, 39.8773], [21.4133, 39.8782]
    ]
  },
  'العزيزية': {
    name: 'Al Aziziyah',
    arabicName: 'العزيزية',
    coords: [
      [21.3840, 39.8410], [21.3920, 39.8470], [21.3960, 39.8430], 
      [21.3930, 39.8380], [21.3880, 39.8360], [21.3840, 39.8410]
    ]
  },
  'المسفلة': {
    name: 'Al Misfalah',
    arabicName: 'المسفلة',
    coords: [
      [21.3911, 39.8250], [21.3930, 39.8330], [21.3870, 39.8350], 
      [21.3830, 39.8290], [21.3850, 39.8240], [21.3911, 39.8250]
    ]
  },
  'الحجاز': {
    name: 'Al Hajj',
    arabicName: 'الحجاز',
    coords: [
      [21.4033, 39.8182], [21.4053, 39.8220], [21.4013, 39.8240], 
      [21.3993, 39.8200], [21.4013, 39.8170], [21.4033, 39.8182]
    ]
  }
};

export default function ProjectLocation({ location, lat, lng }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [districtData, setDistrictData] = useState<{
    name: string;
    arabicName: string;
    coords: [number, number][];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  // Function to find the nearest district based on lat/lng
  const findNearestDistrict = async (latitude: number, longitude: number) => {
    console.log("Finding nearest district for:", latitude, longitude);

    try {
      // First, try to get district from Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&accept-language=ar`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      
      const data = await response.json();
      console.log("Nominatim data:", data);
      
      // Extract district name from address
      const district = 
        data.address.suburb || 
        data.address.neighbourhood || 
        data.address.quarter || 
        data.address.city_district;
      
      console.log("Detected district:", district);
      
      // Check if we have predefined polygon for this district
      if (district && DISTRICT_POLYGONS[district]) {
        console.log("Using predefined polygon for:", district);
        return DISTRICT_POLYGONS[district];
      }
      
      // If predefined polygon not found, find closest predefined district
      // Calculate distance to each predefined district center
      let closestDistrict = null;
      let minDistance = Infinity;
      
      for (const [districtName, districtInfo] of Object.entries(DISTRICT_POLYGONS)) {
        // Calculate center of polygon
        const centerLat = districtInfo.coords.reduce((sum, coord) => sum + coord[0], 0) / districtInfo.coords.length;
        const centerLng = districtInfo.coords.reduce((sum, coord) => sum + coord[1], 0) / districtInfo.coords.length;
        
        // Simple distance calculation (Euclidean)
        const distance = Math.sqrt(
          Math.pow(latitude - centerLat, 2) + 
          Math.pow(longitude - centerLng, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestDistrict = districtInfo;
        }
      }
      
      console.log("Closest district:", closestDistrict?.name);
      return closestDistrict;
    } catch (error) {
      console.error("Error finding district:", error);
      
      // Fallback: return first district
      const firstDistrict = Object.values(DISTRICT_POLYGONS)[0];
      console.log("Falling back to default district:", firstDistrict.name);
      return firstDistrict;
    }
  };
  
  useEffect(() => {
    if (!mapContainer.current || !lat || !lng) {
      setIsLoading(false);
      return;
    }
    
    const initMap = async () => {
      try {
        setIsLoading(true);
        
        // Find nearest district
        const district = await findNearestDistrict(lat, lng);
        if (!district) {
          throw new Error("Could not determine district");
        }
        
        setDistrictData(district);
        
        // Calculate center of district polygon
        const centerLat = district.coords.reduce((sum, coord) => sum + coord[0], 0) / district.coords.length;
        const centerLng = district.coords.reduce((sum, coord) => sum + coord[1], 0) / district.coords.length;
        
        // Initialize map
        if (!mapInstance.current) {
          const map = L.map(mapContainer.current, {
            center: [centerLat, centerLng],
            zoom: 14,
            scrollWheelZoom: false,
            zoomControl: true
          });
          
          L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0xThwp5hzLtXF2Nvi1LZ&language=ar', {
            attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
            maxZoom: 18,
          }).addTo(map);
          
          mapInstance.current = map;
          
          // Add district polygon
          const polygon = L.polygon(district.coords, {
            color: '#B69665',
            weight: 3,
            opacity: 0.7,
            fillColor: '#B69665',
            fillOpacity: 0.3
          }).addTo(map);
          
          // Add text label for district name
          const labelIcon = L.divIcon({
            className: 'district-label',
            html: `<div class="district-name">${district.arabicName}</div>`,
            iconSize: [120, 40],
            iconAnchor: [60, 20]
          });
          
          L.marker([centerLat, centerLng], { icon: labelIcon }).addTo(map);
          
          // Fit bounds to polygon
          map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("حدث خطأ أثناء تحميل الخريطة");
        setIsLoading(false);
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lng]);

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
        ) : isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
            {error}
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
      </div>
      <style>{`
        .district-name {
          background-color: rgba(182, 150, 101, 0.8);
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: bold;
          white-space: nowrap;
          direction: rtl;
          text-align: center;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          font-size: 14px;
        }
        .leaflet-container {
          font: 16px/1.5 "IBM Plex Sans Arabic", sans-serif !important;
        }
      `}</style>
    </div>
  );
}
