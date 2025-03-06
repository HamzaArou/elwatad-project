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

// Postal code to district mapping
const POSTAL_CODE_TO_DISTRICT: Record<string, string> = {
  '21955': 'منى',
  '21912': 'العزيزية',
  '21961': 'المسفلة',
  '21421': 'الحجاز',
  '11564': 'النرجس',
  '12627': 'الملز',
  '12211': 'السليمانية',
  '23434': 'الروضة',
  '21411': 'العزيزية',
  '21442': 'منى',
  '21452': 'المسفلة',
  '11511': 'النرجس',
  '12222': 'السليمانية',
  '23435': 'الروضة',
  '12345': 'النرجس',
  '54321': 'الملز',
  '12411': 'منى'
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

// Default coordinates to use as fallback (Mecca)
const DEFAULT_COORDINATES = [21.422510, 39.826168] as [number, number];

export default function ProjectLocation({ location, lat, lng, postalCode }: ProjectLocationProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polygonRef = useRef<L.Polygon | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPostalCodeInput, setShowPostalCodeInput] = useState(false);
  const [inputPostalCode, setInputPostalCode] = useState(postalCode || '');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Google Maps URL for the location
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  // Clear existing map instance
  const clearMap = () => {
    if (mapInstanceRef.current) {
      console.log("Clearing existing map instance");
      try {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = '';
        }
      } catch (e) {
        console.error("Error clearing map:", e);
      }
    }
  };

  // Create a marker at the given lat/lng
  const createMarker = (map: L.Map, latLng: [number, number], popupContent: string) => {
    if (!map) {
      console.error("Cannot create marker: map is null");
      return null;
    }
    
    try {
      // Create custom marker icon
      const markerIcon = L.divIcon({
        className: 'location-marker',
        html: `<div class="marker-pin"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#B69665" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      console.log("Creating marker at coordinates:", latLng);
      
      // Remove existing marker if there is one
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Create and add new marker
      const marker = L.marker(latLng, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`<div style="text-align: center; direction: rtl;">${popupContent}</div>`)
        .openPopup();
      
      console.log("Marker created successfully");
      return marker;
    } catch (err) {
      console.error("Error creating marker:", err);
      return null;
    }
  };

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
    if (code?.length >= 3) {
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

  // Initialize the map with a district or coordinates
  const initializeMap = (centerCoords: [number, number], district?: { name: string; arabicName: string; coords: [number, number][] }) => {
    console.log("Initializing map with center:", centerCoords, "and district:", district?.name);
    
    if (!mapContainerRef.current) {
      console.error("Map container not available");
      return false;
    }
    
    try {
      // Clear any existing map
      clearMap();
      
      // Create new map instance
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: true
      });
      
      // Add tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      mapInstanceRef.current = map;
      
      // Add district polygon if available
      if (district && district.coords && district.coords.length > 0) {
        console.log("Adding district polygon for:", district.arabicName);
        
        try {
          polygonRef.current = L.polygon(district.coords, {
            color: '#B69665',
            weight: 3,
            opacity: 0.7,
            fillColor: '#B69665',
            fillOpacity: 0.3
          }).addTo(map);
          
          // Calculate center of polygon for label
          const centerLat = district.coords.reduce((sum, coord) => sum + coord[0], 0) / district.coords.length;
          const centerLng = district.coords.reduce((sum, coord) => sum + coord[1], 0) / district.coords.length;
          
          // Add text label for district name
          const labelIcon = L.divIcon({
            className: 'district-label',
            html: `<div class="district-name">${district.arabicName}</div>`,
            iconSize: [120, 40],
            iconAnchor: [60, 20]
          });
          
          L.marker([centerLat, centerLng], { icon: labelIcon }).addTo(map);
        } catch (e) {
          console.error("Error adding district polygon:", e);
        }
      }
      
      // Add marker for exact location
      if (centerCoords) {
        markerRef.current = createMarker(map, centerCoords, location || 'الموقع');
      }
      
      // Set appropriate bounds
      if (polygonRef.current && !centerCoords[0] && !centerCoords[1]) {
        map.fitBounds(polygonRef.current.getBounds(), { padding: [50, 50] });
      }
      
      console.log("Map initialization successful");
      return true;
    } catch (err) {
      console.error("Error initializing map:", err);
      return false;
    }
  };

  // Handle postal code form submission
  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const district = findDistrictByPostalCode(inputPostalCode);
    if (district) {
      setShowPostalCodeInput(false);
      
      // Calculate center of district polygon
      const centerLat = district.coords.reduce((sum, coord) => sum + coord[0], 0) / district.coords.length;
      const centerLng = district.coords.reduce((sum, coord) => sum + coord[1], 0) / district.coords.length;
      
      // Initialize map with the district
      const success = initializeMap([centerLat, centerLng], district);
      if (!success) {
        setError("حدث خطأ أثناء تحميل الخريطة");
      }
    } else {
      setError("لم يتم العثور على منطقة لهذا الرمز البريدي");
    }
    
    setIsLoading(false);
  };

  // Set up map when component mounts
  useEffect(() => {
    console.log("ProjectLocation mounting with coordinates:", { lat, lng, postalCode });
    
    // Only run this effect once on mount
    const setupMap = async () => {
      console.log("Setting up map...");
      setIsLoading(true);
      
      try {
        // Determine coordinates to use
        let centerCoords: [number, number] | null = null;
        let district = null;
        
        // Option 1: Use lat/lng if available
        if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
          console.log("Using explicit coordinates:", lat, lng);
          centerCoords = [lat, lng];
        }
        // Option 2: Use postal code if available
        else if (postalCode) {
          console.log("Using postal code:", postalCode);
          district = findDistrictByPostalCode(postalCode);
          
          if (district) {
            console.log("Found district for postal code:", district.arabicName);
            const centerLat = district.coords.reduce((sum, coord) => sum + coord[0], 0) / district.coords.length;
            const centerLng = district.coords.reduce((sum, coord) => sum + coord[1], 0) / district.coords.length;
            centerCoords = [centerLat, centerLng];
          }
        }
        
        // If no coordinates or district found, use default
        if (!centerCoords) {
          console.log("No valid coordinates or postal code, using default");
          centerCoords = DEFAULT_COORDINATES;
          setShowPostalCodeInput(true);
        }
        
        console.log("Final coordinates for map:", centerCoords);
        
        // Wait for DOM to be ready
        setTimeout(() => {
          const success = initializeMap(centerCoords!, district);
          if (success) {
            setMapInitialized(true);
            setRetryCount(0);
            console.log("Map successfully initialized");
          } else if (retryCount < 3) {
            // Retry a few times if initialization fails
            console.log(`Map initialization failed, retrying (${retryCount + 1}/3)...`);
            setRetryCount(retryCount + 1);
            
            // Try again after a delay
            setTimeout(() => {
              setupMap();
            }, 1000);
          } else {
            console.error("Failed to initialize map after multiple attempts");
            setError("تعذر تحميل الخريطة بعد عدة محاولات");
          }
          setIsLoading(false);
        }, 100);
      } catch (err) {
        console.error("Error in map setup:", err);
        setError("حدث خطأ أثناء تحميل الخريطة");
        setIsLoading(false);
      }
    };
    
    setupMap();
    
    // Clean up on unmount
    return () => {
      clearMap();
    };
  }, []);

  // Update map when coordinates change
  useEffect(() => {
    // Skip if this is the initial render
    if (!mapInitialized) return;
    
    console.log("Coordinates changed, updating map:", { lat, lng });
    
    if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
      if (mapInstanceRef.current) {
        console.log("Updating map with new coordinates:", lat, lng);
        mapInstanceRef.current.setView([lat, lng], 15);
        
        // Update marker
        markerRef.current = createMarker(mapInstanceRef.current, [lat, lng], location || 'الموقع');
      } else {
        console.log("Map not initialized yet, creating new map with coordinates:", lat, lng);
        initializeMap([lat, lng]);
      }
    }
  }, [lat, lng, mapInitialized]);

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
      
      <div id="map-wrapper" className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg relative">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
            {error}
          </div>
        ) : (
          <div ref={mapContainerRef} id="map-container" className="w-full h-full" />
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
