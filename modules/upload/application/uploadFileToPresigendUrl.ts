//** 클라이언트에서 사용 권장 */
export const uploadFileToPresigendUrl = async (
  presignedUrl: string,
  file: File
) => {
  const result = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!result.ok) throw new Error(`Failed to upload file`);

  const publicUrl = presignedUrl.split('?')[0];

  return publicUrl;
};
