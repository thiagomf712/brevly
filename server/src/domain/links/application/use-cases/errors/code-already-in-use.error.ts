import { AppError } from '@/core/errors/app.error';
import { AppErrorCodes } from '@/core/errors/error-codes';

export class CodeAlreadyInUseError extends AppError {
  constructor() {
    super('Short code is already in use.', AppErrorCodes.CODE_ALREADY_IN_USE);
  }
}
