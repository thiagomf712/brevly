import { AppError } from '@/core/errors/app.error';

export class CodeAlreadyInUseError extends AppError {
  constructor() {
    super('Short code is already in use.');
  }
}
