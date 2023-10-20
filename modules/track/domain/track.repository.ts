import { Track as DomainTrack } from './track';
import { RepositoryCreateTrackInput } from './validations/CreateTrackTypes';
import { RepositoryEditTrackInput } from './validations/EditTrackTypes';
import { RepositoryGetTracksQuery } from './validations/GetTrackTypes';

export interface TrackRepository {
  findById: (id: number) => Promise<DomainTrack | null>;
  findAll: () => Promise<DomainTrack[]>;
  findAllWithQuery: (query: RepositoryGetTracksQuery) => Promise<DomainTrack[]>;
  create: (data: RepositoryCreateTrackInput) => Promise<DomainTrack>;
  edit: (id: number, data: RepositoryEditTrackInput) => Promise<DomainTrack>;
  delete: (id: number) => Promise<DomainTrack>;
}
