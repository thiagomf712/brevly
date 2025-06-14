import type { ShortLink } from '@/domain/links/enterprise/entities/short-link';
import { z } from 'zod';

export const shortLinkPresenterSchema = z.object({
  id: z.string(),
  code: z.string(),
  originalUrl: z.string().url(),
  accessCount: z.number().int(),
});
type ShortLinkPresenterSchema = z.infer<typeof shortLinkPresenterSchema>;

export class ShortLinkPresenter {
  static toHTTP(shortLink: ShortLink): ShortLinkPresenterSchema {
    return {
      id: shortLink.id.toString(),
      code: shortLink.code,
      originalUrl: shortLink.originalUrl,
      accessCount: shortLink.accessCount,
    };
  }
}
