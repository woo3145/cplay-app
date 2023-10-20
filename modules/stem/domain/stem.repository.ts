import { Stem as DomainStem } from './stem';
import { RepositoryCreateStemInput } from './validations/CreateStemTypes';

export interface StemRepository {
  create: (data: RepositoryCreateStemInput) => Promise<DomainStem>;
  delete: (id: number) => Promise<number | null>;
}
