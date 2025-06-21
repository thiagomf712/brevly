import type { AppErrorCode } from './error-codes';

export abstract class AppError extends Error {
  public readonly code: AppErrorCode;

  constructor(message: string, code: AppErrorCode) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
