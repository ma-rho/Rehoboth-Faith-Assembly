'use client';

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sermons as placeholderSermons } from '@/lib/data';
import { Loader2 } from 'lucide-react';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  preachedDate: string | Date;
  youtubeVideoId: string;
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const sermonsCollection = collection(db, 'sermons');
        const sermonSnapshot = await getDocs(sermonsCollection);
        if (!sermonSnapshot.empty) {
          const sermonsList = sermonSnapshot.docs.map(
            (doc: QueryDocumentSnapshot<DocumentData>) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                preachedDate: data.preachedDate instanceof Timestamp ? data.preachedDate.toDate() : new Date(data.preachedDate),
              } as Sermon;
            }
          );
          sermonsList.sort((a, b) => new Date(b.preachedDate).getTime() - new Date(a.preachedDate).getTime());
          setSermons(sermonsList);
        } else {
          setSermons(placeholderSermons);
        }
      } catch (error) {
        console.error('Error fetching sermons:', error);
        setSermons(placeholderSermons);
      } finally {
        setLoading(false);
      }
    }

    fetchSermons();
  }, []);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Sermon Archive</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore our collection of past messages. Be encouraged, equipped, and inspired.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading Sermons...</span>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
              <Card key={sermon.id} id={sermon.id} className="flex flex-col">
                <CardHeader className="p-4">
                  <div className="aspect-video">
                   {sermon.youtubeVideoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${sermon.youtubeVideoId}`}
                        title={sermon.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full rounded-lg"
                      ></iframe>
                    ) : (
                        <div className="h-full w-full rounded-lg bg-muted flex items-center justify-center">
                            <p className='text-muted-foreground'>No Video Available</p>
                        </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-4 pt-0">
                  <CardTitle className="text-xl">{sermon.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sermon.speaker}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    {format(new Date(sermon.preachedDate), 'MMMM d, yyyy')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
