'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Video, Calendar, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getFirebaseServices } from '@/lib/firebase';

interface Pastor {
  name: string;
}

interface Counts {
  sermons: number;
  events: number;
  pastorName: string;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDataCounts() {
      const { db } = getFirebaseServices();
      if (!db) {
        setError("Failed to initialize Firebase.");
        setLoading(false);
        return;
      }

      try {
        const sermonsCollection = collection(db, 'sermons');
        const eventsCollection = collection(db, 'events');
        const pastorDocRef = doc(db, 'pastor', 'main');

        const [sermonSnapshot, eventSnapshot, pastorSnap] = await Promise.all([
          getDocs(sermonsCollection),
          getDocs(eventsCollection),
          getDoc(pastorDocRef),
        ]);

        const pastorData = pastorSnap.exists() ? (pastorSnap.data() as Pastor).name : 'Not set';

        setCounts({
          sermons: sermonSnapshot.size,
          events: eventSnapshot.size,
          pastorName: pastorData,
        });
      } catch (err) {
        console.error("Error fetching data counts: ", err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    fetchDataCounts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
      <p className="text-muted-foreground mt-2">Manage your church's content from one place.</p>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading Dashboard...</span>
        </div>
      )}

      {error && (
          <div className="text-red-500 text-center py-8">{error}</div>
      )}

      {!loading && !error && counts && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sermons
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.sermons}</div>
              <Link href="/admin/sermons" className="text-xs text-muted-foreground hover:text-primary">
                Manage Sermons
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.events}</div>
              <Link href="/admin/events" className="text-xs text-muted-foreground hover:text-primary">
                Manage Events
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pastor Info
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.pastorName}</div>
              <Link href="/admin/pastor" className="text-xs text-muted-foreground hover:text-primary">
                Update Info
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
