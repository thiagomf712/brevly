import { ListLinksUseCase } from '@/domain/links/application/use-cases/list-links.use-case';
import { db } from '@/infra/database';
import { DrizzleShortLinksRepository } from '@/infra/database/repositories/drizzle-short-links.repository';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  ShortLinkPresenter,
  shortLinkPresenterSchema,
} from '../presenters/short-link.presenter';

export const listLinksController: FastifyPluginAsyncZod = async app => {
  const shortLinksRepository = new DrizzleShortLinksRepository(db);
  const listLinksUseCase = new ListLinksUseCase(shortLinksRepository);

  app.get(
    '/links',
    {
      schema: {
        summary: 'List all short links',
        tags: ['Links'],
        response: {
          200: z.object({
            links: z.array(shortLinkPresenterSchema),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await listLinksUseCase.execute();

      if (result.isRight()) {
        const { links } = result.value;

        return reply
          .status(200)
          .send({ links: links.map(ShortLinkPresenter.toHTTP) });
      }

      return reply.status(500).send();
    }
  );
};
