import { type Either, left, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import { ValidationError } from '@/core/errors/validation.error';
import { z } from 'zod';
import type { ShortLinksRepository } from '../repositories/short-links.repository';
import { LinkNotFoundError } from './errors/link-not-found.error';

const incrementLinkAccessCountSchema = z.object({ linkId: z.string() });
type IncrementLinkAccessCountUseCaseRequest = z.infer<
  typeof incrementLinkAccessCountSchema
>;

type IncrementLinkAccessCountUseCaseResponse = Either<AppError, void>;

export class IncrementLinkAccessCountUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute({
    linkId,
  }: IncrementLinkAccessCountUseCaseRequest): Promise<IncrementLinkAccessCountUseCaseResponse> {
    const parseResult = incrementLinkAccessCountSchema.safeParse({ linkId });

    if (!parseResult.success) {
      return left(new ValidationError(parseResult.error));
    }

    const shortLink = await this.shortLinksRepository.findById(
      parseResult.data.linkId
    );

    if (!shortLink) {
      return left(new LinkNotFoundError());
    }

    shortLink.incrementAccessCount();

    await this.shortLinksRepository.save(shortLink);

    return right(undefined);
  }
}
