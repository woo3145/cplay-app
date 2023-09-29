'use client';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

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
        <AvatarImage src={previewUrl ?? ''} alt="user avatar" />
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
