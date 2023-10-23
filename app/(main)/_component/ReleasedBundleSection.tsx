import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Suspense } from 'react';
import { Library } from 'lucide-react';
import { BundleType } from '@/modules/bundle/domain/bundle';
import { RelasedBundleList } from './ReleasedBundleList';

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
          <TabsTrigger
            key={'all'}
            value={'all'}
            className={cn(
              buttonVariants({
                variant: 'outline',
                shape: 'circle',
              }),
              'data-[state=active]:bg-primary data-[state=active]:text-white'
            )}
          >
            all
          </TabsTrigger>
          {bundleTypes.map((bundleType) => {
            return (
              <TabsTrigger
                key={bundleType.name}
                value={bundleType.name}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    shape: 'circle',
                  }),
                  'data-[state=active]:bg-primary data-[state=active]:text-white'
                )}
              >
                {bundleType.name}
              </TabsTrigger>
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
