export const AppErrorCodes = {
  // Link errors
  CODE_ALREADY_IN_USE: 'CODE_ALREADY_IN_USE',
  LINK_NOT_FOUND: 'LINK_NOT_FOUND',

  // General errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type AppErrorCode = (typeof AppErrorCodes)[keyof typeof AppErrorCodes];
