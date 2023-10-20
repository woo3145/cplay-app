import { Stem } from '@prisma/client';
import { Stem as DomainStem } from '../domain/stem';
import { isStemType } from '../domain/stem.type.guard';

export const toStemDomainModel = (record: Stem): DomainStem => {
  if (!isStemType(record.stemType)) {
    throw new Error('Invalid Stem Type');
  }
  return { id: record.id, stemType: record.stemType, src: record.src };
};
