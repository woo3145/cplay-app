import { BundleStatus } from './bundle';

export const isBundleStatus = (
  bundleStatus: any
): bundleStatus is BundleStatus => {
  return Object.values(BundleStatus).includes(bundleStatus);
};
