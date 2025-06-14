import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ListLinksUseCase } from './list-links.use-case';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let sut: ListLinksUseCase;

describe('List Links Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    sut = new ListLinksUseCase(inMemoryShortLinksRepository);
  });

  it('should be able to list all registered links', async () => {
    // Arrange
    inMemoryShortLinksRepository.items.push(
      makeShortLink(),
      makeShortLink(),
      makeShortLink()
    );

    // Act
    const result = await sut.execute();

    // Assert
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.links).toHaveLength(3);
      expect(result.value.links[0]).toEqual(
        inMemoryShortLinksRepository.items[0]
      );
    }
  });

  it('should return an empty array when there are no links', async () => {
    // Act
    const result = await sut.execute();

    // Assert
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.links).toHaveLength(0);
    }
  });
});
