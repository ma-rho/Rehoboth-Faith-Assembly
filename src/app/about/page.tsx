'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { pastor as placeholderPastor } from '@/lib/data';

interface Pastor {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export default function AboutPage() {
  const [pastor, setPastor] = useState<Pastor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPastorData() {
      try {
        const pastorDocRef = doc(db, 'pastor', 'main');
        const docSnap = await getDoc(pastorDocRef);

        if (docSnap.exists()) {
          setPastor(docSnap.data() as Pastor);
        } else {
          console.error('Error fetching pastor data:');
        }
      } catch (error) {
        console.error('Error fetching pastor data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPastorData();
  }, []);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-accent">Our Foundation</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">About Rehoboth Faith Assembly</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Inspired by Genesis 26:22: “Isaac called the well Rehoboth, saying, ‘Now the Lord has given us room and we will flourish in the land.’” Rehoboth Faith Assembly UK is a Bible-believing church committed to advancing God’s Kingdom.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Card className="bg-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To spread the Good News of Jesus Christ and share His love, in obedience to Mark 16:15. We are dedicated to preaching and teaching the Word of God with clarity and power, leading people into a personal relationship with Jesus Christ, and nurturing believers toward spiritual growth and mature discipleship.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                We strive to build a Christ-centered community that reflects God’s love, transforms lives, and impacts the world through faith, service, and truth.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Meet Our Pastor</h2>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <span>Loading Pastor Info...</span>
            </div>
          ) : pastor && (
            <div className="mt-8 grid grid-cols-1 items-center gap-12 md:grid-cols-3">
              <div className="md:col-span-1 flex justify-center">
                  <div className="relative h-64 w-64">
                     <Image
                        src={pastor.imageUrl}
                        alt={pastor.name}
                        width={400}
                        height={400}
                        className="rounded-full object-cover shadow-lg"
                      />
                  </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold">{pastor.name}</h3>
                <p className="text-md font-semibold text-accent">{pastor.title}</p>
                <p className="mt-4 text-muted-foreground">{pastor.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
