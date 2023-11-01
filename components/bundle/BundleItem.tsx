import { cn } from '@/lib/utils';
import { useToggleLikeBundle } from '@/modules/bundle/application/useToggleLikeBundle';
import { Bundle } from '@/modules/bundle/domain/bundle';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Heart, Pause, Play } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

interface Props {
  bundle: Bundle;
  onClick: (track: Bundle) => void;
}

export const BundleItem = ({ bundle, onClick }: Props) => {
  const [currentPlaylistId, isPlaying, setIsPlaying, selectedBundle] =
    usePlayerStore((state) => [
      state.playlistId,
      state.isPlaying,
      state.setIsPlaying,
      state.selectedBundleId,
    ]);

  const isSelectedBundle =
    selectedBundle && selectedBundle === bundle.id.toString();

  const toggleLikeTrack = useToggleLikeBundle(bundle.id);
  const onTrackClick = () => {
    // 이미 선택 된 번들이라면 isPlaying 토글
    if (isSelectedBundle) {
      setIsPlaying(!isPlaying);
      return;
    }

    onClick(bundle);
  };

  const onLikeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // 좋아요 버튼 클릭 이벤트가 트랙 클릭 이벤트로 전파되는 것을 방지
    event.stopPropagation();
    await toggleLikeTrack();
  };
  return (
    <div
      key={bundle.name}
      className={cn('relative space-y-3 cursor-pointer w-full shrink-0')}
      onClick={onTrackClick}
    >
      <Button
        variant="outline"
        className={cn('absolute top-1 left-1 w-8 h-8 p-0 z-30 shadow shrink-0')}
        onClick={onLikeClick}
      >
        <Heart
          className={cn(
            'w-5 h-5',
            bundle.likedByUser ? 'text-primary' : 'text-foreground/20'
          )}
        />
      </Button>
      <div className="relative flex items-center justify-center group">
        <Image
          src={bundle.imageUrl}
          alt={bundle.name}
          width={256}
          height={256}
          className={cn(
            'w-full object-cover transition-all aspect-square rounded-md group-hover:brightness-50',
            isSelectedBundle && isPlaying && 'brightness-50'
          )}
        />

        {isSelectedBundle && isPlaying ? (
          <Pause
            className={cn(
              'absolute w-7 h-7 hidden group-hover:block text-white text-primary',
              isSelectedBundle && 'block'
            )}
          />
        ) : (
          <Play
            className={cn(
              'absolute w-7 h-7 hidden group-hover:block text-white text-primary',
              isSelectedBundle && isPlaying && 'block'
            )}
          />
        )}
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{bundle.name}</h3>
      </div>
    </div>
  );
};
