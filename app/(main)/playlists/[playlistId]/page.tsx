import { getPlaylistServerAction } from '@/modules/playlist/domain/usecases/getPlaylistServerAction';
import { PlaylistController } from './PlaylistController';
import { PlaylistInfo } from './PlaylistInfo';
import { PlaylistList } from './PlaylistList';
import { Separator } from '@/components/ui/separator';

export default async function PlaylistPage({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) {
  const playlist = await getPlaylistServerAction(playlistId);

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-between w-full px-4 lg:px-8 py-6 gap-8">
        <div>Playlist가 존재하지 않습니다.</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full px-4 lg:flex-row lg:items-start lg:px-8 py-6 gap-8">
      <div className="w-full sm:w-3/5 lg:w-1/3 shrink-0">
        <PlaylistController playlist={playlist} />
      </div>
      <div className="w-full space-y-4">
        <PlaylistInfo playlist={playlist} />
        <Separator className="w-full" />
        <PlaylistList playlist={playlist} />
      </div>
    </div>
  );
}
