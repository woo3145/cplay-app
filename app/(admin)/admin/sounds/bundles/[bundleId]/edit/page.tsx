import { Separator } from '@/components/ui/separator';
import { EditBundleForm } from '@/modules/bundle/application/EditBundleForm';
import { getAllBundleTypesServerAction } from '@/modules/bundle/domain/usecases/getAllBundleTypesServerAction';
import { getBundleServerAction } from '@/modules/bundle/domain/usecases/getBundleServerAction';
import { getAllTracksServerAction } from '@/modules/track/domain/usecases/getAllTracksServerAction';
import { notFound } from 'next/navigation';
import z from 'zod';

export default async function EditTrackPage({
  params,
}: {
  params: { bundleId: string };
}) {
  const routerSchema = z.object({
    bundleId: z.coerce.number(),
  });
  const parsedParams = routerSchema.safeParse(params);
  if (!parsedParams.success) {
    notFound();
  }
  const bundleTypes = await getAllBundleTypesServerAction();
  const bundle = await getBundleServerAction(parsedParams.data.bundleId);
  const allTracksResult = await getAllTracksServerAction();

  const allTracks = allTracksResult.success ? allTracksResult.data : [];
  if (!bundle) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Edit Bundle</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <EditBundleForm
        tracks={allTracks}
        bundle={bundle}
        bundleTypes={bundleTypes}
      />
    </div>
  );
}
