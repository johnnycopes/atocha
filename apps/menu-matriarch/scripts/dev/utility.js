/**
 * Deletes user from Firebase Authentication AND their
 * associated data from Firestore
 */
async function deleteAccount(admin, uid) {
  await Promise.all([
    deleteUser(admin, uid),
    deleteData(admin, uid),
  ]);
}

/**
 * Deletes user from Firebase Authentication. Does NOT delete any
 * data from Firestore
 */
async function deleteUser(admin, uid) {
  await admin.auth().deleteUser(uid)
    .then(() => console.log(`Successfully deleted user ${uid}`))
    .catch((error) => console.log(`Error deleting user ${uid}:`, error));
}

/**
 * Deletes all user data from Firestore. Does NOT delete user account
 * from Firebase Authentication
 */
async function deleteData(admin, uid) {
  const userInfo = await fetchUserInfo(admin, uid);
  if (!userInfo) {
    console.log(`User ${uid} not found`);
    return false;
  }
  const db = admin.firestore();
  const batch = db.batch();
  const collections = ['users', 'menus', 'meals', 'dishes', 'tags'];
  const snapshots = await Promise.all(
    collections.map(collection => {
      return db.collection(collection)
        .where('uid', '==', uid)
        .get();
    })
  );

  snapshots.forEach(snapshot => {
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
  });

  batch.commit()
    .then(() => console.log(`Successfully deleted data for user ${uid}`))
    .catch((error) => console.log(`Error deleting data for user ${uid}:`, error));
}

/**
 * Fetches user info from Firebase Authentication. Also useful for
 * confirming that a UID is valid
 */
function fetchUserInfo(admin, uid) {
  return admin.auth().getUser(uid)
    .then(info => info)
    .catch(() => false);
}

module.exports = {
  deleteAccount,
  deleteData,
  fetchUserInfo,
};
