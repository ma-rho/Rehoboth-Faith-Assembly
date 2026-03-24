"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pastor } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const pastorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
});

type PastorFormValues = z.infer<typeof pastorSchema>;

export default function AdminPastorPage() {
  const { toast } = useToast();
  const form = useForm<PastorFormValues>({
    resolver: zodResolver(pastorSchema),
    defaultValues: {
      name: pastor.name,
      title: pastor.title,
      bio: pastor.bio,
    },
  });

  function onSubmit(data: PastorFormValues) {
    console.log("Updated pastor data:", data);
    // In a real app, you would save this to a database.
    toast({
      title: "Success!",
      description: "Pastor information has been updated.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pastor Information</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
