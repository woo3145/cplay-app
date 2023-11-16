import { Track as DomainTrack } from './track';
import { RepositoryCreateTrackInput } from './validations/CreateTrackTypes';
import { RepositoryEditTrackInput } from './validations/EditTrackTypes';
import { RepositoryGetTracksQuery } from './validations/GetTrackTypes';

export interface TrackRepository {
  findById: (id: number) => Promise<DomainTrack>;
  findAll: (
    query?: RepositoryGetTracksQuery,
    isAdmin?: boolean
  ) => Promise<{ tracks: DomainTrack[]; totalCount: number }>;

  create: (data: RepositoryCreateTrackInput) => Promise<DomainTrack>;
  edit: (id: number, data: RepositoryEditTrackInput) => Promise<DomainTrack>;
  delete: (id: number) => Promise<DomainTrack>;

  likeTrack: (
    userId: string,
    trackId: number
  ) => Promise<{ userId: string; trackId: number }>;
  unlikeTrack: (userId: string, trackId: number) => Promise<void>;
  getLikedTracksByUser: (userId: string) => Promise<DomainTrack[]>;
}
