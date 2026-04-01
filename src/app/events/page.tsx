'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { events as placeholderEvents } from '@/lib/data';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string | Date;
  description?: string;
  imageUrl: string;
}


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        if (!eventSnapshot.empty) {
            const eventsList = eventSnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => {
                const data = doc.data();
                const eventDate = data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date);
                return {
                    id: doc.id,
                    ...data,
                    date: eventDate,
                } as Event;
                }
            );
            eventsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setEvents(eventsList);
        } else {
            // Use placeholder data if the collection is empty
            const placeholderEventsList = placeholderEvents.map(event => ({
                ...event,
                date: new Date(event.date),
            }));
            setEvents(placeholderEventsList);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        const placeholderEventsList = placeholderEvents.map(event => ({
            ...event,
            date: new Date(event.date),
        }));
        setEvents(placeholderEventsList);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Upcoming Events</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Get involved in the life of our church. There's something for everyone.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading Events...</span>
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {events.map((event) => {
              return (
                <Card key={event.id} id={event.id} className="overflow-hidden md:grid md:grid-cols-3 md:items-center">
                  <div className="relative h-64 w-full md:col-span-1 md:h-full">
                    <Image
                        src={event.imageUrl} // Use the imageUrl from the event object
                        alt={event.title} // Use event title as alt text
                        data-ai-hint={`An image for the event: ${event.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CardContent className="p-6">
                      <p className="text-base font-semibold text-accent">
                        {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-accent/80">
                        {format(new Date(event.date), 'h:mm a')}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-primary">{event.title}</h2>
                      <p className="mt-4 text-muted-foreground">{event.description}</p>
                      <div className="mt-4 flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
