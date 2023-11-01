import { EditPlaylistNameForm } from '@/modules/playlist/application/EditPlaylistName';
import { UserPlaylist } from '@/modules/playlist/domain/playlist';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistInfo = ({ playlist }: Props) => {
  return (
    <div className="w-full">
      <EditPlaylistNameForm playlist={playlist} />
    </div>
  );
};
