import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteLinkUseCase } from './delete-link.use-case';
import { LinkNotFoundError } from './errors/link-not-found.error';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let sut: DeleteLinkUseCase;

describe('Delete Link Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    sut = new DeleteLinkUseCase(inMemoryShortLinksRepository);
  });

  it('should be able to delete a link', async () => {
    // Arrange
    const newLink = makeShortLink();
    inMemoryShortLinksRepository.items.push(newLink);

    // Act
    const result = await sut.execute({ linkId: newLink.id.toString() });

    // Assert
    expect(result.isRight()).toBe(true);
    expect(inMemoryShortLinksRepository.items).toHaveLength(0);
  });

  it('should return an error when the link is not found', async () => {
    // Act
    const result = await sut.execute({ linkId: 'non-existing-id' });

    // Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(LinkNotFoundError);
  });
});
