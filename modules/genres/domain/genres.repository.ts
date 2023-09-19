import { Genres as DomainGenres } from './genres';

export interface GenresRepository {
  getAllGenres: () => Promise<DomainGenres[]>;
  createGenres: (tag: string, slug: string) => Promise<DomainGenres>;
}
