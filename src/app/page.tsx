'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Heart, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { getDb } from '@/lib/firebase';
import { collection, getDocs, limit, orderBy, query, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Sermon {
  id: string;
  youtubeVideoId: string;
  title: string;
  speaker: string;
  preachedDate: string;
}

interface Event {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  description: string;
}

interface FirestoreSermon {
  youtubeVideoId: string;
  title: string;
  speaker: string;
  preachedDate: Timestamp | string;
}

interface FirestoreEvent {
  imageUrl: string;
  date: Timestamp;
  title: string;
  description: string;
}

export default function Home() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const sermonPlaceholders = PlaceHolderImages.filter(p => p.id.startsWith('sermon')).slice(0, 3);
  const eventPlaceholders = PlaceHolderImages.filter(p => p.id.startsWith('event')).slice(0, 2);

  useEffect(() => {
    async function fetchData() {
      try {
        const db = getDb();

        // Fetch sermons
        const sermonsCol = collection(db, 'sermons');
        const sermonsQuery = query(sermonsCol, orderBy('preachedDate', 'desc'), limit(3));
        const sermonSnapshot = await getDocs(sermonsQuery);
        const fetchedSermons = sermonSnapshot.docs.map(doc => {
          const data = doc.data() as FirestoreSermon;
          let preachedDate: Date;
          if (data.preachedDate instanceof Timestamp) {
            preachedDate = data.preachedDate.toDate();
          } else if (typeof data.preachedDate === 'string') {
            preachedDate = new Date(data.preachedDate);
          } else {
            preachedDate = new Date();
          }
          return { id: doc.id, ...data, preachedDate: preachedDate.toISOString() };
        });
        setSermons(fetchedSermons);

        // Fetch events
        const eventsCol = collection(db, 'events');
        const eventsQuery = query(eventsCol, orderBy('date', 'asc'), limit(2));
        const eventSnapshot = await getDocs(eventsQuery);
        const fetchedEvents: Event[] = [];
        eventSnapshot.docs.forEach(doc => {
          const data = doc.data() as FirestoreEvent;
          if (data.date?.toDate) {
            fetchedEvents.push({ id: doc.id, ...data, date: data.date.toDate().toISOString() });
          }
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 p-4 md:p-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Welcome to Rehoboth Faith Assembly
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
            Reaching the world with the Gospel of Jesus Christ, making disciples, and demonstrating God's love to all.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/visit">Plan Your Visit <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section id="services" className="bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary">Join Us for Worship</h2>
          <p className="mt-2 text-muted-foreground text-lg">Experience heartfelt worship, inspiring messages, and a welcoming community.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Sunday Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">11:00 AM - 1:00 PM</p>
                <p className="text-muted-foreground">Every Sunday Morning</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Our Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Holy Trinity Church Hall</p>
                <p className="text-muted-foreground">Clarence Way. Kentish Town NW1 8HR</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Get Involved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Discover groups and serving opportunities.</p>
                <Button variant="link" asChild className="mt-2 text-primary">
                  <Link href="/contact">Connect With Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section id="sermons" className="bg-secondary py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Latest Messages</h2>
            <p className="mt-2 text-muted-foreground text-lg">Be encouraged and challenged by God's Word.</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.length > 0
                ? sermons.map((sermon) => (
                    <Card key={sermon.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <Link href={`/sermons#${sermon.id}`} className="block">
                        <CardHeader className="p-0">
                          <div className="aspect-video relative">
                            <Image
                              src={`https://img.youtube.com/vi/${sermon.youtubeVideoId}/hqdefault.jpg`}
                              alt={`Thumbnail for ${sermon.title}`}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Video className="h-12 w-12 text-white/80" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-lg">{sermon.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">
                            {sermon.speaker} | {format(new Date(sermon.preachedDate), 'MMMM d, yyyy')}
                          </p>
                          <p className="text-sm font-semibold text-primary mt-4">
                            Watch Now <ArrowRight className="inline-block ml-1 h-4 w-4" />
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))
                : sermonPlaceholders.map((sermon, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <Link href="/sermons" className="block">
                        <CardHeader className="p-0">
                          <div className="aspect-video relative">
                            <Image
                              src={sermon.imageUrl}
                              alt={sermon.description}
                              data-ai-hint={sermon.imageHint}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Video className="h-12 w-12 text-white/80" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <CardTitle className="text-lg">Title Coming Soon</CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">Details coming soon</p>
                          <p className="text-sm font-semibold text-primary mt-4">
                            Watch Now <ArrowRight className="inline-block ml-1 h-4 w-4" />
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/sermons">View All Sermons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="bg-background py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground text-lg">Join us for fellowship and fun.</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.length > 0
                ? events.map((event) => (
                    <Card key={event.id} className="flex flex-col sm:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                        <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                      </div>
                      <div className="p-6 flex flex-col justify-between sm:w-2/3">
                        <div>
                          <p className="text-sm font-semibold text-accent">
                            {format(new Date(event.date), 'EEEE, MMMM d @ h:mm a')}
                          </p>
                          <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                          <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                        </div>
                        <Button variant="link" asChild className="mt-4 p-0 self-start">
                          <Link href={`/events#${event.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </Card>
                  ))
                : eventPlaceholders.map((event, index) => (
                    <Card key={index} className="flex flex-col sm:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                        <Image src={event.imageUrl} alt={event.description} data-ai-hint={event.imageHint} fill className="object-cover" />
                      </div>
                      <div className="p-6 flex flex-col justify-between sm:w-2/3">
                        <div>
                          <p className="text-sm font-semibold text-accent">Date & Time TBD</p>
                          <h3 className="text-xl font-bold mt-1">Event Title Coming Soon</h3>
                          <p className="text-muted-foreground mt-2 text-sm">More details to come. Stay tuned!</p>
                        </div>
                        <Button variant="link" asChild className="mt-4 p-0 self-start">
                          <Link href="/events">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/events">See All Events</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}