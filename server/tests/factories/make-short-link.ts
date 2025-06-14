import type { EntityProps } from '@/core/entities/entity';
import {
  ShortLink,
  type ShortLinkProps,
} from '@/domain/links/enterprise/entities/short-link';
import { faker } from '@faker-js/faker';
import { uuidv7 } from 'uuidv7';

export function makeShortLink(
  override: Partial<EntityProps<ShortLinkProps, string>> = {}
): ShortLink {
  return ShortLink.create({
    id: uuidv7(),
    originalUrl: faker.internet.url(),
    code: faker.string.alphanumeric({ length: { min: 3, max: 100 } }),
    ...override,
  });
}
