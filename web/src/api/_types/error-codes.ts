export const ApiErrorCodes = {
  // Link errors
  CODE_ALREADY_IN_USE: 'CODE_ALREADY_IN_USE',
  LINK_NOT_FOUND: 'LINK_NOT_FOUND',

  // General errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

export type ApiErrorCode = (typeof ApiErrorCodes)[keyof typeof ApiErrorCodes]
