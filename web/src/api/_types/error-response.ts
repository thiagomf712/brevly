import type { ApiErrorCode } from './error-codes'

export type ApiErrorResponse = { message: string; errorCode: ApiErrorCode }
