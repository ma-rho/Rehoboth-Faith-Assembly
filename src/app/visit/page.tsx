import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, MapPin, ParkingCircle } from 'lucide-react';

export default function VisitPage() {
  const churchImage = PlaceHolderImages.find(p => p.id === 'church-exterior');

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Plan Your Visit</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We can't wait to meet you! Here's everything you need to know for your first visit.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-center mt-4">Service Times</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-bold">Sunday Morning Worship</p>
              <p className="text-muted-foreground">10:00 AM - 11:30 AM</p>
              <p className="mt-4 font-bold">Wednesday Bible Study</p>
              <p className="text-muted-foreground">7:00 PM - 8:00 PM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <CardTitle className="text-center mt-4">Location</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-bold">123 Church Street</p>
              <p className="text-muted-foreground">Anytown, USA 12345</p>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary font-medium hover:text-accent">
                Get Directions
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <ParkingCircle className="h-6 w-6" />
              </div>
              <CardTitle className="text-center mt-4">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                A warm welcome, contemporary worship, a relevant message, and a great kids' program. Come as you are!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 w-full lg:h-full">
                {churchImage && (
                  <Image
                    src={churchImage.imageUrl}
                    alt={churchImage.description}
                    data-ai-hint={churchImage.imageHint}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-primary">A Place for You</h2>
                <p className="mt-4 text-muted-foreground">
                  From the moment you walk in the door, we hope you'll feel at home. Our greeters are ready to welcome you, help you find a seat, and answer any questions you might have.
                </p>
                <div className="mt-6">
                  <h3 className="font-semibold text-primary">For Your Kids</h3>
                  <p className="mt-2 text-muted-foreground">
                    We have a safe, fun, and engaging program for children from infants through 5th grade during our Sunday service. Your kids will love it!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-primary">Our Location on Map</h2>
           <div className="mt-8 aspect-video w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
             <p>[Embedded Map Placeholder]</p>
           </div>
        </div>

      </div>
    </div>
  );
}
