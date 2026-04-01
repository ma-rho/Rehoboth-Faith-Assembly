import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

// Helper function to get services, ensuring we don't initialize multiple times.
let services: FirebaseServices | null = null;

export const getFirebaseServices = (): FirebaseServices => {
  if (typeof window === 'undefined') {
    // This is a server-side render, and this client-side SDK should not be initialized.
    // Throwing an error is better than returning nulls and letting other parts of the app fail silently.
    throw new Error("Firebase client SDK cannot be initialized on the server.");
  }

  if (services) {
    return services;
  }

  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      // This is a critical error. The environment variables are not configured.
      throw new Error("Firebase config (API Key) is missing. Check your environment variables.");
    }
    initializeApp(firebaseConfig);
  }

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  services = { app, auth, db, storage };

  return services;
};
