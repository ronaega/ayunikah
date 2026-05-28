create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
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

create table if not exists public.app_state (
  user_id uuid primary key references public.users(id) on delete cascade,
  couple_id uuid references public.couples(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default now()
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

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update set email = excluded.email;

  insert into public.couples (user_id, wedding_date)
  values (new.id, '2027-05-27')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.users enable row level security;
alter table public.couples enable row level security;
alter table public.profiles enable row level security;
alter table public.budget_items enable row level security;
alter table public.course_progress enable row level security;
alter table public.invitees enable row level security;
alter table public.invitations enable row level security;
alter table public.notifications enable row level security;
alter table public.reminders enable row level security;
alter table public.tasks enable row level security;
alter table public.ai_logs enable row level security;
alter table public.app_state enable row level security;

drop policy if exists "Users can manage own user row" on public.users;
create policy "Users can manage own user row" on public.users
for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can manage own couple" on public.couples;
create policy "Users can manage own couple" on public.couples
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can read budget categories" on public.budget_categories;
create policy "Users can read budget categories" on public.budget_categories
for select using (auth.role() = 'authenticated');

drop policy if exists "Users can manage own profiles" on public.profiles;
create policy "Users can manage own profiles" on public.profiles
for all
using (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()));

drop policy if exists "Users can manage own budget items" on public.budget_items;
create policy "Users can manage own budget items" on public.budget_items
for all
using (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()));

drop policy if exists "Users can manage own invitees" on public.invitees;
create policy "Users can manage own invitees" on public.invitees
for all
using (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()));

drop policy if exists "Users can manage own invitation" on public.invitations;
create policy "Users can manage own invitation" on public.invitations
for all
using (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.couples c where c.id = couple_id and c.user_id = auth.uid()));

drop policy if exists "Users can manage own app state" on public.app_state;
create policy "Users can manage own app state" on public.app_state
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own notifications" on public.notifications;
create policy "Users can manage own notifications" on public.notifications
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own course progress" on public.course_progress;
create policy "Users can manage own course progress" on public.course_progress
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
