import { Track } from '@/modules/track/domain/track';

export interface UserPlaylist {
  id: string;
  name: string;
  tracks: Track[];
  userId: string;
}
