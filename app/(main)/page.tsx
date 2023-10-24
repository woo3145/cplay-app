import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { ReleasedTrackSection } from './_component/ReleasedTrackSection';
import { getAllBundleTypesServerAction } from '@/modules/bundle/domain/usecases/getAllBundleTypesServerAction';
import { ReleasedBunldeSection } from './_component/ReleasedBundleSection';

export default async function HomePage() {
  const genres = await getAllGenresServerAction();
  const bundleTypes = await getAllBundleTypesServerAction();

  return (
    <div className="flex flex-col items-center justify-between w-full px-4 lg:px-8 py-6 gap-8">
      <ReleasedTrackSection genres={genres} />
      <ReleasedBunldeSection bundleTypes={bundleTypes} />
    </div>
  );
}
