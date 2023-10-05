import { Separator } from '@/components/ui/separator';
import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { getAllMoodsServerAction } from '@/modules/mood/domain/usecases/getAllMoodsServerAction';
import { CreateTrackForm } from '@/modules/track/application/CreateTrackForm';

export default async function AddTracksPage() {
  const genres = await getAllGenresServerAction();
  const moods = await getAllMoodsServerAction();

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Add Track</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <CreateTrackForm genres={genres} moods={moods} />
    </div>
  );
}
