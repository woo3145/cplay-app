import { Track as DomainTrack } from './track';
import { CreateTrackFormData } from '../../admin/domain/track.validation';

export interface TrackRepository {
  findAll: () => Promise<DomainTrack[]>;
  create: (data: CreateTrackFormData) => Promise<DomainTrack>;
}
