import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import { apiRequests } from '@/api'
import type { ApiLink, ApiListAllLinksResponse } from '@/api/links/list-all'
import LogoIcon from '@/assets/icon.svg'
import { NotFoundCard } from '@/components/not-found-card'
import { queryClient } from '@/lib/query-client'
import { QueryKeys } from '@/lib/query-keys'

type RedirectParams = {
  code: string
}

export function RedirectPage() {
  const { code } = useParams<RedirectParams>()

  const { isPending, data, isError, error } = useQuery({
    queryKey: [QueryKeys.redirect, code],
    queryFn: () => apiRequests.links.getByCode({ code: code ?? '' }),
    retry: 0,
  })

  const incrementLinkAccessMutation = useMutation({
    mutationFn: (link: ApiLink) =>
      apiRequests.links.incrementAccess({ id: link.id }),
    retry: 3,
    onSuccess: (_, link) => {
      queryClient.setQueryData(
        [QueryKeys.links],
        (oldData: ApiListAllLinksResponse | undefined) => {
          if (!oldData) return { links: [] }

          return {
            links: oldData.links.map(x =>
              x.id === link.id ? { ...x, accessCount: x.accessCount + 1 } : x
            ),
          }
        }
      )

      window.location.href = link.originalUrl
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error])

  useEffect(() => {
    if (data) {
      incrementLinkAccessMutation.mutate(data.link)
    }
  }, [data])

  const linkNotFound = code == null || isError || (!data && !isPending)

  return (
    <div className="flex h-dvh items-center justify-center">
      {linkNotFound ? (
        <NotFoundCard />
      ) : (
        <div className="flex w-full max-w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-5 py-12 md:px-12 md:py-16">
          <img src={LogoIcon} alt="brev.ly" className="h-[72px]" />

          <h1 className="text-gray-600 text-xl">Redirecionando...</h1>

          <div className="space-y-1">
            <p className="text-center text-base text-gray-500">
              O link será aberto automaticamente em alguns instantes.
            </p>

            {!isPending && data && (
              <p className="text-center text-base text-gray-500">
                Não foi redirecionado?{' '}
                <a
                  href={data.link.originalUrl}
                  className="text-blue-base underline"
                >
                  Acesse aqui
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
