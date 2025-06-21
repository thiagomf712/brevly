import { type AxiosResponse, isAxiosError } from 'axios'
import { ApiErrorCodes } from '../_types/error-codes'
import type { ApiErrorResponse } from '../_types/error-response'
import { translateApiError } from './error-translator'

type SuccessResponse<T> = { data: T; success: true }
type ErrorResponse = { error: string; success: false }

export type ApiResponse<Res> = SuccessResponse<Res> | ErrorResponse

export async function safeApiCall<Res>(
  apiCall: () => Promise<AxiosResponse<Res>>
): Promise<ApiResponse<Res>> {
  try {
    const response = await apiCall()

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      return {
        success: false,
        error: translateApiError(
          error.response?.data.errorCode ?? ApiErrorCodes.UNKNOWN_ERROR
        ),
      }
    }

    return {
      success: false,
      error: 'Aconteceu algum erro ao tentar se comunicar com o servidor',
    }
  }
}
