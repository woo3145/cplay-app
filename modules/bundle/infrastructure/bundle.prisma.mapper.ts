import { BundleType } from '@prisma/client';
import { BundleType as DomainBundleType } from '../domain/bundle';

export const toBundleTypeDomainModel = (
  record: BundleType
): DomainBundleType => {
  return {
    id: record.id,
    name: record.name,
  };
};
