/**
 * Phase 2, Step 2 — Transform Firestore export → Postgres seed SQL
 *
 * Reads firestore-export.json (repo root) and writes:
 *   firestore-seed.sql      — INSERT statements ready to run against Supabase
 *   user-id-mapping.json    — Firebase UID → Postgres UUID (needed for auth migration in Phase 4)
 *
 * Run from the repo root:
 *   node apps/menu-matriarch/src/firebase/scripts/migration/transform-firestore.js
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'firestore-export.json'), 'utf8'));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Deterministic UUID derived from a Firestore string ID.
 * Stable across runs — re-running the script produces the same SQL.
 */
function toUuid(str) {
  const h = crypto.createHash('sha256').update(str).digest('hex');
  return [
    h.slice(0, 8),
    h.slice(8, 12),
    '4' + h.slice(13, 16),
    ((parseInt(h.slice(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, '0') + h.slice(18, 20),
    h.slice(20, 32),
  ].join('-');
}

/** Escape a value for a SQL literal. */
function lit(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

/** Build a single INSERT row string. */
function row(values) {
  return `(${values.map(lit).join(', ')})`;
}

// ---------------------------------------------------------------------------
// Build lookup sets for integrity checks
// ---------------------------------------------------------------------------
const knownDishIds = new Set(data.dishes.map((d) => d.id));

// ---------------------------------------------------------------------------
// 1. users
// ---------------------------------------------------------------------------
const userRows = [];
const userIdMapping = {}; // Firebase UID → Postgres UUID

for (const u of data.users) {
  const pgId = toUuid(u.uid);
  userIdMapping[u.uid] = pgId;
  const p = u.preferences || {};
  userRows.push(row([
    pgId,
    u.name || '',
    p.darkMode ?? false,
    p.dayNameDisplay || 'full',
    p.defaultMenuStartDay || 'Monday',
    p.emptyMealText || 'undecided',
    p.mealOrientation || 'vertical',
  ]));
}

// ---------------------------------------------------------------------------
// 2. ingredient_types
// ---------------------------------------------------------------------------

// Build a map of uid → (ingredientTypeId → sort_order) from user preferences
const ingredientTypeOrder = {}; // firestore ingredientType id → sort_order
for (const u of data.users) {
  const order = u.preferences?.ingredientTypeOrder || [];
  order.forEach((firestoreId, index) => {
    ingredientTypeOrder[firestoreId] = index;
  });
}

const ingredientTypeRows = [];
for (const it of data.ingredientTypes) {
  ingredientTypeRows.push(row([
    toUuid(it.id),
    toUuid(it.uid),
    it.name,
    ingredientTypeOrder[it.id] ?? 999,
  ]));
}

// ---------------------------------------------------------------------------
// 3. ingredients
// ---------------------------------------------------------------------------
const ingredientRows = [];
for (const ing of data.ingredients) {
  ingredientRows.push(row([
    toUuid(ing.id),
    toUuid(ing.uid),
    ing.name,
    ing.typeId ? toUuid(ing.typeId) : null,
  ]));
}

// ---------------------------------------------------------------------------
// 4. tags
// ---------------------------------------------------------------------------
const tagRows = [];
for (const tag of data.tags) {
  tagRows.push(row([
    toUuid(tag.id),
    toUuid(tag.uid),
    tag.name,
    tag.color || '',
  ]));
}

// ---------------------------------------------------------------------------
// 5. dishes
// ---------------------------------------------------------------------------
const dishRows = [];
for (const dish of data.dishes) {
  dishRows.push(row([
    toUuid(dish.id),
    toUuid(dish.uid),
    dish.name,
    dish.type || 'main',
    dish.description || '',
    dish.link || '',
    dish.notes || '',
    dish.favorited ?? false,
  ]));
}

// ---------------------------------------------------------------------------
// 6. dish_ingredients (from dishes.ingredientIds)
// ---------------------------------------------------------------------------
const dishIngredientRows = [];
for (const dish of data.dishes) {
  for (const ingId of dish.ingredientIds || []) {
    dishIngredientRows.push(row([toUuid(dish.id), toUuid(ingId)]));
  }
}

// ---------------------------------------------------------------------------
// 7. dish_tags (from dishes.tagIds)
// ---------------------------------------------------------------------------
const dishTagRows = [];
for (const dish of data.dishes) {
  for (const tagId of dish.tagIds || []) {
    dishTagRows.push(row([toUuid(dish.id), toUuid(tagId)]));
  }
}

// ---------------------------------------------------------------------------
// 8. meals
// ---------------------------------------------------------------------------
const mealRows = [];
for (const meal of data.meals) {
  mealRows.push(row([
    toUuid(meal.id),
    toUuid(meal.uid),
    meal.name,
    meal.description || '',
  ]));
}

// ---------------------------------------------------------------------------
// 9. meal_dishes (from meals.dishIds)
// ---------------------------------------------------------------------------
const mealDishRows = [];
for (const meal of data.meals) {
  (meal.dishIds || []).forEach((dishId, index) => {
    mealDishRows.push(row([toUuid(meal.id), toUuid(dishId), index]));
  });
}

// ---------------------------------------------------------------------------
// 10. meal_tags (from meals.tagIds)
// ---------------------------------------------------------------------------
const mealTagRows = [];
for (const meal of data.meals) {
  for (const tagId of meal.tagIds || []) {
    mealTagRows.push(row([toUuid(meal.id), toUuid(tagId)]));
  }
}

// ---------------------------------------------------------------------------
// 11. menus
// ---------------------------------------------------------------------------
const menuRows = [];
for (const menu of data.menus) {
  menuRows.push(row([
    toUuid(menu.id),
    toUuid(menu.uid),
    menu.name,
    menu.favorited ?? false,
    menu.startDay || 'Monday',
  ]));
}

// ---------------------------------------------------------------------------
// 12. menu_entries (from menus.contents)
// ---------------------------------------------------------------------------
const menuEntryRows = [];
let skipped = 0;
for (const menu of data.menus) {
  for (const [day, dishIds] of Object.entries(menu.contents || {})) {
    dishIds.forEach((dishId, index) => {
      if (!dishId || !knownDishIds.has(dishId)) {
        skipped++;
        return; // skip null / orphaned dish IDs
      }
      menuEntryRows.push(row([
        toUuid(`${menu.id}:${day}:${dishId}:${index}`),
        toUuid(menu.id),
        day,
        toUuid(dishId),
        index,
      ]));
    });
  }
}

// ---------------------------------------------------------------------------
// Assemble SQL
// ---------------------------------------------------------------------------

function insertBlock(table, columns, rows) {
  if (rows.length === 0) return `-- (no rows for ${table})\n`;
  return (
    `INSERT INTO public.${table} (${columns.join(', ')}) VALUES\n` +
    rows.join(',\n') +
    ';\n'
  );
}

const sql = `-- ============================================================
-- Menu Matriarch — Firestore seed data
-- Generated by transform-firestore.js
--
-- auth.users rows do not exist yet (auth migration is Phase 4).
-- session_replication_role = replica disables FK checks so this
-- file can be run before auth users are created.
-- ============================================================

SET session_replication_role = 'replica';

${insertBlock('users',
  ['id', 'name', 'dark_mode', 'day_name_display', 'default_menu_start_day', 'empty_meal_text', 'meal_orientation'],
  userRows)}
${insertBlock('ingredient_types',
  ['id', 'user_id', 'name', 'sort_order'],
  ingredientTypeRows)}
${insertBlock('ingredients',
  ['id', 'user_id', 'name', 'ingredient_type_id'],
  ingredientRows)}
${insertBlock('tags',
  ['id', 'user_id', 'name', 'color'],
  tagRows)}
${insertBlock('dishes',
  ['id', 'user_id', 'name', 'type', 'description', 'link', 'notes', 'favorited'],
  dishRows)}
${insertBlock('dish_ingredients',
  ['dish_id', 'ingredient_id'],
  dishIngredientRows)}
${insertBlock('dish_tags',
  ['dish_id', 'tag_id'],
  dishTagRows)}
${insertBlock('meals',
  ['id', 'user_id', 'name', 'description'],
  mealRows)}
${insertBlock('meal_dishes',
  ['meal_id', 'dish_id', 'sort_order'],
  mealDishRows)}
${insertBlock('meal_tags',
  ['meal_id', 'tag_id'],
  mealTagRows)}
${insertBlock('menus',
  ['id', 'user_id', 'name', 'favorited', 'start_day'],
  menuRows)}
${insertBlock('menu_entries',
  ['id', 'menu_id', 'day', 'dish_id', 'sort_order'],
  menuEntryRows)}
SET session_replication_role = 'origin';
`;

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------
fs.writeFileSync(path.join(process.cwd(), 'firestore-seed.sql'), sql);
fs.writeFileSync(path.join(process.cwd(), 'user-id-mapping.json'), JSON.stringify(userIdMapping, null, 2));

console.log('Transform complete:');
console.log(`  users:             ${userRows.length}`);
console.log(`  ingredient_types:  ${ingredientTypeRows.length}`);
console.log(`  ingredients:       ${ingredientRows.length}`);
console.log(`  tags:              ${tagRows.length}`);
console.log(`  dishes:            ${dishRows.length}`);
console.log(`  dish_ingredients:  ${dishIngredientRows.length}`);
console.log(`  dish_tags:         ${dishTagRows.length}`);
console.log(`  meals:             ${mealRows.length}`);
console.log(`  meal_dishes:       ${mealDishRows.length}`);
console.log(`  meal_tags:         ${mealTagRows.length}`);
console.log(`  menus:             ${menuRows.length}`);
console.log(`  menu_entries:      ${menuEntryRows.length} (${skipped} null entries skipped)`);
console.log('');
console.log('Output: firestore-seed.sql, user-id-mapping.json');
