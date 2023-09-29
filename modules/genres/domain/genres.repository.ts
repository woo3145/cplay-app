import { Genres as DomainGenres } from './genres';

export interface GenresRepository {
  getAll: () => Promise<DomainGenres[]>;
  create: (tag: string, slug: string) => Promise<DomainGenres>;
  delete: (id: number) => Promise<void>;
}
