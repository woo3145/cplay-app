import { DataTable } from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAllTracksServerAction } from '@/modules/track/domain/usecases/getAllTracksServerAction';
import Link from 'next/link';
import { trackColumns } from '../tracks/TrackColumns';
import { getAllBundlesServerAction } from '@/modules/bundle/domain/usecases/getAllBundleServerAction';
import { bundleColumns } from './BundleColumns';

export default async function TracksPage() {
  const bundles = await getAllBundlesServerAction();
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Bundle List</h2>
          <p className="text-sm text-muted-foreground">번들 추가, 수정, 삭제</p>
        </div>
        <div className="ml-auto mr-4">
          <Link href="/admin/music/tracks/add">
            <Button>Add Bundle</Button>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative w-full">
        <div className="mx-auto py-5">
          <DataTable
            columns={bundleColumns}
            data={bundles}
            filterField={'name'}
          />
        </div>
      </div>
    </div>
  );
}
