import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { LinkNotFoundError } from './errors/link-not-found.error';
import { IncrementLinkAccessCountUseCase } from './increment-link-access-count.use-case';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let sut: IncrementLinkAccessCountUseCase;

describe('Increment Link Access Count Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    sut = new IncrementLinkAccessCountUseCase(inMemoryShortLinksRepository);
  });

  it('should be able to increment access count of a link', async () => {
    // Arrange
    const newLink = makeShortLink();
    inMemoryShortLinksRepository.items.push(newLink);

    // Act
    const result = await sut.execute({ linkId: newLink.id.toString() });

    // Assert
    expect(result.isRight()).toBe(true);
    expect(inMemoryShortLinksRepository.items[0].accessCount).toBe(1);
  });

  it('should return an error if the link is not found', async () => {
    // Act
    const result = await sut.execute({ linkId: 'non-existing-id' });

    // Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(LinkNotFoundError);
  });
});
