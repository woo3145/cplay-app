import { Genre } from '@prisma/client';
import { Genre as DomainGenre } from '../domain/genre';

export const toGenreDomainModel = (record: Genre): DomainGenre => {
  return {
    id: record.id,
    tag: record.tag,
    slug: record.slug,
  };
};
