'use client';

import { useSession } from 'next-auth/react';
import { toggleLikeTrackServerAction } from '@/modules/track/domain/usecases/toggleLikeTrackServerAction';
import { toast } from '@/components/ui/use-toast';

export const useToggleLikeTrack = (trackId: number) => {
  const { data: session } = useSession();

  const toggleLikeTrack = async () => {
    if (!session?.user) {
      toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
      return;
    }

    const result = await toggleLikeTrackServerAction(
      session ? session.user.id : null,
      trackId
    );

    if (result.success) {
      toast({
        variant: 'success',
        title: result.isLiked
          ? '성공적으로 좋아요를 눌렀습니다.'
          : '성공적으로 좋아요를 취소했습니다.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: result.message,
      });
    }
  };

  return toggleLikeTrack;
};
