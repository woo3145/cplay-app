import { useState } from 'react';
import { getFileExtension } from '@/lib/utils';
import { uploadFileToPresigendUrl } from '../infrastructure/uploadFileToPresigendUrl';
import { getPresignedUrlToStem } from '@/modules/admin/application/getPresignedUrlToStem';

export const useUploadStem = (fileName?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const upload = async () => {
    if (!selectedFile) return '';

    setIsLoading(true);
    try {
      const extended = getFileExtension(selectedFile.name);
      const presignedUrl = await getPresignedUrlToStem(
        fileName ? `${fileName}.${extended}` : selectedFile.name,
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
