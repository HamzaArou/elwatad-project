
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
}

interface ProjectsMapProps {
  projects: Project[];
}

const ProjectsMap = ({ projects }: ProjectsMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const validProjects = projects.filter(p => p.lat && p.lng);
    if (validProjects.length === 0) return;

    // Calculate bounds from valid projects
    const bounds = validProjects.reduce((bounds, project) => {
      if (project.lat && project.lng) {
        bounds.push([project.lat, project.lng]);
      }
      return bounds;
    }, [] as [number, number][]);

    // Initialize map only if container exists and map hasn't been initialized
    const map = L.map(mapContainerRef.current, {
      center: [24.7136, 46.6753], // Default to Riyadh coordinates
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each project with valid coordinates
    validProjects.forEach(project => {
      if (project.lat && project.lng) {
        const marker = L.marker([project.lat, project.lng])
          .addTo(map)
          .bindPopup(project.name)
          .on('click', () => {
            navigate(`/project/${project.id}`);
          });
      }
    });

    // Fit bounds if we have valid coordinates
    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }

    mapRef.current = map;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [projects, navigate]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-[400px] rounded-lg overflow-hidden"
      style={{ visibility: mapContainerRef.current ? 'visible' : 'hidden' }}
    />
  );
};

export default ProjectsMap;
