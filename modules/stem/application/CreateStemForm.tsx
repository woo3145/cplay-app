'use client';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CreateStemFormSchema } from '../domain/validations/CreateStemTypes';
import { StemType } from '../domain/stem';
import { createStemServerAction } from '../domain/usecases/createStemServerAction';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUploadStem } from '@/modules/upload/application/useUploadStem';
import { AudioFileSelector } from '@/app/(admin)/admin/sounds/tracks/AudioFileSelector';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Track } from '@/modules/track/domain/track';
import { Label } from '@/components/ui/label';

interface Props {
  closeModal: () => void;
  track: Track;
}

export const CreateStemForm = ({ closeModal, track }: Props) => {
  const [stemType, setStemType] = useState<StemType>(StemType.FULL);
  const {
    selectedFile,
    setSelectedFile,
    upload: uploadStemFile,
    isLoading,
  } = useUploadStem();

  const onSubmit = async () => {
    try {
      if (track.stems.some((stem) => stem.stemType === stemType)) {
        toast({
          variant: 'destructive',
          title: '중복 타입은 업로드 할 수 없습니다.',
        });
        return;
      }
      const parsedData = CreateStemFormSchema.parse({ stemType });
      if (!selectedFile) {
        toast({
          variant: 'destructive',
          title: '선택된 파일이 없습니다.',
        });
        return '';
      }
      const audioUrl = await uploadStemFile();

      const result = await createStemServerAction({
        stemType: parsedData.stemType,
        src: audioUrl,
        trackId: track.id,
      });

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: result.error,
        });
        return;
      }

      toast({
        variant: 'success',
        title: '성공적으로 Stem을 업로드했습니다.',
      });

      closeModal();
    } catch (e) {
      console.log('예상치 못한 에러가 발생하였습니다.', e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <AudioFileSelector onFileSelect={setSelectedFile} />

      <Label>Stem Type</Label>
      <Select
        onValueChange={(value) => setStemType(value as StemType)}
        defaultValue={stemType}
      >
        <SelectTrigger>
          <SelectValue placeholder="full" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={StemType.FULL}>Full</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-2 gap-4">
        <AlertDialogCancel disabled={isLoading}>취소</AlertDialogCancel>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          생성
        </Button>
      </div>
    </div>
  );
};
