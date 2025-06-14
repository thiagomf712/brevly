import { AppError } from '@/core/errors/app.error';

export class LinkNotFoundError extends AppError {
  constructor() {
    super('Link not found.');
  }
}
