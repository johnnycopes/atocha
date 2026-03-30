const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-admin-dev.json');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function mapCollection(collectionRef, depth = 0, maxDocs = 3) {
  const snapshot = await collectionRef.limit(maxDocs).get();
  const results = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();

    // Discover subcollections for each document
    const subcollectionRefs = await doc.ref.listCollections();
    const subcollections = {};

    for (const subRef of subcollectionRefs) {
      subcollections[subRef.id] = await mapCollection(
        subRef,
        depth + 1,
        maxDocs
      );
    }

    results.push({
      id: doc.id,
      fields: summarizeFields(data),
      sampleData: redact(data),
      subcollections:
        Object.keys(subcollections).length > 0 ? subcollections : undefined,
    });
  }

  return results;
}

// Extract field names, types, and shape — this is the "schema"
function summarizeFields(data, prefix = '') {
  const fields = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === null) {
      fields[key] = 'null';
    } else if (value instanceof admin.firestore.Timestamp) {
      fields[key] = 'Timestamp';
    } else if (value instanceof admin.firestore.GeoPoint) {
      fields[key] = 'GeoPoint';
    } else if (value instanceof admin.firestore.DocumentReference) {
      fields[key] = `Reference → ${value.path}`;
    } else if (Array.isArray(value)) {
      fields[key] = `Array<${value.length > 0 ? typeof value[0] : 'unknown'}>`;
    } else if (typeof value === 'object') {
      fields[key] = { _type: 'Map', ...summarizeFields(value) };
    } else {
      fields[key] = typeof value;
    }
  }
  return fields;
}

// Keep sample data but redact anything that looks personal
function redact(data) {
  const redacted = {};
  for (const [key, value] of Object.entries(data)) {
    if (/email|password|phone|token|secret/i.test(key)) {
      redacted[key] = '[REDACTED]';
    } else if (value instanceof admin.firestore.Timestamp) {
      redacted[key] = value.toDate().toISOString();
    } else if (value instanceof admin.firestore.DocumentReference) {
      redacted[key] = value.path;
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      redacted[key] = redact(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

async function run() {
  const rootCollections = await db.listCollections();
  const schemaMap = {};

  for (const collectionRef of rootCollections) {
    console.log(`Mapping collection: ${collectionRef.id}`);
    schemaMap[collectionRef.id] = await mapCollection(collectionRef);
  }

  fs.writeFileSync(
    'firestore-schema-map.json',
    JSON.stringify(schemaMap, null, 2)
  );
  console.log('Done → firestore-schema-map.json');
}

run().catch(console.error);
