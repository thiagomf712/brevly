import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router'
import type { ApiLink } from '@/api/links/list-all'
import { Button } from '@/components/ui/button'
import { env } from '@/env'

type LinkItemProps = {
  link: ApiLink
}

export function LinkItem({ link }: LinkItemProps) {
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
            <Button variant="icon">
              <CopyIcon />
            </Button>

            <Button variant="icon">
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
