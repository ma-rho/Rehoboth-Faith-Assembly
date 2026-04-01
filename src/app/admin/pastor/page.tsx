'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirebaseServices } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/firebase/storage';
import Image from 'next/image';

const pastorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  bio: z.string().min(10, 'Bio must be at least 10 characters.'),
  imageUrl: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type PastorFormValues = z.infer<typeof pastorSchema>;

export default function AdminPastorPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>('');
  const [isNewPastor, setIsNewPastor] = useState(false);

  const form = useForm<PastorFormValues>({
    resolver: zodResolver(pastorSchema),
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    async function fetchPastorData() {
      const { db } = getFirebaseServices();
      if (!db) {
        toast({
          title: 'Error',
          description: 'Failed to fetch pastor information.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      try {
        const pastorDocRef = doc(db, 'pastor', 'main');
        const docSnap = await getDoc(pastorDocRef);

        if (docSnap.exists()) {
          const pastorData = docSnap.data() as PastorFormValues;
          form.reset(pastorData);
          setExistingImageUrl(pastorData.imageUrl);
          setIsNewPastor(false);
        } else {
          setIsNewPastor(true);
        }
      } catch (error) {
        console.error('Error fetching pastor data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch pastor information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPastorData();
  }, [form, toast]);


  async function onSubmit(data: PastorFormValues) {
    setIsSubmitting(true);
    const { db } = getFirebaseServices();
    if (!db) {
      toast({
        title: 'Error',
        description: 'Firebase is not initialized.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
        let imageUrl = existingImageUrl;

        if (data.image) {
            imageUrl = await uploadImage(data.image, 'pastor');
        }

        const pastorData = {
            name: data.name,
            title: data.title,
            bio: data.bio,
            imageUrl: imageUrl,
        };

      const pastorDocRef = doc(db, 'pastor', 'main');
      await setDoc(pastorDocRef, pastorData, { merge: true });
      
      toast({
        title: 'Success!',
        description: isNewPastor ? 'Pastor information has been created.' : 'Pastor information has been updated.',
      });
      
      setExistingImageUrl(imageUrl);
      if (isNewPastor) {
        setIsNewPastor(false);
      }
    } catch (error) {
      console.error('Error updating pastor data:', error);
      toast({
        title: 'Error',
        description: 'Failed to update pastor information.',
        variant: 'destructive',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading Pastor Info...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pastor Information</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {existingImageUrl && (
                <div className="flex justify-center">
                    <Image 
                        src={existingImageUrl}
                        alt="Pastor's Image"
                        width={150}
                        height={150}
                        className="rounded-full aspect-square object-cover"
                    />
                </div>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Pastor Image</FormLabel>
                  <FormControl>
                    <Input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pastor's Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Pastor's Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short bio about the pastor" {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
