import type { Readable } from 'node:stream';
import type { ShortLink } from '../../enterprise/entities/short-link';

export interface ShortLinksRepository {
  findMany(): Promise<ShortLink[]>;
  findById(id: string): Promise<ShortLink | null>;
  findByCode(code: string): Promise<ShortLink | null>;
  create(shortLink: ShortLink): Promise<void>;
  save(shortLink: ShortLink): Promise<void>;
  delete(shortLink: ShortLink): Promise<void>;

  streamAll(): Promise<Readable>;
}
