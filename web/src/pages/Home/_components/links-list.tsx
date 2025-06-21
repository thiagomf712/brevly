import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import type { ApiLink } from '@/api/links/list-all'
import { Button } from '@/components/ui/button'
import { LinkItem } from './link-item'

type LinksListProps = {
  links: ApiLink[]
}

export function LinksList({ links }: LinksListProps) {
  return (
    <section className="overflow-hidden rounded-lg bg-gray-100 p-6 md:p-8">
      <header className="flex items-center justify-between">
        <h2 className="text-gray-600 text-lg">Meus links</h2>

        <Button variant="secondary" disabled={links.length === 0}>
          <DownloadSimpleIcon />
          Baixar CSV
        </Button>
      </header>

      {links.length === 0 ? (
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
        links.map(link => <LinkItem key={link.id} link={link} />)
      )}
    </section>
  )
}
