import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(scalarUI, {
  routePrefix: '/docs',
  configuration: {
    layout: 'modern',
    hideClientButton: true,
    hideModels: true,
  },
})

server.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running on port', env.PORT)
})
