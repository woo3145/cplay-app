import { TrackStatus } from './track';

export const isTrackStatus = (trackStatus: any): trackStatus is TrackStatus => {
  return Object.values(TrackStatus).includes(trackStatus);
};
