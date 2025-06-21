import { apiCreateLink } from './create'
import { apiDeleteLink } from './delete'
import { apiExportLinksCsv } from './export-csv'
import { apiGetLinkByCode } from './get-by-code'
import { apiIncrementeLinkAccess } from './increment-access'
import { apiListAllLinks } from './list-all'

export const apiLinksRequests = {
  create: apiCreateLink,
  delete: apiDeleteLink,
  exportCsv: apiExportLinksCsv,
  getByCode: apiGetLinkByCode,
  incrementAccess: apiIncrementeLinkAccess,
  listAll: apiListAllLinks,
}
