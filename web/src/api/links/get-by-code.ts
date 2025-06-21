import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'
import type { ApiLink } from './list-all'

export type ApiGetLinkByCodeResponse = { link: ApiLink }

export type ApiGetLinkByCodeRequest = { code: string }

export async function apiGetLinkByCode({
  code,
}: ApiGetLinkByCodeRequest): Promise<ApiGetLinkByCodeResponse> {
  const result = await safeApiCall<ApiGetLinkByCodeResponse>(() =>
    api.get<ApiGetLinkByCodeResponse>(`/links/${code}`)
  )

  if (!result.success) {
    throw new Error(result.error)
  }

  return result.data
}
