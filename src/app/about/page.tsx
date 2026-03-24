import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { pastor } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const pastorImage = PlaceHolderImages.find(p => p.id === 'pastor-photo');
  
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-accent">Our Foundation</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">About Rehoboth Connect</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Learn about our mission, vision, and the people who lead our church.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Card className="bg-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To connect people with God, with one another, and with their purpose in Christ. We strive to be a beacon of hope and a center for spiritual growth in our community.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                To create a vibrant, multicultural church family where people from all walks of life can encounter God, grow in their faith, and use their gifts to impact the world for Jesus Christ.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Meet Our Pastor</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 items-center gap-12 md:grid-cols-3">
            <div className="md:col-span-1 flex justify-center">
              {pastorImage && (
                <div className="relative h-64 w-64">
                   <Image
                      src={pastorImage.imageUrl}
                      alt={pastorImage.description}
                      data-ai-hint={pastorImage.imageHint}
                      width={400}
                      height={400}
                      className="rounded-full object-cover shadow-lg"
                    />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">{pastor.name}</h3>
              <p className="text-md font-semibold text-accent">{pastor.title}</p>
              <p className="mt-4 text-muted-foreground">{pastor.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
