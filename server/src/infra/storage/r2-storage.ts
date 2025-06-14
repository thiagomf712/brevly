import { randomUUID } from 'node:crypto';
import type { Readable } from 'node:stream';
import type { Uploader } from '@/domain/links/application/storage/uploader';
import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

type UploadParams = {
  fileName: string;
  contentType: string;
  body: Readable;
};

export class R2Storage implements Uploader {
  async upload({ fileName, contentType, body }: UploadParams) {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    const upload = new Upload({
      client: r2,
      params: {
        Key: uniqueFileName,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: body,
        ContentType: contentType,
      },
    });

    await upload.done();

    const publicUrl = env.CLOUDFLARE_PUBLIC_URL.endsWith('/')
      ? env.CLOUDFLARE_PUBLIC_URL
      : `${env.CLOUDFLARE_PUBLIC_URL}/`;

    const url = `${publicUrl}${uniqueFileName}`;

    return { url };
  }
}
