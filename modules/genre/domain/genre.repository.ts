import { Genre as DomainGenre } from './genre';
import { RepositoryCreateGenreInput } from './validations/CreateGenreTypes';
import { RepositoryEditGenreInput } from './validations/EditGenreTypes';

export interface GenreRepository {
  toDomainModel: (record: any) => DomainGenre;
  getAll: () => Promise<DomainGenre[]>;
  findOne: (id: number) => Promise<DomainGenre | null>;
  create: (data: RepositoryCreateGenreInput) => Promise<DomainGenre>;
  edit: (id: number, data: RepositoryEditGenreInput) => Promise<DomainGenre>;
  delete: (id: number) => Promise<void>;
}
