import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'
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
}: ApiCreateLinkRequest): Promise<ApiCreateLinkResponse> {
  const result = await safeApiCall<ApiCreateLinkResponse>(() =>
    api.post<ApiCreateLinkRequest, ApiCreateLinkResponse>('/links', {
      code,
      originalUrl,
    })
  )

  if (!result.success) {
    throw new Error(result.error)
  }

  return result.data
}
