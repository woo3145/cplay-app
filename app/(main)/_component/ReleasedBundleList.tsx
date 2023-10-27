import { BundleCarousel } from '@/components/bundle/BundleCarousel';
import { getReleasedBundlesServerAction } from '@/modules/bundle/domain/usecases/getReleasedBundlesServerAction';
import { BundleType } from '@/modules/bundle/domain/bundle';

interface Props {
  bundleType: BundleType | 'all';
}

export const RelasedBundleList = async ({ bundleType }: Props) => {
  const bundles = await getReleasedBundlesServerAction({
    type: bundleType === 'all' ? 'all' : bundleType.name,
  });

  return <BundleCarousel bundles={bundles} />;
};
