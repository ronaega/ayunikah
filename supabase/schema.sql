create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  wedding_date date,
  created_at timestamp with time zone default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  role text check (role in ('groom', 'bride')),
  full_name text,
  nickname text,
  birth_date date,
  occupation text,
  address text,
  phone text,
  social_media text,
  notes text,
  photo_url text,
  created_at timestamp with time zone default now(),
  unique (couple_id, role)
);

create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  category_id uuid references public.budget_categories(id),
  item_name text not null,
  estimated_budget numeric default 0,
  actual_budget numeric default 0,
  status text check (status in ('Paid', 'Deposit Paid', 'Unpaid')) default 'Unpaid',
  due_date date,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  category text check (category in ('Groom Only', 'Bride Only', 'Couple Together')),
  title text not null,
  description text,
  thumbnail text,
  curriculum jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  progress integer default 0,
  completed boolean default false,
  updated_at timestamp with time zone default now(),
  unique (user_id, course_id)
);

create table if not exists public.invitees (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  name text not null,
  phone text,
  address text,
  rsvp_status text check (rsvp_status in ('Attending', 'Declined', 'Pending')) default 'Pending',
  attendance_status text check (attendance_status in ('Confirmed', 'Unconfirmed')) default 'Unconfirmed',
  group_name text check (group_name in ('Family', 'Friends', 'VIP')) default 'Friends',
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  theme text,
  primary_color text,
  font_family text,
  background_music boolean default true,
  music_url text,
  story text,
  confirmed boolean default false,
  created_at timestamp with time zone default now(),
  unique (couple_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  description text,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  title text not null,
  due_at timestamp with time zone,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid references public.couples(id) on delete cascade,
  title text not null,
  module text,
  completed boolean default false,
  due_date date,
  created_at timestamp with time zone default now()
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  prompt text,
  response text,
  created_at timestamp with time zone default now()
);

insert into public.budget_categories (name)
values
  ('Venue'),
  ('Catering'),
  ('Decoration'),
  ('Outfit'),
  ('Makeup'),
  ('Documentation'),
  ('Souvenir'),
  ('Transportation'),
  ('Entertainment'),
  ('Other')
on conflict (name) do nothing;
