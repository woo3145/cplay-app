'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlayerStore } from '@/store/usePlayerStore';
import { ChevronDown, ListMusic, Music } from 'lucide-react';
import { PlayerTrackContent } from './PlayerTrackContent';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import { PlayerPlaylistContent } from './PlayerPlaylistContent';

export default function PlayerPage() {
  const router = useRouter();
  const { track, playlist } = usePlayerStore((state) => ({
    track: state.currentTrack,
    playlist: state.playlist,
  }));
  const likedTrackIds = useUserStore((state) => state.likedTracks).map(
    (track) => track.id
  );

  const onClickBack = () => {
    router.back();
  };
  if (track) {
    track.likedByUser = likedTrackIds.includes(track.id);
  }

  return (
    <div className="absolute top-0 left-0 right-0 h-full flex justify-center bg-background z-[70]">
      <Tabs
        defaultValue="track"
        className="relative flex flex-col justify-between w-full max-w-screen-md"
      >
        <div className="relative px-4 lg:px-28 pt-12">
          <div className="absolute top-14 right-4 lg:px-28">
            <ChevronDown
              onClick={onClickBack}
              className="w-8 h-8 cursor-pointer"
            />
          </div>

          <TabsContent value="track">
            <PlayerTrackContent track={track} />
          </TabsContent>

          <TabsContent value="playlist">
            <PlayerPlaylistContent />
          </TabsContent>
        </div>
        <TabsList className="absolute left-0 right-0 bottom-2 grid grid-cols-2">
          <TabsTrigger value="track" className="gap-2">
            <Music className="w-5 h-5" /> Track
          </TabsTrigger>
          <TabsTrigger value="playlist" className="gap-2">
            <ListMusic className="w-5 h-5" /> Playlist
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
