
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Script from "@/components/ui/script";

interface ProjectLocationProps {
  location: string;
  lat?: number | null;
  lng?: number | null;
}

export default function ProjectLocation({ location, lat, lng }: ProjectLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [districtName, setDistrictName] = useState<string>(location);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const districtPolygon = useRef<google.maps.Polygon | null>(null);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Saudi Arabia")}`;

  // Initialize and setup the map
  const initializeMap = () => {
    if (!mapContainer.current || !lat || !lng || !window.google) return;

    const center = new google.maps.LatLng(lat, lng);
    
    // Create the map
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      scrollwheel: false,
      gestureHandling: 'cooperative',
      styles: [
        { 
          featureType: "administrative",
          elementType: "labels.text",
          stylers: [{ color: "#333333" }]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "administrative.locality",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };

    // Create map instance
    mapInstance.current = new google.maps.Map(mapContainer.current, mapOptions);

    // Get district information using Geocoding API
    getDistrictInfo(lat, lng);
  };

  // Get district information from latitude and longitude
  const getDistrictInfo = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results) {
        // Process through results to find district/neighborhood level
        let district = "";
        let foundDistrict = false;
        
        // Find the most specific area (neighborhood or sublocality)
        for (const result of results) {
          // Check for neighborhood first (most specific)
          for (const component of result.address_components) {
            if (component.types.includes("neighborhood")) {
              district = component.long_name;
              foundDistrict = true;
              break;
            }
          }
          
          // If no neighborhood found, check for sublocality
          if (!foundDistrict) {
            for (const component of result.address_components) {
              if (component.types.includes("sublocality") || 
                  component.types.includes("sublocality_level_1")) {
                district = component.long_name;
                foundDistrict = true;
                break;
              }
            }
          }
          
          if (foundDistrict) break;
        }
        
        // If still no district found, use locality or administrative_area_level_3
        if (!foundDistrict) {
          for (const result of results) {
            for (const component of result.address_components) {
              if (component.types.includes("locality") || 
                  component.types.includes("administrative_area_level_3")) {
                district = component.long_name;
                foundDistrict = true;
                break;
              }
            }
            if (foundDistrict) break;
          }
        }
        
        // Update district name if found
        if (district) {
          setDistrictName(district);
        }
        
        // Try to find the district boundary using the Places API
        fetchDistrictBoundary(district || location, lat, lng);
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };
  
  // Fetch the boundary of the district and display it on the map
  const fetchDistrictBoundary = (districtName: string, lat: number, lng: number) => {
    if (!mapInstance.current) return;
    
    // For now, simulate district boundary with an irregular polygon
    // In production, you would use the Google Maps Data Layer or Geometry Library
    // to fetch actual boundaries through the Places API
    
    const center = new google.maps.LatLng(lat, lng);
    
    // Create an irregular polygon around the center
    // This is a placeholder - real implementation would use actual district boundaries
    const points = 8;
    const radius = 800; // meters
    const irregularity = 0.4; // 0-1, how irregular the shape is
    
    const polygonCoords: google.maps.LatLngLiteral[] = [];
    const angleStep = (Math.PI * 2) / points;
    
    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const radiusVariation = (1 - (Math.random() * irregularity * 2));
      const currentRadius = radius * radiusVariation;
      
      // Calculate point coordinates
      const x = lng + (Math.cos(angle) * currentRadius / 111320); // 1 degree ~ 111,320 meters
      const y = lat + (Math.sin(angle) * currentRadius / (111320 * Math.cos(lat * (Math.PI / 180))));
      
      polygonCoords.push({ lat: y, lng: x });
    }
    
    // Close the polygon
    polygonCoords.push(polygonCoords[0]);
    
    // Remove existing polygon if any
    if (districtPolygon.current) {
      districtPolygon.current.setMap(null);
    }
    
    // Create new polygon
    districtPolygon.current = new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: "#e74c3c",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#B69665",
      fillOpacity: 0.35,
      map: mapInstance.current,
      geodesic: true
    });
    
    // Fit bounds to the polygon
    const bounds = new google.maps.LatLngBounds();
    polygonCoords.forEach(coord => bounds.extend(new google.maps.LatLng(coord.lat, coord.lng)));
    mapInstance.current.fitBounds(bounds);
    
    // Add a label for the district
    new google.maps.Marker({
      position: bounds.getCenter(),
      map: mapInstance.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 0, // Makes the marker itself invisible
      },
      label: {
        text: districtName,
        color: "#000000",
        fontWeight: "bold",
        fontSize: "16px",
        className: "district-label"
      }
    });
  };

  useEffect(() => {
    if (mapLoaded && lat && lng) {
      initializeMap();
    }
    
    // Cleanup
    return () => {
      if (districtPolygon.current) {
        districtPolygon.current.setMap(null);
      }
    };
  }, [mapLoaded, lat, lng, location]);

  return (
    <div className="space-y-4">
      <Script 
        src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`}
        onLoad={() => setMapLoaded(true)}
      />
      
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
        .district-label {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 6px 12px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          direction: rtl;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
          border: 2px solid #B69665;
          z-index: 1000;
        }
        .district-label-container {
          white-space: nowrap;
          color: #000;
          font-weight: bold;
          font-size: 1.2rem;
          text-align: center;
          direction: rtl;
        }
      `}</style>
    </div>
  );
}
