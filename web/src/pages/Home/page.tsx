import { useState } from 'react'
import type { ApiLink } from '@/api/links/list-all'
import { CreateNewLinkForm } from './_components/create-form'
import { LinksList } from './_components/links-list'
import { LogoContainer } from './_components/logo'

export function HomePage() {
  const [links, _] = useState<ApiLink[]>([
    {
      id: '1',
      originalUrl: 'https://examplemuitolongomesmo.com',
      code: 'examplemuitolongomesmo',
      accessCount: 1,
    },
    {
      id: '2',
      originalUrl: 'https://example.com',
      code: 'exmple2',
      accessCount: 1,
    },
    {
      id: '3',
      originalUrl: 'https://example.com',
      code: 'exmple2',
      accessCount: 1,
    },
  ])

  return (
    <div className="mx-auto mt-8 grid max-w-[980px] gap-3 pb-8 md:mt-22 md:grid-cols-[380px_1fr]">
      <LogoContainer />

      <CreateNewLinkForm />

      <LinksList links={links} />
    </div>
  )
}
