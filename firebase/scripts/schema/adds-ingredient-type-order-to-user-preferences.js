const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

db.collection('users')
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        'preferences.ingredientTypeOrder': [],
      });
    });
    batch.commit();
  })
  .catch((err) => {
    console.log('error getting dishes', err);
  });
