import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'
import type { ApiLink } from './list-all'

export type ApiCreateLinkResponse = { link: ApiLink }

export type ApiCreateLinkRequest = {
  /** valid url */
  originalUrl: string
  /** min: 3, max: 100 */
  code: string
}

export async function apiCreateLink({
  code,
  originalUrl,
}: ApiCreateLinkRequest): Promise<ApiResponse<ApiCreateLinkResponse>> {
  return safeApiCall<ApiCreateLinkResponse>(() =>
    api.post<ApiCreateLinkRequest, ApiCreateLinkResponse>('/links', {
      code,
      originalUrl,
    })
  )
}
