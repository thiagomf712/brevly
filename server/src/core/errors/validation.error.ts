import type { ZodError } from 'zod';
import { AppError } from './app.error';

export class ValidationError extends AppError {
  constructor(public details: ZodError) {
    super('A validation error occurred.');
  }
}
