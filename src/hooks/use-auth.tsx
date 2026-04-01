'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth';
import { app } from '@/lib/firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Conditionally get auth instance to make it build-safe
  const auth: Auth | null = app ? getAuth(app) : null;

  useEffect(() => {
    // Only subscribe if auth is available (client-side)
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      // If auth is not available (server-side), set loading to false
      setUser(null);
      setLoading(false);
    }
  }, [auth]);

  return { user, loading };
};

export default useAuth;
