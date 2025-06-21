import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { apiRequests } from '@/api'
import { CircularProgress } from '@/components/circular-progress'
import { Button } from '@/components/ui/button'
import { QueryKeys } from '@/lib/query-keys'
import { LinkItem } from './link-item'

export function LinksList() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: [QueryKeys.links],
    queryFn: apiRequests.links.listAll,
  })

  const exportCsvMutation = useMutation({
    mutationFn: apiRequests.links.exportCsv,
    onSuccess: data => {
      const link = document.createElement('a')

      link.href = data.reportUrl

      link.setAttribute('download', 'links.csv')

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error])

  const doesNotHaveLinks = !data || data.links.length === 0

  const isDownloadButtonUnavailable =
    isPending || doesNotHaveLinks || exportCsvMutation.isPending

  return (
    <section className="overflow-hidden rounded-lg bg-gray-100 p-6 md:p-8">
      <header className="flex items-center justify-between">
        <h2 className="text-gray-600 text-lg">Meus links</h2>

        <Button
          variant="secondary"
          disabled={isDownloadButtonUnavailable}
          onClick={() => exportCsvMutation.mutate()}
        >
          {exportCsvMutation.isPending ? (
            <CircularProgress className="size-4 fill-gray-100" />
          ) : (
            <DownloadSimpleIcon />
          )}
          Baixar CSV
        </Button>
      </header>

      {isPending && (
        <>
          <div className="mt-4 mb-3 h-px w-full bg-gray-200 md:mt-5 md:mb-4" />

          <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-6">
            <CircularProgress />
          </div>
        </>
      )}

      {doesNotHaveLinks ? (
        <>
          <div className="mt-4 mb-3 h-px w-full bg-gray-200 md:mt-5 md:mb-4" />

          <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-6">
            <LinkIcon className="size-8 text-gray-400" />
            <p className="text-gray-500 text-xs uppercase">
              ainda não existem links cadastrados
            </p>
          </div>
        </>
      ) : (
        data.links.map(link => <LinkItem key={link.id} link={link} />)
      )}
    </section>
  )
}
