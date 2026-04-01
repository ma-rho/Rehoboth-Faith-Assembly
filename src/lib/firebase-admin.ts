import admin from 'firebase-admin';

function getAdminApp() {
  if (admin.apps.length === 0) {
    admin.initializeApp();
  }
  return admin.app();
}

const app = getAdminApp();
export const adminDb = admin.firestore(app);
export const adminStorage = admin.storage(app);
