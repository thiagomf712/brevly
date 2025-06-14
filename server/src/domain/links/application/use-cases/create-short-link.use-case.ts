import { type Either, left, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import { ValidationError } from '@/core/errors/validation.error';
import { uuidv7 } from 'uuidv7';
import { z } from 'zod';
import { ShortLink } from '../../enterprise/entities/short-link';
import type { ShortLinksRepository } from '../repositories/short-links.repository';
import { CodeAlreadyInUseError } from './errors/code-already-in-use.error';

const createShortLinkSchema = z.object({
  originalUrl: z.string().url({ message: 'Invalid original URL format.' }),
  code: z
    .string()
    .min(3, { message: 'Code must be at least 3 characters long.' })
    .max(100, { message: 'Code must be at most 100 characters long.' })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: 'Code can only contain alphanumeric characters and hyphens.',
    }),
});
export type CreateShortLinkUseCaseRequest = z.infer<
  typeof createShortLinkSchema
>;

type CreateShortLinkUseCaseResponse = Either<
  AppError,
  { shortLink: ShortLink }
>;

export class CreateShortLinkUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute(
    request: CreateShortLinkUseCaseRequest
  ): Promise<CreateShortLinkUseCaseResponse> {
    const parseResult = createShortLinkSchema.safeParse(request);

    if (!parseResult.success) {
      return left(new ValidationError(parseResult.error));
    }

    const { originalUrl, code } = parseResult.data;

    const linkWithSameCode = await this.shortLinksRepository.findByCode(code);

    if (linkWithSameCode) {
      return left(new CodeAlreadyInUseError());
    }

    const shortLink = ShortLink.create({
      id: uuidv7(),
      originalUrl,
      code,
    });

    await this.shortLinksRepository.create(shortLink);

    return right({ shortLink });
  }
}
