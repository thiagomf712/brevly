import { AppErrorCodes } from '@/core/errors/error-codes';
import { z } from 'zod';

export const appErrorResponse = z.object({
  message: z.string(),
  errorCode: z.enum(Object.values(AppErrorCodes) as [string, ...string[]]),
});
export type AppErrorResponse = z.infer<typeof appErrorResponse>;
