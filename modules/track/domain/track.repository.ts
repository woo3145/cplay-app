import { Track as DomainTrack } from './track';
import { CreateTrackFormData } from '../../admin/domain/track.validation';

export interface TrackRepository {
  getTracks: () => Promise<DomainTrack[]>;
  createTrack: (data: CreateTrackFormData) => Promise<DomainTrack>;
}
