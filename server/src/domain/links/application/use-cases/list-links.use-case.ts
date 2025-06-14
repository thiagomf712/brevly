import { type Either, right } from '@/core/either';
import type { AppError } from '@/core/errors/app.error';
import type { ShortLink } from '../../enterprise/entities/short-link';
import type { ShortLinksRepository } from '../repositories/short-links.repository';

type ListLinksUseCaseResponse = Either<AppError, { links: ShortLink[] }>;

export class ListLinksUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute(): Promise<ListLinksUseCaseResponse> {
    const links = await this.shortLinksRepository.findMany();

    return right({
      links,
    });
  }
}
