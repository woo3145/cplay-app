'use client';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  initialUrl?: string | null;
  user: User;
  onFileSelect: (file: File) => void;
}

export function AvatarUpload({ initialUrl, user, onFileSelect }: Props) {
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
      <Avatar className="w-48 h-48">
        <AvatarImage asChild src={previewUrl ?? ''}>
          <Image
            src={previewUrl ?? ''}
            alt="user avatar"
            width={192}
            height={192}
          />
        </AvatarImage>
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
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
