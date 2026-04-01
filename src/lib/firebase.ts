import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyALaLRKEZRstW418EwTNuvW5ng0H7D-_2k",
  authDomain: "rehoboth-faith.firebaseapp.com",
  projectId: "rehoboth-faith",
  storageBucket: "rehoboth-faith.firebasestorage.app",
  messagingSenderId: "313891700596",
  appId: "1:313891700596:web:b7f900584b59c02c9bb621",
  measurementId: "G-1N1N8R5HRT"
};

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

let services: FirebaseServices | null = null;

export const getFirebaseServices = (): FirebaseServices => {
  if (typeof window === 'undefined') {
    throw new Error("Firebase client SDK cannot be initialized on the server.");
  }

  if (services) {
    return services;
  }

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  services = { app, auth, db, storage };

  return services;
};
