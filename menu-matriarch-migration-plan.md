# Menu Matriarch — Firebase → Supabase Migration Plan

## Executive Summary

This document outlines a phased migration strategy for moving Menu Matriarch from Firebase to Supabase. The plan prioritizes zero downtime, data integrity, and incremental rollout so features can be migrated and validated one at a time without disrupting users.

---

## 1. Audit & Discovery

Before writing any migration code, map every Firebase service currently in use and its Supabase equivalent.

| Firebase Service | Likely Usage in Menu Matriarch | Supabase Equivalent |
|---|---|---|
| Firebase Auth | User sign-up/login (email, Google, Apple) | Supabase Auth (GoTrue) |
| Cloud Firestore | Recipes, menus, meal plans, user profiles, shopping lists | PostgreSQL with Row-Level Security (RLS) |
| Cloud Storage | Recipe images, user avatars | Supabase Storage (S3-compatible) |
| Cloud Functions | Background jobs (e.g., generating shopping lists, sending notifications) | Supabase Edge Functions (Deno) or PostgreSQL functions |
| Firebase Hosting | Web app hosting | Vercel / Netlify / Supabase's own hosting (or keep separate) |
| FCM (Push Notifications) | Meal plan reminders | Third-party service (OneSignal, Expo Push, etc.) |
| Analytics / Crashlytics | Usage tracking | PostHog, Mixpanel, or Sentry (outside Supabase scope) |

**Action items:**
- Export a complete Firestore schema map (every collection and subcollection, with sample documents).
- List every Cloud Function trigger and its purpose.
- Inventory every Storage bucket and folder structure.
- Document every Auth provider currently enabled.
- Identify any Firestore Security Rules that encode business logic (these become RLS policies).

---

## 2. Design the PostgreSQL Schema

Firestore is schemaless and document-oriented; Postgres is relational. This is the most consequential step — get the schema right and everything downstream is simpler.

### 2.1 Core Tables (example)

```
users
  id              UUID  (PK, matches Supabase Auth uid)
  email           TEXT
  display_name    TEXT
  avatar_url      TEXT
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

recipes
  id              UUID  (PK)
  user_id         UUID  (FK → users.id)
  title           TEXT
  description     TEXT
  prep_time_min   INT
  cook_time_min   INT
  servings        INT
  image_url       TEXT
  is_public       BOOLEAN
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

recipe_ingredients
  id              UUID  (PK)
  recipe_id       UUID  (FK → recipes.id)
  name            TEXT
  quantity        NUMERIC
  unit            TEXT
  sort_order      INT

recipe_steps
  id              UUID  (PK)
  recipe_id       UUID  (FK → recipes.id)
  step_number     INT
  instruction     TEXT

menus
  id              UUID  (PK)
  user_id         UUID  (FK → users.id)
  title           TEXT
  start_date      DATE
  end_date        DATE
  created_at      TIMESTAMPTZ

menu_items
  id              UUID  (PK)
  menu_id         UUID  (FK → menus.id)
  recipe_id       UUID  (FK → recipes.id)
  meal_type       TEXT  (breakfast | lunch | dinner | snack)
  scheduled_date  DATE
  sort_order      INT

shopping_lists
  id              UUID  (PK)
  user_id         UUID  (FK → users.id)
  menu_id         UUID  (FK → menus.id, nullable)
  created_at      TIMESTAMPTZ

shopping_list_items
  id              UUID  (PK)
  list_id         UUID  (FK → shopping_lists.id)
  ingredient_name TEXT
  quantity        NUMERIC
  unit            TEXT
  is_checked      BOOLEAN DEFAULT false

tags
  id              UUID  (PK)
  name            TEXT  UNIQUE

recipe_tags
  recipe_id       UUID  (FK → recipes.id)
  tag_id          UUID  (FK → tags.id)
  PRIMARY KEY (recipe_id, tag_id)
```

### 2.2 Schema Design Principles

- **Flatten Firestore subcollections into proper relational tables.** For example, `recipes/{id}/ingredients` becomes `recipe_ingredients` with a foreign key.
- **Normalize repeating data.** Tags, categories, and units should be separate lookup tables if they need to be consistent.
- **Use UUIDs for primary keys** to match Supabase Auth user IDs and avoid collisions during migration.
- **Add indexes early.** At minimum: `recipes.user_id`, `menu_items.menu_id`, `menu_items.scheduled_date`, `shopping_list_items.list_id`.
- **Use `updated_at` columns with triggers** to support optimistic caching on the client.

### 2.3 Row-Level Security (RLS)

Every table that holds user data must have RLS enabled. Example policies:

```sql
-- Users can only see and modify their own recipes
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recipes"
  ON recipes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipes"
  ON recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes"
  ON recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes"
  ON recipes FOR DELETE
  USING (auth.uid() = user_id);

-- Public recipes are viewable by anyone
CREATE POLICY "Anyone can view public recipes"
  ON recipes FOR SELECT
  USING (is_public = true);
```

Translate every Firestore Security Rule into an equivalent RLS policy. Test thoroughly — RLS mistakes cause either data leaks or mysterious "permission denied" errors.

---

## 3. Migration Phases

### Phase 1: Set Up Supabase Project & Schema (Week 1–2)

- Create Supabase project (choose a region close to your users).
- Write and run all DDL (CREATE TABLE, indexes, RLS policies).
- Set up Supabase Storage buckets to mirror Firebase Storage structure (e.g., `recipe-images`, `avatars`).
- Configure Auth providers (email/password, Google, Apple) in the Supabase dashboard.
- Write database seed scripts for development/testing.

### Phase 2: Data Migration Scripts (Week 2–3)

Build a one-time migration pipeline. Recommended approach:

1. **Export Firestore data** using the Firebase Admin SDK (Node.js script that reads every collection and writes JSON or CSV).
2. **Transform documents → rows.** A script that maps each Firestore document to its relational equivalent, flattening subcollections, resolving references, and generating UUIDs.
3. **Import into Postgres** using Supabase's client library or direct `psql \copy` commands.
4. **Migrate Storage files.** Download from Firebase Storage, then upload to Supabase Storage preserving the path structure. Update `image_url` references in the database.
5. **Migrate Auth users.** Export Firebase Auth users (`firebase auth:export`), then import into Supabase Auth using the Admin API. Passwords can't be migrated directly (Firebase uses scrypt hashing), so plan for one of these strategies:
   - **Option A — Password reset flow:** On first login post-migration, prompt users to reset their password.
   - **Option B — Dual-write period:** Run both auth systems in parallel; when a user logs in via Firebase, silently create/update their Supabase Auth record.
   - **Option C — Custom password hash import:** Supabase supports importing users with password hashes if you know the hash parameters. Check Supabase docs for current support of Firebase's scrypt variant.

**Validation checklist:**
- Row counts match document counts for every collection.
- Spot-check 50+ records for data accuracy.
- All image URLs resolve in Supabase Storage.
- All user accounts exist in Supabase Auth.

### Phase 3: Refactor the Data Layer (Week 3–5)

This is the bulk of the client-side work. The goal is to swap Firebase SDK calls for Supabase SDK calls without changing the UI layer.

**Recommended architecture:**

Create an abstraction layer (repository/service pattern) so the rest of the app doesn't know which backend it's talking to.

```
// Pseudocode
interface RecipeRepository {
  getById(id: string): Promise<Recipe>
  getAll(userId: string): Promise<Recipe[]>
  create(recipe: NewRecipe): Promise<Recipe>
  update(id: string, data: Partial<Recipe>): Promise<Recipe>
  delete(id: string): Promise<void>
}

// Two implementations:
class FirebaseRecipeRepository implements RecipeRepository { ... }
class SupabaseRecipeRepository implements RecipeRepository { ... }
```

This lets you:
- Feature-flag between Firebase and Supabase per-user or per-feature.
- Roll back instantly if something breaks.
- Test Supabase calls in isolation.

**Migration order for data access (lowest risk first):**

1. **Read-only / reference data** — tags, categories, public recipe browsing.
2. **User profile** — reading and updating the current user's profile.
3. **Recipes CRUD** — full read/write migration for the core feature.
4. **Menus & Meal Plans** — depends on recipes being migrated.
5. **Shopping Lists** — depends on menus/recipes.
6. **Real-time subscriptions** — swap Firestore `onSnapshot` for Supabase Realtime channels.

### Phase 4: Migrate Auth (Week 4–5)

- Replace `firebase/auth` imports with `@supabase/supabase-js` auth.
- Update all sign-in/sign-up flows (email, Google, Apple OAuth).
- Replace `onAuthStateChanged` with `supabase.auth.onAuthStateChange`.
- Update any middleware or route guards that check auth state.
- Test the entire auth lifecycle: sign up → verify email → log in → password reset → log out → delete account.

### Phase 5: Migrate Cloud Functions → Edge Functions (Week 5–6)

| Firebase Cloud Function | Supabase Equivalent |
|---|---|
| HTTP-triggered functions | Supabase Edge Functions (Deno, invoked via HTTP) |
| Firestore triggers (onCreate, onUpdate, onDelete) | PostgreSQL triggers + `pg_notify`, or database webhooks |
| Scheduled functions | `pg_cron` extension or external scheduler (e.g., cron job, GitHub Actions) |
| Auth triggers (onCreate user) | Supabase Auth hooks / database trigger on `auth.users` |

For each function:
- Rewrite in TypeScript for Deno (Edge Functions) or as a PostgreSQL function if the logic is data-centric (e.g., auto-generating a shopping list from a menu's ingredients).
- Test locally using `supabase functions serve`.
- Deploy with `supabase functions deploy`.

### Phase 6: Dual-Run & Validation (Week 6–7)

Run both backends in parallel:
- Writes go to **both** Firebase and Supabase.
- Reads come from **Supabase** (with Firebase as fallback).
- Compare results to catch discrepancies.
- Monitor error rates, latency, and user-reported issues.

This phase is your safety net. Keep it running for at least 1–2 weeks before cutting over.

### Phase 7: Cutover & Cleanup (Week 7–8)

- Remove the Firebase fallback — Supabase is now the single source of truth.
- Remove all Firebase SDK dependencies from the project.
- Delete Firebase Cloud Functions deployments.
- Update environment variables and CI/CD pipelines.
- Archive (don't delete yet) the Firebase project — keep it read-only for 90 days in case you need to reference old data.
- Update documentation, README, onboarding guides.

---

## 4. Key Differences to Watch For

| Concern | Firebase | Supabase | Action Needed |
|---|---|---|---|
| Querying | Limited compound queries, no JOINs | Full SQL with JOINs, CTEs, window functions | Simplify complex client-side data assembly into single queries |
| Real-time | `onSnapshot` per document/collection | Realtime channels via WebSocket | Rewrite listeners; Supabase Realtime uses a different event model |
| Offline support | Built-in offline persistence | Not built-in; must implement client-side caching (e.g., TanStack Query, local SQLite) | Decide if offline support is needed; if so, add a caching layer |
| Security | Firestore Security Rules (custom DSL) | PostgreSQL RLS (SQL) | Rewrite all rules as RLS policies; test exhaustively |
| Pricing model | Pay per read/write/delete | Pay per compute time + storage + bandwidth | Likely cheaper for read-heavy apps; model costs before migrating |
| File uploads | Firebase Storage SDK | Supabase Storage SDK (S3-compatible) | Update all upload/download code; presigned URLs work differently |

---

## 5. Risk Mitigation

- **Data loss:** Take a full Firestore export before starting, and keep the Firebase project alive (read-only) for 90 days post-migration.
- **Auth disruption:** The password migration gap is the highest-risk moment. Test Option A/B/C above with a small cohort first.
- **Performance regression:** Benchmark key queries (e.g., "load all recipes for a user", "generate a shopping list") on both systems before cutover.
- **Feature regression:** Write integration tests for every critical user flow before starting the migration. Run them against both backends.
- **Rollback plan:** The feature-flag / repository pattern gives you an instant rollback path at every phase. Don't remove Firebase code until Phase 7.

---

## 6. Estimated Timeline

| Phase | Duration | Milestone |
|---|---|---|
| 1 — Setup & Schema | 1–2 weeks | Supabase project live, schema deployed, RLS policies in place |
| 2 — Data Migration | 1 week | All data transferred and validated |
| 3 — Refactor Data Layer | 2 weeks | App reads/writes from Supabase behind feature flags |
| 4 — Migrate Auth | 1 week | All auth flows working on Supabase |
| 5 — Edge Functions | 1 week | All background logic ported |
| 6 — Dual-Run | 1–2 weeks | Both systems running; monitoring for issues |
| 7 — Cutover & Cleanup | 1 week | Firebase removed, Supabase is sole backend |

**Total: approximately 8–10 weeks** for a solo developer or small team. Adjust based on the actual complexity of your Firestore schema and the number of Cloud Functions.

---

## 7. Quick-Start Checklist

- [ ] Create Supabase project and install CLI (`npx supabase init`)
- [ ] Export Firestore schema map and sample data
- [ ] Design and deploy PostgreSQL schema with RLS
- [ ] Write and run data migration scripts (Firestore → Postgres)
- [ ] Migrate Storage files and update URL references
- [ ] Set up Supabase Auth providers (email, Google, Apple)
- [ ] Plan auth user migration strategy (password reset vs. dual-write)
- [ ] Install `@supabase/supabase-js` in the client project
- [ ] Build repository abstraction layer with feature flags
- [ ] Migrate data access: reference data → profiles → recipes → menus → shopping lists
- [ ] Swap Firestore real-time listeners for Supabase Realtime
- [ ] Replace Firebase Auth with Supabase Auth in all flows
- [ ] Port Cloud Functions to Edge Functions / PG functions
- [ ] Run dual-write period and validate
- [ ] Cut over, remove Firebase SDK, archive Firebase project
