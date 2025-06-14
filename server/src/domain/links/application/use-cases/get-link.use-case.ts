import { type Either, left, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import { ValidationError } from '@/core/errors/validation.error';
import { z } from 'zod';
import type { ShortLink } from '../../enterprise/entities/short-link';
import type { ShortLinksRepository } from '../repositories/short-links.repository';
import { LinkNotFoundError } from './errors/link-not-found.error';

const getLinkSchema = z.object({ code: z.string() });
type GetLinkUseCaseRequest = z.infer<typeof getLinkSchema>;

type GetLinkUseCaseResponse = Either<AppError, ShortLink>;

export class GetLinkUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute({
    code,
  }: GetLinkUseCaseRequest): Promise<GetLinkUseCaseResponse> {
    const parseResult = getLinkSchema.safeParse({ code });

    if (!parseResult.success) {
      return left(new ValidationError(parseResult.error));
    }

    const shortLink = await this.shortLinksRepository.findByCode(
      parseResult.data.code
    );

    if (!shortLink) {
      return left(new LinkNotFoundError());
    }

    return right(shortLink);
  }
}
