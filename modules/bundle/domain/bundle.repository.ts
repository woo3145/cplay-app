import { BundleType as DomainBundleType } from './bundle';
import { RepositoryCreateBundleTypeInput } from './validations/CreateBundleTypes';
import { RepositoryEditBundleTypeInput } from './validations/EditBundleTypes';

export interface BundleTypeRepository {
  findOne: (id: number) => Promise<DomainBundleType | null>;
  getAll: () => Promise<DomainBundleType[]>;
  create: (data: RepositoryCreateBundleTypeInput) => Promise<DomainBundleType>;
  edit: (
    id: number,
    data: RepositoryEditBundleTypeInput
  ) => Promise<DomainBundleType>;
  delete: (id: number) => Promise<void>;
}

export interface BundleRepository {}
