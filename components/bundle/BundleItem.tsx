import { cn } from '@/lib/utils';
import { Bundle } from '@/modules/bundle/domain/bundle';
import Image from 'next/image';

interface Props {
  bundle: Bundle;
  onClick: (track: Bundle) => void;
}

export const BundleItem = ({ bundle, onClick }: Props) => {
  const onTrackClick = () => {
    onClick(bundle);
  };
  return (
    <div
      key={bundle.name}
      className={cn('space-y-3 cursor-pointer w-full shrink-0')}
      onClick={onTrackClick}
    >
      <Image
        src={bundle.imageUrl}
        alt={bundle.name}
        width={256}
        height={256}
        className={cn(
          'w-full object-cover transition-all hover:scale-105 aspect-square rounded-md'
        )}
      />
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{bundle.name}</h3>
      </div>
    </div>
  );
};
