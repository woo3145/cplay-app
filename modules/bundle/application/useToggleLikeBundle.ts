'use client';

import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { toggleLikeBundleServerAction } from '../domain/usecases/toggleLikeBundleServerAction';

export const useToggleLikeBundle = (bundleId: number) => {
  const { data: session } = useSession();

  const toggleLikeBundle = async () => {
    if (!session?.user) {
      toast({
        variant: 'destructive',
        title: '로그인이 필요합니다.',
      });
      return;
    }

    const result = await toggleLikeBundleServerAction(
      session ? session.user.id : null,
      bundleId
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

  return toggleLikeBundle;
};
