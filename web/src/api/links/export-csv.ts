import { api } from '@/api/_utils/axios'
import { safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiExportLinksCsvResponse = { reportUrl: string }

export async function apiExportLinksCsv(): Promise<ApiExportLinksCsvResponse> {
  const result = await safeApiCall<ApiExportLinksCsvResponse>(() =>
    api.post<void, ApiExportLinksCsvResponse>(`/links/export`)
  )

  if (!result.success) {
    throw new Error(result.error)
  }

  return result.data
}
