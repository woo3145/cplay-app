import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAllGenres } from '@/modules/genres/application/getAllGenres';
import { MockTracks } from '@/modules/track/domain/track.mock';
import Link from 'next/link';

export default async function TracksPage() {
  const genres = await getAllGenres();
  const tracks = MockTracks;
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Track List</h2>
          <p className="text-sm text-muted-foreground">트랙 추가, 수정, 삭제</p>
        </div>
        <div className="ml-auto mr-4">
          <Link href="/admin/tracks/create">
            <Button>Add Track</Button>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative w-full">
        <div className=" mx-auto py-5"></div>
      </div>
    </div>
  );
}
