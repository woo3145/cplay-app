import { TrackState } from '@prisma/client';
import { Track as DomainTrack } from './track';

export interface CreateTrackInput {
  title: string;
  length: number;
  bpm: number;
  imageUrl: string;
  state: TrackState;
  moodIds: number[];
  genresIds: number[];
  creatorId: string;
}

export interface TrackRepository {
  findAll: () => Promise<DomainTrack[]>;
  create: (data: CreateTrackInput) => Promise<DomainTrack>;
  delete: (id: number) => Promise<void>;
}
