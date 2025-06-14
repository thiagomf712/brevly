import { LinkNotFoundError } from '@/domain/links/application/use-cases/errors/link-not-found.error';
import { IncrementLinkAccessCountUseCase } from '@/domain/links/application/use-cases/increment-link-access-count.use-case';
import { db } from '@/infra/database';
import { DrizzleShortLinksRepository } from '@/infra/database/repositories/drizzle-short-links.repository';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { appErrorResponse } from '../utils/app-error-response';

export const incrementAccessCountController: FastifyPluginAsyncZod =
  async app => {
    const shortLinksRepository = new DrizzleShortLinksRepository(db);
    const incrementAccessCountUseCase = new IncrementLinkAccessCountUseCase(
      shortLinksRepository
    );

    app.patch(
      '/links/:linkId/increment',
      {
        schema: {
          summary: 'Increment the access count of a link',
          tags: ['Links'],
          params: z.object({
            linkId: z.string().uuid(),
          }),
          response: {
            204: z.null().describe('Success, no content'),
            404: appErrorResponse.describe('Link not found'),
          },
        },
      },
      async (request, reply) => {
        const { linkId } = request.params;
        const result = await incrementAccessCountUseCase.execute({ linkId });

        if (result.isLeft()) {
          const error = result.value;

          if (error instanceof LinkNotFoundError) {
            return reply.status(404).send({ message: error.message });
          }

          return reply.status(400).send({ message: error.message });
        }

        return reply.status(204).send();
      }
    );
  };
