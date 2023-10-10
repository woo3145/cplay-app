export enum StemType {
  FULL = 'FULL',
}
export interface Stem {
  id: number;
  stemType: StemType; // full, drum, bass, guitar 등등
  src: string; // 오디오 소스 url
}
