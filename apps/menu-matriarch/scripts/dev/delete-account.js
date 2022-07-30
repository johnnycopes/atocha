const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-admin-dev.json');
const uid = process.argv.slice(2)?.[0];
const { deleteAccount } = require('./utility');
const { TEST_UID } = require('../../cypress.env.json');

if (!uid) {
  throw new Error('A UID must be passed in as an argument to the script.');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async function() {
  if (uid === TEST_UID) {
    throw new Error('UID belongs to test user and will not be be deleted.');
  }
  deleteAccount(admin, uid);
})();
