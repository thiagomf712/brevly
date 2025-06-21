import type { ApiErrorCode } from '../_types/error-codes'

const errorMessages: Record<ApiErrorCode, string> = {
  CODE_ALREADY_IN_USE:
    'Essa URL encurtada já está em uso. Por favor, escolha outra.',
  LINK_NOT_FOUND: 'Link não encontrado.',
  VALIDATION_ERROR: 'Erro de validação. Verifique os dados enviados.',
  UNKNOWN_ERROR: 'Ocorreu algum erro. Tente novamente mais tarde.',
}

export function translateApiError(errorCode: ApiErrorCode): string {
  const message = errorMessages[errorCode]

  if (!message) {
    console.warn(`Mensagem de erro não encontrada para o código: ${errorCode}`)

    return errorMessages.UNKNOWN_ERROR
  }

  return message
}
