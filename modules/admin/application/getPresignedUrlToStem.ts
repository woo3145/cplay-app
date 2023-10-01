'use server';

import { adminGuard } from '@/lib/guard/adminGuard';
import { FileRepository } from '../../upload/domain/file.repository';
import { repository } from '@/modules/config/repository';

export const getPresignedUrlToStem = adminGuard(
  async (
    filename: string,
    fileType,
    subFileRepository: FileRepository | null = null
  ) => {
    const repo = subFileRepository || repository.file;
    const url = await repo.getPresignedUrl(`stem/${filename}`, fileType, 3600);

    return url;
  }
);
