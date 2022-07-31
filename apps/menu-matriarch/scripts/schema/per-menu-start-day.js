const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

// Run the two processes individually

// 1. Add a `startDay` property to the menu-dto
// db.collection('menus')
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       batch.update(doc.ref, {
//         startDay: 'Monday',
//       });
//     });
//     batch.commit();
//   })
//   .catch(err => {
//     console.log('error getting menus', err)
//   });

// 2. Rename `menuStartDay` to `defaultMenuStartDay`
// db.collection('users')
// .get()
// .then(snapshot => {
//   snapshot.forEach(doc => {
//     const data = doc.data();
//     const preferences = data.preferences;
//     batch.update(doc.ref, {
//       ...data,
//       preferences: {
//         darkMode: preferences.darkMode,
//         dayNameDisplay: preferences.dayNameDisplay,
//         defaultMenuStartDay: preferences.menuStartDay,
//         emptyMealText: preferences.emptyMealText,
//         menuOrientation: preferences.menuOrientation,
//       },
//     });
//   });
//   batch.commit();
// })
// .catch(err => {
//   console.log('error getting users', err)
// });
