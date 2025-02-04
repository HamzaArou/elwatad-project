
export type ProjectStatus = 'فيلا' | 'شقة' | 'روف' | 'أرض';

export interface Project {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  floors: number;
  units: number;
  thumbnail_url: string | null;
  description: string | null;
  features: string[] | null;
  specifications: string[] | null;
  plans: string[] | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  gallery_type: 'images' | 'coming_soon' | null;
  created_at: string;
}

export interface ProjectUnit {
  id: string;
  project_id: string;
  unit_number: number;
  name: string;
  status: string;
  unit_type: string;
  area: number;
  floor_number: number;
  side: string;
  rooms: number;
  bathrooms: number;
  details: {
    features?: string[];
    guarantees?: string[];
    specifications?: string[];
  } | null;
  created_at: string;
}

export interface ProjectGallery {
  id: string;
  project_id: string;
  media_url: string;
  content_type: string;
  media_type: string;
  created_at: string;
}

export interface ProjectDetails {
  id: string;
  project_id: string;
  views360: any[] | null;
  features: string[] | null;
  specifications: string[] | null;
  created_at: string;
}
