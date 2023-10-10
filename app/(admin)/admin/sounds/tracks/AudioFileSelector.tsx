'use client';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Props {
  onFileSelect: (file: File) => void;
}

export function AudioFileSelector({ onFileSelect }: Props) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setSelectedFileName(file.name);
      setAudioUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      <div className="flex flex-col items-center w-full justify-center gap-4 pt-4">
        {audioUrl && (
          <audio controls key={audioUrl} className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {selectedFileName ? selectedFileName : '오디오 파일을 선택해주세요.'}
      </div>
      <Input
        onChange={handleFileChange}
        id="audioFile"
        type="file"
        accept="audio/*"
        className="hidden"
      />
      <Label
        htmlFor="audioFile"
        className={cn(
          buttonVariants({ variant: 'outline', className: 'cursor-pointer' })
        )}
      >
        오디오 선택
      </Label>
    </div>
  );
}
