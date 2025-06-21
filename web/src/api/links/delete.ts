import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiDeleteLinkRequest = { id: string }

export async function apiDeleteLink({
  id,
}: ApiDeleteLinkRequest): Promise<void> {
  const result = await safeApiCall(() => api.delete(`/links/${id}`))

  if (!result.success) {
    throw new Error(result.error)
  }
}
