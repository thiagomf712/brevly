import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { LinkNotFoundError } from './errors/link-not-found.error';
import { GetLinkUseCase } from './get-link.use-case';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let sut: GetLinkUseCase;

describe('Get Link Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    sut = new GetLinkUseCase(inMemoryShortLinksRepository);
  });

  it('should be able to get a link by code', async () => {
    // Arrange
    const newLink = makeShortLink({
      code: 'my-link',
    });
    inMemoryShortLinksRepository.items.push(newLink);

    expect(inMemoryShortLinksRepository.items[0].accessCount).toBe(0);

    // Act
    const result = await sut.execute({ code: 'my-link' });

    // Assert
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value).toEqual(newLink);
    }
  });

  it('should return a not found error if the link does not exist', async () => {
    // Act
    const result = await sut.execute({ code: 'non-existing-code' });

    // Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(LinkNotFoundError);
  });
});
