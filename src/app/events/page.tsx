import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Upcoming Events</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Get involved in the life of our church. There's something for everyone.
          </p>
        </div>
        
        <div className="mt-12 space-y-12">
          {events.map((event) => {
            const eventImage = PlaceHolderImages.find(p => p.imageUrl === event.imageUrl);
            return (
              <Card key={event.id} id={event.id} className="overflow-hidden md:grid md:grid-cols-3 md:items-center">
                <div className="relative h-64 w-full md:col-span-1 md:h-full">
                  {eventImage && (
                    <Image
                      src={eventImage.imageUrl}
                      alt={eventImage.description}
                      data-ai-hint={eventImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  )}
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
      </div>
    </div>
  );
}
