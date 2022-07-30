const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

let menus = [];
let dishes = [];
let usagesDict =  {};
let menusDict = {};

db.collection('menus')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      menus.push(doc.data());
    });

    for (let menu of menus) {
      for (let contents of Object.values(menu.contents)) {
        for (let id of contents) {
          usagesDict[id] = usagesDict[id] + 1 || 1;
          if (!menusDict[id]) {
            menusDict[id] = [menu.id];
          } else if (!(menusDict[id].includes(menu.id))) {
            menusDict[id] = [...menusDict[id], menu.id];
          }
        }
      }
    }
  })
  .catch(err => {
    console.log('error getting menus', err)
  });

db.collection('dishes')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      batch.update(doc.ref, {
        menus: menusDict[doc.id] || [],
        usages: usagesDict[doc.id] || 0,
      });
    });
    batch.commit();
  })
  .catch(err => {
    console.log('error getting dishes', err)
  });
