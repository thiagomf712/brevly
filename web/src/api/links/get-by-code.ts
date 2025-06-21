import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'
import type { ApiLink } from './list-all'

export type ApiGetLinkByCodeResponse = { link: ApiLink }

export type ApiGetLinkByCodeRequest = { code: string }

export async function apiGetLinkByCode({
  code,
}: ApiGetLinkByCodeRequest): Promise<ApiResponse<ApiGetLinkByCodeResponse>> {
  return safeApiCall<ApiGetLinkByCodeResponse>(() =>
    api.get<ApiGetLinkByCodeResponse>(`/links/${code}`)
  )
}
