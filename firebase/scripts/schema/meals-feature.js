const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

// Run the two processes individually

// 1. Add a `meals` property to the dish-dto
// db.collection('dishes')
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       batch.update(doc.ref, {
//         meals: [],
//       });
//     });
//     batch.commit();
//   })
//   .catch(err => {
//     console.log('error getting dishes', err)
//   });

// 2. Add a `meals` property to the tag-dto
// db.collection('tags')
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       batch.update(doc.ref, {
//         meals: [],
//       });
//     });
//     batch.commit();
//   })
//   .catch(err => {
//     console.log('error getting tags', err)
//   });
