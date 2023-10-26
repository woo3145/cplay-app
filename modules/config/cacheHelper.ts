export const cacheKeys = {
  ALL_MOODS: 'allMoods',
  ALL_GENRES: 'allGenres',

  ADMIN_ALL_TRACKS: 'adminAllTracks', // 어드민이 사용하는 전체 트랙
  RELEASED_TRACK: 'releasedTrack', // relaesed된 전체 트랙

  getTrack: (trackId: number) => `track_${trackId}`,
  getLikedTracksByUser: (userId: string) => `likedTracksByUser_${userId}`,
  getReleasedTracksByGenre: (genre: string) => `releasedTracksByGenre_${genre}`,
};
