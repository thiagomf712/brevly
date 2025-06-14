import { z } from 'zod';

export const internalServerErrorResponse = z.object({
  message: z.string().default('Internal server error'),
});
