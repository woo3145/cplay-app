import { getPlaylistServerAction } from '@/modules/playlist/domain/usecases/getPlaylistServerAction';
import { PlaylistInfo } from './PlaylistInfo';

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
    <div className="flex w-full px-4 lg:px-8 py-6 gap-8">
      <div className="w-1/3 shrink-0 bg-red-200">
        <PlaylistInfo playlist={playlist} />
      </div>
      <div className="w-full bg-slate-500">Playlist {playlist.name}</div>
    </div>
  );
}
