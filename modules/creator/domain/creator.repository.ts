import { CreateCreatorFormData } from '@/modules/admin/domain/creator.validation';
import { Creator as DomainCreator } from './creator';

export interface CreatorRepository {
  getAllCreators: () => Promise<DomainCreator[]>;
  createCreator: (data: CreateCreatorFormData) => Promise<DomainCreator>;
}
