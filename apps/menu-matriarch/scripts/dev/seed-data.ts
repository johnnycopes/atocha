/* eslint-disable @typescript-eslint/no-var-requires */

import * as admin from 'firebase-admin';

import {
  createDishDto,
  createMealDto,
  createMenuDto,
  createTagDto,
  createUserDto,
  Endpoint,
} from '@atocha/menu-matriarch/types';

const serviceAccount = require('../../firebase-admin-dev.json');
const uid = process.argv.slice(2)?.[0];
const { fetchUserInfo } = require('./utility');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async function (uid) {
  const db = admin.firestore();
  const batch = db.batch();
  const user = createDocRef(db, Endpoint.users, uid);
  const menu = createDocRef(db, Endpoint.menus);
  const sushiDinnerMeal = createDocRef(db, Endpoint.meals);
  const sushiDish = createDocRef(db, Endpoint.dishes);
  const misoSoupDish = createDocRef(db, Endpoint.dishes);
  const pescatarianTag = createDocRef(db, Endpoint.tags);
  const vegetarianTag = createDocRef(db, Endpoint.tags);
  const userInfo = await fetchUserInfo(admin, uid);

  if (!userInfo) {
    throw new Error(`UID ${uid} does not exist`);
  }

  batch.set(
    user,
    createUserDto({
      uid,
      name: userInfo.displayName,
      email: userInfo.email,
    })
  );
  batch.set(
    menu,
    createMenuDto({
      id: menu.id,
      uid,
      name: 'Menu #1',
      contents: {
        Monday: [],
        Tuesday: [sushiDish.id, misoSoupDish.id],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    })
  );
  batch.set(
    sushiDinnerMeal,
    createMealDto({
      id: sushiDinnerMeal.id,
      uid,
      name: 'Sushi Dinner',
      dishIds: [sushiDish.id, misoSoupDish.id],
      tagIds: [pescatarianTag.id],
    })
  );
  batch.set(
    sushiDish,
    createDishDto({
      id: sushiDish.id,
      uid,
      name: 'Sushi',
      description: 'Delicious tiny vessels from Japan',
      menuIds: [menu.id],
      mealIds: [sushiDinnerMeal.id],
      tagIds: [pescatarianTag.id],
      usages: 1,
    })
  );
  batch.set(
    misoSoupDish,
    createDishDto({
      id: misoSoupDish.id,
      uid,
      name: 'Miso Soup',
      type: 'side',
      menuIds: [menu.id],
      mealIds: [sushiDinnerMeal.id],
      tagIds: [vegetarianTag.id],
      usages: 1,
    })
  );
  batch.set(
    pescatarianTag,
    createTagDto({
      id: pescatarianTag.id,
      name: 'Pescatarian',
      uid,
      mealIds: [sushiDinnerMeal.id],
      dishIds: [sushiDish.id],
    })
  );
  batch.set(
    vegetarianTag,
    createTagDto({
      id: vegetarianTag.id,
      name: 'Vegetarian',
      uid,
      dishIds: [misoSoupDish.id],
    })
  );

  await batch.commit();
})(uid);

function createDocRef(
  db: admin.firestore.Firestore,
  endpoint: Endpoint,
  id?: string
) {
  if (id) {
    return db.collection(endpoint).doc(id);
  } else {
    return db.collection(endpoint).doc();
  }
}
