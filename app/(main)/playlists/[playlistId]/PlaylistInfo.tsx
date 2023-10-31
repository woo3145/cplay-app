import { UserPlaylist } from '@/modules/playlist/domain/playlist';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistInfo = ({ playlist }: Props) => {
  return (
    <div className="w-full">
      <div>{playlist.id}</div>
      <div>{playlist.name}</div>
    </div>
  );
};
