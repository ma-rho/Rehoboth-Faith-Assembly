import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';

const services = [
  {
    title: 'Men and Women Prayer',
    day: 'Monday',
    time: '9:00 PM - 9:30 PM',
  },
  {
    title: 'Intercession',
    day: 'Tuesday',
    time: '9:00 PM - 10:00 PM',
  },
  {
    title: 'Interactive Bible Study',
    day: 'Wednesday',
    time: '7:00 PM - 9:00 PM',
  },
  {
    title: 'Vigil',
    day: 'Last Friday of every month',
    time: '10:00 PM - 12:30 AM',
  },
];

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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-center mt-4">Service Times</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-bold">Sunday Morning Worship</p>
              <p className="text-muted-foreground">11:00 AM - 1:00 PM</p>
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
              <p className="font-bold">Holy Trinity Church Hall</p>
              <p className="text-muted-foreground">Clarence Way. Kentish Town</p>
              <p className="text-muted-foreground">NW1 8HR</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Holy+Trinity+Church+Hall+Clarence+Way+Kentish+Town+NW1+8HR" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary font-medium hover:text-accent">
                Get Directions
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
            <Card className="bg-card border-accent">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center">
                  <Video className="mr-2 h-8 w-8" />
                  <span>Weekly Activities on Zoom</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  <p>Meeting ID: 8578378059</p>
                  <p>Passcode: dw3nyq</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                  <Card key={service.title} className="bg-background">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-5 w-5" />
                            <span>{service.day}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-5 w-5" />
                            <span>{service.time}</span>
                        </div>
                    </CardContent>
                  </Card>
                ))}
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

      </div>
    </div>
  );
}
