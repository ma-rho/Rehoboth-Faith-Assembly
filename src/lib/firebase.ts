import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const getFirebaseApp = (): FirebaseApp | null => {
  if (getApps().length) return getApp();

  // If the API key is missing, return null. 
  // DO NOT throw an error here, or the build will crash during prerendering.
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase configuration is missing. This is expected during some build phases.");
    return null;
  }

  return initializeApp(firebaseConfig);
};

// Internal helper to handle null apps for Firestore/Auth/Storage
const app = getFirebaseApp();

// Use proxies or explicit checks to prevent "Cannot read properties of null"
export const db = app ? getFirestore(app) : ({} as any);
export const auth = app ? getAuth(app) : ({} as any);
export const storage = app ? getStorage(app) : ({} as any);
export { app };