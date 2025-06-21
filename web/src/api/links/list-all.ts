import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiLink = {
  id: string
  code: string
  originalUrl: string
  accessCount: number
}

export type ApiListAllLinksResponse = { links: ApiLink[] }

export async function apiListAllLinks(): Promise<ApiListAllLinksResponse> {
  const result = await safeApiCall<ApiListAllLinksResponse>(() =>
    api.get<ApiListAllLinksResponse>('/links')
  )

  if (!result.success) {
    throw new Error(result.error)
  }

  return result.data
}
