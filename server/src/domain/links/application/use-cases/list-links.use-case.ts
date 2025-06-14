import { type Either, right } from '@/core/either';
import type { ShortLink } from '../../enterprise/entities/short-link';
import type { ShortLinksRepository } from '../repositories/short-links.repository';

type ListLinksUseCaseResponse = Either<void, { links: ShortLink[] }>;

export class ListLinksUseCase {
  constructor(private shortLinksRepository: ShortLinksRepository) {}

  async execute(): Promise<ListLinksUseCaseResponse> {
    const links = await this.shortLinksRepository.findMany();

    return right({
      links,
    });
  }
}
