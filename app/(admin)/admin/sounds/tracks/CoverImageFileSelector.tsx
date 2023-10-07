'use client';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  initialUrl?: string | null;
  onFileSelect: (file: File) => void;
}

export function CoverImageFileSelector({ initialUrl, onFileSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState(initialUrl);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      {previewUrl ? (
        <div className="relative w-48 h-48">
          <Image
            src={previewUrl ?? ''}
            alt="coverIamge"
            fill
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-48 h-48">
          이미지를 선택해주세요.
        </div>
      )}
      <Input
        onChange={handleFileChange}
        id="avatarFile"
        type="file"
        accept="image/*"
        className="hidden"
      />
      <Label
        htmlFor="avatarFile"
        className={cn(
          buttonVariants({ variant: 'ghost', className: 'cursor-pointer' })
        )}
      >
        이미지 선택
      </Label>
    </div>
  );
}
