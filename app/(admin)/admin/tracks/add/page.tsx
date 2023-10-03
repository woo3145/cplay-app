import { Separator } from '@/components/ui/separator';
import { getAllGenres } from '@/modules/genres/application/getAllGenres';
import { AddTrackForm } from './AddTrackForm';
import { getAllMoods } from '@/modules/mood/application/getAllMoods';

export default async function TracksPage() {
  const genres = await getAllGenres();
  const moods = await getAllMoods();

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Add Track</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <AddTrackForm genres={genres} moods={moods} />
    </div>
  );
}
