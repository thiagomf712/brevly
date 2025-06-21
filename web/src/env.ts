import { z } from 'zod/v4'

const envSchema = z.object({
  VITE_FRONTEND_URL: z.url().default('http://localhost:5173'),
  VITE_BACKEND_URL: z.string().default('http://localhost:3333'),
})

export const env = envSchema.parse(import.meta.env)
