import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiLink = {
  id: string
  code: string
  originalUrl: string
  accessCount: number
}

export type ApiListAllLinksResponse = { links: ApiLink[] }

export async function apiListAllLinks(): Promise<
  ApiResponse<ApiListAllLinksResponse>
> {
  return safeApiCall<ApiListAllLinksResponse>(() =>
    api.get<ApiListAllLinksResponse>('/links')
  )
}
