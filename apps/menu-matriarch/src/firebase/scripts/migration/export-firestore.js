/**
 * Phase 2, Step 1 — Export Firestore data
 *
 * Dumps all documents from every collection into a single JSON file.
 * Run from the repo root:
 *
 *   node apps/menu-matriarch/src/firebase/scripts/migration/export-firestore.js
 *
 * Output: firestore-export.json (repo root)
 */

const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('../../firebase-admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const COLLECTIONS = [
  'dishes',
  'ingredientTypes',
  'ingredients',
  'meals',
  'menus',
  'tags',
  'users',
];

function serializeValue(value) {
  if (value === null || value === undefined) return null;
  if (value instanceof admin.firestore.Timestamp) return value.toDate().toISOString();
  if (value instanceof admin.firestore.DocumentReference) return value.path;
  if (value instanceof admin.firestore.GeoPoint) return { latitude: value.latitude, longitude: value.longitude };
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, serializeValue(v)])
    );
  }
  return value;
}

async function exportCollection(name) {
  const snapshot = await db.collection(name).get();
  console.log(`  ${name}: ${snapshot.size} docs`);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...serializeValue(doc.data()),
  }));
}

async function run() {
  console.log('Exporting Firestore collections...');
  const output = {};

  for (const name of COLLECTIONS) {
    output[name] = await exportCollection(name);
  }

  const totalDocs = Object.values(output).reduce((sum, docs) => sum + docs.length, 0);
  const outPath = 'firestore-export.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nDone — ${totalDocs} total docs → ${outPath}`);
}

run().catch(console.error);
