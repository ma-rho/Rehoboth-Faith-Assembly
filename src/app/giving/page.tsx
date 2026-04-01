'use client';

import Image from 'next/image';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const donationAmounts = [25, 50, 100, 250, 500, 1000];

// ✅ Isolated into its own component so Suspense can wrap it
function GivingStatus() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  if (success) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 text-green-600">
        <CheckCircle className="h-8 w-8" />
        <p className="font-semibold">Thank you for your generous donation!</p>
        <p className="text-sm text-muted-foreground">Your transaction was successful. A receipt has been sent to your email.</p>
      </div>
    );
  }

  if (canceled) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2 text-red-600">
        <XCircle className="h-8 w-8" />
        <p className="font-semibold">Payment Canceled</p>
        <p className="text-sm text-muted-foreground">Your payment was canceled. You have not been charged.</p>
      </div>
    );
  }

  return (
    <CardDescription className="pt-2">
      Thank you for your faithfulness and support. Select an amount or enter your own to give.
    </CardDescription>
  );
}

export default function GivingPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const givingImage = PlaceHolderImages.find(p => p.id === 'giving-background');

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const amount = selectedAmount || parseFloat(customAmount);

    if (!amount || amount < 1) {
      setError('Please enter a valid amount of at least $1.00.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session.');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      const e = err as Error;
      setError(e.message);
      setLoading(false);
    }
  };

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
              {/* ✅ Suspense boundary required for useSearchParams */}
              <Suspense fallback={<CardDescription className="pt-2">Loading...</CardDescription>}>
                <GivingStatus />
              </Suspense>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleAmountSelect(amount)}
                    className="py-6 text-lg"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="relative w-full max-w-md">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="text"
                  placeholder="Or enter a custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className={cn(
                    "pl-7 py-6 text-lg text-center",
                    customAmount && !selectedAmount ? "border-primary ring-1 ring-primary" : ""
                  )}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button size="lg" onClick={handleCheckout} disabled={loading} className="w-full max-w-xs bg-accent hover:bg-accent/90 text-lg py-6">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Give Now'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}