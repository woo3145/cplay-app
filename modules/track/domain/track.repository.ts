import { Track as DomainTrack } from './track';
import { RepositoryCreateTrackInput } from './validations/CreateTrackTypes';
import { RepositoryEditTrackInput } from './validations/EditTrackTypes';

export interface TrackRepository {
  toDomainModel: (record: any) => DomainTrack;
  findById: (id: number) => Promise<DomainTrack | null>;
  findAll: () => Promise<DomainTrack[]>;
  create: (data: RepositoryCreateTrackInput) => Promise<DomainTrack>;
  edit: (id: number, data: RepositoryEditTrackInput) => Promise<DomainTrack>;
  delete: (id: number) => Promise<void>;
}
