import { useState } from 'react';
import { getPresignedUrlToAvatar } from '../domain/getPresignedUrlToAvatar';
import { getFileExtension } from '@/lib/utils';
import { uploadFileToPresigendUrl } from '../infrastructure/uploadFileToPresigendUrl';

export const useUploadImage = (fileName?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async () => {
    if (!selectedFile) return null;

    setIsLoading(true);
    try {
      const extended = getFileExtension(selectedFile.name);
      const currentTime = new Date().toISOString().replace(/[-:.]/g, '');
      const presignedUrl = await getPresignedUrlToAvatar(
        fileName
          ? `${currentTime}_${fileName}.${extended}`
          : `${currentTime}_${selectedFile.name}`,
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

  return { isLoading, selectedFile, setSelectedFile, upload };
};
