
// GeoJSON data types
export interface GeoJSONFeature {
  type: "Feature";
  properties: {
    name_ar: string;
    name_en: string;
    code?: string;
    region_code?: string;
    city_code?: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Simplified GeoJSON data for key districts in Saudi Arabia
// Based on data from: https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts
export const saudiDistrictsGeoJSON: GeoJSONCollection = {
  type: "FeatureCollection",
  features: [
    // Makkah districts
    {
      type: "Feature",
      properties: {
        name_ar: "منى",
        name_en: "Mina",
        code: "MK001",
        region_code: "MK",
        city_code: "MK"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.8782, 21.4133], [39.8810, 21.4153], [39.8834, 21.4173], 
          [39.8830, 21.4124], [39.8825, 21.4099], [39.8794, 21.4079],
          [39.8763, 21.4095], [39.8773, 21.4124], [39.8782, 21.4133]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "العزيزية",
        name_en: "Al Aziziyah",
        code: "MK002",
        region_code: "MK",
        city_code: "MK"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.8410, 21.3840], [39.8470, 21.3920], [39.8430, 21.3960], 
          [39.8380, 21.3930], [39.8360, 21.3880], [39.8410, 21.3840]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "المسفلة",
        name_en: "Al Misfalah",
        code: "MK003",
        region_code: "MK",
        city_code: "MK"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.8250, 21.3911], [39.8330, 21.3930], [39.8350, 21.3870], 
          [39.8290, 21.3830], [39.8240, 21.3850], [39.8250, 21.3911]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "الحجاز",
        name_en: "Al Hajj",
        code: "MK004",
        region_code: "MK",
        city_code: "MK"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.8182, 21.4033], [39.8220, 21.4053], [39.8240, 21.4013], 
          [39.8200, 21.3993], [39.8170, 21.4013], [39.8182, 21.4033]
        ]]
      }
    },
    // Riyadh districts
    {
      type: "Feature",
      properties: {
        name_ar: "النرجس",
        name_en: "Al Narjis",
        code: "RY001",
        region_code: "RY",
        city_code: "RY"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [46.6695, 24.8230], [46.6750, 24.8310], [46.6830, 24.8240], 
          [46.6780, 24.8160], [46.6695, 24.8230]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "الملز",
        name_en: "Al Malaz",
        code: "RY002",
        region_code: "RY",
        city_code: "RY"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [46.7350, 24.6650], [46.7420, 24.6710], [46.7480, 24.6650], 
          [46.7420, 24.6590], [46.7350, 24.6650]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "السليمانية",
        name_en: "Sulaymaniyah",
        code: "RY003",
        region_code: "RY",
        city_code: "RY"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [46.7100, 24.7050], [46.7150, 24.7120], [46.7220, 24.7080], 
          [46.7170, 24.7010], [46.7100, 24.7050]
        ]]
      }
    },
    // Jeddah districts
    {
      type: "Feature",
      properties: {
        name_ar: "الروضة",
        name_en: "Al Rawdah",
        code: "JD001",
        region_code: "MK",
        city_code: "JD"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.1780, 21.5320], [39.1850, 21.5370], [39.1900, 21.5310], 
          [39.1840, 21.5260], [39.1780, 21.5320]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "حي الخالدية",
        name_en: "Al Khalidiyyah",
        code: "JD002",
        region_code: "MK",
        city_code: "JD"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.1682, 21.5433], [39.1732, 21.5483], [39.1782, 21.5413], 
          [39.1732, 21.5363], [39.1682, 21.5433]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "حي البوادي",
        name_en: "Al Bawadi",
        code: "JD003",
        region_code: "MK",
        city_code: "JD"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.8320, 21.4240], [39.8370, 21.4290], [39.8420, 21.4220], 
          [39.8370, 21.4170], [39.8320, 21.4240]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "حي الشاطئ",
        name_en: "Al Shatie",
        code: "JD004",
        region_code: "MK",
        city_code: "JD"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.1130, 21.5930], [39.1180, 21.5980], [39.1230, 21.5910], 
          [39.1180, 21.5860], [39.1130, 21.5930]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        name_ar: "حي الحمراء",
        name_en: "Al Hamra",
        code: "JD005",
        region_code: "MK",
        city_code: "JD"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.1330, 21.5730], [39.1380, 21.5780], [39.1430, 21.5710], 
          [39.1380, 21.5660], [39.1330, 21.5730]
        ]]
      }
    }
  ]
};

// Map postal codes to district codes
export const postalCodeToDistrictCode: Record<string, string> = {
  // Makkah postal codes
  '21955': 'MK001', // منى
  '21912': 'MK002', // العزيزية
  '21961': 'MK003', // المسفلة
  '21421': 'MK004', // الحجاز
  // Riyadh postal codes
  '11564': 'RY001', // النرجس
  '12627': 'RY002', // الملز
  '12211': 'RY003', // السليمانية
  // Jeddah postal codes
  '23434': 'JD001', // الروضة
  '23433': 'JD002', // حي الخالدية
  '23435': 'JD004', // حي الشاطئ
  '23436': 'JD005', // حي الحمراء
  // Additional postal codes
  '21411': 'MK002', // العزيزية
  '21442': 'MK001', // منى
  '21452': 'MK003', // المسفلة
  '11511': 'RY001', // النرجس
  '12222': 'RY003', // السليمانية
  '12344': 'JD003', // حي البوادي
  '12411': 'RY001', // النرجس
  // Fallbacks for testing
  '12345': 'RY001', // النرجس
  '54321': 'RY002', // الملز
};

// Function to find district by coordinates
export function findDistrictByCoordinates(lat: number, lng: number): GeoJSONFeature | null {
  if (!lat || !lng) return null;
  
  for (const feature of saudiDistrictsGeoJSON.features) {
    if (feature.geometry.type === "Polygon") {
      if (isPointInPolygon([lng, lat], feature.geometry.coordinates[0])) {
        return feature;
      }
    } else if (feature.geometry.type === "MultiPolygon") {
      for (const polygon of feature.geometry.coordinates) {
        if (isPointInPolygon([lng, lat], polygon[0])) {
          return feature;
        }
      }
    }
  }
  
  // If no exact match, find the closest district
  return findClosestDistrict(lat, lng);
}

// Function to find district by postal code
export function findDistrictByPostalCode(postalCode: string): GeoJSONFeature | null {
  if (!postalCode) return null;
  
  const districtCode = postalCodeToDistrictCode[postalCode];
  
  if (!districtCode) {
    // Try to match by prefix (first 3 digits)
    if (postalCode.length >= 3) {
      const prefix = postalCode.substring(0, 3);
      for (const [code, district] of Object.entries(postalCodeToDistrictCode)) {
        if (code.startsWith(prefix)) {
          return findDistrictByCode(district);
        }
      }
    }
    return null;
  }
  
  return findDistrictByCode(districtCode);
}

// Helper function to find district by its code
function findDistrictByCode(code: string): GeoJSONFeature | null {
  return saudiDistrictsGeoJSON.features.find(feature => feature.properties.code === code) || null;
}

// Helper function to find the closest district to a point
function findClosestDistrict(lat: number, lng: number): GeoJSONFeature | null {
  let closestDistrict: GeoJSONFeature | null = null;
  let minDistance = Infinity;
  
  for (const feature of saudiDistrictsGeoJSON.features) {
    // Calculate centroid of the district
    let centroid: [number, number] = [0, 0];
    
    if (feature.geometry.type === "Polygon") {
      centroid = calculatePolygonCentroid(feature.geometry.coordinates[0]);
    } else if (feature.geometry.type === "MultiPolygon") {
      centroid = calculatePolygonCentroid(feature.geometry.coordinates[0][0]);
    }
    
    // Calculate distance
    const distance = calculateDistance([lng, lat], centroid);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestDistrict = feature;
    }
  }
  
  return closestDistrict;
}

// Helper function to calculate polygon centroid
function calculatePolygonCentroid(coordinates: number[][]): [number, number] {
  const sumLng = coordinates.reduce((sum, coord) => sum + coord[0], 0);
  const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);
  return [sumLng / coordinates.length, sumLat / coordinates.length];
}

// Helper function to calculate distance between two points
function calculateDistance(point1: [number, number], point2: [number, number]): number {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + 
    Math.pow(point1[1] - point2[1], 2)
  );
}

// Helper function to check if a point is inside a polygon
function isPointInPolygon(point: [number, number], polygon: number[][]): boolean {
  // Ray casting algorithm
  const x = point[0];
  const y = point[1];
  
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];
    
    const intersect = ((yi > y) !== (yj > y)) && 
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      
    if (intersect) inside = !inside;
  }
  
  return inside;
}

// Function to generate a district around coordinates when no district is found
export function generateDistrictAroundCoordinates(lat: number, lng: number): GeoJSONFeature {
  const offset = 0.01; // About 1km
  
  return {
    type: "Feature",
    properties: {
      name_ar: `منطقة (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      name_en: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      code: "GEN001"
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [lng - offset, lat - offset],
        [lng + offset, lat - offset],
        [lng + offset, lat + offset],
        [lng - offset, lat + offset],
        [lng - offset, lat - offset]
      ]]
    }
  };
}
