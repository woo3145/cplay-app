import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Library } from 'lucide-react';
import { BundleType } from '@/modules/bundle/domain/bundle';
import { RelasedBundleList } from './ReleasedBundleList';
import { RenderTabsTrigger } from '@/components/tabs/RenderTabsTrigger';

interface Props {
  bundleTypes: BundleType[];
}

export const ReleasedBunldeSection = ({ bundleTypes }: Props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Library />
            새로운 번들
          </h2>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-0">
        <TabsList
          className={cn(
            'flex flex-wrap justify-start h-auto bg-background gap-2 p-0'
          )}
        >
          <RenderTabsTrigger key={'all'} value={'all'} name={'all'} />
          {bundleTypes.map((bundleType) => {
            return (
              <RenderTabsTrigger
                key={bundleType.name}
                value={bundleType.name}
                name={bundleType.name}
              />
            );
          })}
        </TabsList>
        <TabsContent key={'all'} value={'all'}>
          <Suspense fallback={<div>Loading...</div>}>
            <RelasedBundleList bundleType={'all'} />
          </Suspense>
        </TabsContent>
        {bundleTypes.map((bundleType) => {
          return (
            <TabsContent key={bundleType.name} value={bundleType.name}>
              <Suspense fallback={<div>Loading...</div>}>
                <RelasedBundleList bundleType={bundleType} />
              </Suspense>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
