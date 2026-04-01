'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlusCircle, MoreHorizontal, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

// Helper function to extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string): string {
    if (!url) return '';
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
  
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    // If no match is found, assume the input is the video ID itself
    return url.length === 11 ? url : '';
}

const sermonSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  speaker: z.string().min(2, 'Speaker must be at least 2 characters.'),
  preachedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  description: z.string().optional(),
  youtubeUrl: z.string().optional(),
});

type SermonFormValues = z.infer<typeof sermonSchema>;

interface Sermon extends Omit<SermonFormValues, 'youtubeUrl'> {
  id: string;
  preachedDate: string; // The fetched date will be a string
  youtubeVideoId?: string;
}

export default function AdminSermonsPage() {
  const { toast } = useToast();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const form = useForm<SermonFormValues>({
    resolver: zodResolver(sermonSchema),
    defaultValues: {
        title: '',
        speaker: '',
        preachedDate: '',
        description: '',
        youtubeUrl: '',
    },
  });

  async function fetchSermons() {
    try {
      setLoading(true);
      const sermonsCollection = collection(db, 'sermons');
      const sermonSnapshot = await getDocs(sermonsCollection);
      const sermonsList = sermonSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            preachedDate: data.preachedDate instanceof Timestamp ? data.preachedDate.toDate().toISOString() : data.preachedDate,
          } as Sermon;
        }
      );
      sermonsList.sort(
        (a, b) => new Date(b.preachedDate).getTime() - new Date(a.preachedDate).getTime()
      );
      setSermons(sermonsList);
    } catch (error) {
      console.error('Error fetching sermons:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch sermons.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSermons();
  }, [toast]);

  const handleAddClick = () => {
    setSelectedSermon(null);
    form.reset({ title: '', speaker: '', preachedDate: '', description: '', youtubeUrl: '' });
    setIsFormOpen(true);
  };

  const handleEditClick = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    form.reset({
        ...sermon,
        preachedDate: format(new Date(sermon.preachedDate), 'yyyy-MM-dd'),
        youtubeUrl: sermon.youtubeVideoId ? `https://www.youtube.com/watch?v=${sermon.youtubeVideoId}` : '',
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSermon) return;
    try {
        await deleteDoc(doc(db, 'sermons', selectedSermon.id));
        toast({
            title: "Success!",
            description: "Sermon has been deleted.",
        });
        fetchSermons();
    } catch (error) {
        console.error("Error deleting sermon:", error);
        toast({
            title: "Error",
            description: "Failed to delete sermon.",
            variant: "destructive",
        });
    } finally {
        setIsDeleteDialogOpen(false);
        setSelectedSermon(null);
    }
  };

  async function onSubmit(data: SermonFormValues) {
    setIsSubmitting(true);
    try {
        const { youtubeUrl, ...restOfData } = data;
        const videoId = getYoutubeVideoId(youtubeUrl || '');

        const sermonData: Omit<Sermon, 'id'> = {
            ...restOfData,
            preachedDate: new Date(data.preachedDate).toISOString(),
            youtubeVideoId: videoId,
        };

      if (selectedSermon) {
        const sermonDocRef = doc(db, 'sermons', selectedSermon.id);
        await updateDoc(sermonDocRef, sermonData);
        toast({
          title: 'Success!',
          description: 'Sermon has been updated.',
        });
      } else {
        await addDoc(collection(db, 'sermons'), sermonData);
        toast({
          title: 'Success!',
          description: 'New sermon has been added.',
        });
      }
      setIsFormOpen(false);
      fetchSermons();
    } catch (error) {
      console.error('Error saving sermon:', error);
      toast({
        title: 'Error',
        description: 'Failed to save sermon.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sermons</CardTitle>
          <Button size="sm" className="gap-1" onClick={handleAddClick}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Sermon
            </span>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Loading Sermons...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Speaker</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sermons.map((sermon) => (
                  <TableRow key={sermon.id}>
                    <TableCell className="font-medium">{sermon.title}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{sermon.speaker}</Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(sermon.preachedDate), 'MMMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(sermon)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(sermon)} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedSermon ? 'Edit Sermon' : 'Add New Sermon'}
            </DialogTitle>
            <DialogDescription>
                {selectedSermon ? "Update the details for this sermon." : "Enter the details for the new sermon."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Sermon Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="speaker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speaker</FormLabel>
                    <FormControl>
                      <Input placeholder="Speaker's Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preachedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preached Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" {...field} />
                    </FormControl>
                    <FormDescription>
                      Paste the full YouTube video URL. The ID will be extracted automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short description about the sermon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the sermon.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
