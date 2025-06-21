import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiIncrementeLinkAccessRequest = { id: string }

export async function apiIncrementeLinkAccess({
  id,
}: ApiIncrementeLinkAccessRequest): Promise<ApiResponse<void>> {
  return safeApiCall(() => api.patch(`/links/${id}`))
}
