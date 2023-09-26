import { Creator } from '@/modules/creator/domain/creator';
import { Genres } from '@/modules/genres/domain/genres';
import { Mood } from '@/modules/mood/domain/mood';

export interface Track {
  id: number;
  title: string;
  imageUrl: string;
  length: number; // 트랙 길이 (초)
  bpm: number; // 트랙 템포
  isPublish: boolean; // 트랙 릴리즈 여부
  createdAt: Date; // 트랙 추가일
  releaseDate: Date | null; // 트랙 공개일

  genres: Genres[];
  moods: Mood[];

  creator: Creator | null;
  creatorId: number | null;
  // stems: Stem[]; //원곡을 이루는 개별트랙
}
