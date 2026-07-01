create table if not exists public.wine_journal (
  id uuid primary key default gen_random_uuid(),

  user_id text not null,
  wine_id text not null,

  favorite boolean not null default false,
  tasted boolean not null default false,
  buy_again boolean not null default false,
  gift boolean not null default false,
  avoid boolean not null default false,

  rating numeric(2,1) check (rating is null or (rating >= 0 and rating <= 5)),
  note text,
  tasted_at date,
  location text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint wine_journal_user_wine_unique unique (user_id, wine_id)
);

create index if not exists wine_journal_user_id_idx
on public.wine_journal (user_id);

create index if not exists wine_journal_wine_id_idx
on public.wine_journal (wine_id);

create index if not exists wine_journal_user_favorite_idx
on public.wine_journal (user_id, favorite);

create index if not exists wine_journal_user_tasted_idx
on public.wine_journal (user_id, tasted);

create or replace function public.set_wine_journal_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists wine_journal_set_updated_at on public.wine_journal;

create trigger wine_journal_set_updated_at
before update on public.wine_journal
for each row
execute function public.set_wine_journal_updated_at();

alter table public.wine_journal enable row level security;

drop policy if exists "Users can read their own wine journal" on public.wine_journal;
drop policy if exists "Users can insert their own wine journal" on public.wine_journal;
drop policy if exists "Users can update their own wine journal" on public.wine_journal;
drop policy if exists "Users can delete their own wine journal" on public.wine_journal;

create policy "Users can read their own wine journal"
on public.wine_journal
for select
using (auth.jwt() ->> 'sub' = user_id);

create policy "Users can insert their own wine journal"
on public.wine_journal
for insert
with check (auth.jwt() ->> 'sub' = user_id);

create policy "Users can update their own wine journal"
on public.wine_journal
for update
using (auth.jwt() ->> 'sub' = user_id)
with check (auth.jwt() ->> 'sub' = user_id);

create policy "Users can delete their own wine journal"
on public.wine_journal
for delete
using (auth.jwt() ->> 'sub' = user_id);
