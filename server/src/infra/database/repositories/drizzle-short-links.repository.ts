import type { ShortLinksRepository } from '@/domain/links/application/repositories/short-links.repository';
import type { ShortLink } from '@/domain/links/enterprise/entities/short-link';
import { eq } from 'drizzle-orm';
import type { db } from '..';
import { DrizzleShortLinkMapper } from '../mappers/short-link.mapper';
import { schema } from '../schemas';

export class DrizzleShortLinksRepository implements ShortLinksRepository {
  constructor(private database: typeof db) {}

  async create(shortLink: ShortLink): Promise<void> {
    const data = DrizzleShortLinkMapper.toPersistence(shortLink);

    await this.database.insert(schema.shortLinks).values(data);
  }

  async save(shortLink: ShortLink): Promise<void> {
    const data = DrizzleShortLinkMapper.toPersistence(shortLink);

    await this.database
      .update(schema.shortLinks)
      .set({
        originalUrl: data.originalUrl,
        accessCount: data.accessCount,
      })
      .where(eq(schema.shortLinks.id, data.id));
  }

  async findByCode(code: string): Promise<ShortLink | null> {
    const [result] = await this.database
      .select()
      .from(schema.shortLinks)
      .where(eq(schema.shortLinks.code, code))
      .limit(1);

    return result ? DrizzleShortLinkMapper.toDomain(result) : null;
  }

  async findById(id: string): Promise<ShortLink | null> {
    const [result] = await this.database
      .select()
      .from(schema.shortLinks)
      .where(eq(schema.shortLinks.id, id))
      .limit(1);

    return result ? DrizzleShortLinkMapper.toDomain(result) : null;
  }

  async findMany(): Promise<ShortLink[]> {
    const results = await this.database.select().from(schema.shortLinks);

    return results.map(DrizzleShortLinkMapper.toDomain);
  }

  async delete(shortLink: ShortLink): Promise<void> {
    await this.database
      .delete(schema.shortLinks)
      .where(eq(schema.shortLinks.id, shortLink.id.toString()));
  }
}
