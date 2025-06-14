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
import { getLinkController } from './controllers/get-link.controller';
import { incrementAccessCountController } from './controllers/increment-access-count.controller';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: '*' });

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
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    });
  }

  console.error(error);

  reply.status(500).send({
    message: 'Internal server error',
  });
});

server.register(getLinkController);
server.register(createLinkController);
server.register(incrementAccessCountController);

server.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running on port', env.PORT);
});
