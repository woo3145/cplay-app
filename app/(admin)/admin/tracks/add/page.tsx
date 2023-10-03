import { Separator } from '@/components/ui/separator';
import { MockTracks } from '@/modules/track/domain/track.mock';

export default async function TracksPage() {
  const tracks = MockTracks;
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Add Track</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative w-full">
        <div className=" mx-auto py-5"></div>
      </div>
    </div>
  );
}
