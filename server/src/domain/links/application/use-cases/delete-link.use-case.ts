import { type Either, left, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import { ValidationError } from '@/core/errors/validation.error';
import { z } from 'zod';
import type { ShortLinksRepository } from '../repositories/short-links.repository';
import { LinkNotFoundError } from './errors/link-not-found.error';

const deleteLinkSchema = z.object({ linkId: z.string() });
type DeleteLinkUseCaseRequest = z.infer<typeof deleteLinkSchema>;

type DeleteLinkUseCaseResponse = Either<AppError, void>;

export class DeleteLinkUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute({
    linkId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const parseResult = deleteLinkSchema.safeParse({ linkId });

    if (!parseResult.success) {
      return left(new ValidationError(parseResult.error));
    }

    const shortLink = await this.shortLinksRepository.findById(
      parseResult.data.linkId
    );

    if (!shortLink) {
      return left(new LinkNotFoundError());
    }

    await this.shortLinksRepository.delete(shortLink);

    return right(undefined);
  }
}
