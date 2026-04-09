-- ============================================================
-- Menu Matriarch — Initial Schema
-- Migrated from Firestore. See firestore-schema-map.json for
-- the source-of-truth used to design these tables.
-- ============================================================

-- ============================================================
-- USERS
-- Mirrors auth.users. Preferences are flattened to columns
-- rather than a JSON blob for easier querying and typing.
-- ============================================================
create table public.users (
  id                      uuid primary key references auth.users(id) on delete cascade,
  email                   text        not null default '',
  name                    text        not null default '',
  -- display preferences
  dark_mode               boolean     not null default false,
  day_name_display        text        not null default 'full',
  default_menu_start_day  text        not null default 'Monday',
  empty_meal_text         text        not null default 'undecided',
  meal_orientation        text        not null default 'vertical',
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- ============================================================
-- INGREDIENT TYPES
-- Grocery store aisle categories (e.g. "Dry Good", "Bread").
-- sort_order encodes the user's preferred shopping-list order
-- (Firestore: users.preferences.ingredientTypeOrder).
-- ============================================================
create table public.ingredient_types (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  name        text        not null,
  sort_order  int         not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- INGREDIENTS
-- ============================================================
create table public.ingredients (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null references public.users(id) on delete cascade,
  name                text        not null,
  ingredient_type_id  uuid        references public.ingredient_types(id) on delete set null,
  created_at          timestamptz not null default now()
);

-- ============================================================
-- TAGS
-- Applied to both dishes and meals.
-- color is a CSS value (currently unused / empty in Firestore).
-- ============================================================
create table public.tags (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  name        text        not null,
  color       text        not null default '',
  created_at  timestamptz not null default now()
);

-- ============================================================
-- DISHES
-- Core entity. type values seen: 'main', 'side', 'dessert'.
-- usages is not stored here — use the dish_usages view below.
-- ============================================================
create table public.dishes (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  name        text        not null,
  type        text        not null default 'main' constraint dishes_type_check check (type in ('main','side','dessert')),
  description text        not null default '',
  link        text        not null default '',
  notes       text        not null default '',
  favorited   boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Dish ↔ ingredient
create table public.dish_ingredients (
  dish_id       uuid not null references public.dishes(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete cascade,
  primary key (dish_id, ingredient_id)
);

-- Dish ↔ tag
create table public.dish_tags (
  dish_id uuid not null references public.dishes(id) on delete cascade,
  tag_id  uuid not null references public.tags(id) on delete cascade,
  primary key (dish_id, tag_id)
);

-- ============================================================
-- MEALS
-- Preset groupings of dishes. Used as a shortcut to add
-- multiple dishes to a menu at once. When a meal is placed on
-- a menu, the individual dishes are written to menu_entries.
-- ============================================================
create table public.meals (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  name        text        not null,
  description text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Meal ↔ dish
create table public.meal_dishes (
  meal_id    uuid not null references public.meals(id) on delete cascade,
  dish_id    uuid not null references public.dishes(id) on delete cascade,
  sort_order int  not null default 0,
  primary key (meal_id, dish_id)
);

-- Meal ↔ tag
create table public.meal_tags (
  meal_id uuid not null references public.meals(id) on delete cascade,
  tag_id  uuid not null references public.tags(id) on delete cascade,
  primary key (meal_id, tag_id)
);

-- ============================================================
-- MENUS
-- Weekly meal plans. start_day is the first day displayed
-- (e.g. 'Monday'). Contents are stored in menu_entries.
-- ============================================================
create table public.menus (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.users(id) on delete cascade,
  name        text        not null,
  favorited   boolean     not null default false,
  start_day   text        not null default 'Monday',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Menu entries — flattens the Firestore contents map
-- (day → [dishId, ...]) into individual rows.
-- day is one of: 'Monday'…'Sunday'.
-- sort_order preserves the order of dishes within a day.
create table public.menu_entries (
  id         uuid not null default gen_random_uuid(),
  menu_id    uuid not null references public.menus(id) on delete cascade,
  day        text not null constraint menu_entries_day_check check (day in ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  dish_id    uuid not null references public.dishes(id) on delete cascade,
  sort_order int  not null default 0,
  primary key (id)
);

-- ============================================================
-- INDEXES
-- ============================================================
create index on public.ingredient_types (user_id, sort_order);
create index on public.ingredients      (user_id);
create index on public.ingredients      (ingredient_type_id);
create index on public.tags             (user_id);
create index on public.dishes           (user_id);
create index on public.meals            (user_id);
create index on public.menus            (user_id);
create index on public.menu_entries        (menu_id, day);
create index on public.menu_entries        (dish_id);
create unique index on public.menu_entries (menu_id, day, dish_id);

-- ============================================================
-- COMPUTED VIEW: dish usages
-- Replaces the denormalized dishes.usages counter from
-- Firestore. Returns the total number of times each dish
-- appears across all menu entries (not distinct menus).
-- e.g. a dish on Friday AND Saturday of the same menu = 2.
-- ============================================================
create view public.dish_usages as
  select
    dish_id,
    count(*)::int as usages
  from public.menu_entries
  group by dish_id;

-- ============================================================
-- updated_at trigger function
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.users
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.dishes
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.meals
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.menus
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================
alter table public.users            enable row level security;
alter table public.ingredient_types enable row level security;
alter table public.ingredients      enable row level security;
alter table public.tags             enable row level security;
alter table public.dishes           enable row level security;
alter table public.dish_ingredients enable row level security;
alter table public.dish_tags        enable row level security;
alter table public.meals            enable row level security;
alter table public.meal_dishes      enable row level security;
alter table public.meal_tags        enable row level security;
alter table public.menus            enable row level security;
alter table public.menu_entries     enable row level security;

-- users: own row only
create policy "users: own row" on public.users
  for all
  using      (auth.uid() = id)
  with check (auth.uid() = id);

-- ingredient_types: own rows only
create policy "ingredient_types: own rows" on public.ingredient_types
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ingredients: own rows only
create policy "ingredients: own rows" on public.ingredients
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- tags: own rows only
create policy "tags: own rows" on public.tags
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- dishes: own rows only
create policy "dishes: own rows" on public.dishes
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- dish_ingredients: accessible if the dish belongs to the user
create policy "dish_ingredients: via dish ownership" on public.dish_ingredients
  for all
  using (
    exists (
      select 1 from public.dishes
      where dishes.id = dish_ingredients.dish_id
        and dishes.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.dishes
      where dishes.id = dish_ingredients.dish_id
        and dishes.user_id = auth.uid()
    )
  );

-- dish_tags: accessible if the dish belongs to the user
create policy "dish_tags: via dish ownership" on public.dish_tags
  for all
  using (
    exists (
      select 1 from public.dishes
      where dishes.id = dish_tags.dish_id
        and dishes.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.dishes
      where dishes.id = dish_tags.dish_id
        and dishes.user_id = auth.uid()
    )
  );

-- meals: own rows only
create policy "meals: own rows" on public.meals
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- meal_dishes: accessible if the meal belongs to the user
create policy "meal_dishes: via meal ownership" on public.meal_dishes
  for all
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_dishes.meal_id
        and meals.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.meals
      where meals.id = meal_dishes.meal_id
        and meals.user_id = auth.uid()
    )
  );

-- meal_tags: accessible if the meal belongs to the user
create policy "meal_tags: via meal ownership" on public.meal_tags
  for all
  using (
    exists (
      select 1 from public.meals
      where meals.id = meal_tags.meal_id
        and meals.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.meals
      where meals.id = meal_tags.meal_id
        and meals.user_id = auth.uid()
    )
  );

-- menus: own rows only
create policy "menus: own rows" on public.menus
  for all
  using      (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- menu_entries: accessible if the menu belongs to the user
create policy "menu_entries: via menu ownership" on public.menu_entries
  for all
  using (
    exists (
      select 1 from public.menus
      where menus.id = menu_entries.menu_id
        and menus.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.menus
      where menus.id = menu_entries.menu_id
        and menus.user_id = auth.uid()
    )
  );
