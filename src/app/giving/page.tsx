import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart } from 'lucide-react';

export default function GivingPage() {
  const givingImage = PlaceHolderImages.find(p => p.id === 'giving-background');
  // In a real app, this would be your actual Stripe Payment Link
  const stripePaymentLink = "https://donate.stripe.com/test_aDifferentTestLink";

  return (
    <>
      <div className="relative h-80 w-full">
        {givingImage && (
          <Image
            src={givingImage.imageUrl}
            alt={givingImage.description}
            data-ai-hint={givingImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Give Generously</h1>
            <p className="mt-4 text-lg">Your gift supports our mission and ministries.</p>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4 text-2xl">Support Our Church</CardTitle>
              <CardDescription className="pt-2">
                Thank you for your faithfulness and support. Every donation helps us continue our work in the community and spread the message of hope.
              </d_carddescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-muted-foreground">
                Click the button below to make a secure online donation through Stripe.
              </p>
              <Button size="lg" asChild className="w-full max-w-xs bg-accent hover:bg-accent/90">
                <Link href={stripePaymentLink} target="_blank" rel="noopener noreferrer">
                  Give Online
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
