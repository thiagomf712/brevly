import { api } from '@/api/_utils/axios'
import { type ApiResponse, safeApiCall } from '@/api/_utils/safe-api-call'

export type ApiExportLinksCsvResponse = { reportUrl: string }

export async function apiExportLinksCsv(): Promise<
  ApiResponse<ApiExportLinksCsvResponse>
> {
  return safeApiCall<ApiExportLinksCsvResponse>(() =>
    api.post<void, ApiExportLinksCsvResponse>(`/links/export`)
  )
}
