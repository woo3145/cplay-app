'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { UserRole } from '@/modules/user/domain/user';
import { useRouter } from 'next/navigation';
import { useUploadImage } from '@/modules/upload/application/useUploadImage';
import { CoverImageFileSelector } from '@/app/(admin)/admin/sounds/tracks/CoverImageFileSelector';
import {
  CreateBundleFormData,
  CreateBundleFormSchema,
} from '../domain/validations/CreateBundleTypes';
import { createBundleServerAction } from '../domain/usecases/createBundleServerAction';
import { BundleStatus, BundleType } from '../domain/bundle';

interface Props {
  bundleTypes: BundleType[];
}

export const CreateBundleForm = ({ bundleTypes }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<CreateBundleFormData>({
    resolver: zodResolver(CreateBundleFormSchema),
    defaultValues: {
      name: '',
      status: BundleStatus.HIDDEN,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
  const {
    selectedFile: selectedImageFile,
    setSelectedFile: setSelectedImageFile,
    upload: uploadImage,
  } = useUploadImage();

  const onSubmit = async (data: CreateBundleFormData) => {
    setIsLoading(true);
    try {
      if (!session?.user || session.user.role !== UserRole.ADMIN) {
        return toast({
          variant: 'destructive',
          title: '권한이 없습니다.',
        });
      }
      let imageUrl = '';

      if (selectedImageFile) {
        imageUrl = (await uploadImage()) ?? imageUrl;
      }

      const result = await createBundleServerAction({
        ...data,
        imageUrl: imageUrl,
        typeIds: selectedTypes,
        trackIds: selectedTracks,
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.message,
        });
        form.reset();
        return;
      }

      toast({
        variant: 'success',
        title: '성공적으로 Bundle을 생성했습니다.',
      });
      router.push('/admin/sounds/bundles');
    } catch (e) {
      console.log('예상치 못한 에러가 발생하였습니다.', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full grid xl:grid-cols-3 gap-6"
      >
        <div className="grid gap-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
          </Card>

          <div className="grid xl:grid-cols-2 gap-6">
            <div>
              <Card className="">
                <CardHeader>
                  <CardTitle>사운드 트랙</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  수정 페이지에서 업로드해주세요.
                </CardContent>
              </Card>
            </div>
            <div>
              {/* Cover Image 업로드 */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>커버 이미지</CardTitle>
                  <CardDescription>
                    이미지 파일은 1:1 비율이 권장됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <CoverImageFileSelector
                    initialUrl={''}
                    onFileSelect={setSelectedImageFile}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div>
          <div className="col-span-1 grid gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>공개 여부</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>state</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={BundleStatus.PUBLISH}
                                  id="r1"
                                  disabled
                                />
                                <Label htmlFor="r1">Published</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={BundleStatus.HIDDEN}
                                  id="r2"
                                />
                                <Label htmlFor="r2">Hidden</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>타입</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-1 flex-wrap">
                  {bundleTypes.map((item) => (
                    <Badge
                      key={item.name}
                      variant={
                        selectedTypes.includes(item.id) ? 'default' : 'outline'
                      }
                      className={cn('cursor-pointer')}
                      onClick={() => {
                        setSelectedTypes((prev) => {
                          if (prev.includes(item.id)) {
                            return prev.filter((id) => id !== item.id);
                          } else {
                            return [...prev, item.id];
                          }
                        });
                      }}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => router.push('/admin/sounds/bundles')}
                type="button"
                variant="outline"
              >
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                생성
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
