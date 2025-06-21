import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiDeleteLinkRequest = { id: string }

export async function apiDeleteLink({
  id,
}: ApiDeleteLinkRequest): Promise<ApiResponse<void>> {
  return safeApiCall(() => api.delete(`/links/${id}`))
}
