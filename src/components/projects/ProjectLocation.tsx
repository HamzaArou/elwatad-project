
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  findDistrictByCoordinates, 
  findDistrictByPostalCode, 
  generateDistrictAroundCoordinates,
  GeoJSONFeature 
} from '@/utils/saudiDistricts';

interface ProjectLocationProps {
  location: string;
  lat?: number | null;
  lng?: number | null;
  postalCode?: string | null;
  projectId: string;
}

export default function ProjectLocation({ location, lat, lng, postalCode, projectId }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [districtFeature, setDistrictFeature] = useState<GeoJSONFeature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputPostalCode, setInputPostalCode] = useState(postalCode || '');
  const [showPostalCodeInput, setShowPostalCodeInput] = useState(!lat && !lng && !postalCode);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const district = findDistrictByPostalCode(inputPostalCode);
      if (district) {
        setDistrictFeature(district);
        setShowPostalCodeInput(false);
        
        // Initialize map with the district
        if (mapContainer.current) {
          initializeMap(district);
        }
      } else {
        setError("لم يتم العثور على منطقة لهذا الرمز البريدي");
      }
    } catch (err) {
      console.error("Error processing postal code:", err);
      setError("حدث خطأ أثناء معالجة الرمز البريدي");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeMap = (district: GeoJSONFeature) => {
    if (!mapContainer.current) return;
    
    // Initialize map
    if (!mapInstance.current) {
      // Calculate center of district polygon
      let coordinates: number[][] = [];
      
      if (district.geometry.type === "Polygon") {
        coordinates = district.geometry.coordinates[0];
      } else if (district.geometry.type === "MultiPolygon") {
        coordinates = district.geometry.coordinates[0][0];
      }
      
      // Calculate center of polygon
      const sumLng = coordinates.reduce((sum, coord) => sum + coord[0], 0);
      const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);
      const centerLng = sumLng / coordinates.length;
      const centerLat = sumLat / coordinates.length;
      
      const map = L.map(mapContainer.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: true
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      
      mapInstance.current = map;
      
      // Add district polygon
      const latlngs = coordinates.map(coord => [coord[1], coord[0]]);
      
      const polygon = L.polygon(latlngs as L.LatLngExpression[], {
        color: '#B69665',
        weight: 3,
        opacity: 0.7,
        fillColor: '#B69665',
        fillOpacity: 0.3
      }).addTo(map);
      
      // Add text label for district name
      const labelIcon = L.divIcon({
        className: 'district-label',
        html: `<div class="district-name">${district.properties.name_ar}</div>`,
        iconSize: [120, 40],
        iconAnchor: [60, 20]
      });
      
      L.marker([centerLat, centerLng], { icon: labelIcon }).addTo(map);
      
      // Fit bounds to polygon
      map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
      
      // Add marker for the exact location if coordinates are available
      if (lat && lng) {
        L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(map).bindPopup(location);
      }
    }
  };
  
  useEffect(() => {
    if (!mapContainer.current) {
      setIsLoading(false);
      return;
    }
    
    const initMap = async () => {
      try {
        setIsLoading(true);
        console.log("Initializing map with:", { postalCode, lat, lng });
        
        let district: GeoJSONFeature | null = null;
        
        // First priority: Use coordinates if available
        if (lat && lng) {
          district = findDistrictByCoordinates(lat, lng);
          if (!district) {
            district = generateDistrictAroundCoordinates(lat, lng);
          }
        }
        // Second priority: Use postal code if available
        else if (postalCode) {
          district = findDistrictByPostalCode(postalCode);
        }
        
        // If we found a district, initialize the map
        if (district) {
          console.log("Found district:", district.properties.name_ar);
          setDistrictFeature(district);
          initializeMap(district);
        } else {
          // If no district was found, show the postal code input
          console.log("No district found, showing postal code input");
          setShowPostalCodeInput(true);
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
  }, [lat, lng, postalCode]);

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
      
      {showPostalCodeInput && (
        <form onSubmit={handlePostalCodeSubmit} className="mb-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="postalCode" className="font-medium text-gray-700">
              أدخل الرمز البريدي للمنطقة
            </label>
            <div className="flex space-x-2 flex-row-reverse">
              <input
                id="postalCode"
                type="text"
                value={inputPostalCode}
                onChange={(e) => setInputPostalCode(e.target.value)}
                placeholder="21955"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-right"
                maxLength={5}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#B69665] text-white rounded-md hover:bg-[#A58655]"
                disabled={isLoading}
              >
                {isLoading ? "جاري البحث..." : "عرض"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>
        </form>
      )}
      
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
        {showPostalCodeInput && !districtFeature ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            الرجاء إدخال الرمز البريدي للمنطقة
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
