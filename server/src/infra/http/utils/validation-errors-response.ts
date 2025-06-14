import { z } from 'zod';

export const validationErrorResponse = z.object({
  message: z.string(),
  issues: z.any().optional(),
});
