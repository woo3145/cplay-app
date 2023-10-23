import { Track } from '@/modules/track/domain/track';

interface Props {
  tracks: Track[];
}

export const SelectedTrackList = ({ tracks }: Props) => {
  return (
    <ul className="space-y-4">
      {tracks.map((track, idx) => {
        return (
          <li key={idx} className="flex gap-2 items-center">
            {track.title}

            {/* <DeleteStemDialog stem={stem}>
              <Button type="button" variant="ghost" className="shrink-0">
                X
              </Button>
            </DeleteStemDialog> */}
          </li>
        );
      })}
    </ul>
  );
};
