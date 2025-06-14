import { ValidationError } from '@/core/errors/validation.error';
import { CreateShortLinkUseCase } from '@/domain/links/application/use-cases/create-short-link.use-case';
import { CodeAlreadyInUseError } from '@/domain/links/application/use-cases/errors/code-already-in-use.error';
import { db } from '@/infra/database';
import { DrizzleShortLinksRepository } from '@/infra/database/repositories/drizzle-short-links.repository';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  ShortLinkPresenter,
  shortLinkPresenterSchema,
} from '../presenters/short-link.presenter';
import { appErrorResponse } from '../utils/app-error-response';
import { validationErrorResponse } from '../utils/validation-errors-response';

export const createLinkController: FastifyPluginAsyncZod = async app => {
  const shortLinksRepository = new DrizzleShortLinksRepository(db);
  const createShortLinkUseCase = new CreateShortLinkUseCase(
    shortLinksRepository
  );

  app.post(
    '/links',
    {
      schema: {
        summary: 'Create a new short link',
        tags: ['Links'],
        body: z.object({
          originalUrl: z
            .string()
            .url({ message: 'Please provide a valid URL.' }),
          code: z
            .string()
            .min(3, { message: 'Code must be at least 3 characters long.' })
            .max(100, { message: 'Code must be at most 100 characters long.' })
            .regex(/^[a-zA-Z0-9-]+$/, {
              message:
                'Code can only contain alphanumeric characters and hyphens.',
            }),
        }),
        response: {
          201: shortLinkPresenterSchema.describe('Success'),
          400: validationErrorResponse.describe('Validation error'),
          409: appErrorResponse.describe('Conflict'),
        },
      },
    },
    async (request, reply) => {
      const result = await createShortLinkUseCase.execute(request.body);

      if (result.isLeft()) {
        const error = result.value;

        if (error instanceof ValidationError) {
          return reply.status(400).send({
            message: 'A validation error occurred.',
            issues: error.details.flatten().fieldErrors,
          });
        }

        if (error instanceof CodeAlreadyInUseError) {
          return reply.status(409).send({ message: error.message });
        }

        return reply.status(400).send({ message: error.message });
      }

      const { shortLink } = result.value;

      return reply.status(201).send(ShortLinkPresenter.toHTTP(shortLink));
    }
  );
};
