import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// BUILD-SAFE INITIALIZATION: 
// We check for the API key. If it's missing (common during build steps), 
// we avoid initializing to prevent the 'invalid-api-key' crash.
const app = (getApps().length === 0 && firebaseConfig.apiKey) 
  ? initializeApp(firebaseConfig) 
  : getApps().length > 0 ? getApp() : null;

// Export instances only if app was initialized; otherwise export placeholders
// This allows the build to continue even if these aren't fully functional yet.
export const db = app ? getFirestore(app) : ({} as any);
export const auth = app ? getAuth(app) : ({} as any);
export const storage = app ? getStorage(app) : ({} as any);
export { app };
