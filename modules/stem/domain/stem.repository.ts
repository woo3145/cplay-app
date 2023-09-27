import { CreateStemFormData } from '@/modules/admin/domain/stem.validation';
import { Stem as DomainStem } from './stem';

export interface StemRepository {
  create: (data: CreateStemFormData) => Promise<DomainStem>;
}
