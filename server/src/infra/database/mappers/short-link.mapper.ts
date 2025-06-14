import { ShortLink } from '@/domain/links/enterprise/entities/short-link';
import type { schema } from '../schemas';

export class DrizzleShortLinkMapper {
  static toDomain(raw: typeof schema.shortLinks.$inferSelect): ShortLink {
    return ShortLink.create({
      id: raw.id,
      code: raw.code,
      originalUrl: raw.originalUrl,
      accessCount: raw.accessCount,
    });
  }

  static toPersistence(shortLink: ShortLink) {
    return {
      id: shortLink.id.toString(),
      code: shortLink.code,
      originalUrl: shortLink.originalUrl,
      accessCount: shortLink.accessCount,
    };
  }
}
