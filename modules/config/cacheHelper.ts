export const cacheTags = {
  ADMIN_ALL_TRACKS: 'tag_adminAllTracks', // 어드민이 사용하는 전체 트랙
  RELEASED_TRACK: 'tag_releasedTrack', // relaesed된 전체 트랙

  getTrack: (trackId: number) => `tag_track_${trackId}`,

  getLikedTracksByUser: (userId: string) => `tag_likedTracksByUser_${userId}`,
};

export const cacheKeys = {
  ADMIN_ALL_TRACKS: 'key_adminAllTracks',

  getTrack: (trackId: number) => `key_track_${trackId}`,
  getLikedTracksByUser: (userId: string) => `key_likedTracksByUser_${userId}`,
  getReleasedTracksByGenre: (genre: string) =>
    `key_releasedTracksByGenre_${genre}`,
};
