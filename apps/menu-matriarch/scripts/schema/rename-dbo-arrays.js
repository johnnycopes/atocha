const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const batch = db.batch();

Promise.all([
  db.collection('meals').get(),
  db.collection('dishes').get(),
  db.collection('tags').get(),
]).then(([meals, dishes, tags]) => {
  meals.forEach(doc => {
    const data = doc.data();
    batch.set(doc.ref, {
      id: data.id,
      uid: data.uid,
      name: data.name,
      description: data.description,
      dishIds: data.dishes,
      tagIds: data.tags,
    });
  });

  dishes.forEach(doc => {
    const data = doc.data();
    batch.set(doc.ref, {
      id: data.id,
      uid: data.uid,
      type: data.type,
      name: data.name,
      favorited: data.favorited,
      description: data.description,
      link: data.link,
      ingredientIds: data.ingredients,
      menuIds: data.menus,
      mealIds: data.meals,
      tagIds: data.tags,
      notes: data.notes,
      usages: data.usages,
    });
  });

  tags.forEach(doc => {
    const data = doc.data();
    batch.set(doc.ref, {
      id: data.id,
      uid: data.uid,
      name: data.name,
      color: data.color,
      mealIds: data.meals,
      dishIds: data.dishes,
    });
  });

  batch.commit();
});
