import { makeShortLink } from 'tests/factories/make-short-link';
import { InMemoryShortLinksRepository } from 'tests/repositories/in-memory-short-links.repository';
import { FakeUploader } from 'tests/storage/fake-uploader';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ExportLinksUseCase } from './export-links.use-case';

let inMemoryShortLinksRepository: InMemoryShortLinksRepository;
let fakeUploader: FakeUploader;
let sut: ExportLinksUseCase;

describe('Export Links Use Case', () => {
  beforeEach(() => {
    inMemoryShortLinksRepository = new InMemoryShortLinksRepository();
    fakeUploader = new FakeUploader();
    sut = new ExportLinksUseCase(inMemoryShortLinksRepository, fakeUploader);
  });

  it('should be able to export a csv with all links', async () => {
    // Arrange: Adiciona dados ao repositório em memória
    inMemoryShortLinksRepository.items.push(
      makeShortLink({ code: 'link-1' }),
      makeShortLink({ code: 'link-2' })
    );

    // Act
    const result = await sut.execute();

    // Assert
    expect(result.isRight()).toBe(true);
    expect(fakeUploader.uploads).toHaveLength(1);
    expect(fakeUploader.uploads[0].contentType).toEqual('text/csv');
    if (result.isRight()) {
      expect(result.value.reportUrl).toContain('.csv');
    }
  });
});
