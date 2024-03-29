const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-admin-dev.json');
const { deleteAccount } = require('./utility');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://menu-matriarch-dev.firebaseio.com',
});

function deleteAllUserAccounts(nextPageToken) {
  if (!serviceAccount.project_id.includes('dev')) {
    throw new Error('STOP! This script is targeting the wrong environment.');
  }

  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        const uid = userRecord.toJSON().uid;
        deleteAccount(admin, uid);
      });
      if (listUsersResult.pageToken) {
        deleteAllUserAccounts(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
}

deleteAllUserAccounts();
