import { EditGenresFormData } from '@/modules/admin/domain/genres.validation';
import { Genres as DomainGenres } from './genres';

export interface GenresRepository {
  getAll: () => Promise<DomainGenres[]>;
  create: (tag: string, slug: string) => Promise<DomainGenres>;
  delete: (id: number) => Promise<void>;
  edit: (id: number, data: EditGenresFormData) => Promise<DomainGenres>;
}
