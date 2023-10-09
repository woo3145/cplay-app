import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { TrackList } from './_component/TrackList';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Suspense } from 'react';
import { Disc3, Library } from 'lucide-react';

export default async function HomePage() {
  const genres = await getAllGenresServerAction();

  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-8 py-6 gap-8">
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Disc3 />
              새로운 트랙
            </h2>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full space-y-4">
          <TabsList className="bg-background gap-2 p-0">
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
              <TrackList genre={'all'} />
            </Suspense>
          </TabsContent>
          {genres.map((genre) => {
            return (
              <TabsContent key={genre.tag} value={genre.tag}>
                <Suspense fallback={<div>Loading...</div>}>
                  <TrackList genre={genre} />
                </Suspense>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Library />
              새로운 번들
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              플레이어 연주
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
