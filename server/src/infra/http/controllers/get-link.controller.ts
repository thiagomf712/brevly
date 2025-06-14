import { LinkNotFoundError } from '@/domain/links/application/use-cases/errors/link-not-found.error';
import { GetLinkUseCase } from '@/domain/links/application/use-cases/get-link.use-case';
import { db } from '@/infra/database';
import { DrizzleShortLinksRepository } from '@/infra/database/repositories/drizzle-short-links.repository';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  ShortLinkPresenter,
  shortLinkPresenterSchema,
} from '../presenters/short-link.presenter';
import { appErrorResponse } from '../utils/app-error-response';

export const getLinkController: FastifyPluginAsyncZod = async app => {
  const shortLinksRepository = new DrizzleShortLinksRepository(db);
  const getLinkUseCase = new GetLinkUseCase(shortLinksRepository);

  app.get(
    '/links/:code',
    {
      schema: {
        summary: 'Get original URL from a short link code',
        tags: ['Links'],
        params: z.object({
          code: z.string(),
        }),
        response: {
          200: shortLinkPresenterSchema.describe('Success'),
          404: appErrorResponse.describe('Link not found'),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.params;
      const result = await getLinkUseCase.execute({ code });

      if (result.isLeft()) {
        const error = result.value;

        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send({ message: error.message });
      }

      const { shortLink } = result.value;

      return reply.status(200).send(ShortLinkPresenter.toHTTP(shortLink));
    }
  );
};
