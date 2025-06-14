import type { Readable } from 'node:stream';

export type UploadParams = {
  fileName: string;
  contentType: string;
  body: Readable;
};

export type UploadResponse = {
  url: string;
};

export interface Uploader {
  upload(params: UploadParams): Promise<UploadResponse>;
}
