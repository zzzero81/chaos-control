-- Chaos Control Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Gallery Items
create table gallery_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null check (category in ('MAYHEM', 'ARSENAL', 'GRAFFITI')),
  image_url text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Crew Members
create table crew_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  threat_level int not null check (threat_level between 1 and 5),
  status text not null,
  color text not null check (color in ('cyan', 'pink', 'red')),
  badge text not null,
  image_url text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Weapons / Arsenal
create table weapons (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  image_url text not null,
  color text not null check (color in ('cyan', 'pink')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Stats / Dossier
create table stats (
  id uuid default uuid_generate_v4() primary key,
  label text not null,
  value text not null,
  progress int not null check (progress between 0 and 100),
  color text not null check (color in ('cyan', 'pink')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enlistments (form submissions)
create table enlistments (
  id uuid default uuid_generate_v4() primary key,
  alias text not null,
  specialty text not null check (specialty in ('explosives', 'sniping', 'hacking', 'chaos')),
  manifesto text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (public read, authenticated write)
alter table gallery_items enable row level security;
alter table crew_members enable row level security;
alter table weapons enable row level security;
alter table stats enable row level security;
alter table enlistments enable row level security;

-- Public read policies
create policy "Gallery items are viewable by everyone"
  on gallery_items for select using (true);

create policy "Crew members are viewable by everyone"
  on crew_members for select using (true);

create policy "Weapons are viewable by everyone"
  on weapons for select using (true);

create policy "Stats are viewable by everyone"
  on stats for select using (true);

-- Enlistments: anyone can insert (public form)
create policy "Anyone can submit enlistment"
  on enlistments for insert with check (true);

-- Functions to auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_gallery_items_updated_at before update on gallery_items
  for each row execute function update_updated_at_column();

create trigger update_crew_members_updated_at before update on crew_members
  for each row execute function update_updated_at_column();

create trigger update_weapons_updated_at before update on weapons
  for each row execute function update_updated_at_column();

create trigger update_stats_updated_at before update on stats
  for each row execute function update_updated_at_column();
