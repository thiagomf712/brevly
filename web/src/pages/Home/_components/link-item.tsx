import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { apiRequests } from '@/api'
import type { ApiLink, ApiListAllLinksResponse } from '@/api/links/list-all'
import { CircularProgress } from '@/components/circular-progress'
import { Button } from '@/components/ui/button'
import { env } from '@/env'
import { queryClient } from '@/lib/query-client'
import { QueryKeys } from '@/lib/query-keys'

type LinkItemProps = {
  link: ApiLink
}

export function LinkItem({ link }: LinkItemProps) {
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequests.links.delete({ id }),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        [QueryKeys.links],
        (oldData: ApiListAllLinksResponse | undefined) => {
          if (!oldData) return { links: [] }

          return {
            links: oldData.links.filter(item => item.id !== id),
          }
        }
      )

      toast.success('Link removido com sucesso')
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  async function copyToClipboard() {
    if (!navigator.clipboard) {
      toast.error(
        'O seu navegador não suporte copiar para a área de transferência'
      )

      return
    }

    try {
      await navigator.clipboard.writeText(link.originalUrl)

      toast.info(`O link ${link.code} foi copiado para a área de transferência`)
    } catch {
      toast.error('Não foi possível copiar o link para a área de transferência')
    }
  }

  return (
    <>
      <div className="mt-4 mb-3 h-px w-full bg-gray-200 md:mt-5 md:mb-4" />

      <div className="flex items-center justify-between gap-4 md:gap-5">
        <div className="min-w-0 flex-1">
          <Link
            to={`${env.VITE_FRONTEND_URL}/${link.code}`}
            target="_blank"
            className="block truncate text-base text-blue-base"
          >
            <span>brev.ly/</span>
            {link.code}
          </Link>
          <p className="truncate text-gray-500 text-sm">{link.originalUrl}</p>
        </div>
        <div className="flex shrink-0 items-center gap-4 md:gap-5">
          <span className="text-gray-500 text-sm">
            {link.accessCount} {link.accessCount === 1 ? 'acesso' : 'acessos'}
          </span>

          <div className="flex items-center gap-1">
            <Button variant="icon" onClick={copyToClipboard}>
              <CopyIcon />
            </Button>

            <Button
              variant="icon"
              onClick={() => deleteMutation.mutate(link.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <CircularProgress className="size-4 fill-gray-100" />
              ) : (
                <TrashIcon />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
