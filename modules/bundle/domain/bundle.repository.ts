import {
  Bundle as DomainBundle,
  BundleType as DomainBundleType,
} from './bundle';
import { RepositoryCreateBundleTypeInput } from './validations/CreateBundleTypeTypes';
import { RepositoryCreateBundleInput } from './validations/CreateBundleTypes';
import { RepositoryEditBundleTypeInput } from './validations/EditBundleTypeTypes';
import { RepositoryEditBundleInput } from './validations/EditBundleTypes';
import { RepositoryGetBundlesQuery } from './validations/GetBundlesTypes';

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

export interface BundleRepository {
  findOne: (id: number) => Promise<DomainBundle | null>;
  getAll: () => Promise<DomainBundle[]>;
  findAllWithQuery: (
    query: RepositoryGetBundlesQuery
  ) => Promise<DomainBundle[]>;
  create: (data: RepositoryCreateBundleInput) => Promise<DomainBundle>;
  edit: (id: number, data: RepositoryEditBundleInput) => Promise<DomainBundle>;
  delete: (id: number) => Promise<void>;
}
