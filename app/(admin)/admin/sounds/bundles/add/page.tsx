import { Separator } from '@/components/ui/separator';
import { CreateBundleForm } from '@/modules/bundle/application/CreateBundleForm';
import { getAllBundleTypesServerAction } from '@/modules/bundle/domain/usecases/getAllBundleTypesServerAction';
export default async function AddBundlePage() {
  const bundleTypes = await getAllBundleTypesServerAction();

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Add Bundle</h2>
        </div>
      </div>
      <Separator className="my-4" />

      <CreateBundleForm bundleTypes={bundleTypes} />
    </div>
  );
}
