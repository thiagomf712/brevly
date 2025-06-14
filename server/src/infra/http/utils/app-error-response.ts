import { z } from 'zod';

export const appErrorResponse = z.object({ message: z.string() });
