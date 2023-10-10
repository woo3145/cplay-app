import { Stem as DomainStem } from './stem';
import { RepositoryCreateStemInput } from './validations/CreateStemTypes';

export interface StemRepository {
  toDomainModel: (record: any) => DomainStem;
  create: (data: RepositoryCreateStemInput) => Promise<DomainStem>;
}
