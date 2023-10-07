import { Separator } from '@/components/ui/separator';
import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { getAllMoodsServerAction } from '@/modules/mood/domain/usecases/getAllMoodsServerAction';
import { EditTrackForm } from '@/modules/track/application/EditTrackForm';
import { getTrackServerAction } from '@/modules/track/domain/usecases/getTrackServerAction';
import { notFound } from 'next/navigation';
import z from 'zod';

export default async function EditTrackPage({
  params,
}: {
  params: { trackId: string };
}) {
  const routerSchema = z.object({
    trackId: z.coerce.number(),
  });
  const parsedParams = routerSchema.safeParse(params);
  if (!parsedParams.success) {
    notFound();
  }
  const genres = await getAllGenresServerAction();
  const moods = await getAllMoodsServerAction();
  const track = await getTrackServerAction(parsedParams.data.trackId);

  if (!track) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Edit Track</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <EditTrackForm track={track} genres={genres} moods={moods} />
    </div>
  );
}
