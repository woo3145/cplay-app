import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { ReleasedTrackSection } from './_component/ReleasedTrackSection';
import { getAllBundleTypesServerAction } from '@/modules/bundle/domain/usecases/getAllBundleTypesServerAction';
import { ReleasedBunldeSection } from './_component/ReleasedBundleSection';

export default async function HomePage() {
  const genres = await getAllGenresServerAction();
  const bundleTypes = await getAllBundleTypesServerAction();

  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-8 py-6 gap-8">
      <ReleasedTrackSection genres={genres} />

      <ReleasedBunldeSection bundleTypes={bundleTypes} />

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
