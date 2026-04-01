import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const getFirebaseApp = () => {
  if (getApps().length) return getApp();

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    // Silently return null during build — only throw at runtime in browser
    if (typeof window === 'undefined') return null as any;
    throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY is missing.");
  }

  return initializeApp({
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
};

export const getDb = () => getFirestore(getFirebaseApp());
export const getClientAuth = () => getAuth(getFirebaseApp());
export const getClientStorage = () => getStorage(getFirebaseApp());