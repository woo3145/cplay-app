import { StemType } from './stem';

export const isStemType = (stemType: any): stemType is StemType => {
  return Object.values(StemType).includes(stemType);
};
