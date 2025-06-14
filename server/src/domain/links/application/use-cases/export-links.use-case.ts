import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { type Either, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import { stringify } from 'csv-stringify';
import type { ShortLinksRepository } from '../repositories/short-links.repository';
import type { Uploader } from '../storage/uploader';

type ExportLinksUseCaseResponse = Either<AppError, { reportUrl: string }>;

export class ExportLinksUseCase {
  constructor(
    private shortLinksRepository: ShortLinksRepository,
    private uploader: Uploader
  ) {}

  async execute(): Promise<ExportLinksUseCaseResponse> {
    const linksStream = await this.shortLinksRepository.streamAll();

    const csvStream = stringify({
      header: true,
      columns: [
        { key: 'code', header: 'Code' },
        { key: 'original_url', header: 'Original URL' },
        { key: 'access_count', header: 'Access Count' },
        { key: 'created_at', header: 'Created At' },
      ],
    });

    const uploadStream = new PassThrough();

    const uploadToStorage = this.uploader.upload({
      fileName: `links-report-${new Date().toISOString()}.csv`,
      contentType: 'text/csv',
      body: uploadStream,
    });

    const convertToCsvPipeline = pipeline(
      linksStream,
      new Transform({
        objectMode: true,
        transform(chunks, _, callback) {
          const items = Array.isArray(chunks) ? chunks : [chunks];

          for (const item of items) {
            this.push(item);
          }

          callback();
        },
      }),
      csvStream,
      uploadStream
    );

    const [uploadResult] = await Promise.all([
      uploadToStorage,
      convertToCsvPipeline,
    ]);

    return right({
      reportUrl: uploadResult.url,
    });
  }
}
