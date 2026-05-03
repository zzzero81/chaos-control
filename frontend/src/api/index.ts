const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'MAYHEM' | 'ARSENAL' | 'GRAFFITI';
  image_url: string;
  created_at: string;
}

export interface CrewMember {
  id: string;
  name: string;
  threat_level: number;
  status: string;
  color: 'cyan' | 'pink' | 'red';
  badge: string;
  image_url: string;
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  image_url: string;
  color: 'cyan' | 'pink';
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  progress: number;
  color: 'cyan' | 'pink';
}

export interface Enlistment {
  id: string;
  alias: string;
  specialty: 'explosives' | 'sniping' | 'hacking' | 'chaos';
  manifesto: string;
  created_at: string;
}

// Gallery API
export const galleryApi = {
  getAll: async (): Promise<GalleryItem[]> => {
    const res = await fetch(`${API_URL}/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  },
  getByCategory: async (category: string): Promise<GalleryItem[]> => {
    const res = await fetch(`${API_URL}/gallery/${category}`);
    if (!res.ok) throw new Error('Failed to fetch gallery by category');
    return res.json();
  },
};

// Crew API
export const crewApi = {
  getAll: async (): Promise<CrewMember[]> => {
    const res = await fetch(`${API_URL}/crew`);
    if (!res.ok) throw new Error('Failed to fetch crew');
    return res.json();
  },
};

// Weapons API
export const weaponsApi = {
  getAll: async (): Promise<Weapon[]> => {
    const res = await fetch(`${API_URL}/weapons`);
    if (!res.ok) throw new Error('Failed to fetch weapons');
    return res.json();
  },
};

// Stats API
export const statsApi = {
  getAll: async (): Promise<Stat[]> => {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
};

// Enlistment API
export const enlistApi = {
  submit: async (data: { alias: string; specialty: string; manifesto: string }): Promise<Enlistment> => {
    const res = await fetch(`${API_URL}/enlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit enlistment');
    return res.json();
  },
};
