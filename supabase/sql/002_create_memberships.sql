create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),

  user_id text not null unique,

  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,

  status text not null default 'free',
  current_period_end timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists memberships_user_id_idx
on public.memberships (user_id);

create index if not exists memberships_status_idx
on public.memberships (status);

create or replace function public.set_memberships_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists memberships_set_updated_at on public.memberships;

create trigger memberships_set_updated_at
before update on public.memberships
for each row
execute function public.set_memberships_updated_at();
