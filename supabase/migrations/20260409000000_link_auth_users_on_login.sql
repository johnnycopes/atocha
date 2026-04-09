-- When a migrated user first signs in via Google OAuth, Supabase creates a new
-- auth user with a new UUID. This migration ensures their seeded data (which
-- was imported using a deterministic UUID derived from their Firebase UID) gets
-- automatically re-keyed to the real Supabase UUID on first login.
--
-- Step 1: Add ON UPDATE CASCADE to all FK columns that reference users.id so
-- that updating users.id propagates automatically to every child table.

alter table public.ingredient_types
  drop constraint ingredient_types_user_id_fkey,
  add constraint ingredient_types_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

alter table public.ingredients
  drop constraint ingredients_user_id_fkey,
  add constraint ingredients_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

alter table public.tags
  drop constraint tags_user_id_fkey,
  add constraint tags_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

alter table public.dishes
  drop constraint dishes_user_id_fkey,
  add constraint dishes_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

alter table public.meals
  drop constraint meals_user_id_fkey,
  add constraint meals_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

alter table public.menus
  drop constraint menus_user_id_fkey,
  add constraint menus_user_id_fkey
    foreign key (user_id) references public.users(id)
    on delete cascade on update cascade;

-- Step 2: Trigger function — fires after a new auth.users row is inserted
-- (i.e. on every sign-in that creates a new auth user). If the incoming
-- email already has a public.users row with a different id (the seeded
-- deterministic UUID), update users.id to the new auth UUID. The ON UPDATE
-- CASCADE constraints above propagate the change to all child tables.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  old_id uuid;
begin
  -- Look up an existing public.users row with the same email but a different
  -- id (the deterministic UUID from the Firestore seed). If found, re-key it
  -- to the real Supabase auth UUID so all child data follows via CASCADE.
  select id into old_id
  from public.users
  where email = new.email
    and id <> new.id;

  if old_id is not null then
    -- Re-key the public user row; ON UPDATE CASCADE handles child tables.
    update public.users set id = new.id where id = old_id;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();
