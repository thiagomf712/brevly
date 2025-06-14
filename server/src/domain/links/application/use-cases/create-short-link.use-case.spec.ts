import { ValidationError } from '@/core/errors/validation.error';
import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  CreateShortLinkUseCase,
  type CreateShortLinkUseCaseRequest,
} from './create-short-link.use-case';
import { CodeAlreadyInUseError } from './errors/code-already-in-use.error';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let sut: CreateShortLinkUseCase;

describe('Create Short Link Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    sut = new CreateShortLinkUseCase(inMemoryShortLinksRepository);
  });

  it('should be able to create a new short link', async () => {
    // Arrange: Create a valid request object
    const request: CreateShortLinkUseCaseRequest = {
      originalUrl: 'https://www.valid-url.com/long/path/to/resource',
      code: 'valid-code-123',
    };

    // Act: Execute the use case
    const result = await sut.execute(request);

    // Assert: Check for a successful outcome
    expect(result.isRight()).toBe(true); // Should return a Right Either
    expect(inMemoryShortLinksRepository.items).toHaveLength(1); // One item should be in our "database"
    expect(inMemoryShortLinksRepository.items[0].code).toEqual(request.code);
    expect(inMemoryShortLinksRepository.items[0].originalUrl).toEqual(
      request.originalUrl
    );
  });

  it('should not be able to create a short link with a code that already exists', async () => {
    // Arrange: Manually add a link with a specific code to the repository
    inMemoryShortLinksRepository.items = [
      makeShortLink({ code: 'duplicate-code' }),
    ];

    const request: CreateShortLinkUseCaseRequest = {
      originalUrl: 'https://www.another-url.com',
      code: 'duplicate-code', // Attempt to use the same code
    };

    // Act: Execute the use case
    const result = await sut.execute(request);

    // Assert: Check for the specific business rule error
    expect(result.isLeft()).toBe(true); // Should return a Left Either
    expect(result.value).toBeInstanceOf(CodeAlreadyInUseError); // The error should be the correct type
    expect(inMemoryShortLinksRepository.items).toHaveLength(1); // No new item should be added
  });

  it('should not be able to create a short link with an invalid originalUrl', async () => {
    // Arrange: Create a request with a malformed URL
    const request: CreateShortLinkUseCaseRequest = {
      originalUrl: 'not-a-valid-url', // Invalid URL
      code: 'some-code',
    };

    // Act
    const result = await sut.execute(request);

    // Assert: Zod validation should fail
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
  });

  it('should not be able to create a short link with an invalid code format', async () => {
    // Arrange: Create a request with a code that's too short
    const request: CreateShortLinkUseCaseRequest = {
      originalUrl: 'https://www.valid-url.com',
      code: 'a', // Code is too short based on our Zod schema
    };

    // Act
    const result = await sut.execute(request);

    // Assert: Zod validation should fail
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
  });
});
