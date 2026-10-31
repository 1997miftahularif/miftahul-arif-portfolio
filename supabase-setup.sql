-- Jalankan sekali di Supabase → SQL Editor
create table if not exists public.visits (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  visitor_id  text,
  path        text,
  referrer    text,
  country     text,
  region      text,
  city        text,
  device      text
);
create index if not exists visits_created_at_idx on public.visits (created_at desc);

-- RLS aktif tanpa policy = tidak ada yang bisa akses dari browser/anon key.
-- Hanya fungsi server (service-role key) yang bisa menulis & membaca.
alter table public.visits enable row level security;
