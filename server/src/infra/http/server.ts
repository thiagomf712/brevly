import { env } from '@/env';
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { createLinkController } from './controllers/create-link.controller';
import { deleteLinkController } from './controllers/delete-link.controller';
import { exportLinksController } from './controllers/export-links.controller';
import { getLinkController } from './controllers/get-link.controller';
import { incrementAccessCountController } from './controllers/increment-access-count.controller';
import { listLinksController } from './controllers/list-links.controller';
import type { AppErrorResponse } from './utils/app-error-response';
import type { ValidationErrorResponse } from './utils/validation-errors-response';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

server.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
    hideClientButton: true,
    hideModels: true,
  },
});

server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const response: ValidationErrorResponse = {
      message: 'Validation error',
      issues: error.validation,
      errorCode: 'VALIDATION_ERROR',
    };

    return reply.status(400).send(response);
  }

  console.error(error);

  const response: AppErrorResponse = {
    message: 'Internal server error',
    errorCode: 'UNKNOWN_ERROR',
  };

  reply.status(500).send(response);
});

server.register(listLinksController);
server.register(getLinkController);
server.register(createLinkController);
server.register(incrementAccessCountController);
server.register(deleteLinkController);

server.register(exportLinksController);

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on port', env.PORT);
});
