import { type AppErrorCode, AppErrorCodes } from '@/core/errors/error-codes';
import { z } from 'zod';

export const validationErrorResponse = z.object({
  message: z.string(),
  issues: z.any().optional(),
  errorCode: z.enum(
    Object.values(AppErrorCodes) as [AppErrorCode, ...AppErrorCode[]]
  ),
});
export type ValidationErrorResponse = z.infer<typeof validationErrorResponse>;
