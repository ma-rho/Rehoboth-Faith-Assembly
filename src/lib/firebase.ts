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
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for API key and throw an error if it is not set.
// This is better than the previous silent failure.
if (!firebaseConfig.apiKey) {
  throw new Error(
    "NEXT_PUBLIC_FIREBASE_API_KEY is not set. Please check your environment variables."
  );
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Getter functions to ensure services are initialized only when needed.
export const getDb = () => getFirestore(app);
export const getClientAuth = () => getAuth(app);
export const getClientStorage = () => getStorage(app);
