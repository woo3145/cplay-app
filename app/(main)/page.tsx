import { getAllGenresServerAction } from '@/modules/genre/domain/usecases/getAllGenresServerAction';
import { Library } from 'lucide-react';
import { ReleasedTrackSection } from './_component/ReleasedTrackSection';

export default async function HomePage() {
  const genres = await getAllGenresServerAction();

  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-8 py-6 gap-8">
      <ReleasedTrackSection genres={genres} />

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
