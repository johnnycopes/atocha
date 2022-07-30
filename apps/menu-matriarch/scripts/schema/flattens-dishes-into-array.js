const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();
var batch = db.batch();

db.collection('menus')
  .get()
    .then(
      snapshot => {
        snapshot.forEach(doc => {
          const mon = [doc.data().contents.Monday.main, ...doc.data().contents.Monday.sides];
          const tue = [doc.data().contents.Tuesday.main, ...doc.data().contents.Tuesday.sides];
          const wed = [doc.data().contents.Wednesday.main, ...doc.data().contents.Wednesday.sides];
          const thu = [doc.data().contents.Thursday.main, ...doc.data().contents.Thursday.sides];
          const fri = [doc.data().contents.Friday.main, ...doc.data().contents.Friday.sides];
          const sat = [doc.data().contents.Saturday.main, ...doc.data().contents.Saturday.sides];
          const sun = [doc.data().contents.Sunday.main, ...doc.data().contents.Sunday.sides];
          batch.update(doc.ref, {
            contents: {
              Monday: mon,
              Tuesday: tue,
              Wednesday: wed,
              Thursday: thu,
              Friday: fri,
              Saturday: sat,
              Sunday: sun,
            }
          })
          // console.log(doc.id, '=>', doc.data());
        })
      })
    .then(() => batch.commit())
    .catch(err => {
      console.log('error getting docs', err)
    });
