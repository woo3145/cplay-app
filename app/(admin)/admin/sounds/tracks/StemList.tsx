import { Button } from '@/components/ui/button';
import { Stem } from '@/modules/stem/domain/stem';

interface Props {
  stems: Stem[];
}

export const StemList = ({ stems }: Props) => {
  return (
    <ul className="space-y-4">
      {stems.map((stem, idx) => {
        return (
          <li key={idx} className="flex gap-2 items-center">
            {stem.stemType}
            {stem.src && (
              <audio controls key={stem.src} className="w-full">
                <source src={stem.src} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <Button type="button" variant="ghost" className="shrink-0">
              X
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
