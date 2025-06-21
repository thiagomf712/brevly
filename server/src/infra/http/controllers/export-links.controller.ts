import { ExportLinksUseCase } from '@/domain/links/application/use-cases/export-links.use-case';
import { db } from '@/infra/database';
import { DrizzleShortLinksRepository } from '@/infra/database/repositories/drizzle-short-links.repository';
import { R2Storage } from '@/infra/storage/r2-storage';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const exportLinksController: FastifyPluginAsyncZod = async app => {
  const shortLinksRepository = new DrizzleShortLinksRepository(db);
  const uploader = new R2Storage();
  const exportLinksUseCase = new ExportLinksUseCase(
    shortLinksRepository,
    uploader
  );

  app.post(
    '/links/export',
    {
      schema: {
        summary: 'Export all links to a CSV file',
        tags: ['Links'],
        response: {
          200: z.object({
            reportUrl: z.string().url(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportLinksUseCase.execute();

      if (result.isRight()) {
        const { reportUrl } = result.value;

        return reply.status(200).send({ reportUrl });
      }

      return reply.status(500).send();
    }
  );
};
