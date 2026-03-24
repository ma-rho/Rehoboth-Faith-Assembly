import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sermons } from '@/lib/data';

export default function SermonsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Sermon Archive</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore our collection of past messages. Be encouraged, equipped, and inspired.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <Card key={sermon.id} id={sermon.id} className="flex flex-col">
              <CardHeader className="p-4">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${sermon.youtubeVideoId}`}
                    title={sermon.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                  ></iframe>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow p-4 pt-0">
                <CardTitle className="text-xl">{sermon.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {sermon.speaker}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {format(new Date(sermon.preachedDate), 'MMMM d, yyyy')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
