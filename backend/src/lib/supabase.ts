import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials not set. Using mock data.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions
export type GalleryItem = {
  id: string;
  title: string;
  category: 'MAYHEM' | 'ARSENAL' | 'GRAFFITI';
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type CrewMember = {
  id: string;
  name: string;
  threat_level: number;
  status: string;
  color: 'cyan' | 'pink' | 'red';
  badge: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type Weapon = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  color: 'cyan' | 'pink';
  created_at: string;
  updated_at: string;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
  progress: number;
  color: 'cyan' | 'pink';
  created_at: string;
  updated_at: string;
};

export type Enlistment = {
  id: string;
  alias: string;
  specialty: 'explosives' | 'sniping' | 'hacking' | 'chaos';
  manifesto: string;
  created_at: string;
};
