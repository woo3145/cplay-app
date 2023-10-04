import { useState } from 'react';
import { getPresignedUrlToAvatar } from '../domain/getPresignedUrlToAvatar';
import { getFileExtension } from '@/lib/utils';
import { uploadFileToPresigendUrl } from '../infrastructure/uploadFileToPresigendUrl';

export const useUploadImage = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadImage = async () => {
    if (!selectedFile) return null;

    setIsLoading(true);
    try {
      const extended = getFileExtension(selectedFile.name);
      const presignedUrl = await getPresignedUrlToAvatar(
        `${userId}-profile.${extended}`,
        selectedFile.type
      );

      const imageUrl = await uploadFileToPresigendUrl(
        presignedUrl,
        selectedFile
      );

      return imageUrl;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, selectedFile, setSelectedFile, uploadImage };
};
