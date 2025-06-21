import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiIncrementeLinkAccessRequest = { id: string }

export async function apiIncrementeLinkAccess({
  id,
}: ApiIncrementeLinkAccessRequest): Promise<void> {
  const result = await safeApiCall(() => api.patch(`/links/${id}/increment`))

  if (!result.success) {
    throw new Error(result.error)
  }
}
