import { Readable } from 'node:stream';
import type { ShortLinksRepository } from '@/domain/links/application/repositories/short-links.repository';
import type { ShortLink } from '@/domain/links/enterprise/entities/short-link';

export class InMemoryShortLinksRepository implements ShortLinksRepository {
  public items: ShortLink[] = [];

  async create(shortLink: ShortLink): Promise<void> {
    this.items.push(shortLink);
  }

  async save(shortLink: ShortLink): Promise<void> {
    const itemIndex = this.items.findIndex(item =>
      item.id.equals(shortLink.id)
    );

    if (itemIndex >= 0) {
      this.items[itemIndex] = shortLink;
    }
  }

  async findByCode(code: string): Promise<ShortLink | null> {
    const shortLink = this.items.find(item => item.code === code);

    return shortLink ?? null;
  }

  async findById(id: string): Promise<ShortLink | null> {
    const shortLink = this.items.find(item => item.id.toString() === id);

    return shortLink ?? null;
  }

  async findMany(): Promise<ShortLink[]> {
    return this.items;
  }

  async delete(shortLink: ShortLink): Promise<void> {
    const itemIndex = this.items.findIndex(item =>
      item.id.equals(shortLink.id)
    );

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1);
    }
  }

  async streamAll(): Promise<Readable> {
    return Readable.from(this.items);
  }
}
