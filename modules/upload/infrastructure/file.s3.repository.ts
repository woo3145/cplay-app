import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileRepository } from '../domain/file.repository';

export class FileS3Repository implements FileRepository {
  private s3;
  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
      },
      region: process.env.S3_REGION,
    });
  }

  async getPresignedUrl(
    name: string,
    mimeType: string,
    expiresIn: number = 30
  ) {
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: name,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: expiresIn,
    });

    return url;
  }
}
