'use server';

import { FileRepository } from '../../upload/domain/file.repository';
import { repository } from '@/modules/config/repository';
import { userGuard } from '@/lib/guard/userGuard';

export const getPresignedUrlToAvatar = userGuard(
  async (
    filename: string,
    fileType: string,
    subFileRepository: FileRepository | null = null
  ) => {
    const repo = subFileRepository || repository.file;
    const url = await repo.getPresignedUrl(`avatar/${filename}`, fileType);

    return url;
  }
);
