import { RepositoryGetTracksQuery } from '../track/domain/validations/GetTrackTypes';

export const cacheKeys = {
  ALL_MOODS: 'allMoods',
  ALL_GENRES: 'allGenres',
  ALL_BUNDLE_TYPE: 'allBundleType',

  ADMIN_ALL_TRACKS: 'adminAllTracks', // 어드민이 사용하는 전체 트랙
  RELEASED_TRACKS: 'releasedTracks', // relaesed된 전체 트랙

  getTrack: (trackId: number) => `track_${trackId}`,
  getLikedTracksByUser: (userId: string) => `likedTracksByUser_${userId}`,

  getReleasedTracksWithQuery: (query: RepositoryGetTracksQuery) =>
    `releasedTracksWithQuery_genre=[${query.genres || ''}]&mood=[${
      query.moods || ''
    }]&page=${query.page || 1}&take=${query.take || 15}&title=${
      query.title || ''
    }`,

  getCountTracksWithQuery: (query: RepositoryGetTracksQuery) =>
    `getCountTracksWithQuery_genre=[${query.genres || ''}]&mood=[${
      query.moods || ''
    }]&title=${query.title || ''}`,

  ADMIN_ALL_BUNDLES: 'adminAllTracks', // 어드민이 사용하는 전체 번들
  RELEASED_BUNDLES: 'releasedTrack', // relaesed된 전체 번들

  getBundle: (trackId: number) => `bundle_${trackId}`,
  getLikedBundlesByUser: (userId: string) => `likedBundlesByUser_${userId}`,
  getReleasedBundlesByType: (bundleType: string) =>
    `releasedBundlesByType_${bundleType}`,

  getSessionUser: (userId: string) => `sessionUser_${userId}`,

  getPlaylistsByUser: (userId: string) => `playlists_${userId}`,
  getPlaylistById: (playlistId: string) => `playlist_${playlistId}`,
};
