const admin = require('firebase-admin');
const serviceAccount = require('../../../../firebase-admin-dev.json');
const uid = process.argv.slice(2)?.[0];
const { deleteAccount } = require('./utility');

if (!uid) {
  throw new Error('A UID must be passed in as an argument to the script.');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async function () {
  deleteAccount(admin, uid);
})();
