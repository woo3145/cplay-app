import { Track as DomainTrack, TrackStatus } from './track';

export const MockTracks: DomainTrack[] = [
  {
    id: 1,
    title: "woo's blues",
    imageUrl:
      'https://images.unsplash.com/photo-1695650911648-718c6ef64972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    length: 211,
    bpm: 90,
    status: TrackStatus.PUBLISH,
    createdAt: new Date(),
    releaseDate: null,

    genres: [
      {
        id: 1,
        tag: 'blues',
        slug: 'blues',
      },
      {
        id: 2,
        tag: 'rock',
        slug: 'rock',
      },
    ],
    moods: [{ id: 1, tag: '신남' }],

    creator: null,
    stems: [], //원곡을 이루는 개별트랙
  },
  {
    id: 2,
    title: "woo's jazz",
    imageUrl:
      'https://images.unsplash.com/photo-1696237918435-0d3c3f9c5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    length: 140,
    bpm: 120,
    status: TrackStatus.PUBLISH,
    createdAt: new Date(),
    releaseDate: null,

    genres: [
      {
        id: 3,
        tag: 'jazz',
        slug: 'jazz',
      },
    ],
    moods: [{ id: 1, tag: '카페' }],

    creator: null,
    stems: [],
  },
];
