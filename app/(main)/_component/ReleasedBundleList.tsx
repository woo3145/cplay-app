import { BundleList } from '@/components/bundle/BundleList';
import { getReleasedBundlesServerAction } from '@/modules/bundle/application/getReleasedBundlesServerAction';
import { BundleType } from '@/modules/bundle/domain/bundle';

interface Props {
  bundleType: BundleType | 'all';
}

export const RelasedBundleList = async ({ bundleType }: Props) => {
  const bundles = await getReleasedBundlesServerAction({
    type: bundleType === 'all' ? 'all' : bundleType.name,
  });

  return <BundleList bundles={bundles} />;
};
