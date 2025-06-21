import { AppError } from '@/core/errors/app.error';
import { AppErrorCodes } from '@/core/errors/error-codes';

export class LinkNotFoundError extends AppError {
  constructor() {
    super('Link not found.', AppErrorCodes.LINK_NOT_FOUND);
  }
}
