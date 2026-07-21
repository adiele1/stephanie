-- Glowith data model — reflects what's actually applied to the live Supabase project
-- (id: mlwhcajzvinmonlnoabo, "glowith", us-east-1). Kept in sync with migrations, not
-- just a planning draft anymore.
--
-- Open items still pending before this is final:
--   - sessions.skin_tone / undertone: placement (per-session vs. cached on users) depends
--     on the look-rendering spike — auto-detect accuracy may mean it belongs on users too
--     once validated.
--   - products.available_regions starts empty (= treat as globally available) since we're
--     seeding the catalog via manual web research, not a real affiliate network yet. Once
--     on a real affiliate program, regional splits usually come from that program directly.
--
-- RLS: enabled on every table (see migration 2). users/device_tokens/sessions are
-- owner-only (auth.uid() match); looks/look_steps/products/look_step_products are
-- read-only catalog content for any authenticated user; friend_shares is sender-only;
-- friend_reactions has RLS enabled with ZERO client policies on purpose — that flow is
-- anonymous-friend-facing, so it's only ever written via a service-role Edge Function.

create extension if not exists "pgcrypto"; -- gen_random_uuid()

create table users (
  id uuid primary key references auth.users(id) on delete cascade, -- IS the Supabase Auth user id
  phone text not null unique,               -- E.164, primary identity (SMS OTP via Supabase Auth)
  email text,
  skin_type text check (skin_type in ('oily','dry','combination','normal','sensitive')),
  skill_level text check (skill_level in ('beginner','intermediate','advanced')),
  profession text,
  region text,                              -- ISO 3166-1 alpha-2. Default-filled from the phone number's
                                             -- country code (or device locale) but user-editable — the
                                             -- phone country code alone is not reliable enough to gate
                                             -- purchasability on (expats, VOIP numbers, travel).
  created_at timestamptz not null default now()
);

create table device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  platform text not null check (platform in ('ios','android')),
  token text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, token)
);

create table looks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  occasion_tags text[] not null default '{}',
  style_tags text[] not null default '{}',
  color_palette jsonb,                      -- per-facial-region color recipe used by the canvas renderer
  coverage_level text check (coverage_level in ('light','medium','full')),
  estimated_minutes int,
  step_count int,
  preview_asset_url text,
  created_at timestamptz not null default now()
);

create table look_steps (
  id uuid primary key default gen_random_uuid(),
  look_id uuid not null references looks(id) on delete cascade,
  step_order int not null,
  product_category text not null,           -- foundation | concealer | eyes | brows | lips
  instruction_text text not null,
  technique_tip text,
  unique (look_id, step_order)
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text not null,
  shade_match_range jsonb,                  -- tone/undertone range this shade suits
  tier text not null check (tier in ('drugstore','mid','luxury')),
  price numeric(10,2),
  currency text not null default 'USD',
  affiliate_url text,                       -- plain retailer link for now; swap in a real affiliate
                                             -- link once a program is set up, schema doesn't change
  image_url text,
  available_regions text[] not null default '{}', -- ISO 3166-1 alpha-2; empty = globally available
  created_at timestamptz not null default now()
);

create table look_step_products (
  look_step_id uuid not null references look_steps(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  primary key (look_step_id, product_id)
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  occasion text not null,                   -- preset value, or free text when occasion = 'other'
  occasion_other text,
  photo_asset_url text,                     -- final rendered/selected asset only — raw MediaPipe
                                             -- landmark coordinates never get persisted server-side
  skin_tone text,                           -- auto-sampled from the selfie, user-editable via swatch
  undertone text check (undertone in ('warm','cool','neutral')),
  selected_look_id uuid references looks(id),
  status text not null default 'in_progress' check (status in ('in_progress','completed')),
  current_step int not null default 0,
  rating int check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table friend_shares (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  sender_user_id uuid not null references users(id) on delete cascade,
  look_ids uuid[] not null,
  share_token text not null unique,
  created_at timestamptz not null default now()
);

create table friend_reactions (
  id uuid primary key default gen_random_uuid(),
  friend_share_id uuid not null references friend_shares(id) on delete cascade,
  friend_phone text not null,               -- E.164, normalized. Needs a retention/deletion policy
                                             -- for numbers that never convert to an installed user.
  picked_look_id uuid references looks(id),
  note text,
  created_at timestamptz not null default now()
);

create index on look_steps (look_id, step_order);
create index on sessions (user_id, status);
create index on friend_shares (share_token);
create index on friend_reactions (friend_share_id);

-- Row Level Security ---------------------------------------------------------

alter table users enable row level security;
create policy "users select own" on users for select to authenticated using (auth.uid() = id);
create policy "users insert own" on users for insert to authenticated with check (auth.uid() = id);
create policy "users update own" on users for update to authenticated using (auth.uid() = id);

alter table device_tokens enable row level security;
create policy "device_tokens select own" on device_tokens for select to authenticated using (auth.uid() = user_id);
create policy "device_tokens insert own" on device_tokens for insert to authenticated with check (auth.uid() = user_id);
create policy "device_tokens update own" on device_tokens for update to authenticated using (auth.uid() = user_id);
create policy "device_tokens delete own" on device_tokens for delete to authenticated using (auth.uid() = user_id);

alter table sessions enable row level security;
create policy "sessions select own" on sessions for select to authenticated using (auth.uid() = user_id);
create policy "sessions insert own" on sessions for insert to authenticated with check (auth.uid() = user_id);
create policy "sessions update own" on sessions for update to authenticated using (auth.uid() = user_id);

alter table looks enable row level security;
create policy "looks readable" on looks for select to authenticated using (true);

alter table look_steps enable row level security;
create policy "look_steps readable" on look_steps for select to authenticated using (true);

alter table products enable row level security;
create policy "products readable" on products for select to authenticated using (true);

alter table look_step_products enable row level security;
create policy "look_step_products readable" on look_step_products for select to authenticated using (true);

alter table friend_shares enable row level security;
create policy "friend_shares select own" on friend_shares for select to authenticated using (auth.uid() = sender_user_id);
create policy "friend_shares insert own" on friend_shares for insert to authenticated with check (auth.uid() = sender_user_id);

-- friend_reactions: RLS enabled, deliberately zero policies (Edge Function / service role only)
alter table friend_reactions enable row level security;
