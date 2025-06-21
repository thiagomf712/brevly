import type { ZodError } from 'zod';
import { AppError } from './app.error';
import { AppErrorCodes } from './error-codes';

export class ValidationError extends AppError {
  constructor(public details: ZodError) {
    super('A validation error occurred.', AppErrorCodes.VALIDATION_ERROR);
  }
}
