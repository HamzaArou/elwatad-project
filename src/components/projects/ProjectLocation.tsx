
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

// District polygons for common areas in Saudi Arabia
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
  },
  'النرجس': {
    name: 'Al Narjis',
    arabicName: 'النرجس',
    coords: [
      [24.8230, 46.6695], [24.8310, 46.6750], [24.8240, 46.6830], 
      [24.8160, 46.6780], [24.8230, 46.6695]
    ]
  },
  'الملز': {
    name: 'Al Malaz',
    arabicName: 'الملز',
    coords: [
      [24.6650, 46.7350], [24.6710, 46.7420], [24.6650, 46.7480], 
      [24.6590, 46.7420], [24.6650, 46.7350]
    ]
  },
  'السليمانية': {
    name: 'Sulaymaniyah',
    arabicName: 'السليمانية',
    coords: [
      [24.7050, 46.7100], [24.7120, 46.7150], [24.7080, 46.7220], 
      [24.7010, 46.7170], [24.7050, 46.7100]
    ]
  },
  'الروضة': {
    name: 'Al Rawdah',
    arabicName: 'الروضة',
    coords: [
      [21.5320, 39.1780], [21.5370, 39.1850], [21.5310, 39.1900], 
      [21.5260, 39.1840], [21.5320, 39.1780]
    ]
  }
};

// Expanded mapping of postal codes to district names
// This is a simplified example, would need a more comprehensive database for production
const POSTAL_CODE_TO_DISTRICT: Record<string, string> = {
  // Makkah postal codes
  '21955': 'منى',
  '21912': 'العزيزية',
  '21961': 'المسفلة',
  '21421': 'الحجاز',
  // Riyadh postal codes
  '11564': 'النرجس',
  '12627': 'الملز',
  '12211': 'السليمانية',
  // Jeddah postal codes
  '23434': 'الروضة',
  // Additional postal codes - cover more areas
  '21411': 'العزيزية',
  '21442': 'منى',
  '21452': 'المسفلة',
  '11511': 'النرجس',
  '12222': 'السليمانية',
  '23435': 'الروضة',
  '12345': 'النرجس',  // Fallback for testing
  '54321': 'الملز',    // Fallback for testing
};

// Add a default district for unknown postal codes
const DEFAULT_DISTRICT = {
  name: 'Default District',
  arabicName: 'المنطقة الافتراضية',
  coords: [
    [24.7136, 46.6753], [24.7236, 46.6853], [24.7136, 46.6953], 
    [24.7036, 46.6853], [24.7136, 46.6753]
  ] as [number, number][]
};

export default function ProjectLocation({ location, lat, lng, postalCode }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [districtData, setDistrictData] = useState<{
    name: string;
    arabicName: string;
    coords: [number, number][];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputPostalCode, setInputPostalCode] = useState(postalCode || '');
  const [showPostalCodeInput, setShowPostalCodeInput] = useState(!lat && !lng && !postalCode);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  // Find district based on postal code
  const findDistrictByPostalCode = (code: string) => {
    console.log("Finding district for postal code:", code);
    // Try exact match first
    const districtKey = POSTAL_CODE_TO_DISTRICT[code];
    
    if (districtKey && DISTRICT_POLYGONS[districtKey]) {
      console.log("Found exact district match:", districtKey);
      return DISTRICT_POLYGONS[districtKey];
    }
    
    // If no exact match, try to find a postal code with the same prefix (first 3 digits)
    if (code.length >= 3) {
      const prefix = code.substring(0, 3);
      for (const [postalCode, district] of Object.entries(POSTAL_CODE_TO_DISTRICT)) {
        if (postalCode.startsWith(prefix) && DISTRICT_POLYGONS[district]) {
          console.log("Found district by prefix match:", district);
          return DISTRICT_POLYGONS[district];
        }
      }
    }
    
    // As a fallback, use default district
    console.log("Using default district for postal code:", code);
    return {
      name: 'Area ' + code,
      arabicName: 'منطقة ' + code,
      coords: DEFAULT_DISTRICT.coords
    };
  };

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
      
      // Fallback: generate a district based on coordinates
      return {
        name: `Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
        arabicName: `الموقع (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
        coords: [
          [latitude - 0.01, longitude - 0.01],
          [latitude + 0.01, longitude - 0.01],
          [latitude + 0.01, longitude + 0.01],
          [latitude - 0.01, longitude + 0.01],
          [latitude - 0.01, longitude - 0.01]
        ] as [number, number][]
      };
    }
  };

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const district = findDistrictByPostalCode(inputPostalCode);
    if (district) {
      setDistrictData(district);
      setShowPostalCodeInput(false);
      
      // Initialize map with the district
      if (mapContainer.current) {
        initializeMap(district);
      }
    } else {
      setError("لم يتم العثور على منطقة لهذا الرمز البريدي");
    }
    
    setIsLoading(false);
  };

  const initializeMap = (district: { name: string; arabicName: string; coords: [number, number][] }) => {
    if (!mapContainer.current) return;
    
    // Calculate center of district polygon
    const centerLat = district.coords.reduce((sum, coord) => sum + coord[0], 0) / district.coords.length;
    const centerLng = district.coords.reduce((sum, coord) => sum + coord[1], 0) / district.coords.length;
    
    // Use provided lat/lng as center if available
    const mapCenter: [number, number] = (lat && lng) ? [lat, lng] : [centerLat, centerLng];
    
    // Initialize map
    if (!mapInstance.current) {
      const map = L.map(mapContainer.current, {
        center: mapCenter,
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
      
      // Add marker pin for the exact location if lat/lng provided
      if (lat && lng) {
        // Create custom marker icon
        const markerIcon = L.divIcon({
          className: 'location-marker',
          html: `<div class="marker-pin"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#B69665" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });

        markerRef.current = L.marker([lat, lng], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<div style="text-align: center; direction: rtl;">${location}</div>`)
          .openPopup();
        
        // Center on exact location and adjust zoom
        map.setView([lat, lng], 15);
      } else {
        // Fit bounds to polygon if no specific location
        map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
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
        
        // If we have a postal code, use that
        if (postalCode) {
          console.log("Using postal code:", postalCode);
          const district = findDistrictByPostalCode(postalCode);
          if (district) {
            console.log("Found district for postal code:", district.arabicName);
            setDistrictData(district);
            initializeMap(district);
            setIsLoading(false);
            return;
          } else {
            console.warn("No district found for postal code:", postalCode);
          }
        }
        
        // Otherwise use lat/lng if available
        if (lat && lng) {
          console.log("Using coordinates:", lat, lng);
          // Find nearest district
          const district = await findNearestDistrict(lat, lng);
          if (!district) {
            throw new Error("Could not determine district");
          }
          
          console.log("Found district for coordinates:", district.arabicName);
          setDistrictData(district);
          initializeMap(district);
        } else {
          // If neither postal code nor coordinates are provided, show input form
          console.log("No location data, showing postal code input");
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

  // Update marker position if lat/lng changes after initial render
  useEffect(() => {
    if (mapInstance.current && lat && lng) {
      // If we already have a marker, update its position
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        // Create a new marker
        const markerIcon = L.divIcon({
          className: 'location-marker',
          html: `<div class="marker-pin"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#B69665" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });

        markerRef.current = L.marker([lat, lng], { icon: markerIcon })
          .addTo(mapInstance.current)
          .bindPopup(`<div style="text-align: center; direction: rtl;">${location}</div>`)
          .openPopup();
      }
      
      // Center and zoom map on the marker
      mapInstance.current.setView([lat, lng], 15);
    }
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
        {showPostalCodeInput && !districtData ? (
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
      `}</style>
    </div>
  );
}
