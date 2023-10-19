import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RelasedTrackList } from './RelasedTrackList';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Suspense } from 'react';
import { Disc3 } from 'lucide-react';
import { Genre } from '@/modules/genre/domain/genre';

interface Props {
  genres: Genre[];
}

export const ReleasedTrackSection = ({ genres }: Props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Disc3 />
            새로운 트랙
          </h2>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-0">
        <TabsList
          className={cn(
            'flex flex-wrap justify-start h-auto bg-background gap-2 p-0'
          )}
        >
          <TabsTrigger
            key={'all'}
            value={'all'}
            className={cn(
              buttonVariants({
                variant: 'outline',
                shape: 'circle',
              }),
              'data-[state=active]:bg-primary'
            )}
          >
            all
          </TabsTrigger>
          {genres.map((genre) => {
            return (
              <TabsTrigger
                key={genre.tag}
                value={genre.tag}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    shape: 'circle',
                  }),
                  'data-[state=active]:bg-primary'
                )}
              >
                {genre.tag}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent key={'all'} value={'all'}>
          <Suspense fallback={<div>Loading...</div>}>
            <RelasedTrackList genre={'all'} />
          </Suspense>
        </TabsContent>
        {genres.map((genre) => {
          return (
            <TabsContent key={genre.tag} value={genre.tag}>
              <Suspense fallback={<div>Loading...</div>}>
                <RelasedTrackList genre={genre} />
              </Suspense>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
