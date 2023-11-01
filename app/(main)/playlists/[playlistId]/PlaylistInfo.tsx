import { UserPlaylist } from '@/modules/playlist/domain/playlist';

interface Props {
  playlist: UserPlaylist;
}

export const PlaylistInfo = ({ playlist }: Props) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl">{playlist.name}</h2>
    </div>
  );
};
