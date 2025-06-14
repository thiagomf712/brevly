import type { Uploader } from '@/domain/links/application/storage/uploader';

export class FakeUploader implements Uploader {
  public uploads: { fileName: string; contentType: string }[] = [];

  async upload(params: { fileName: string; contentType: string }) {
    this.uploads.push(params);
    return {
      url: `https://fake-storage.com/${params.fileName}`,
    };
  }
}
