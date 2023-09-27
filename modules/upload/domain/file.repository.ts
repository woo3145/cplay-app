export interface FileRepository {
  getPresignedUrl: (name: string, mimeType: string) => Promise<string>;
}
