
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const districtLayer = useRef<L.Polygon | null>(null);
  const [districtName, setDistrictName] = useState<string>(location);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  // Function to generate a polygon shape for the district
  const createDistrictPolygon = (centerLat: number, centerLng: number) => {
    // This creates a random polygon shape to simulate district boundaries
    // In a real application, you would fetch actual district GeoJSON data
    const points = 8;
    const radius = 800; // meters
    const irregularity = 0.4; // 0-1, how irregular the shape is
    
    const angleStep = (Math.PI * 2) / points;
    const coords = [];
    
    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const radiusVariation = (1 - (Math.random() * irregularity * 2));
      const currentRadius = radius * radiusVariation;
      
      // Calculate point coordinates
      const x = centerLng + (Math.cos(angle) * currentRadius / 111320); // 1 degree ~ 111,320 meters
      const y = centerLat + (Math.sin(angle) * currentRadius / (111320 * Math.cos(centerLat * (Math.PI / 180))));
      
      coords.push([y, x]);
    }
    
    // Close the polygon
    coords.push(coords[0]);
    
    return coords;
  };

  // Make mock API call to get district data
  const fetchDistrictData = async (lat: number, lng: number) => {
    // In a real application, you would make an API call to a service like OpenStreetMap, MapBox, or Google Maps
    // to get the actual district data for the given coordinates
    
    // For now, we'll simulate a response with the district name in both English and Arabic
    const districts = [
      { name: "حي النرجس", name_en: "Al Narjis District" },
      { name: "حي العزيزية", name_en: "Al Aziziyah District" },
      { name: "حي الشرائع", name_en: "Al Sharaie District" },
      { name: "حي المسفلة", name_en: "Al Misfalah District" },
      { name: "حي منى", name_en: "Mina District" },
      { name: "حي الخضراء", name_en: "Al Khadra District" },
      { name: "حي حراء", name_en: "Hira District" }
    ];
    
    // Randomly select a district (in a real app, this would be determined by the coordinates)
    const randomIndex = Math.floor(Math.random() * districts.length);
    const selectedDistrict = location.includes("مكة") ? districts[randomIndex] : { name: location, name_en: location };
    
    // Generate polygon coordinates for this district
    const polygonCoords = createDistrictPolygon(lat, lng);
    
    return {
      name: selectedDistrict.name,
      name_en: selectedDistrict.name_en,
      coordinates: polygonCoords
    };
  };

  useEffect(() => {
    if (!mapContainer.current || !lat || !lng) return;

    const initializeMap = async () => {
      // Initialize map if it doesn't exist
      if (!mapInstance.current) {
        const map = L.map(mapContainer.current, {
          center: [lat, lng],
          zoom: 14,
          scrollWheelZoom: false,
          zoomControl: true,
          attributionControl: true,
        });

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=0xThwp5hzLtXF2Nvi1LZ&language=ar', {
          attribution: '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          maxZoom: 18,
        }).addTo(map);

        mapInstance.current = map;
        
        // Fetch district data
        const districtData = await fetchDistrictData(lat, lng);
        setDistrictName(districtData.name);
        
        // Create district polygon
        const districtStyle = {
          color: '#e74c3c',
          weight: 3,
          opacity: 0.7,
          fillColor: '#B69665',
          fillOpacity: 0.3,
          dashArray: '5, 5',
        };
        
        const polygon = L.polygon(districtData.coordinates as L.LatLngExpression[], districtStyle).addTo(map);
        districtLayer.current = polygon;
        
        // Center and zoom the map to fit the polygon
        map.fitBounds(polygon.getBounds());
        
        // Add the district name as a label
        const bounds = polygon.getBounds();
        const center = bounds.getCenter();
        
        // Create a custom div icon with the district name
        const divIcon = L.divIcon({
          className: 'district-label-icon',
          html: `<div class="district-label">${districtData.name}</div>`,
          iconSize: [200, 40],
          iconAnchor: [100, 20]
        });
        
        L.marker(center, { 
          icon: divIcon, 
          interactive: false, 
          zIndexOffset: 1000 
        }).addTo(map);
      } else {
        // Update existing map
        mapInstance.current.setView([lat, lng], 14);
        
        // Remove old district layer
        if (districtLayer.current) {
          districtLayer.current.remove();
        }
        
        // Create new district layer
        const districtData = await fetchDistrictData(lat, lng);
        setDistrictName(districtData.name);
        
        const districtStyle = {
          color: '#e74c3c',
          weight: 3,
          opacity: 0.7,
          fillColor: '#B69665',
          fillOpacity: 0.3,
          dashArray: '5, 5',
        };
        
        const polygon = L.polygon(districtData.coordinates as L.LatLngExpression[], districtStyle).addTo(mapInstance.current);
        districtLayer.current = polygon;
        
        // Update center and zoom
        mapInstance.current.fitBounds(polygon.getBounds());
        
        // Update the district name label
        const bounds = polygon.getBounds();
        const center = bounds.getCenter();
        
        const divIcon = L.divIcon({
          className: 'district-label-icon',
          html: `<div class="district-label">${districtData.name}</div>`,
          iconSize: [200, 40],
          iconAnchor: [100, 20]
        });
        
        L.marker(center, { 
          icon: divIcon, 
          interactive: false, 
          zIndexOffset: 1000 
        }).addTo(mapInstance.current);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        districtLayer.current = null;
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
      <p className="text-gray-600 mb-4">{districtName}</p>
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
        .district-label-icon {
          background: none;
          border: none;
        }
        .district-label {
          white-space: nowrap;
          color: #000;
          font-weight: bold;
          font-size: 1.2rem;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 6px 12px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          direction: rtl;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          border: 2px solid #B69665;
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
