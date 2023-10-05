import { Genre } from '@/modules/genre/domain/genre';
import { Mood } from '@/modules/mood/domain/mood';
import { Stem } from '@/modules/stem/domain/stem';
import { User } from '@/modules/user/domain/user';

export enum TrackStatus {
  HIDDEN = 'HIDDEN',
  PUBLISH = 'PUBLISH',
}

export interface Track {
  id: number;
  title: string;
  imageUrl: string;
  length: number; // 트랙 길이 (초)
  bpm: number; // 트랙 템포
  status: TrackStatus; // 트랙 릴리즈 여부
  createdAt: Date; // 트랙 추가일
  releaseDate: Date | null; // 트랙 공개일

  genres: Genre[];
  moods: Mood[];
  stems: Stem[]; //원곡을 이루는 개별트랙

  creator: Omit<User, 'email'> | null;
}
