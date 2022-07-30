const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase-admin-dev.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async function() {

  const db = admin.firestore();
  const batch = db.batch();
  const menus = [];
  const dishes = [];
  const tags = [];

  // 1. Build dictionaries of all items
  const menusSnapshot = await db.collection('menus').get();
  menusSnapshot.forEach(doc => {
    const menu = doc.data();
    menus.push({
      id: menu.id,
      dishes: flattenValues(menu.contents),
    });
  });

  const dishesSnapshot = await db.collection('dishes').get();
  dishesSnapshot.forEach(doc => {
    const dish = doc.data();
    dishes.push({
      id: dish.id,
      menus: dish.menus,
      usages: dish.usages,
      tags: dish.tags,
    });
  });

  const tagsSnapshot = await db.collection('tags').get();
  tagsSnapshot.forEach(doc => {
    const tag = doc.data();
    tags.push({
      id: tag.id,
    })
  });

  // 2. Update dishes to have correct linked properties
  dishesSnapshot.forEach(doc => {
    const dish = doc.data();
    const dishMenus = menus.filter(menu => menu.dishes.includes(doc.id));
    const dishMenuIds = dishMenus.map(dishMenu => dishMenu.id);
    let dishUsages = 0;
    for (const dishMenu of dishMenus) {
      for (dishId of dishMenu.dishes) {
        if (dishId === doc.id) {
          dishUsages++;
        }
      }
    }
    const validDishTags = dish.tags.filter(dishTag => tags.find(tag => dishTag === tag.id));
    batch.update(doc.ref, {
      menus: dishMenuIds,
      usages: dishUsages,
      tags: validDishTags,
    });
  });

  // 3. Update tags to have correct dishes property and delete usages property
  tagsSnapshot.forEach(doc => {
    const tagDishes = dishes
      .filter(dish => dish.tags.includes(doc.id))
      .map(dish => dish.id);
    batch.update(doc.ref, {
      dishes: tagDishes,
      usages: admin.firestore.FieldValue.delete(),
    });
  });

  await batch.commit();
})();

function flattenValues(obj) {
  return Object
    .values(obj)
    .reduce((allItems, currItems) => ([...allItems, ...currItems]), [])
}
