const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

db.collection('users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const preferences = data.preferences;
      batch.update(doc.ref, {
        ...data,
        preferences: {
          darkMode: preferences.darkMode,
          dayNameDisplay: preferences.dayNameDisplay,
          emptyMealText: preferences.emptyDishText,
          menuOrientation: preferences.menuOrientation,
          menuStartDay: preferences.menuStartDay,
        },
      });
    });
    batch.commit();
  })
  .catch(err => {
    console.log('error getting users', err)
  });
